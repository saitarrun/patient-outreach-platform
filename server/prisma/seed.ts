import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const tenantName = 'Demo Clinic';

    // 1. Ensure Tenant exists
    let tenant = await prisma.tenant.findFirst({ where: { name: tenantName } });

    if (!tenant) {
        tenant = await prisma.tenant.create({
            data: { name: tenantName },
        });
        console.log(`Created tenant: ${tenant.name} (${tenant.id})`);
    } else {
        console.log(`Tenant already exists: ${tenant.name} (${tenant.id})`);
    }

    // 2. Ensure Users exist
    const adminEmail = 'admin@demo.com';
    let admin = await prisma.user.findFirst({ where: { email: adminEmail, tenantId: tenant.id } });
    if (!admin) {
        admin = await prisma.user.create({
            data: { tenantId: tenant.id, email: adminEmail, password: 'admin123', role: 'ADMIN' }
        });
        console.log(`Created Admin: ${admin.email}`);
    }

    const staffEmail = 'staff@demo.com';
    let staff = await prisma.user.findFirst({ where: { email: staffEmail, tenantId: tenant.id } });
    if (!staff) {
        staff = await prisma.user.create({
            data: { tenantId: tenant.id, email: staffEmail, password: 'staff123', role: 'STAFF' }
        });
        console.log(`Created Staff: ${staff.email}`);
    }

    // 3. Seed Patients if none exist
    const patientCount = await prisma.patient.count({ where: { tenantId: tenant.id } });

    // We want robust mock data. If there are fewer than 5 patients, recreate them.
    if (patientCount < 5) {
        console.log('Seeding Patients...');

        // Clean up existing to avoid duplicates if partially seeded
        if (patientCount > 0) {
            await prisma.appointment.deleteMany({ where: { tenantId: tenant.id } });
            await prisma.patient.deleteMany({ where: { tenantId: tenant.id } });
        }

        const patientsData = [
            { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '(555) 123-4567', dob: new Date('1990-01-01') },
            { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '(555) 987-6543', dob: new Date('1985-05-15') },
            { firstName: 'Michael', lastName: 'Johnson', email: 'michael.j@example.com', phone: '(555) 555-0192', dob: new Date('1972-08-22') },
            { firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@example.com', phone: '(555) 444-3322', dob: new Date('1995-11-30') },
            { firstName: 'William', lastName: 'Brown', email: 'william.b@example.com', phone: '(555) 222-1111', dob: new Date('1960-03-10') },
            { firstName: 'Olivia', lastName: 'Wilson', email: 'olivia.w@example.com', phone: '(555) 777-8899', dob: new Date('1988-07-04') },
            { firstName: 'James', lastName: 'Taylor', email: 'james.t@example.com', phone: '(555) 666-5544', dob: new Date('1979-12-12') }
        ];

        const createdPatients = [];
        for (const pt of patientsData) {
            const patient = await prisma.patient.create({
                data: {
                    ...pt,
                    tenantId: tenant.id
                }
            });
            createdPatients.push(patient);
            console.log(`Created Patient: ${patient.firstName} ${patient.lastName}`);
        }

        // 4. Seed Appointments
        console.log('Seeding Appointments...');
        const now = new Date();

        // Past Appointments
        await prisma.appointment.create({
            data: {
                tenantId: tenant.id,
                patientId: createdPatients[0].id,
                date: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
                type: 'Annual Checkup',
                status: 'COMPLETED'
            }
        });
        await prisma.appointment.create({
            data: {
                tenantId: tenant.id,
                patientId: createdPatients[0].id,
                date: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
                type: 'Blood Test',
                status: 'COMPLETED'
            }
        });

        // Upcoming Appointments
        const upcomingAppointments = [
            { patientId: createdPatients[0].id, days: 2, type: 'Follow-up Consultation', status: 'CONFIRMED' }, // John Doe (for patient portal demo)
            { patientId: createdPatients[1].id, days: 5, type: 'General Checkup', status: 'SCHEDULED' },
            { patientId: createdPatients[2].id, days: 1, type: 'Cardiology Review', status: 'CONFIRMED' },
            { patientId: createdPatients[3].id, days: 7, type: 'Vaccination', status: 'SCHEDULED' },
            { patientId: createdPatients[4].id, days: 14, type: 'Physical Therapy', status: 'SCHEDULED' },
            { patientId: createdPatients[5].id, days: -1, type: 'Missed Appointment', status: 'CANCELLED' } // Yesterday, cancelled
        ];

        for (const appt of upcomingAppointments) {
            await prisma.appointment.create({
                data: {
                    tenantId: tenant.id,
                    patientId: appt.patientId,
                    date: new Date(now.getTime() + appt.days * 24 * 60 * 60 * 1000),
                    type: appt.type,
                    status: appt.status
                }
            });
        }
        console.log(`Created 8 Appointments.`);

        // 5. Seed Audit Logs
        console.log('Seeding Audit Logs...');

        const logs = [
            { action: 'SYSTEM_BACKUP', resource: 'SYSTEM', details: { status: 'Success' }, offsetHours: 2 },
            { action: 'SCHEDULE_APPT', resource: 'AppointmentID', details: { type: 'Follow-up Consultation' }, offsetHours: 5, userId: staff.id },
            { action: 'CREATE_PATIENT', resource: createdPatients[6].id, details: { name: 'James Taylor' }, offsetHours: 12, userId: admin.id },
            { action: 'REMINDER_SENT', resource: 'SMS_GATEWAY', details: { count: 45 }, offsetHours: 24 }
        ];

        for (const log of logs) {
            await prisma.auditLog.create({
                data: {
                    tenantId: tenant.id,
                    userId: log.userId || null,
                    action: log.action,
                    resource: log.resource,
                    details: log.details,
                    createdAt: new Date(now.getTime() - log.offsetHours * 60 * 60 * 1000)
                }
            });
        }
        console.log(`Created 4 Audit Logs.`);
    } else {
        console.log(`Patients already seeded (${patientCount} found). Skipping data generation.`);
    }

    console.log('Seed completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
