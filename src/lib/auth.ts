import { createHash } from 'crypto';

// Simple password hashing function for demo purposes
export function hashPassword(password: string): string {
  return createHash('sha256').update(password + 'blockchain_salt').digest('hex');
}

export function comparePassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// User interface
export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: string;
  verified: boolean;
  interests?: string[];
  marketingOptIn?: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Mock user database (in production, use a real database)
export const users: User[] = [];

// Global flag to prevent reinitialization
let isInitialized = false;

// Initialize default admin user
function initializeUsers() {
  if (!isInitialized) {
    // Always ensure admin user exists
    const adminExists = users.find(u => u.email === 'admin@blockchaininstitute.com');
    if (!adminExists) {
      users.push({
        id: '1',
        email: 'admin@blockchaininstitute.com',
        password: hashPassword('admin123'), // password: admin123
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1234567890',
        role: 'admin',
        verified: true,
        interests: [],
        marketingOptIn: false,
        createdAt: new Date().toISOString()
      });
      console.log('Admin user initialized with password hash:', users[users.length - 1].password);
    }
    isInitialized = true;
  }
}

// Initialize users on import
initializeUsers();

// Helper functions
export function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function addUser(user: User): void {
  users.push(user);
}

export function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateToken(userId: string): string {
  return `mock_jwt_${userId}_${Date.now()}`;
}

export function parseToken(token: string): string | null {
  const tokenParts = token.split('_');
  // Token format: mock_jwt_userId_timestamp
  if (tokenParts.length !== 4 || tokenParts[0] !== 'mock' || tokenParts[1] !== 'jwt') {
    return null;
  }
  return tokenParts[2]; // Return the user ID part
}

export function getUser(sessionToken: string): User | null {
  try {
    // Parse the token to get user ID
    const userId = parseToken(sessionToken);
    if (!userId) {
      return null;
    }
    
    // Find user by ID
    const user = findUserById(userId);
    return user || null;
  } catch (error) {
    console.error('Error parsing session token:', error);
    return null;
  }
}
