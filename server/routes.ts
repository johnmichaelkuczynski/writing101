import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateAIResponse, generateRewrite } from "./services/ai-models";
import { getFullDocumentContent } from "./services/document-processor";
import { sendEmail } from "./services/email-service";
import { generatePDF } from "./services/pdf-generator";
import { transcribeAudio } from "./services/speech-service";
import { chatRequestSchema, instructionRequestSchema, emailRequestSchema, rewriteRequestSchema } from "@shared/schema";
import multer from "multer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure multer for audio file uploads
  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
  });
  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, model } = chatRequestSchema.parse(req.body);
      
      // Get conversation history for context
      const chatHistory = await storage.getChatMessages();
      
      const response = await generateAIResponse(model, message, false, chatHistory);
      
      await storage.createChatMessage({
        message,
        response,
        model,
        context: { documentContext: true }
      });
      
      res.json({ response });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Instruction endpoint
  app.post("/api/instruction", async (req, res) => {
    try {
      const { instruction, model } = instructionRequestSchema.parse(req.body);
      
      const documentContext = getFullDocumentContent();
      const fullPrompt = `Document Content: ${documentContext}\n\nInstruction: ${instruction}`;
      
      const response = await generateAIResponse(model, fullPrompt, true);
      
      await storage.createInstruction({
        instruction,
        response,
        model
      });
      
      res.json({ response });
    } catch (error) {
      console.error("Instruction error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get chat history
  app.get("/api/chat/history", async (req, res) => {
    try {
      const messages = await storage.getChatMessages();
      res.json(messages);
    } catch (error) {
      console.error("Chat history error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Rewrite endpoint
  app.post("/api/rewrite", async (req, res) => {
    try {
      const { originalText, instructions, model, chunkIndex, parentRewriteId } = rewriteRequestSchema.parse(req.body);
      
      const rewrittenText = await generateRewrite(model, originalText, instructions);
      
      const rewrite = await storage.createRewrite({
        originalText,
        rewrittenText,
        instructions,
        model,
        chunkIndex,
        parentRewriteId,
      });
      
      res.json({ rewrite });
    } catch (error) {
      console.error("Rewrite error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get rewrites endpoint
  app.get("/api/rewrites", async (req, res) => {
    try {
      const rewrites = await storage.getRewrites();
      res.json(rewrites);
    } catch (error) {
      console.error("Error fetching rewrites:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Email endpoint
  app.post("/api/email", async (req, res) => {
    try {
      const { content, email, subject } = emailRequestSchema.parse(req.body);
      
      await sendEmail({
        to: email,
        from: "noreply@livingbook.com",
        subject,
        text: content,
        html: content.replace(/\n/g, '<br>')
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // PDF generation endpoint
  app.post("/api/pdf", async (req, res) => {
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }
      
      const pdfBuffer = await generatePDF(content);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
      res.send(pdfBuffer);
    } catch (error) {
      console.error("PDF generation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Speech transcription endpoint
  app.post("/api/transcribe", upload.single("audio"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Audio file is required" });
      }

      const audioBuffer = req.file.buffer;
      const result = await transcribeAudio(audioBuffer);
      
      res.json({ 
        text: result.text,
        confidence: result.confidence 
      });
    } catch (error) {
      console.error("Speech transcription error:", error);
      res.status(500).json({ error: "Speech recognition failed" });
    }
  });

  // Mind map routes
  app.get("/api/mindmaps/structure", async (req, res) => {
    try {
      const { generateAllMindMaps } = await import("./services/mindmap-generator");
      const model = (req.query.model as AIModel) || 'anthropic';
      const structure = await generateAllMindMaps(model);
      res.json(structure);
    } catch (error) {
      console.error('Error generating mind map structure:', error);
      res.status(500).json({ error: "Failed to generate mind map structure" });
    }
  });

  app.get("/api/mindmaps/local/:sectionId", async (req, res) => {
    try {
      const { generateLocalMindMap } = await import("./services/mindmap-generator");
      const { sectionId } = req.params;
      const model = (req.query.model as AIModel) || 'anthropic';
      const mindMap = await generateLocalMindMap(sectionId, model);
      res.json(mindMap);
    } catch (error) {
      console.error('Error generating local mind map:', error);
      res.status(500).json({ error: "Failed to generate local mind map" });
    }
  });

  app.get("/api/mindmaps/meta", async (req, res) => {
    try {
      const { generateAllMindMaps } = await import("./services/mindmap-generator");
      const model = (req.query.model as AIModel) || 'anthropic';
      const structure = await generateAllMindMaps(model);
      res.json(structure.metaMap);
    } catch (error) {
      console.error('Error generating meta mind map:', error);
      res.status(500).json({ error: "Failed to generate meta mind map" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
