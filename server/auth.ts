import bcrypt from "bcrypt";
import crypto from "crypto";
import { storage } from "./storage";
import type { User, RegisterRequest, LoginRequest } from "@shared/schema";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateSessionId(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(userId: number): Promise<string> {
  const sessionId = generateSessionId();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  
  await storage.createSession({
    id: sessionId,
    userId,
    expiresAt,
  });
  
  return sessionId;
}

export async function register(data: RegisterRequest): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // Check if username already exists
    const existingUser = await storage.getUserByUsername(data.username);
    if (existingUser) {
      return { success: false, error: "Username already exists" };
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const user = await storage.createUser({
      username: data.username,
      email: data.email,
      passwordHash,
      credits: 0, // Start with 0 credits
    });

    return { success: true, user };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Registration failed" };
  }
}

export async function login(data: LoginRequest): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // Find user by username
    const user = await storage.getUserByUsername(data.username);
    if (!user) {
      return { success: false, error: "Invalid username or password" };
    }

    // Verify password
    const isValidPassword = await verifyPassword(data.password, user.passwordHash);
    if (!isValidPassword) {
      return { success: false, error: "Invalid username or password" };
    }

    // Update last login
    await storage.updateUserLastLogin(user.id);

    return { success: true, user };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Login failed" };
  }
}

export async function getUserFromSession(sessionId: string): Promise<User | null> {
  if (!sessionId) return null;
  
  const session = await storage.getSession(sessionId);
  if (!session) return null;
  
  return storage.getUserById(session.userId);
}

export function canAccessFeature(user: User | null): boolean {
  return user !== null && user.credits > 0;
}

export function getPreviewResponse(fullResponse: string, isUnregistered: boolean): string {
  const words = fullResponse.split(' ');
  const previewWords = words.slice(0, 200);
  const previewText = previewWords.join(' ') + '...';
  
  if (isUnregistered) {
    return previewText + '\n\n[Register to get full responses and access all features]';
  } else {
    return previewText + '\n\n[Purchase credits to get full responses and access all features]';
  }
}