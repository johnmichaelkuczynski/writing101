import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import { generateAIResponse, generateRewrite, generatePassageExplanation, generatePassageDiscussionResponse, generateQuiz, generateStudyGuide } from "./services/ai-models";
import { getFullDocumentContent } from "./services/document-processor";

import { generatePDF } from "./services/pdf-generator";
import { transcribeAudio } from "./services/speech-service";
import { register, login, createSession, getUserFromSession, canAccessFeature, getPreviewResponse, isAdmin } from "./auth";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault, verifyPaypalTransaction } from "./safe-paypal";
import { chatRequestSchema, instructionRequestSchema, rewriteRequestSchema, quizRequestSchema, studyGuideRequestSchema, registerRequestSchema, loginRequestSchema, purchaseRequestSchema, type AIModel } from "@shared/schema";
import multer from "multer";

declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || 'living-book-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  }));

  // Configure multer for audio file uploads
  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
  });

  // Helper function to get current user
  const getCurrentUser = async (req: any) => {
    if (!req.session?.userId) return null;
    return await storage.getUserById(req.session.userId);
  };

  // Authentication routes
  app.post("/api/register", async (req, res) => {
    try {
      const data = registerRequestSchema.parse(req.body);
      const result = await register(data);
      
      if (result.success && result.user) {
        // Auto-login after registration
        const sessionId = await createSession(result.user.id);
        req.session.userId = result.user.id;
        
        res.json({ 
          success: true, 
          user: { 
            id: result.user.id, 
            username: result.user.username, 
            credits: result.user.credits 
          } 
        });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ success: false, error: "Registration failed" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const data = loginRequestSchema.parse(req.body);
      const result = await login(data);
      
      if (result.success && result.user) {
        const sessionId = await createSession(result.user.id);
        req.session.userId = result.user.id;
        
        res.json({ 
          success: true, 
          user: { 
            id: result.user.id, 
            username: result.user.username, 
            credits: result.user.credits 
          } 
        });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, error: "Login failed" });
    }
  });

  app.post("/api/logout", async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error("Logout error:", err);
          res.status(500).json({ success: false, error: "Logout failed" });
        } else {
          res.json({ success: true });
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ success: false, error: "Logout failed" });
    }
  });

  app.get("/api/me", async (req, res) => {
    try {
      const user = await getCurrentUser(req);
      if (user) {
        res.json({ 
          id: user.id, 
          username: user.username, 
          credits: user.credits 
        });
      } else {
        res.status(401).json({ error: "Not authenticated" });
      }
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // PayPal routes
  app.get("/paypal/setup", async (req, res) => {
    try {
      await loadPaypalDefault(req, res);
    } catch (error) {
      console.error("PayPal setup error:", error);
      res.status(500).json({ error: "PayPal configuration error" });
    }
  });

  app.post("/paypal/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });

  app.post("/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  // Separate endpoint for crediting user after payment verification
  app.post("/api/verify-payment", async (req, res) => {
    try {
      const { orderID } = req.body;
      const user = await getCurrentUser(req);
      
      if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      // Verify the payment with PayPal
      const isPaymentVerified = await verifyPaypalTransaction(orderID);
      
      if (!isPaymentVerified) {
        return res.status(400).json({ error: "Payment verification failed" });
      }
      
      // Get the verified order details from PayPal - handled by verifyPaypalTransaction
      // We don't need to directly access ordersController here since verification handles it
      
      // For now, default to basic package - in production, you'd get this from PayPal verification
      const amount = "10.00"; // Default amount for basic package
      
      const creditMap = {
        "5.00": 5000,
        "10.00": 20000, 
        "100.00": 500000,
        "1000.00": 10000000
      };
      
      const credits = creditMap[amount] || 20000;
      
      // Only credit after successful verification
      await storage.updateUserCredits(user.id, user.credits + credits);
      
      res.json({
        success: true,
        credits_added: credits,
        new_balance: user.credits + credits
      });
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({ error: "Failed to verify payment" });
    }
  });

  // Chat endpoint with authentication
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, model } = chatRequestSchema.parse(req.body);
      const user = await getCurrentUser(req);
      
      // Get conversation history for context
      const chatHistory = await storage.getChatMessages();
      
      const fullResponse = await generateAIResponse(model, message, false, chatHistory);
      
      // Check if user has access to full features
      let response = fullResponse;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        // Simple truncation without registration prompts
        const words = fullResponse.split(' ');
        response = words.slice(0, 200).join(' ') + '...';
        isPreview = true;
      } else {
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      await storage.createChatMessage({
        message,
        response: fullResponse,
        model,
        context: { documentContext: true }
      });
      
      res.json({ response, isPreview });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Instruction endpoint with authentication
  app.post("/api/instruction", async (req, res) => {
    try {
      const { instruction, model } = instructionRequestSchema.parse(req.body);
      const user = await getCurrentUser(req);
      
      const documentContext = getFullDocumentContent();
      const fullPrompt = `Document Content: ${documentContext}\n\nInstruction: ${instruction}`;
      
      const fullResponse = await generateAIResponse(model, fullPrompt, true);
      
      // Check if user has access to full features
      let response = fullResponse;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        // Simple truncation without registration prompts
        const words = fullResponse.split(' ');
        response = words.slice(0, 200).join(' ') + '...';
        isPreview = true;
      } else {
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      await storage.createInstruction({
        instruction,
        response: fullResponse,
        model
      });
      
      res.json({ response, isPreview });
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

  // Rewrite endpoint with authentication
  app.post("/api/rewrite", async (req, res) => {
    try {
      const { originalText, instructions, model, chunkIndex, parentRewriteId } = rewriteRequestSchema.parse(req.body);
      const user = await getCurrentUser(req);
      
      const fullRewrittenText = await generateRewrite(model, originalText, instructions);
      
      // Check if user has access to full features
      let rewrittenText = fullRewrittenText;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        // Simple truncation without registration prompts
        const words = fullRewrittenText.split(' ');
        rewrittenText = words.slice(0, 200).join(' ') + '...';
        isPreview = true;
      } else {
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      const rewrite = await storage.createRewrite({
        originalText,
        rewrittenText: fullRewrittenText,
        instructions,
        model,
        chunkIndex,
        parentRewriteId,
      });
      
      res.json({ 
        rewrite: {
          ...rewrite,
          rewrittenText // Return preview or full text based on user status
        },
        isPreview 
      });
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


  // PDF generation endpoint
  app.post("/api/pdf", async (req, res) => {
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }
      
      const pdfBuffer = await generatePDF(content);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="download.pdf"');
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

  // Passage explanation and discussion endpoints with authentication
  app.post("/api/passage-explanation", async (req, res) => {
    try {
      const { passage, model } = req.body;
      const user = await getCurrentUser(req);
      
      if (!passage || !model) {
        return res.status(400).json({ error: "Missing required fields: passage, model" });
      }

      const fullExplanation = await generatePassageExplanation(model, passage);
      
      // Check if user has access to full features
      let explanation = fullExplanation;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        // Simple truncation without registration prompts
        const words = fullExplanation.split(' ');
        explanation = words.slice(0, 200).join(' ') + '...';
        isPreview = true;
      } else {
        // Deduct 1 credit for full response
        await storage.updateUserCredits(user!.id, user!.credits - 1);
      }
      
      res.json({ explanation, isPreview });
    } catch (error) {
      console.error("Passage explanation error:", error);
      res.status(500).json({ error: "Failed to generate passage explanation" });
    }
  });

  app.post("/api/passage-discussion", async (req, res) => {
    try {
      const { message, passage, model, conversationHistory } = req.body;
      const user = await getCurrentUser(req);
      
      if (!message || !passage || !model) {
        return res.status(400).json({ error: "Missing required fields: message, passage, model" });
      }

      const fullResponse = await generatePassageDiscussionResponse(model, message, passage, conversationHistory || []);
      
      // Check if user has access to full features
      let response = fullResponse;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        // Simple truncation without registration prompts
        const words = fullResponse.split(' ');
        response = words.slice(0, 200).join(' ') + '...';
        isPreview = true;
      } else {
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      res.json({ response, isPreview });
    } catch (error) {
      console.error("Passage discussion error:", error);
      res.status(500).json({ error: "Failed to generate discussion response" });
    }
  });

  // Quiz generation endpoint with authentication
  app.post("/api/generate-quiz", async (req, res) => {
    try {
      const { sourceText, instructions, chunkIndex, model } = quizRequestSchema.parse(req.body);
      const user = await getCurrentUser(req);
      
      const fullQuiz = await generateQuiz(model, sourceText, instructions);
      
      // Check if user has access to full features
      let quiz = fullQuiz;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        quiz = {
          testContent: fullQuiz.testContent.split(' ').slice(0, 200).join(' ') + '...',
          answerKey: fullQuiz.answerKey
        };
        isPreview = true;
      } else {
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      const savedQuiz = await storage.createQuiz({
        sourceText,
        quiz: fullQuiz.testContent || "",
        instructions: instructions || "Generate a comprehensive quiz",
        model,
        chunkIndex
      });
      
      res.json({ 
        quiz: {
          id: savedQuiz.id,
          testContent: typeof quiz.testContent === 'string' ? quiz.testContent : JSON.stringify(quiz.testContent),
          answerKey: quiz.answerKey,
          timestamp: savedQuiz.timestamp
        },
        isPreview 
      });
    } catch (error) {
      console.error("Quiz generation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get quizzes endpoint
  app.get("/api/quizzes", async (req, res) => {
    try {
      const quizzes = await storage.getQuizzes();
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Study guide generation endpoint with authentication
  app.post("/api/generate-study-guide", async (req, res) => {
    try {
      const { sourceText, instructions, chunkIndex, model } = studyGuideRequestSchema.parse(req.body);
      const user = await getCurrentUser(req);
      
      const fullStudyGuide = await generateStudyGuide(model, sourceText, instructions);
      
      // Check if user has access to full features
      let studyGuide = fullStudyGuide;
      let isPreview = false;
      
      if (!canAccessFeature(user)) {
        // Simple truncation without registration prompts
        const words = fullStudyGuide.guideContent.split(' ');
        studyGuide = words.slice(0, 200).join(' ') + '...';
        isPreview = true;
      } else {
        studyGuide = fullStudyGuide.guideContent;
        // Deduct 1 credit for full response (skip for admin)
        if (!isAdmin(user)) {
          await storage.updateUserCredits(user!.id, user!.credits - 1);
        }
      }
      
      const savedStudyGuide = await storage.createStudyGuide({
        sourceText,
        studyGuide: fullStudyGuide.guideContent,
        instructions: instructions || "Generate a comprehensive study guide",
        model,
        chunkIndex
      });
      
      res.json({ 
        studyGuide: {
          id: savedStudyGuide.id,
          guideContent: studyGuide, // Return preview or full study guide based on user status
          timestamp: savedStudyGuide.timestamp
        },
        isPreview 
      });
    } catch (error) {
      console.error("Study guide generation error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to generate study guide" });
    }
  });

  // Get study guides endpoint
  app.get("/api/study-guides", async (req, res) => {
    try {
      const studyGuides = await storage.getStudyGuides();
      res.json(studyGuides);
    } catch (error) {
      console.error("Error fetching study guides:", error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}