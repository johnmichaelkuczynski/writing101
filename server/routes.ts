import type { Express } from "express";
import { createServer, type Server } from "http";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import session from "express-session";
import Stripe from "stripe";
import { storage } from "./storage";
import { generateAIResponse, generateRewrite, generatePassageExplanation, generatePassageDiscussionResponse, generateQuiz, generateStudyGuide } from "./services/ai-models";
import { getFullDocumentContent } from "./services/document-processor";
import { sendEmail } from "./services/email-service";
import { generatePDF } from "./services/pdf-generator";
import { transcribeAudio } from "./services/speech-service";
import { 
  chatRequestSchema, 
  instructionRequestSchema, 
  emailRequestSchema, 
  rewriteRequestSchema, 
  quizRequestSchema, 
  studyGuideRequestSchema, 
  insertUserSchema,
  loginSchema,
  purchaseCreditsSchema,
  creditTiers,
  type AIModel 
} from "@shared/schema";
import multer from "multer";

const scryptAsync = promisify(scrypt);

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure multer for audio file uploads
  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
  });

  // Session setup for authentication
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'living-book-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  };

  app.use(session(sessionSettings));

  // Authentication middleware
  function requireAuth(req: any, res: any, next: any) {
    if (!req.session?.userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    req.userId = req.session.userId;
    next();
  }

  function optionalAuth(req: any, res: any, next: any) {
    // Adds user to request if authenticated, continues regardless
    if (req.session?.userId) {
      req.userId = req.session.userId;
    }
    next();
  }

  async function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }

  async function comparePasswords(supplied: string, stored: string) {
    const [hashed, salt] = stored.split(".");
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return timingSafeEqual(hashedBuf, suppliedBuf);
  }

  // Stripe setup
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  // Authentication routes
  app.post("/api/register", async (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' });
      }

      // Create new user with hashed password and starter credits
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        credits: 100 // Starter credits
      });

      // Set up session
      req.session.userId = user.id;
      
      res.status(201).json({ 
        id: user.id, 
        username: user.username, 
        credits: user.credits 
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user || !(await comparePasswords(password, user.password))) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Set up session
      req.session.userId = user.id;
      
      res.json({ 
        id: user.id, 
        username: user.username, 
        credits: user.credits 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/logout", (req: any, res: any) => {
    req.session.destroy((err: any) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: 'Failed to logout' });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/user", requireAuth, async (req: any, res: any) => {
    try {
      const user = await storage.getUserById(req.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json({ 
        id: user.id, 
        username: user.username, 
        credits: user.credits 
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Credit management routes
  app.post("/api/purchase-credits", requireAuth, async (req: any, res: any) => {
    try {
      const { tier } = purchaseCreditsSchema.parse(req.body);
      
      const tierData = creditTiers.find(t => t.id === tier);
      if (!tierData) {
        return res.status(400).json({ error: 'Invalid credit tier' });
      }

      // Create Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: tierData.price * 100, // Convert to cents
        currency: 'usd',
        metadata: {
          userId: req.userId.toString(),
          tier: tier,
          credits: tierData.credits.toString()
        }
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Purchase credits error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Stripe webhook to handle successful payments
  app.post("/api/stripe-webhook", async (req, res) => {
    try {
      const sig = req.headers['stripe-signature'] as string;
      const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_PHILOSOPHYDICTIONARY;
      
      if (!endpointSecret) {
        console.error('Stripe webhook secret not configured');
        return res.status(400).send('Webhook secret not configured');
      }

      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle payment intent succeeded
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as any;
        const { userId, credits } = paymentIntent.metadata;

        if (userId && credits) {
          const user = await storage.getUserById(parseInt(userId));
          if (user) {
            const newCredits = user.credits + parseInt(credits);
            await storage.updateUserCredits(parseInt(userId), newCredits);
            
            // Record credit transaction
            await storage.createCreditTransaction({
              userId: parseInt(userId),
              amount: parseInt(credits),
              type: 'purchase',
              description: `Credit purchase: ${credits} credits`
            });
          }
        }
      }

      res.status(200).send('Success');
    } catch (error) {
      console.error("Stripe webhook error:", error);
      res.status(500).send('Internal server error');
    }
  });
  // Chat endpoint (with optional authentication and credit management)
  app.post("/api/chat", optionalAuth, async (req: any, res: any) => {
    try {
      const { message, model } = chatRequestSchema.parse(req.body);
      
      // Get user ID from session (null for guests)
      const userId = req.userId || null;
      
      // Check credits for authenticated users
      if (userId) {
        const user = await storage.getUserById(userId);
        if (!user || user.credits < 10) { // 10 credits per chat
          return res.status(402).json({ error: 'Insufficient credits' });
        }
      }
      
      // Get conversation history for context
      const chatHistory = await storage.getChatMessagesByUserId(userId);
      
      const response = await generateAIResponse(model, message, false, chatHistory);
      
      // For guests, show preview (truncated response)
      let finalResponse = response;
      let isPreview = false;
      
      if (!userId) {
        // Limit guest response to ~200 words
        const words = response.split(' ');
        if (words.length > 200) {
          finalResponse = words.slice(0, 200).join(' ') + '... [Sign up for full responses]';
          isPreview = true;
        }
      }
      
      // Store the chat message
      const tokensUsed = userId ? 10 : 0; // Only charge authenticated users
      await storage.createChatMessage({
        userId,
        message,
        response: finalResponse,
        model,
        context: { documentContext: true },
        isPreview,
        tokensUsed
      });
      
      // Deduct credits for authenticated users
      if (userId && tokensUsed > 0) {
        const user = await storage.getUserById(userId);
        if (user) {
          await storage.updateUserCredits(userId, user.credits - tokensUsed);
          await storage.createCreditTransaction({
            userId,
            amount: -tokensUsed,
            type: 'usage',
            description: `Chat: "${message.substring(0, 50)}..."`
          });
        }
      }
      
      res.json({ response: finalResponse, isPreview });
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
        userId: null, // Guest user for now
        instruction,
        response,
        model,
        tokensUsed: 0
      });
      
      res.json({ response });
    } catch (error) {
      console.error("Instruction error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get chat history (user-specific)
  app.get("/api/chat/history", optionalAuth, async (req: any, res: any) => {
    try {
      const userId = req.userId || null;
      const messages = await storage.getChatMessagesByUserId(userId);
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
        userId: null, // Guest user for now
        originalText,
        rewrittenText,
        instructions,
        model,
        chunkIndex,
        parentRewriteId,
        tokensUsed: 0
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
      const rewrites = await storage.getRewritesByUserId(null);
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

  // Passage explanation and discussion endpoints
  app.post("/api/passage-explanation", async (req, res) => {
    try {
      const { passage, model } = req.body;
      
      if (!passage || !model) {
        return res.status(400).json({ error: "Missing required fields: passage, model" });
      }

      const { generatePassageExplanation } = await import("./services/ai-models");
      let explanation = await generatePassageExplanation(model, passage);
      
      // For unregistered users, truncate response and add upgrade prompt
      if (!req.isAuthenticated()) {
        const words = explanation.split(' ');
        if (words.length > 200) {
          explanation = words.slice(0, 200).join(' ') + '... [Response truncated - register for full access and unlimited AI features]';
        }
      }
      
      res.json({ explanation });
    } catch (error) {
      console.error("Passage explanation error:", error);
      res.status(500).json({ error: "Failed to generate passage explanation" });
    }
  });

  app.post("/api/passage-discussion", async (req, res) => {
    try {
      const { message, passage, model, conversationHistory } = req.body;
      
      if (!message || !passage || !model) {
        return res.status(400).json({ error: "Missing required fields: message, passage, model" });
      }

      // Check authentication and credits for registered users
      if (req.isAuthenticated()) {
        const user = req.user;
        const tokensNeeded = Math.ceil((message.length + passage.length) / 4);
        
        if (user.credits < tokensNeeded) {
          return res.status(402).json({ 
            error: "Insufficient credits",
            creditsNeeded: tokensNeeded,
            currentCredits: user.credits
          });
        }
        
        // Deduct credits
        await storage.updateUserCredits(user.id, user.credits - tokensNeeded);
      }

      const { generatePassageDiscussionResponse } = await import("./services/ai-models");
      let response = await generatePassageDiscussionResponse(model, message, passage, conversationHistory || []);
      
      // For unregistered users, truncate response and add upgrade prompt
      if (!req.isAuthenticated()) {
        const words = response.split(' ');
        if (words.length > 200) {
          response = words.slice(0, 200).join(' ') + '... [Response truncated - register for full access and unlimited AI features]';
        }
      }
      
      res.json({ response });
    } catch (error) {
      console.error("Passage discussion error:", error);
      res.status(500).json({ error: "Failed to generate discussion response" });
    }
  });

  // Quiz generation endpoint
  app.post("/api/quiz", async (req, res) => {
    try {
      const { sourceText, instructions, model, includeAnswerKey, chunkIndex } = quizRequestSchema.parse(req.body);
      
      const result = await generateQuiz(model, sourceText, instructions, includeAnswerKey);
      
      const quiz = await storage.createQuiz({
        userId: null, // Guest user for now
        sourceText,
        instructions,
        testContent: result.testContent,
        answerKey: result.answerKey || null,
        model,
        chunkIndex: chunkIndex || null,
        tokensUsed: 0
      });
      
      res.json({ 
        id: quiz.id,
        testContent: quiz.testContent,
        answerKey: quiz.answerKey,
        timestamp: quiz.timestamp
      });
    } catch (error) {
      console.error("Quiz generation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get quizzes
  app.get("/api/quizzes", async (req, res) => {
    try {
      const quizzes = await storage.getQuizzesByUserId(null);
      res.json(quizzes);
    } catch (error) {
      console.error("Get quizzes error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Study guide generation endpoint
  app.post("/api/study-guide", async (req, res) => {
    try {
      const { sourceText, instructions, model, chunkIndex } = studyGuideRequestSchema.parse(req.body);
      
      const result = await generateStudyGuide(model, sourceText, instructions);
      
      const studyGuide = await storage.createStudyGuide({
        userId: null, // Guest user for now
        sourceText,
        instructions,
        guideContent: result.guideContent,
        model,
        chunkIndex: chunkIndex || null,
        tokensUsed: 0
      });
      
      res.json({ 
        id: studyGuide.id,
        guideContent: studyGuide.guideContent,
        timestamp: studyGuide.timestamp
      });
    } catch (error) {
      console.error("Study guide generation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get study guides
  app.get("/api/study-guides", async (req, res) => {
    try {
      const studyGuides = await storage.getStudyGuidesByUserId(null);
      res.json(studyGuides);
    } catch (error) {
      console.error("Get study guides error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get quiz by ID
  app.get("/api/quiz/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const quiz = await storage.getQuizById(id);
      
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      
      res.json(quiz);
    } catch (error) {
      console.error("Get quiz error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
