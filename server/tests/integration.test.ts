import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Integration Tests', () => {
    let tenantId: string;
    let userId: string;

    beforeAll(async () => {
        // 1. Cleanup
        await prisma.auditLog.deleteMany();
        await prisma.reminder.deleteMany();
        await prisma.appointment.deleteMany();
        await prisma.patient.deleteMany();
        await prisma.user.deleteMany();
        await prisma.tenant.deleteMany();

        // 2. Setup Tenant
        const tenant = await prisma.tenant.create({
            data: {
                name: 'Integration Test Clinic',
            },
        });
        tenantId = tenant.id;

        // 3. Setup User (Admin)
        const user = await prisma.user.create({
            data: {
                email: 'admin@test.com',
                role: 'ADMIN',
                tenantId: tenant.id,
            },
        });
        userId = user.id;
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should create a patient via API', async () => {
        const payload = {
            firstName: 'John',
            lastName: 'Doe',
            phone: '1234567890',
            email: 'john.doe@example.com',
            dob: '1990-01-01',
        };

        const res = await request(app)
            .post('/api/patients')
            .set('x-tenant-id', tenantId)
            .set('x-user-id', userId)
            .send(payload);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.firstName).toBe(payload.firstName);
        expect(res.body.tenantId).toBe(tenantId);
    });

    it('should schedule an appointment', async () => {
        // First create a patient (to get ID)
        const patientRes = await request(app)
            .post('/api/patients')
            .set('x-tenant-id', tenantId)
            .set('x-user-id', userId)
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                phone: '1234567890',
                dob: '1995-05-05',
            });

        const patientId = patientRes.body.id;

        const payload = {
            patientId,
            date: new Date().toISOString(),
            type: 'Check-up',
        };

        const res = await request(app)
            .post('/api/appointments')
            .set('x-tenant-id', tenantId)
            .set('x-user-id', userId)
            .send(payload);

        expect(res.status).toBe(201); // Assuming appointment controller also returns 201?
        expect(res.body).toHaveProperty('id');
        expect(res.body.patientId).toBe(patientId);
    });

    it('should reject creation without auth headers', async () => {
        const res = await request(app).post('/api/patients').send({});
        // Depending on middleware order, might be 403 (RBAC) or warning logic
        // tenant middleware warns but might not block?
        // rbac middleware blocks if no user.
        // tenant middleware tries to look up user.
        // if no headers, no user -> RBAC returns 403.
        expect(res.status).toBe(403);
    });
});
