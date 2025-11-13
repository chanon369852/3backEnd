import { Router, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { prisma } from "../utils/prisma";
import dotenv from "dotenv";
import { body } from 'express-validator';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { getCurrentUser } from '../controllers/auth.controller';
import { asyncHandler } from '../middleware/error.middleware';

dotenv.config();
const router = Router();

// REGISTER
router.post(
  "/register",
  body('email').isEmail(),
  body('password').isString().isLength({ min: 8 }),
  body('tenantId').isString().notEmpty(),
  body('firstName').optional().isString(),
  body('lastName').optional().isString(),
  body('role').optional().isString(),
  validate,
  async (req, res) => {
    try {
      const { email, password, firstName, lastName, tenantId, role } = req.body;
      if (!email || !password || !tenantId) {
        return res.status(400).json({ message: "Email, password and tenantId are required" });
      }

      const existingUser = await prisma.user.findFirst({ where: { email, tenantId } });
      if (existingUser) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          firstName,
          lastName,
          tenantId,
          role: role || 'viewer',
        },
        include: { tenant: true }
      });

      const secret: Secret = (process.env.JWT_SECRET || "change-me") as Secret;
      const signOpts: SignOptions = { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any };
      const token = jwt.sign(
        { userId: user.id, tenantId: user.tenantId, email: user.email, role: user.role },
        secret,
        signOpts
      );

      const { passwordHash, ...safeUser } = user as any;
      return res.json({ token, user: safeUser });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error", error: err });
    }
  }
);

// LOGIN
router.post(
  "/login",
  body('email').isEmail(),
  body('password').isString().isLength({ min: 8 }),
  body('tenantId').isString().notEmpty(),
  validate,
  async (req, res) => {
    try {
      const { email, password, tenantId } = req.body;
      if (!email || !password || !tenantId) return res.status(400).json({ message: "Email, password and tenantId required" });

      const user = await prisma.user.findFirst({ where: { email, tenantId } });
      if (!user) return res.status(404).json({ message: "User not found" });

      const isValid = await bcrypt.compare(password, (user as any).passwordHash);
      if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

      const secret: Secret = (process.env.JWT_SECRET || "change-me") as Secret;
      const signOpts: SignOptions = { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any };
      const token = jwt.sign(
        { userId: user.id, tenantId: user.tenantId, email: user.email, role: user.role },
        secret,
        signOpts
      );

      const { passwordHash, ...safeUser } = user as any;
      return res.json({ token, user: safeUser });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error", error: err });
    }
  }
);

// FORGOT PASSWORD
router.post(
  "/forgot-password",
  body('email').isEmail(),
  validate,
  async (req, res) => {
      try {
        const { email } = req.body;
        
        const user = await prisma.user.findFirst({ where: { email } });
        
        // Always return success to prevent email enumeration
        if (!user) {
          return res.json({ 
            message: 'If an account with this email exists, a password reset link has been sent.' 
          });
        }

        // Generate reset token (valid for 1 hour)
        const secret: Secret = (process.env.JWT_SECRET || "change-me") as Secret;
        const resetToken = jwt.sign(
          { userId: user.id, email: user.email },
          secret,
          { expiresIn: '1h' }
        );

        // In a real application, you would send this via email
        // For demo purposes, we'll just return it
        return res.json({ 
          message: 'Password reset link generated (demo mode)',
          resetToken, // Remove this in production
          resetUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`
        });
      } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err });
      }
    }
  );

// GET CURRENT USER (requires authentication)
router.get(
  "/me",
  authenticate,
  asyncHandler(getCurrentUser)
);

// REFRESH TOKEN
router.post(
  "/refresh",
  authenticate,
  asyncHandler(async (req: any, res: Response) => {
    // Generate new token with same user info
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, role: true, tenantId: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const secret: Secret = (process.env.JWT_SECRET || "change-me") as Secret;
    const signOpts: SignOptions = { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any };
    const newToken = jwt.sign(
      { userId: user.id, tenantId: user.tenantId, email: user.email, role: user.role },
      secret,
      signOpts
    );

    return res.json({ token: newToken });
  })
);

// RESET PASSWORD
router.post(
  "/reset-password",
  body('token').isString().notEmpty(),
  body('newPassword').isString().isLength({ min: 8 }),
  validate,
  async (req, res) => {
      try {
        const { token, newPassword } = req.body;
        
        // Verify reset token
        let decoded: any;
        try {
          const secret: Secret = (process.env.JWT_SECRET || "change-me") as Secret;
          decoded = jwt.verify(token, secret);
        } catch (error) {
          return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const user = await prisma.user.findFirst({
          where: { id: decoded.userId, email: decoded.email },
        });

        if (!user) {
          return res.status(400).json({ message: 'Invalid reset token' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await prisma.user.update({
          where: { id: user.id },
          data: { passwordHash: hashedPassword },
        });

        return res.json({ message: 'Password reset successfully' });
      } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err });
      }
    }
);

export default router;
