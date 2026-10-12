/**
 * Admin password reset script — Part G1
 *
 * Resets the admin password from the CLI.
 * Used when the owner forgets the password (no email reset in MVP).
 *
 * Usage: pnpm admin:reset-password
 */

import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import * as readline from 'readline';

const prisma = new PrismaClient();

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  console.log('\n🔐 Anjali\'s Kitchen — Password Reset\n');

  const admin = await prisma.adminUser.findFirst();
  if (!admin) {
    console.error('❌ No admin user found. Run "pnpm admin:create" first.');
    process.exit(1);
  }

  console.log(`Admin email: ${admin.email}`);

  const password = await prompt('New password (min 12 characters): ');
  if (!password || password.length < 12) {
    console.error('❌ Password must be at least 12 characters long.');
    process.exit(1);
  }

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  // Update password and revoke all sessions
  await prisma.$transaction([
    prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        passwordHash,
        passwordChangedAt: new Date(),
        failedAttempts: 0,
        lockedUntil: null,
      },
    }),
    prisma.session.deleteMany({
      where: { adminId: admin.id },
    }),
  ]);

  console.log('\n✅ Password reset successfully. All sessions revoked.');
  console.log('   Log in at /admin/login with the new password.\n');

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Failed to reset password:', err);
  process.exit(1);
});
