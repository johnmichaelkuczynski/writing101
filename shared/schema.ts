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
  testContent: text("test_content").notNull(),
  answerKey: text("answer_key"),
  model: text("model").notNull(),
  chunkIndex: integer("chunk_index"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const studyGuides = pgTable("study_guides", {
  id: serial("id").primaryKey(),
  sourceText: text("source_text").notNull(),
  instructions: text("instructions").notNull(),
  guideContent: text("guide_content").notNull(),
  model: text("model").notNull(),
  chunkIndex: integer("chunk_index"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email"),
  passwordHash: text("password_hash").notNull(),
  tokens: integer("tokens").default(0).notNull(),
  isRegistered: boolean("is_registered").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLogin: timestamp("last_login"),
});

export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  amount: integer("amount").notNull(), // amount in cents
  tokens: integer("tokens").notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  status: text("status").default("pending").notNull(), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

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
  testContent: true,
  answerKey: true,
  model: true,
  chunkIndex: true,
});

export const insertStudyGuideSchema = createInsertSchema(studyGuides).pick({
  sourceText: true,
  instructions: true,
  guideContent: true,
  model: true,
  chunkIndex: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  passwordHash: true,
  tokens: true,
  isRegistered: true,
});

export const insertPurchaseSchema = createInsertSchema(purchases).pick({
  userId: true,
  amount: true,
  tokens: true,
  stripePaymentIntentId: true,
  status: true,
});

export const insertSessionSchema = createInsertSchema(sessions).pick({
  id: true,
  userId: true,
  expiresAt: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertInstruction = z.infer<typeof insertInstructionSchema>;
export type Instruction = typeof instructions.$inferSelect;
export type InsertRewrite = z.infer<typeof insertRewriteSchema>;
export type Rewrite = typeof rewrites.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;
export type InsertStudyGuide = z.infer<typeof insertStudyGuideSchema>;
export type StudyGuide = typeof studyGuides.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;
export type Purchase = typeof purchases.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

export const aiModels = ["openai", "anthropic", "perplexity", "deepseek"] as const;
export type AIModel = typeof aiModels[number];

export const chatRequestSchema = z.object({
  message: z.string().min(1),
  model: z.enum(aiModels),
});

export const instructionRequestSchema = z.object({
  instruction: z.string().min(1),
  model: z.enum(aiModels),
});

export const emailRequestSchema = z.object({
  content: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
});

export const rewriteRequestSchema = z.object({
  originalText: z.string(),
  instructions: z.string(),
  model: z.enum(aiModels),
  chunkIndex: z.number().optional(),
  parentRewriteId: z.number().optional(),
});

export const quizRequestSchema = z.object({
  sourceText: z.string(),
  instructions: z.string(),
  model: z.enum(aiModels),
  includeAnswerKey: z.boolean().optional(),
  chunkIndex: z.number().optional(),
});

export const studyGuideRequestSchema = z.object({
  sourceText: z.string(),
  instructions: z.string(),
  model: z.enum(aiModels),
  chunkIndex: z.number().optional(),
});

export const registerRequestSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email().optional(),
  password: z.string().min(6),
});

export const loginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const purchaseRequestSchema = z.object({
  priceId: z.enum(["tier1", "tier2", "tier3", "tier4"]),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type InstructionRequest = z.infer<typeof instructionRequestSchema>;
export type EmailRequest = z.infer<typeof emailRequestSchema>;
export type RewriteRequest = z.infer<typeof rewriteRequestSchema>;
export type QuizRequest = z.infer<typeof quizRequestSchema>;
export type StudyGuideRequest = z.infer<typeof studyGuideRequestSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type PurchaseRequest = z.infer<typeof purchaseRequestSchema>;

// Pricing tiers as specified
export const PRICING_TIERS = {
  tier1: { price: 500, tokens: 5000, description: "$5 → 5,000 tokens" },
  tier2: { price: 1000, tokens: 20000, description: "$10 → 20,000 tokens" },
  tier3: { price: 10000, tokens: 500000, description: "$100 → 500,000 tokens" },
  tier4: { price: 100000, tokens: 10000000, description: "$1,000 → 10,000,000 tokens" },
} as const;

// Document access limits
export const UNREGISTERED_PAGE_LIMIT = 5; // First 5 pages only
export const PREVIEW_RESPONSE_LIMIT = 200; // 200 words max for previews
export const STORAGE_COST_PER_MONTH = 500; // 500 tokens/month for storage

// Mind Map Types

