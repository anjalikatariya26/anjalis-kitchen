process.env.DATABASE_URL = "postgresql://anjali:change-me@127.0.0.1:5432/anjalis_kitchen?schema=public";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Querying adminUser from DB...');
  const users = await prisma.adminUser.findMany();
  console.log('Found users:', users.map(u => ({ email: u.email, role: u.role, isActive: u.isActive })));
  const sessions = await prisma.session.findMany();
  console.log('Found sessions count:', sessions.length);
  await prisma.$disconnect();
}

main().catch(err => {
  console.error('Prisma test error:', err);
  process.exit(1);
});
