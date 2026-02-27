import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/tenant';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const tenantId = (req as AuthenticatedRequest).tenantId;

        // 1. Total Patients
        const totalPatients = await prisma.patient.count({
            where: { tenantId }
        });

        // 2. Upcoming Appointments (Scheduled and in the future)
        const upcomingAppointments = await prisma.appointment.count({
            where: {
                tenantId,
                status: { in: ['SCHEDULED', 'CONFIRMED'] },
                date: { gte: new Date() }
            }
        });

        // 3. Active Campaigns (Mocked for now as we don't have a campaigns table yet)
        const activeCampaigns = 3;

        // 4. Failed Reminders
        const failedReminders = await prisma.reminder.count({
            where: {
                appointment: { tenantId },
                status: 'FAILED'
            }
        });

        // 5. Recent Activity (Audit Logs)
        const recentActivity = await prisma.auditLog.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                tenant: false // avoid over-fetching
            }
        });

        res.json({
            stats: {
                totalPatients,
                upcomingAppointments,
                activeCampaigns,
                failedReminders
            },
            recentActivity
        });

    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
    }
};
