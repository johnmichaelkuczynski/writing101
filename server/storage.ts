import { chatMessages, instructions, rewrites, type ChatMessage, type InsertChatMessage, type Instruction, type InsertInstruction, type Rewrite, type InsertRewrite } from "@shared/schema";

export interface IStorage {
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(): Promise<ChatMessage[]>;
  createInstruction(instruction: InsertInstruction): Promise<Instruction>;
  getInstructions(): Promise<Instruction[]>;
  createRewrite(rewrite: InsertRewrite): Promise<Rewrite>;
  getRewrites(): Promise<Rewrite[]>;
  getRewriteById(id: number): Promise<Rewrite | null>;
}

export class MemStorage implements IStorage {
  private chatMessages: Map<number, ChatMessage>;
  private instructions: Map<number, Instruction>;
  private rewrites: Map<number, Rewrite>;
  private currentChatId: number;
  private currentInstructionId: number;
  private currentRewriteId: number;

  constructor() {
    this.chatMessages = new Map();
    this.instructions = new Map();
    this.rewrites = new Map();
    this.currentChatId = 1;
    this.currentInstructionId = 1;
    this.currentRewriteId = 1;
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
}

export const storage = new MemStorage();
