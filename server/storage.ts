import { 
  users, 
  creditTransactions, 
  storageUsage, 
  chatMessages, 
  instructions, 
  rewrites, 
  quizzes, 
  studyGuides, 
  type User, 
  type InsertUser, 
  type CreditTransaction, 
  type InsertCreditTransaction, 
  type StorageUsage, 
  type InsertStorageUsage, 
  type ChatMessage, 
  type InsertChatMessage, 
  type Instruction, 
  type InsertInstruction, 
  type Rewrite, 
  type InsertRewrite, 
  type Quiz, 
  type InsertQuiz, 
  type StudyGuide, 
  type InsertStudyGuide 
} from "@shared/schema";
import { db } from "./db";
import { eq, isNull } from "drizzle-orm";

export interface IStorage {
  // User authentication methods
  createUser(user: InsertUser): Promise<User>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;
  updateUserCredits(userId: number, credits: number): Promise<void>;
  
  // Credit transaction methods
  createCreditTransaction(transaction: InsertCreditTransaction): Promise<CreditTransaction>;
  getCreditTransactionsByUserId(userId: number): Promise<CreditTransaction[]>;
  
  // Storage usage methods
  createStorageUsage(usage: InsertStorageUsage): Promise<StorageUsage>;
  getStorageUsageByUserId(userId: number): Promise<StorageUsage[]>;
  
  // Content methods (now user-scoped)
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesByUserId(userId: number | null): Promise<ChatMessage[]>;
  createInstruction(instruction: InsertInstruction): Promise<Instruction>;
  getInstructionsByUserId(userId: number | null): Promise<Instruction[]>;
  createRewrite(rewrite: InsertRewrite): Promise<Rewrite>;
  getRewritesByUserId(userId: number | null): Promise<Rewrite[]>;
  getRewriteById(id: number): Promise<Rewrite | null>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  getQuizzesByUserId(userId: number | null): Promise<Quiz[]>;
  getQuizById(id: number): Promise<Quiz | null>;
  createStudyGuide(studyGuide: InsertStudyGuide): Promise<StudyGuide>;
  getStudyGuidesByUserId(userId: number | null): Promise<StudyGuide[]>;
  getStudyGuideById(id: number): Promise<StudyGuide | null>;
}

export class DatabaseStorage implements IStorage {
  // User authentication methods
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || null;
  }

  async getUserById(id: number): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  }

  async updateUserCredits(userId: number, credits: number): Promise<void> {
    await db.update(users).set({ credits }).where(eq(users.id, userId));
  }

  // Credit transaction methods
  async createCreditTransaction(insertTransaction: InsertCreditTransaction): Promise<CreditTransaction> {
    const [transaction] = await db.insert(creditTransactions).values(insertTransaction).returning();
    return transaction;
  }

  async getCreditTransactionsByUserId(userId: number): Promise<CreditTransaction[]> {
    return await db.select().from(creditTransactions).where(eq(creditTransactions.userId, userId));
  }

  // Storage usage methods
  async createStorageUsage(insertUsage: InsertStorageUsage): Promise<StorageUsage> {
    const [usage] = await db.insert(storageUsage).values(insertUsage).returning();
    return usage;
  }

  async getStorageUsageByUserId(userId: number): Promise<StorageUsage[]> {
    return await db.select().from(storageUsage).where(eq(storageUsage.userId, userId));
  }

  // Content methods (user-scoped)
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(insertMessage).returning();
    return message;
  }

  async getChatMessagesByUserId(userId: number | null): Promise<ChatMessage[]> {
    if (userId === null) {
      return await db.select().from(chatMessages).where(isNull(chatMessages.userId));
    }
    return await db.select().from(chatMessages).where(eq(chatMessages.userId, userId));
  }

  async createInstruction(insertInstruction: InsertInstruction): Promise<Instruction> {
    const [instruction] = await db.insert(instructions).values(insertInstruction).returning();
    return instruction;
  }

  async getInstructionsByUserId(userId: number | null): Promise<Instruction[]> {
    if (userId === null) {
      return await db.select().from(instructions).where(isNull(instructions.userId));
    }
    return await db.select().from(instructions).where(eq(instructions.userId, userId));
  }

  async createRewrite(insertRewrite: InsertRewrite): Promise<Rewrite> {
    const [rewrite] = await db.insert(rewrites).values(insertRewrite).returning();
    return rewrite;
  }

  async getRewritesByUserId(userId: number | null): Promise<Rewrite[]> {
    if (userId === null) {
      return await db.select().from(rewrites).where(isNull(rewrites.userId));
    }
    return await db.select().from(rewrites).where(eq(rewrites.userId, userId));
  }

  async getRewriteById(id: number): Promise<Rewrite | null> {
    const [rewrite] = await db.select().from(rewrites).where(eq(rewrites.id, id));
    return rewrite || null;
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const [quiz] = await db.insert(quizzes).values(insertQuiz).returning();
    return quiz;
  }

  async getQuizzesByUserId(userId: number | null): Promise<Quiz[]> {
    if (userId === null) {
      return await db.select().from(quizzes).where(isNull(quizzes.userId));
    }
    return await db.select().from(quizzes).where(eq(quizzes.userId, userId));
  }

  async getQuizById(id: number): Promise<Quiz | null> {
    const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, id));
    return quiz || null;
  }

  async createStudyGuide(insertStudyGuide: InsertStudyGuide): Promise<StudyGuide> {
    const [studyGuide] = await db.insert(studyGuides).values(insertStudyGuide).returning();
    return studyGuide;
  }

  async getStudyGuidesByUserId(userId: number | null): Promise<StudyGuide[]> {
    if (userId === null) {
      return await db.select().from(studyGuides).where(isNull(studyGuides.userId));
    }
    return await db.select().from(studyGuides).where(eq(studyGuides.userId, userId));
  }

  async getStudyGuideById(id: number): Promise<StudyGuide | null> {
    const [studyGuide] = await db.select().from(studyGuides).where(eq(studyGuides.id, id));
    return studyGuide || null;
  }
}

export const storage = new DatabaseStorage();
