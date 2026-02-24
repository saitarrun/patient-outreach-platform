import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/tenant';

const prisma = new PrismaClient();

export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
        }

        // Find user by email
        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Check password (plaintext for demo - upgrade to bcrypt for production)
        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Return user data (excluding password)
        res.json({
            id: user.id,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
};

export const patientLogin = async (req: Request, res: Response) => {
    try {
        const tenantId = (req as AuthenticatedRequest).tenantId;
        if (!tenantId) return res.status(400).json({ error: "Tenant ID required" });

        const { phone, dob } = req.body; // Simple auth for MVP

        if (!phone || !dob) {
            return res.status(400).json({ error: "Phone and DOB required" });
        }

        const patient = await prisma.patient.findFirst({
            where: {
                tenantId,
                phone,
                // In real app, compare Date objects carefully (timezone issues)
                // For MVP, we might need fuzzy match or exact string match if stored as string
            }
        });

        if (!patient) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Check DOB match
        // const dobDate = new Date(dob);
        // if (patient.dob?.toISOString().split('T')[0] !== dob) ...

        // Return success with patient context
        // In real app, return JWT. For now, return patient object.
        res.json({ patient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
};
