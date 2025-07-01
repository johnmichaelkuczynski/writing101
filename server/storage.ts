import { chatMessages, instructions, type ChatMessage, type InsertChatMessage, type Instruction, type InsertInstruction } from "@shared/schema";

export interface IStorage {
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(): Promise<ChatMessage[]>;
  createInstruction(instruction: InsertInstruction): Promise<Instruction>;
  getInstructions(): Promise<Instruction[]>;
}

export class MemStorage implements IStorage {
  private chatMessages: Map<number, ChatMessage>;
  private instructions: Map<number, Instruction>;
  private currentChatId: number;
  private currentInstructionId: number;

  constructor() {
    this.chatMessages = new Map();
    this.instructions = new Map();
    this.currentChatId = 1;
    this.currentInstructionId = 1;
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
}

export const storage = new MemStorage();
