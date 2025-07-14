import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication and credits
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  credits: integer("credits").default(0).notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
});

// Credit transactions for tracking purchases and usage
export const creditTransactions = pgTable("credit_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: integer("amount").notNull(), // positive for purchases, negative for usage
  type: text("type").notNull(), // 'purchase', 'usage', 'storage_fee'
  description: text("description").notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Storage usage tracking
export const storageUsage = pgTable("storage_usage", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  wordCount: integer("word_count").notNull(),
  monthlyFee: integer("monthly_fee").notNull(), // in tokens
  lastChargedAt: timestamp("last_charged_at").defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // null for guest users
  message: text("message").notNull(),
  response: text("response").notNull(),
  model: text("model").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  context: jsonb("context"),
  isPreview: boolean("is_preview").default(false), // true for guest previews
  tokensUsed: integer("tokens_used").default(0),
});

export const instructions = pgTable("instructions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // null for guest users
  instruction: text("instruction").notNull(),
  response: text("response").notNull(),
  model: text("model").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  tokensUsed: integer("tokens_used").default(0),
});

export const rewrites = pgTable("rewrites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // null for guest users
  originalText: text("original_text").notNull(),
  rewrittenText: text("rewritten_text").notNull(),
  instructions: text("instructions").notNull(),
  model: text("model").notNull(),
  chunkIndex: integer("chunk_index"),
  parentRewriteId: integer("parent_rewrite_id"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  tokensUsed: integer("tokens_used").default(0),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // null for guest users
  sourceText: text("source_text").notNull(),
  instructions: text("instructions").notNull(),
  testContent: text("test_content").notNull(),
  answerKey: text("answer_key"),
  model: text("model").notNull(),
  chunkIndex: integer("chunk_index"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  tokensUsed: integer("tokens_used").default(0),
});

export const studyGuides = pgTable("study_guides", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // null for guest users
  sourceText: text("source_text").notNull(),
  instructions: text("instructions").notNull(),
  guideContent: text("guide_content").notNull(),
  model: text("model").notNull(),
  chunkIndex: integer("chunk_index"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  tokensUsed: integer("tokens_used").default(0),
});

// User authentication schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const insertCreditTransactionSchema = createInsertSchema(creditTransactions).pick({
  userId: true,
  amount: true,
  type: true,
  description: true,
  stripePaymentIntentId: true,
});

export const insertStorageUsageSchema = createInsertSchema(storageUsage).pick({
  userId: true,
  wordCount: true,
  monthlyFee: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  userId: true,
  message: true,
  response: true,
  model: true,
  context: true,
  isPreview: true,
  tokensUsed: true,
});

export const insertInstructionSchema = createInsertSchema(instructions).pick({
  userId: true,
  instruction: true,
  response: true,
  model: true,
  tokensUsed: true,
});

export const insertRewriteSchema = createInsertSchema(rewrites).pick({
  userId: true,
  originalText: true,
  rewrittenText: true,
  instructions: true,
  model: true,
  chunkIndex: true,
  parentRewriteId: true,
  tokensUsed: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  userId: true,
  sourceText: true,
  instructions: true,
  testContent: true,
  answerKey: true,
  model: true,
  chunkIndex: true,
  tokensUsed: true,
});

export const insertStudyGuideSchema = createInsertSchema(studyGuides).pick({
  userId: true,
  sourceText: true,
  instructions: true,
  guideContent: true,
  model: true,
  chunkIndex: true,
  tokensUsed: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type InsertCreditTransaction = z.infer<typeof insertCreditTransactionSchema>;
export type StorageUsage = typeof storageUsage.$inferSelect;
export type InsertStorageUsage = z.infer<typeof insertStorageUsageSchema>;

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

export const aiModels = ["openai", "anthropic", "perplexity", "deepseek"] as const;
export type AIModel = typeof aiModels[number];

// Credit pricing tiers
export const creditTiers = [
  { price: 5, credits: 5000, priceId: "price_5_5000" },
  { price: 10, credits: 20000, priceId: "price_10_20000" },
  { price: 100, credits: 500000, priceId: "price_100_500000" },
  { price: 1000, credits: 10000000, priceId: "price_1000_10000000" },
] as const;

export const purchaseCreditsSchema = z.object({
  tier: z.enum(['starter', 'power', 'professional', 'enterprise']),
});

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

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type InstructionRequest = z.infer<typeof instructionRequestSchema>;
export type EmailRequest = z.infer<typeof emailRequestSchema>;
export type RewriteRequest = z.infer<typeof rewriteRequestSchema>;
export type QuizRequest = z.infer<typeof quizRequestSchema>;
export type StudyGuideRequest = z.infer<typeof studyGuideRequestSchema>;

// Mind Map Types

