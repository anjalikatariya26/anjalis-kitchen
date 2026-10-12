/**
 * Admin creation script — Part E5, G1
 *
 * Creates the single admin user. Refuses if one already exists.
 *
 * Usage: pnpm admin:create
 */

import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import * as readline from 'readline';

const prisma = new PrismaClient();

function prompt(question: string, hidden = false): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    if (hidden && process.stdin.isTTY) {
      // For hidden input in TTY
      process.stdout.write(question);
      let input = '';
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (char: string) => {
        if (char === '\n' || char === '\r' || char === '\u0004') {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write('\n');
          rl.close();
          resolve(input);
        } else if (char === '\u0003') {
          process.exit(1);
        } else if (char === '\u007F' || char === '\b') {
          if (input.length > 0) {
            input = input.slice(0, -1);
          }
        } else {
          input += char;
        }
      });
    } else {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    }
  });
}

async function main() {
  console.log('\n🔐 Anjali\'s Kitchen — Admin Creation\n');

  // Check if admin already exists
  const existing = await prisma.adminUser.findFirst();
  if (existing) {
    console.error('❌ An admin user already exists. Only one admin is allowed.');
    console.error('   Use "pnpm admin:reset-password" to change the password.');
    process.exit(1);
  }

  // Collect credentials
  const email = await prompt('Email: ');
  if (!email || !email.includes('@')) {
    console.error('❌ Please enter a valid email address.');
    process.exit(1);
  }

  const password = await prompt('Password (min 12 characters): ', true);
  if (!password || password.length < 12) {
    console.error('❌ Password must be at least 12 characters long.');
    process.exit(1);
  }

  const confirm = await prompt('Confirm password: ', true);
  if (password !== confirm) {
    console.error('❌ Passwords do not match.');
    process.exit(1);
  }

  // Hash with argon2id
  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456, // ~19 MiB
    timeCost: 2,
    parallelism: 1,
  });

  await prisma.adminUser.create({
    data: {
      email: email.toLowerCase().trim(),
      passwordHash,
    },
  });

  console.log(`\n✅ Admin created: ${email}`);
  console.log('   Log in at /admin/login\n');

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Failed to create admin:', err);
  process.exit(1);
});
