// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Middleware to verify JWT token for protected routes
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header missing' });
    return;
  }

  // Expect the header to have the format "Bearer token"
  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token missing' });
    return;
  }

  try {
    // Verify token validity
    const decoded = jwt.verify(token, JWT_SECRET);
    // Optionally attach decoded data to the request for later use
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
}
