/**
 * Database seeder — Part E5
 *
 * Profiles:
 *   base   — festivals, categories, business profile (every environment)
 *   sample — sample products, variants, hampers (dev/staging only)
 *
 * Usage:
 *   pnpm db:seed --profile base
 *   pnpm db:seed --profile sample
 */

import { PrismaClient } from '@prisma/client';
import { nameKey } from '../../src/lib/name-key';
import festivals from './data/festivals.json';
import categories from './data/categories.json';

const prisma = new PrismaClient();

async function seedBase() {
  console.log('🌱 Seeding base data...');

  // Seed festivals (idempotent upserts keyed by slug)
  for (const f of festivals) {
    await prisma.festival.upsert({
      where: { slug: f.slug },
      update: {
        name: f.name,
        description: f.description,
        sortOrder: f.sortOrder,
      },
      create: {
        name: f.name,
        nameKey: nameKey(f.name),
        slug: f.slug,
        description: f.description,
        sortOrder: f.sortOrder,
        isActive: true,
      },
    });
    console.log(`  ✓ Festival: ${f.name}`);
  }

  // Seed categories
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        description: c.description,
        sortOrder: c.sortOrder,
      },
      create: {
        name: c.name,
        nameKey: nameKey(c.name),
        slug: c.slug,
        description: c.description,
        sortOrder: c.sortOrder,
        isActive: true,
      },
    });
    console.log(`  ✓ Category: ${c.name}`);
  }

  // Seed business profile (single row)
  const existing = await prisma.businessProfile.findFirst();
  if (!existing) {
    await prisma.businessProfile.create({
      data: {
        displayName: "Anjali's Kitchen",
        tagline: 'Ghar Ka Swaad',
        phone: '9970599900',
        whatsappNumber: '919970599900',
        addressLine1: 'Paras Anand Apartment, Savedi',
        city: 'Ahilyanagar',
        instagramUrl: 'https://www.instagram.com/anjaliskitchen_0',
        leadTimeText: 'Please order 3–4 days before',
      },
    });
    console.log('  ✓ Business profile created');
  } else {
    console.log('  ⏭ Business profile already exists');
  }

  console.log('✅ Base seed complete.');
}

