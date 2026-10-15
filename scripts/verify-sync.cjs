const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSync() {
  try {
    const [products, available, categories, festivals] = await Promise.all([
      prisma.product.count({ where: { deletedAt: null } }),
      prisma.product.count({ where: { deletedAt: null, isAvailable: true } }),
      prisma.category.count(),
      prisma.festival.count(),
    ]);

    const latest = await prisma.product.findMany({
      where: { deletedAt: null },
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        priceFromPaise: true,
        isAvailable: true,
        variants: { select: { displayLabel: true, pricePaise: true } },
      },
    });

    console.log('--- DATABASE SYNC CHECK ---');
    console.log(`Total Products: ${products}`);
    console.log(`Available Products: ${available}`);
    console.log(`Categories: ${categories}`);
    console.log(`Festivals: ${festivals}`);
    console.log('Latest Products:', JSON.stringify(latest, null, 2));
    console.log('---------------------------');

    // Test live /admin page rendering
    const admin = await prisma.adminUser.findFirst();
    if (admin) {
      const { createHash, randomBytes } = require('crypto');
      const rawToken = randomBytes(48).toString('base64url');
      const tokenHash = createHash('sha256').update(rawToken).digest('hex');
      const session = await prisma.session.create({
        data: {
          adminUserId: admin.id,
          tokenHash,
          expiresAt: new Date(Date.now() + 600000),
          lastSeenAt: new Date(),
        },
      });

      try {
        const res = await fetch('http://127.0.0.1:3000/admin', {
          headers: {
            Cookie: `ak_session=${rawToken}`,
          },
        });
        const html = await res.text();
        console.log('--- LIVE ADMIN DASHBOARD HTTP TEST ---');
        console.log('HTTP Status:', res.status);
        console.log('Contains "Total Products":', html.includes('Total Products'));
        console.log('Contains "Special Kaju Katli":', html.includes('Special Kaju Katli'));
        console.log('Contains "abc":', html.includes('abc'));
        console.log('--------------------------------------');
      } finally {
        await prisma.session.delete({ where: { id: session.id } });
      }
    }
  } catch (error) {
    console.error('Database check error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSync();
