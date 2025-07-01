import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateAIResponse } from "./services/ai-models";
import { getFullDocumentContent } from "./services/document-processor";
import { sendEmail } from "./services/email-service";
import { generatePDF } from "./services/pdf-generator";
import { transcribeAudio } from "./services/speech-service";
import { chatRequestSchema, instructionRequestSchema, emailRequestSchema } from "@shared/schema";
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
      
      const documentContext = getFullDocumentContent();
      const fullPrompt = `Context: ${documentContext}\n\nUser Question: ${message}`;
      
      const response = await generateAIResponse(model, fullPrompt, false);
      
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

  const httpServer = createServer(app);
  return httpServer;
}
