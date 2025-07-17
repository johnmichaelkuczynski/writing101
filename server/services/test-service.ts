import { AIModel } from "@shared/schema";
import { generateAIResponse } from "./ai-models";
import { paperContent } from "@shared/paper-content";

interface TestGenerationRequest {
  sourceText: string;
  instructions: string;
  testType: "selection" | "cumulative";
  model: AIModel;
  cursorPosition?: number;
}

interface TestQuestion {
  question: string;
  type: "multiple-choice" | "short-answer" | "true-false" | "essay";
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
}

interface TestGradeRequest {
  testSessionId: number;
  responses: Array<{
    testSessionId: number;
    questionIndex: number;
    userAnswer: string;
  }>;
  originalQuestions: TestQuestion[];
  model: AIModel;
}

export async function generateTest(request: TestGenerationRequest): Promise<string> {
  const { sourceText, instructions, testType, model, cursorPosition } = request;

  let contentToTest = sourceText;
  
  if (testType === "cumulative" && cursorPosition) {
    // Get content up to cursor position from the full document
    const fullContent = paperContent.sections.map(s => s.content).join('\n\n');
    contentToTest = fullContent.substring(0, cursorPosition);
  }

  const systemPrompt = `You are an expert educator creating comprehensive tests. Generate a well-structured test based on the provided content.

CRITICAL FORMATTING RULES:
- Number each question (1., 2., 3., etc.)
- For multiple choice, use A), B), C), D) format
- For true/false questions, clearly ask "True or False:"
- Include a mix of question types: multiple choice, short answer, true/false
- Make questions challenging but fair
- Include questions that test both understanding and application
- Use proper mathematical notation when needed
- Each question should be on a separate line
- Leave blank lines between questions for clarity

Content Focus: ${testType === "selection" ? "Test specifically on the selected text content" : "Test cumulatively on all content up to the specified point"}

Additional Instructions: ${instructions || "Create a balanced test with various difficulty levels"}

Generate 5-10 questions of mixed types.`;

  const userPrompt = `Create a comprehensive test based on this content:

${contentToTest}

Generate questions that test understanding, application, and critical thinking. Include multiple choice, short answer, and true/false questions. Make sure each question is clearly numbered and formatted.`;

  try {
    const response = await generateAIResponse(model, userPrompt, systemPrompt);
    return response;
  } catch (error) {
    console.error("Test generation failed:", error);
    throw new Error("Failed to generate test");
  }
}

export async function gradeTest(request: TestGradeRequest): Promise<{
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  grade: string;
  feedback: string;
  detailedResults: Array<{
    questionIndex: number;
    isCorrect: boolean;
    feedback: string;
  }>;
}> {
  const { responses, originalQuestions, model } = request;

  const systemPrompt = `You are an expert grader evaluating student responses to test questions. 

GRADING CRITERIA:
- Be fair but thorough in evaluation
- For mathematical answers, accept equivalent forms (e.g., 0.5 = 1/2)
- For short answers, focus on conceptual understanding over exact wording
- For multiple choice and true/false, answers must match exactly
- Provide constructive feedback for each answer
- Give partial credit where appropriate

RESPONSE FORMAT:
For each question, respond with exactly this format:
QUESTION [number]: [CORRECT/INCORRECT] - [brief feedback explaining why]

Then provide an overall summary with:
TOTAL CORRECT: [number]
PERCENTAGE: [percentage]
GRADE: [A/B/C/D/F]
OVERALL FEEDBACK: [constructive summary of performance]`;

  const userPrompt = `Grade these student responses:

ORIGINAL QUESTIONS AND STUDENT ANSWERS:
${responses.map((r, i) => `
Question ${r.questionIndex}: ${originalQuestions[i]?.question || "Question not found"}
Student Answer: ${r.userAnswer}
`).join('\n')}

Please evaluate each answer thoroughly and provide the requested feedback format.`;

  try {
    const response = await generateAIResponse(model, userPrompt, systemPrompt);
    
    // Parse the grading response
    const lines = response.split('\n').filter(line => line.trim());
    const detailedResults: Array<{ questionIndex: number; isCorrect: boolean; feedback: string }> = [];
    
    let totalCorrect = 0;
    let totalQuestions = responses.length;
    let overallFeedback = "";
    
    for (const line of lines) {
      if (line.startsWith('QUESTION')) {
        const match = line.match(/QUESTION (\d+): (CORRECT|INCORRECT) - (.+)/);
        if (match) {
          const questionIndex = parseInt(match[1]);
          const isCorrect = match[2] === 'CORRECT';
          const feedback = match[3];
          
          detailedResults.push({ questionIndex, isCorrect, feedback });
          if (isCorrect) totalCorrect++;
        }
      } else if (line.startsWith('TOTAL CORRECT:')) {
        const match = line.match(/TOTAL CORRECT: (\d+)/);
        if (match) totalCorrect = parseInt(match[1]);
      } else if (line.startsWith('OVERALL FEEDBACK:')) {
        overallFeedback = line.replace('OVERALL FEEDBACK:', '').trim();
      }
    }
    
    const percentage = Math.round((totalCorrect / totalQuestions) * 100);
    
    let grade = 'F';
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';
    
    return {
      totalQuestions,
      correctAnswers: totalCorrect,
      percentage,
      grade,
      feedback: overallFeedback || "Good effort! Review the concepts where you missed points.",
      detailedResults
    };
    
  } catch (error) {
    console.error("Test grading failed:", error);
    throw new Error("Failed to grade test");
  }
}