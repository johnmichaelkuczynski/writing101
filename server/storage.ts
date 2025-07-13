import { chatMessages, instructions, rewrites, quizzes, type ChatMessage, type InsertChatMessage, type Instruction, type InsertInstruction, type Rewrite, type InsertRewrite, type Quiz, type InsertQuiz } from "@shared/schema";

export interface IStorage {
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(): Promise<ChatMessage[]>;
  createInstruction(instruction: InsertInstruction): Promise<Instruction>;
  getInstructions(): Promise<Instruction[]>;
  createRewrite(rewrite: InsertRewrite): Promise<Rewrite>;
  getRewrites(): Promise<Rewrite[]>;
  getRewriteById(id: number): Promise<Rewrite | null>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  getQuizzes(): Promise<Quiz[]>;
  getQuizById(id: number): Promise<Quiz | null>;
}

export class MemStorage implements IStorage {
  private chatMessages: Map<number, ChatMessage>;
  private instructions: Map<number, Instruction>;
  private rewrites: Map<number, Rewrite>;
  private quizzes: Map<number, Quiz>;
  private currentChatId: number;
  private currentInstructionId: number;
  private currentRewriteId: number;
  private currentQuizId: number;

  constructor() {
    this.chatMessages = new Map();
    this.instructions = new Map();
    this.rewrites = new Map();
    this.quizzes = new Map();
    this.currentChatId = 1;
    this.currentInstructionId = 1;
    this.currentRewriteId = 1;
    this.currentQuizId = 1;
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatId++;
    const message: ChatMessage = {
      ...insertMessage,
      id,
      timestamp: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatMessages(): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    );
  }

  async createInstruction(insertInstruction: InsertInstruction): Promise<Instruction> {
    const id = this.currentInstructionId++;
    const instruction: Instruction = {
      ...insertInstruction,
      id,
      timestamp: new Date(),
    };
    this.instructions.set(id, instruction);
    return instruction;
  }

  async getInstructions(): Promise<Instruction[]> {
    return Array.from(this.instructions.values()).sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    );
  }

  async createRewrite(insertRewrite: InsertRewrite): Promise<Rewrite> {
    const rewrite: Rewrite = {
      id: this.currentRewriteId++,
      originalText: insertRewrite.originalText,
      rewrittenText: insertRewrite.rewrittenText,
      instructions: insertRewrite.instructions,
      model: insertRewrite.model,
      chunkIndex: insertRewrite.chunkIndex || null,
      parentRewriteId: insertRewrite.parentRewriteId || null,
      timestamp: new Date(),
    };

    this.rewrites.set(rewrite.id, rewrite);
    return rewrite;
  }

  async getRewrites(): Promise<Rewrite[]> {
    return Array.from(this.rewrites.values()).sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    );
  }

  async getRewriteById(id: number): Promise<Rewrite | null> {
    return this.rewrites.get(id) || null;
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const quiz: Quiz = {
      id: this.currentQuizId++,
      sourceText: insertQuiz.sourceText,
      instructions: insertQuiz.instructions,
      testContent: insertQuiz.testContent,
      answerKey: insertQuiz.answerKey || null,
      model: insertQuiz.model,
      chunkIndex: insertQuiz.chunkIndex || null,
      timestamp: new Date(),
    };

    this.quizzes.set(quiz.id, quiz);
    return quiz;
  }

  async getQuizzes(): Promise<Quiz[]> {
    return Array.from(this.quizzes.values()).sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    );
  }

  async getQuizById(id: number): Promise<Quiz | null> {
    return this.quizzes.get(id) || null;
  }
}

export const storage = new MemStorage();
