import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreatePatientDTO, Patient } from '@app/shared';

const prisma = new PrismaClient();

import { AuthenticatedRequest } from '../middleware/tenant';

import { redisClient } from '../services/redis/redisService';

export const getPatients = async (req: Request, res: Response) => {
    try {
        const tenantId = (req as AuthenticatedRequest).tenantId;
        const cacheKey = `patients:${tenantId}`;

        // 1. Try Cache
        const cached = await redisClient.get(cacheKey);
        if (cached) {
            console.log('Cache Hit for Patients');
            return res.json(JSON.parse(cached));
        }

        // 2. Fetch DB
        const patients = await prisma.patient.findMany({
            where: { tenantId }
        });

        // 3. Set Cache (TTL 60s)
        await redisClient.set(cacheKey, JSON.stringify(patients), 'EX', 60);

        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
};

export const createPatient = async (req: Request, res: Response) => {
    try {
        const tenantId = (req as AuthenticatedRequest).tenantId;
        if (!tenantId) throw new Error("Tenant ID required");

        const data: CreatePatientDTO = req.body;
        const patient = await prisma.patient.create({
            data: {
                tenantId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                dob: data.dob ? new Date(data.dob) : null,
            },
        });
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create patient' });
    }
};
