import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDTO } from '@app/shared';
import { scheduleReminder } from '../services/reminderService';
import { logAudit } from '../services/auditService';
const prisma = new PrismaClient();

import { AuthenticatedRequest } from '../middleware/tenant';

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const tenantId = (req as AuthenticatedRequest).tenantId;
        const patientId = req.query.patientId as string | undefined;

        const whereClause: any = { tenant: { id: tenantId } };
        if (patientId) {
            whereClause.patientId = patientId;
        }

        const appointments = await prisma.appointment.findMany({
            where: whereClause,
            include: { patient: true },
            orderBy: { date: 'asc' }
        });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
};

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const tenantId = (req as AuthenticatedRequest).tenantId;
        if (!tenantId) throw new Error("Tenant ID required");

        const data: CreateAppointmentDTO = req.body;

        // Verify patient belongs to tenant
        const patient = await prisma.patient.findFirst({
            where: { id: data.patientId, tenant: { id: tenantId } }
        });
        if (!patient) throw new Error("Patient not found in this tenant");

        const appointment = await prisma.appointment.create({
            data: {
                tenantId,
                patientId: data.patientId,
                date: new Date(data.date),
                type: data.type,
            },
        });

        // Trigger advanced reminder scheduling
        await scheduleReminder(appointment.id, appointment.date, tenantId);

        // Audit Log
        await logAudit(tenantId, 'SYSTEM', 'SCHEDULE_APPT', appointment.id, { date: appointment.date, type: appointment.type });

        res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
};

export const confirmAppointment = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const appointment = await prisma.appointment.update({
            where: { id },
            data: { status: 'CONFIRMED' }
        });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to confirm appointment' });
    }
};

export const rescheduleAppointment = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { date } = req.body;
        if (!date) return res.status(400).json({ error: 'New date required' });

        const appointment = await prisma.appointment.update({
            where: { id },
            data: {
                date: new Date(date),
                status: 'SCHEDULED'
            }
        });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to reschedule appointment' });
    }
};
