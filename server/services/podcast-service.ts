import type { AIModel } from "@shared/schema";
import { generateAIResponse } from "./ai-models";

export async function generatePodcastScript(model: AIModel, sourceText: string, instructions?: string): Promise<string> {
  const defaultInstructions = `Create a podcast-style narration of the provided text with the following structure:

1. Brief summary of the content
2. Analysis of the main arguments and themes
3. Discussion of possible objections and counterobjections  
4. Identification of strengths
5. Potential challenges for readers
6. 5 representative quotations from the text with context

Write in a conversational, engaging podcast-style voice that would be suitable for audio narration. Use natural speech patterns and transitions between topics.`;

  const prompt = `${instructions || defaultInstructions}

TEXT TO ANALYZE:
${sourceText}

Generate a podcast-style narration of this content:`;

  return await generateAIResponse(model, prompt, true);
}