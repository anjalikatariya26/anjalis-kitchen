import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@anjaliskitchen.com';
  const password = 'AdminPassword123!';

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  const existing = await prisma.adminUser.findUnique({ where: { email } });

  if (existing) {
    await prisma.adminUser.update({
      where: { email },
      data: { passwordHash, failedAttempts: 0, lockedUntil: null },
    });
    console.log(`✅ Admin password reset to default: ${email} / ${password}`);
  } else {
    await prisma.adminUser.create({
      data: {
        email,
        passwordHash,
      },
    });
    console.log(`✅ Default admin created: ${email} / ${password}`);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Failed to seed default admin:', err);
  process.exit(1);
});