async function seedSample() {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Sample seed is not allowed in production.');
    process.exit(1);
  }

  console.log('🌱 Seeding sample data (dev only)...');

  // Get festival and category references
  const diwali = await prisma.festival.findUnique({ where: { slug: 'diwali' } });
  const ganesh = await prisma.festival.findUnique({ where: { slug: 'ganesh-chaturthi' } });
  const rakhi = await prisma.festival.findUnique({ where: { slug: 'raksha-bandhan' } });
  const sankranti = await prisma.festival.findUnique({ where: { slug: 'makar-sankranti' } });
  const navratri = await prisma.festival.findUnique({ where: { slug: 'navratri' } });

  const ladduCat = await prisma.category.findUnique({ where: { slug: 'laddu' } });
  const chikkiCat = await prisma.category.findUnique({ where: { slug: 'chikki' } });
  const chivdaCat = await prisma.category.findUnique({ where: { slug: 'chivda' } });
  const namkeenCat = await prisma.category.findUnique({ where: { slug: 'namkeen-farsan' } });
  const sweetsCat = await prisma.category.findUnique({ where: { slug: 'sweets' } });
  const modakCat = await prisma.category.findUnique({ where: { slug: 'modak' } });
  const snacksCat = await prisma.category.findUnique({ where: { slug: 'snacks-nashta' } });
  const cakeCat = await prisma.category.findUnique({ where: { slug: 'cakes' } });

  if (!diwali || !ganesh || !rakhi || !sankranti || !navratri ||
      !ladduCat || !chikkiCat || !chivdaCat || !namkeenCat || !sweetsCat || !modakCat || !snacksCat || !cakeCat) {
    console.error('❌ Run base seed first: pnpm db:seed --profile base');
    process.exit(1);
  }

  // Sample products with observed prices from poster 14
  const sampleProducts = [
    {
      name: 'Besan Laddu',
      slug: 'besan-laddu',
      description: 'Classic besan laddu made with pure ghee, roasted gram flour and cardamom. A staple at every Maharashtrian festival.',
      shortDescription: 'Pure ghee besan laddu, made fresh to order.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: ladduCat.id,
      festivalIds: [diwali.id, ganesh.id, rakhi.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: null, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: null, sortOrder: 1 },
        { unitType: 'WEIGHT' as const, unit: 'kg', quantityValue: 1, displayLabel: '1 kg', pricePaise: null, sortOrder: 2 },
      ],
    },
    {
      name: 'Chawal Laddu',
      slug: 'chawal-laddu',
      description: 'Soft rice-flour laddu, delicately flavoured and made fresh to order. A favourite during Raksha Bandhan.',
      shortDescription: 'Soft rice-flour laddu, made fresh to order.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: ladduCat.id,
      festivalIds: [rakhi.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: 11250, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: 22500, sortOrder: 1 },
        { unitType: 'WEIGHT' as const, unit: 'kg', quantityValue: 1, displayLabel: '1 kg', pricePaise: 45000, sortOrder: 2 },
      ],
    },
    {
      name: 'Kasar',
      slug: 'kasar',
      description: 'Traditional Maharashtrian kasar — a sweet made with khoya and sugar. Perfect for celebrations.',
      shortDescription: 'Traditional Maharashtrian sweet with khoya.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: sweetsCat.id,
      festivalIds: [rakhi.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: 11250, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: 22500, sortOrder: 1 },
        { unitType: 'WEIGHT' as const, unit: 'kg', quantityValue: 1, displayLabel: '1 kg', pricePaise: 45000, sortOrder: 2 },
      ],
    },
    {
      name: 'Chakli',
      slug: 'chakli',
      description: 'Crispy spiral-shaped chakli made with rice flour and spices. A must-have in every faral box.',
      shortDescription: 'Crispy rice-flour chakli, a Diwali essential.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: namkeenCat.id,
      festivalIds: [diwali.id, ganesh.id, rakhi.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: null, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: null, sortOrder: 1 },
        { unitType: 'WEIGHT' as const, unit: 'kg', quantityValue: 1, displayLabel: '1 kg', pricePaise: null, sortOrder: 2 },
      ],
    },
    {
      name: 'Poha Chivda',
      slug: 'poha-chivda',
      description: 'Light and crispy flattened rice chivda with peanuts, curry leaves and a touch of turmeric.',
      shortDescription: 'Light and crispy poha chivda with peanuts.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: chivdaCat.id,
      festivalIds: [diwali.id, rakhi.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: 11250, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: 22500, sortOrder: 1 },
        { unitType: 'WEIGHT' as const, unit: 'kg', quantityValue: 1, displayLabel: '1 kg', pricePaise: 45000, sortOrder: 2 },
      ],
    },
    {
      name: 'Maka Chivda',
      slug: 'maka-chivda',
      description: 'Crunchy corn flake chivda with cashews and spices. Great for gifting and trips.',
      shortDescription: 'Crunchy corn chivda, perfect for trips.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: chivdaCat.id,
      festivalIds: [diwali.id, rakhi.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: 11250, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: 22500, sortOrder: 1 },
        { unitType: 'WEIGHT' as const, unit: 'kg', quantityValue: 1, displayLabel: '1 kg', pricePaise: 45000, sortOrder: 2 },
      ],
    },
    {
      name: 'Namkeen Mathri',
      slug: 'namkeen-mathri',
      description: 'Flaky and crispy mathri seasoned with ajwain and salt. Perfect tea-time snack.',
      shortDescription: 'Flaky, crispy mathri with ajwain.',
      productType: 'REGULAR' as const,
      foodType: 'REGULAR' as const,
      categoryId: namkeenCat.id,
      festivalIds: [],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: 11000, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: 22000, sortOrder: 1 },
        { unitType: 'WEIGHT' as const, unit: 'kg', quantityValue: 1, displayLabel: '1 kg', pricePaise: 44000, sortOrder: 2 },
      ],
    },
    {
      name: 'Methi Sticks',
      slug: 'methi-sticks',
      description: 'Crispy sticks flavoured with fenugreek leaves. Addictive and great with chai.',
      shortDescription: 'Crispy fenugreek-flavoured sticks.',
      productType: 'REGULAR' as const,
      foodType: 'REGULAR' as const,
      categoryId: namkeenCat.id,
      festivalIds: [],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: 12000, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: 24000, sortOrder: 1 },
        { unitType: 'WEIGHT' as const, unit: 'kg', quantityValue: 1, displayLabel: '1 kg', pricePaise: 48000, sortOrder: 2 },
      ],
    },
    {
      name: 'Karanji',
      slug: 'karanji',
      description: 'Crispy half-moon pastries filled with a sweet coconut and dry fruit mixture. A Diwali classic.',
      shortDescription: 'Sweet coconut-filled pastries, a Diwali must.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: sweetsCat.id,
      festivalIds: [diwali.id, ganesh.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: null, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: null, sortOrder: 1 },
        { unitType: 'WEIGHT' as const, unit: 'kg', quantityValue: 1, displayLabel: '1 kg', pricePaise: null, sortOrder: 2 },
      ],
    },
    {
      name: 'Shankarpale',
      slug: 'shankarpale',
      description: 'Sweet diamond-shaped pastries, lightly crisp and fragrant with cardamom.',
      shortDescription: 'Sweet diamond pastries with cardamom.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: sweetsCat.id,
      festivalIds: [diwali.id, ganesh.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: null, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: null, sortOrder: 1 },
      ],
    },
    {
      name: 'Ukadiche Modak',
      slug: 'ukadiche-modak',
      description: 'Traditional steamed modak with fresh coconut and jaggery filling wrapped in soft rice dough. Made to order for Ganesh Chaturthi.',
      shortDescription: 'Steamed modak with coconut-jaggery filling.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: modakCat.id,
      festivalIds: [ganesh.id],
      variants: [
        { unitType: 'PIECE' as const, unit: 'piece', quantityValue: 5, displayLabel: '5 pieces', pricePaise: null, sortOrder: 0 },
        { unitType: 'PIECE' as const, unit: 'piece', quantityValue: 11, displayLabel: '11 pieces', pricePaise: null, sortOrder: 1 },
        { unitType: 'PIECE' as const, unit: 'piece', quantityValue: 21, displayLabel: '21 pieces', pricePaise: null, sortOrder: 2 },
      ],
    },
    {
      name: 'Talalele Modak',
      slug: 'talalele-modak',
      description: 'Golden fried modak with a sweet coconut filling. Crispy outside, soft inside.',
      shortDescription: 'Fried modak — crispy outside, sweet inside.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: modakCat.id,
      festivalIds: [ganesh.id],
      variants: [
        { unitType: 'PIECE' as const, unit: 'piece', quantityValue: 6, displayLabel: '6 pieces', pricePaise: null, sortOrder: 0 },
        { unitType: 'PIECE' as const, unit: 'piece', quantityValue: 12, displayLabel: '12 pieces', pricePaise: null, sortOrder: 1 },
      ],
    },
    {
      name: 'Thepla',
      slug: 'thepla',
      description: 'Thin spiced flatbreads with fenugreek, perfect for travel and tiffin. Stays fresh for days.',
      shortDescription: 'Spiced fenugreek flatbread, great for trips.',
      productType: 'REGULAR' as const,
      foodType: 'REGULAR' as const,
      categoryId: snacksCat.id,
      festivalIds: [],
      variants: [
        { unitType: 'PACK' as const, unit: 'box', quantityValue: 1, displayLabel: '1 pack (10 pcs)', pricePaise: null, sortOrder: 0 },
      ],
    },
    {
      name: 'Shengdana Chikki',
      slug: 'shengdana-chikki',
      description: 'Classic peanut chikki made with roasted peanuts and jaggery. Crunchy and satisfying.',
      shortDescription: 'Crunchy peanut-jaggery brittle.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: chikkiCat.id,
      festivalIds: [sankranti.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: null, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: null, sortOrder: 1 },
        { unitType: 'WEIGHT' as const, unit: 'kg', quantityValue: 1, displayLabel: '1 kg', pricePaise: null, sortOrder: 2 },
      ],
    },
    {
      name: 'Til Chikki',
      slug: 'til-chikki',
      description: 'Sesame and jaggery chikki — a Sankranti essential. Crunchy and nutty.',
      shortDescription: 'Sesame-jaggery brittle for Sankranti.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: chikkiCat.id,
      festivalIds: [sankranti.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: null, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: null, sortOrder: 1 },
      ],
    },
    {
      name: 'Jain Samosa',
      slug: 'jain-samosa',
      description: 'Crispy samosa with a Jain-friendly filling — no onion, no garlic, no root vegetables. Made fresh to order.',
      shortDescription: 'Jain-friendly samosa, no onion or garlic.',
      productType: 'REGULAR' as const,
      foodType: 'JAIN' as const,
      categoryId: snacksCat.id,
      festivalIds: [],
      variants: [
        { unitType: 'PIECE' as const, unit: 'piece', quantityValue: 6, displayLabel: '6 pieces', pricePaise: null, sortOrder: 0 },
        { unitType: 'PIECE' as const, unit: 'piece', quantityValue: 12, displayLabel: '12 pieces', pricePaise: null, sortOrder: 1 },
      ],
    },
    {
      name: 'Farali Mathri',
      slug: 'farali-mathri',
      description: 'Fasting-friendly mathri made with sabudana and potato. Perfect for Navratri upvas.',
      shortDescription: 'Fasting-friendly mathri for Navratri.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: namkeenCat.id,
      festivalIds: [navratri.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: null, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: null, sortOrder: 1 },
      ],
    },
    {
      name: 'Mohanthal',
      slug: 'mohanthal',
      description: 'Rich gram-flour fudge flavoured with saffron, cardamom and nuts. A premium sweet.',
      shortDescription: 'Rich saffron gram-flour fudge.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: sweetsCat.id,
      festivalIds: [diwali.id, rakhi.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: null, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: null, sortOrder: 1 },
      ],
    },
    {
      name: 'Masala Shev',
      slug: 'masala-shev',
      description: 'Thin, crispy gram-flour noodles with a spicy masala coating.',
      shortDescription: 'Spicy thin gram-flour noodles.',
      productType: 'FESTIVE' as const,
      foodType: 'REGULAR' as const,
      categoryId: namkeenCat.id,
      festivalIds: [diwali.id],
      variants: [
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 250, displayLabel: '250 g', pricePaise: null, sortOrder: 0 },
        { unitType: 'WEIGHT' as const, unit: 'g', quantityValue: 500, displayLabel: '500 g', pricePaise: null, sortOrder: 1 },
      ],
    },
  ];

  for (const p of sampleProducts) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log(`  ⏭ Product already exists: ${p.name}`);
      continue;
    }

    await prisma.product.create({
      data: {
        name: p.name,
        nameKey: nameKey(p.name),
        slug: p.slug,
        shortDescription: p.shortDescription,
        description: p.description,
        productType: p.productType,
        foodType: p.foodType,
        categoryId: p.categoryId,
        isAvailable: true,
        searchText: `${p.name} ${nameKey(p.name)} ${p.shortDescription ?? ''}`.toLowerCase(),
        variants: {
          create: p.variants.map((v) => ({
            unitType: v.unitType,
            unit: v.unit,
            quantityValue: v.quantityValue,
            displayLabel: v.displayLabel,
            pricePaise: v.pricePaise,
            isAvailable: true,
            sortOrder: v.sortOrder,
          })),
        },
        festivals: {
          create: p.festivalIds.map((fid) => ({
            festivalId: fid,
          })),
        },
      },
    });
    console.log(`  ✓ Product: ${p.name}`);
  }

  console.log('✅ Sample seed complete.');
}

async function main() {
  const profile = process.argv.includes('--profile')
    ? process.argv[process.argv.indexOf('--profile') + 1]
    : 'base';

  try {
    if (profile === 'base' || profile === 'all') {
      await seedBase();
    }
    if (profile === 'sample' || profile === 'all') {
      await seedSample();
    }
    if (!['base', 'sample', 'all'].includes(profile)) {
      console.error(`Unknown profile: ${profile}. Use "base", "sample", or "all".`);
      process.exit(1);
    }
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
