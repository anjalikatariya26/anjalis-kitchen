const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const prisma = new PrismaClient();

async function unlock() {
  try {
    const email = 'anjalikatariya2@gmail.com';
    const password = 'Anjali@26Katariya';

    // 1. Check admin user
    let admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    console.log('Current Admin in DB:', admin ? {
      id: admin.id,
      email: admin.email,
      failedAttempts: admin.failedAttempts,
      lockedUntil: admin.lockedUntil,
    } : 'NOT FOUND');

    // Hash the target password
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });

    if (!admin) {
      console.log('Creating admin user...');
      admin = await prisma.adminUser.create({
        data: {
          email,
          passwordHash: hash,
          name: 'Anjali Katariya',
          failedAttempts: 0,
          lockedUntil: null,
        },
      });
      console.log('Created admin user successfully.');
    } else {
      console.log('Resetting admin user password, failedAttempts, and lockout...');
      admin = await prisma.adminUser.update({
        where: { email },
        data: {
          passwordHash: hash,
          failedAttempts: 0,
          lockedUntil: null,
        },
      });
      console.log('Admin user updated and unlocked successfully.');
    }

    // 2. Clear all failed login attempts
    const deletedAttempts = await prisma.loginAttempt.deleteMany({});
    console.log(`Cleared ${deletedAttempts.count} login attempts from rate limiting table.`);

    // 3. Verify password directly
    const valid = await argon2.verify(admin.passwordHash, password);
    console.log('Password verification test with argon2:', valid ? 'SUCCESS (MATCH)' : 'FAILED');

  } catch (err) {
    console.error('Error unlocking admin:', err);
  } finally {
    await prisma.$disconnect();
  }
}

unlock();
