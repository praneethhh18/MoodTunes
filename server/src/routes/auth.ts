import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userStore } from '../utils/userStore';
import { RegisterRequest, LoginRequest, AuthResponse, UserResponse } from '../types/auth';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

// Validation helper
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

// Register endpoint
router.post('/register', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password }: RegisterRequest = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await userStore.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await userStore.create({
      email,
      password: hashedPassword
    });

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret not configured' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Return user data (without password) and token
    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt
    };

    const response: AuthResponse = {
      user: userResponse,
      token
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password }: LoginRequest = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await userStore.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret not configured' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Return user data (without password) and token
    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt
    };

    const response: AuthResponse = {
      user: userResponse,
      token
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get current user (protected route)
router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await userStore.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt
    };

    res.json(userResponse);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout endpoint (client-side token removal)
router.post('/logout', (req: express.Request, res: express.Response) => {
  // In a JWT-based system, logout is typically handled on the client side
  // by removing the token from storage. This endpoint serves as a confirmation.
  res.json({ message: 'Logged out successfully' });
});

export default router;