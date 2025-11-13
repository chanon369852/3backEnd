import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create default tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'rga-demo' },
    update: {},
    create: {
      name: 'RGA Demo',
      slug: 'rga-demo',
      domain: 'localhost',
    },
  });

  // Create SUPER ADMIN user
  const email = 'superadmin@rga.local';
  const passwordHash = await bcrypt.hash('SuperAdmin@123', 10);
  const superAdmin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email } },
    update: { tenantId: tenant.id, role: 'super_admin' },
    create: {
      email,
      passwordHash,
      firstName: 'Super',
      lastName: 'Admin',
      role: 'super_admin',
      tenantId: tenant.id,
      isActive: true,
      emailVerified: true,
    },
  });

  // Example alert
  // Create an example alert if not exists for this tenant
  const existingAlert = await prisma.alert.findFirst({
    where: { tenantId: tenant.id, name: 'Low CTR', metric: 'ctr', operator: '<' }
  });
  if (!existingAlert) {
    await prisma.alert.create({
      data: {
        tenantId: tenant.id,
        name: 'Low CTR',
        alertType: 'threshold',
        metric: 'ctr',
        operator: '<',
        threshold: new Prisma.Decimal(0.5),
        isActive: true,
        recipients: JSON.parse('["superadmin@rga.local"]'),
        notificationChannels: JSON.parse('["email"]'),
      },
    });
  }

  console.log('Seed complete:', { tenant: tenant.slug, superAdmin: superAdmin.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
