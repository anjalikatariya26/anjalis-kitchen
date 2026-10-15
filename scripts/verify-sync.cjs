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
  } catch (error) {
    console.error('Database check error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSync();
