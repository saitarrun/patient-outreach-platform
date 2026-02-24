import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const tenantName = 'Demo Clinic';

    // Check if tenant exists
    const existing = await prisma.tenant.findFirst({ where: { name: tenantName } });

    if (!existing) {
        const tenant = await prisma.tenant.create({
            data: { name: tenantName },
        });
        console.log(`Created tenant: ${tenant.name} (${tenant.id})`);

        // Create Admin User
        await prisma.user.create({
            data: {
                tenantId: tenant.id,
                email: 'admin@demo.com',
                password: 'admin123',
                role: 'ADMIN'
            }
        });

        // Create Staff User
        await prisma.user.create({
            data: {
                tenantId: tenant.id,
                email: 'staff@demo.com',
                password: 'staff123',
                role: 'STAFF'
            }
        });
    } else {
        console.log(`Tenant already exists: ${existing.name} (${existing.id})`);

        // Ensure Users Exist for demo
        const admin = await prisma.user.findFirst({ where: { email: 'admin@demo.com', tenantId: existing.id } });
        if (!admin) {
            const u = await prisma.user.create({ data: { tenantId: existing.id, email: 'admin@demo.com', password: 'admin123', role: 'ADMIN' } });
            console.log(`Created Admin: ${u.id}`);
        }

        const staff = await prisma.user.findFirst({ where: { email: 'staff@demo.com', tenantId: existing.id } });
        if (!staff) {
            const u = await prisma.user.create({ data: { tenantId: existing.id, email: 'staff@demo.com', password: 'staff123', role: 'STAFF' } });
            console.log(`Created Staff: ${u.id}`);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
