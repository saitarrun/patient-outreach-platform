import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const logAudit = async (tenantId: string, userId: string | null, action: string, resource: string, details?: any) => {
    try {
        await prisma.auditLog.create({
            data: {
                tenantId,
                userId,
                action,
                resource,
                details: details || {},
                ipAddress: '127.0.0.1' // Mocked for MVP
            }
        });
        console.log(`[AUDIT] ${action} on ${resource} by ${userId}`);
    } catch (e) {
        console.error('Failed to write audit log', e);
        // Fail silent? Or throw? Security requirements usually imply fail-closed, but for MVP we log error.
    }
};
