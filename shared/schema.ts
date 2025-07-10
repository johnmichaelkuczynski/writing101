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

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertInstruction = z.infer<typeof insertInstructionSchema>;
export type Instruction = typeof instructions.$inferSelect;
export type InsertRewrite = z.infer<typeof insertRewriteSchema>;
export type Rewrite = typeof rewrites.$inferSelect;

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

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type InstructionRequest = z.infer<typeof instructionRequestSchema>;
export type EmailRequest = z.infer<typeof emailRequestSchema>;
export type RewriteRequest = z.infer<typeof rewriteRequestSchema>;

// Mind Map Types

