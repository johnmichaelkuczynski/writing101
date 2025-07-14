import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';
import { storage } from '../storage';
import type { RegisterRequest, LoginRequest, User, Session } from '@shared/schema';

export interface AuthResult {
  success: boolean;
  user?: User;
  session?: Session;
  error?: string;
}

export class AuthService {
  static async register(request: RegisterRequest): Promise<AuthResult> {
    try {
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(request.username);
      if (existingUser) {
        return { success: false, error: 'Username already exists' };
      }

      // Hash password
      const passwordHash = await bcrypt.hash(request.password, 10);

      // Create user
      const user = await storage.createUser({
        username: request.username,
        email: request.email || null,
        passwordHash,
        tokens: 0,
        isRegistered: true,
      });

      // Create session
      const session = await this.createSession(user.id);

      return { success: true, user, session };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  }

  static async login(request: LoginRequest): Promise<AuthResult> {
    try {
      const user = await storage.getUserByUsername(request.username);
      if (!user) {
        return { success: false, error: 'Invalid username or password' };
      }

      const validPassword = await bcrypt.compare(request.password, user.passwordHash);
      if (!validPassword) {
        return { success: false, error: 'Invalid username or password' };
      }

      // Update last login
      await storage.updateUserLastLogin(user.id);

      // Create session
      const session = await this.createSession(user.id);

      return { success: true, user, session };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }

  static async createSession(userId: number): Promise<Session> {
    const sessionId = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    return await storage.createSession({
      id: sessionId,
      userId,
      expiresAt,
    });
  }

  static async validateSession(sessionId: string): Promise<User | null> {
    if (!sessionId) return null;

    const session = await storage.getSession(sessionId);
    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await storage.deleteSession(sessionId);
      }
      return null;
    }

    return await storage.getUserById(session.userId);
  }

  static async logout(sessionId: string): Promise<void> {
    if (sessionId) {
      await storage.deleteSession(sessionId);
    }
  }

  static async deductTokens(userId: number, amount: number): Promise<boolean> {
    const user = await storage.getUserById(userId);
    if (!user || user.tokens < amount) {
      return false;
    }

    await storage.updateUserTokens(userId, user.tokens - amount);
    return true;
  }

  static async addTokens(userId: number, amount: number): Promise<void> {
    const user = await storage.getUserById(userId);
    if (user) {
      await storage.updateUserTokens(userId, user.tokens + amount);
    }
  }
}