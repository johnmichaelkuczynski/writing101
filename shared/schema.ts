import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  response: text("response").notNull(),
  model: text("model").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  context: jsonb("context"),
});

export const instructions = pgTable("instructions", {
  id: serial("id").primaryKey(),
  instruction: text("instruction").notNull(),
  response: text("response").notNull(),
  model: text("model").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const rewrites = pgTable("rewrites", {
  id: serial("id").primaryKey(),
  originalText: text("original_text").notNull(),
  rewrittenText: text("rewritten_text").notNull(),
  instructions: text("instructions").notNull(),
  model: text("model").notNull(),
  chunkIndex: integer("chunk_index"),
  parentRewriteId: integer("parent_rewrite_id"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  sourceText: text("source_text").notNull(),
  instructions: text("instructions").notNull(),
  quiz: text("quiz").notNull(),
  model: text("model").notNull(),
  chunkIndex: integer("chunk_index"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const studyGuides = pgTable("study_guides", {
  id: serial("id").primaryKey(),
  sourceText: text("source_text").notNull(),
  instructions: text("instructions").notNull(),
  studyGuide: text("study_guide").notNull(),
  model: text("model").notNull(),
  chunkIndex: integer("chunk_index"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email"),
  passwordHash: text("password_hash").notNull(),
  credits: integer("credits").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLogin: timestamp("last_login"),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  amount: integer("amount").notNull(), // amount in cents
  credits: integer("credits").notNull(),
  stripeSessionId: text("stripe_session_id"),
  status: text("status").default("pending").notNull(), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  message: true,
  response: true,
  model: true,
  context: true,
});

export const insertInstructionSchema = createInsertSchema(instructions).pick({
  instruction: true,
  response: true,
  model: true,
});

export const insertRewriteSchema = createInsertSchema(rewrites).pick({
  originalText: true,
  rewrittenText: true,
  instructions: true,
  model: true,
  chunkIndex: true,
  parentRewriteId: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  sourceText: true,
  instructions: true,
  quiz: true,
  model: true,
  chunkIndex: true,
});

export const insertStudyGuideSchema = createInsertSchema(studyGuides).pick({
  sourceText: true,
  instructions: true,
  studyGuide: true,
  model: true,
  chunkIndex: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  passwordHash: true,
  credits: true,
});

export const insertSessionSchema = createInsertSchema(sessions).pick({
  id: true,
  userId: true,
  expiresAt: true,
});

export const insertPurchaseSchema = createInsertSchema(purchases).pick({
  userId: true,
  amount: true,
  credits: true,
  stripeSessionId: true,
  status: true,
});

// Types
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type Instruction = typeof instructions.$inferSelect;
export type InsertInstruction = z.infer<typeof insertInstructionSchema>;
export type Rewrite = typeof rewrites.$inferSelect;
export type InsertRewrite = z.infer<typeof insertRewriteSchema>;
export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type StudyGuide = typeof studyGuides.$inferSelect;
export type InsertStudyGuide = z.infer<typeof insertStudyGuideSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Purchase = typeof purchases.$inferSelect;
export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;

// AI Models
export type AIModel = "ai1" | "ai2" | "ai3" | "ai4";

// Request schemas
export const chatRequestSchema = z.object({
  message: z.string(),
  model: z.enum(["ai1", "ai2", "ai3", "ai4"]),
});

export const instructionRequestSchema = z.object({
  instruction: z.string(),
  model: z.enum(["ai1", "ai2", "ai3", "ai4"]),
});

export const rewriteRequestSchema = z.object({
  originalText: z.string(),
  instructions: z.string(),
  model: z.enum(["ai1", "ai2", "ai3", "ai4"]),
  chunkIndex: z.number().optional(),
  parentRewriteId: z.number().optional(),
});

export const quizRequestSchema = z.object({
  sourceText: z.string(),
  instructions: z.string().optional(),
  model: z.enum(["ai1", "ai2", "ai3", "ai4"]),
  chunkIndex: z.number().optional(),
});

export const studyGuideRequestSchema = z.object({
  sourceText: z.string(),
  instructions: z.string().optional(),
  model: z.enum(["ai1", "ai2", "ai3", "ai4"]),
  chunkIndex: z.number().optional(),
});

export const emailRequestSchema = z.object({
  content: z.string(),
  email: z.string().email(),
  subject: z.string(),
});

export const registerRequestSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6),
  email: z.string().email().optional(),
});

export const loginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const purchaseRequestSchema = z.object({
  amount: z.number().min(50), // minimum 50 cents
  credits: z.number().min(1),
});

// Export request types
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type InstructionRequest = z.infer<typeof instructionRequestSchema>;
export type RewriteRequest = z.infer<typeof rewriteRequestSchema>;
export type QuizRequest = z.infer<typeof quizRequestSchema>;
export type StudyGuideRequest = z.infer<typeof studyGuideRequestSchema>;
export type EmailRequest = z.infer<typeof emailRequestSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type PurchaseRequest = z.infer<typeof purchaseRequestSchema>;