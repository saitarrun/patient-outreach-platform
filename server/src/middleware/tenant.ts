import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Extend request to include User
export interface AuthenticatedRequest extends Request {
    tenantId?: string;
    user?: any; // In real app, typed User
}

export const tenantMiddlewareAsync = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let tenantId = req.headers['x-tenant-id'] as string;
    const userIdHeader = req.headers['x-user-id'] as string; // Mock Auth

    // DEMO HACK: Name-based lookup for "demo"
    if (tenantId === 'demo') {
        try {
            const demoTenant = await prisma.tenant.findFirst({ where: { name: 'Demo Clinic' } });
            if (demoTenant) {
                tenantId = demoTenant.id;
            }
        } catch (error) {
            console.error('Failed to lookup demo tenant', error);
        }
    }

    if (!tenantId) {
        console.warn('No tenant ID found in headers');
    }

    req.tenantId = tenantId;

    // RBAC: Mock User Lookup
    if (userIdHeader && tenantId) {
        const user = await prisma.user.findFirst({
            where: { id: userIdHeader, tenantId }
        });
        req.user = user;
    } else if (tenantId) {
        // Fallback: If no user header, assume ADMIN for demo simplicity? 
        // Or better, don't set user, and let RBAC fail if strict.
    }

    next();
};
