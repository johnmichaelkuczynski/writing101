import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
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

// Export request types
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type InstructionRequest = z.infer<typeof instructionRequestSchema>;
export type RewriteRequest = z.infer<typeof rewriteRequestSchema>;
export type QuizRequest = z.infer<typeof quizRequestSchema>;
export type StudyGuideRequest = z.infer<typeof studyGuideRequestSchema>;
export type EmailRequest = z.infer<typeof emailRequestSchema>;