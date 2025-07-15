import { chatMessages, instructions, rewrites, quizzes, studyGuides, users, sessions, type ChatMessage, type InsertChatMessage, type Instruction, type InsertInstruction, type Rewrite, type InsertRewrite, type Quiz, type InsertQuiz, type StudyGuide, type InsertStudyGuide, type User, type InsertUser, type Session, type InsertSession } from "@shared/schema";

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
  createStudyGuide(studyGuide: InsertStudyGuide): Promise<StudyGuide>;
  getStudyGuides(): Promise<StudyGuide[]>;
  getStudyGuideById(id: number): Promise<StudyGuide | null>;
  
  // User management
  createUser(user: InsertUser): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  updateUserCredits(userId: number, credits: number): Promise<User | null>;
  updateUserLastLogin(userId: number): Promise<void>;
  
  // Session management
  createSession(session: InsertSession): Promise<Session>;
  getSession(sessionId: string): Promise<Session | null>;
  deleteSession(sessionId: string): Promise<void>;
  

}

export class MemStorage implements IStorage {
  private chatMessages: Map<number, ChatMessage>;
  private instructions: Map<number, Instruction>;
  private rewrites: Map<number, Rewrite>;
  private quizzes: Map<number, Quiz>;
  private studyGuides: Map<number, StudyGuide>;
  private users: Map<number, User>;
  private usersByUsername: Map<string, User>;
  private sessions: Map<string, Session>;
  private currentChatId: number;
  private currentInstructionId: number;
  private currentRewriteId: number;
  private currentQuizId: number;
  private currentStudyGuideId: number;
  private currentUserId: number;

  constructor() {
    this.chatMessages = new Map();
    this.instructions = new Map();
    this.rewrites = new Map();
    this.quizzes = new Map();
    this.studyGuides = new Map();
    this.users = new Map();
    this.usersByUsername = new Map();
    this.sessions = new Map();
    this.currentChatId = 1;
    this.currentInstructionId = 1;
    this.currentRewriteId = 1;
    this.currentQuizId = 1;
    this.currentStudyGuideId = 1;
    this.currentUserId = 1;
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
    return Array.from(this.chatMessages.values())
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
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
    return Array.from(this.instructions.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async createRewrite(insertRewrite: InsertRewrite): Promise<Rewrite> {
    const id = this.currentRewriteId++;
    const rewrite: Rewrite = {
      ...insertRewrite,
      id,
      timestamp: new Date(),
    };
    this.rewrites.set(id, rewrite);
    return rewrite;
  }

  async getRewrites(): Promise<Rewrite[]> {
    return Array.from(this.rewrites.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getRewriteById(id: number): Promise<Rewrite | null> {
    return this.rewrites.get(id) || null;
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = this.currentQuizId++;
    const quiz: Quiz = {
      ...insertQuiz,
      id,
      timestamp: new Date(),
    };
    this.quizzes.set(id, quiz);
    return quiz;
  }

  async getQuizzes(): Promise<Quiz[]> {
    return Array.from(this.quizzes.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getQuizById(id: number): Promise<Quiz | null> {
    return this.quizzes.get(id) || null;
  }

  async createStudyGuide(insertStudyGuide: InsertStudyGuide): Promise<StudyGuide> {
    const id = this.currentStudyGuideId++;
    const studyGuide: StudyGuide = {
      ...insertStudyGuide,
      id,
      timestamp: new Date(),
    };
    this.studyGuides.set(id, studyGuide);
    return studyGuide;
  }

  async getStudyGuides(): Promise<StudyGuide[]> {
    return Array.from(this.studyGuides.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getStudyGuideById(id: number): Promise<StudyGuide | null> {
    return this.studyGuides.get(id) || null;
  }

  // User management methods
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
      lastLogin: null,
    };
    this.users.set(id, user);
    this.usersByUsername.set(user.username, user);
    return user;
  }

  async getUserById(id: number): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.usersByUsername.get(username) || null;
  }

  async updateUserCredits(userId: number, credits: number): Promise<User | null> {
    const user = this.users.get(userId);
    if (user) {
      const updatedUser = { ...user, credits };
      this.users.set(userId, updatedUser);
      this.usersByUsername.set(user.username, updatedUser);
      return updatedUser;
    }
    return null;
  }

  async updateUserLastLogin(userId: number): Promise<void> {
    const user = this.users.get(userId);
    if (user) {
      const updatedUser = { ...user, lastLogin: new Date() };
      this.users.set(userId, updatedUser);
      this.usersByUsername.set(user.username, updatedUser);
    }
  }

  // Session management methods
  async createSession(insertSession: InsertSession): Promise<Session> {
    const session: Session = {
      ...insertSession,
      createdAt: new Date(),
    };
    this.sessions.set(session.id, session);
    return session;
  }

  async getSession(sessionId: string): Promise<Session | null> {
    const session = this.sessions.get(sessionId);
    if (session && session.expiresAt > new Date()) {
      return session;
    }
    if (session) {
      this.sessions.delete(sessionId);
    }
    return null;
  }

  async deleteSession(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
  }


}

export const storage = new MemStorage();