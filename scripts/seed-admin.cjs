process.env.DATABASE_URL = "postgresql://anjali:change-me@127.0.0.1:5432/anjalis_kitchen?schema=public";
const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Setting Admin User Credentials ---');
  const email = 'anjalikatariya2@gmail.com';
  const password = 'Anjali@26Katariya';

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456, // ~19 MiB
    timeCost: 2,
    parallelism: 1,
  });

  // Remove any previous admin users to ensure single clean admin account
  await prisma.session.deleteMany({});
  await prisma.adminUser.deleteMany({});

  const created = await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
    },
  });

  console.log('✅ Admin user created/updated successfully:');
  console.log('ID:', created.id);
  console.log('Email:', created.email);

  await prisma.$disconnect();
}

main().catch(err => {
  console.error('Failed to set admin:', err);
  process.exit(1);
});
