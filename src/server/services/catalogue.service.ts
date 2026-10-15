import { prisma } from '@/server/db';
import { revalidatePath } from 'next/cache';

export interface PublicProductItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  foodType: 'JAIN' | 'REGULAR';
  categorySlug: string;
  categoryName: string;
  isAvailable: boolean;
  priceLabel: string;
  imageUrl: string | null;
}

export interface PublicCategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

const fallbackShowcaseProducts: PublicProductItem[] = [
  {
    id: 'p1',
    name: 'Steamed Ukadiche Modak',
    slug: 'ukadiche-modak',
    shortDescription: 'Fresh steamed rice flour modak filled with coconut, organic jaggery, cardamom, nutmeg, and drizzled with cow ghee.',
    foodType: 'JAIN',
    categorySlug: 'modak',
    categoryName: 'Modak',
    isAvailable: true,
    priceLabel: '₹250 / 5 Pcs',
    imageUrl: '/images/modak.jpg',
  },
  {
    id: 'p2',
    name: 'Pure Ghee Besan Ladoo',
    slug: 'besan-ladoo',
    shortDescription: 'Slow-roasted gram flour in artisanal cow ghee with cardamom, silver leaf varak, and almond pistachios.',
    foodType: 'JAIN',
    categorySlug: 'laddu',
    categoryName: 'Laddu',
    isAvailable: true,
    priceLabel: '₹420 / 500g',
    imageUrl: '/images/ladoo.jpg',
  },
  {
    id: 'p3',
    name: 'Royal Faral Gift Hamper Box',
    slug: 'royal-faral-gift-hamper',
    shortDescription: 'Curated 4-tier Diwali festive hamper with Chakli, Karanji, Besan Ladoo, and spicy Chivda in ethnic box.',
    foodType: 'JAIN',
    categorySlug: 'sweets',
    categoryName: 'Gift Hampers',
    isAvailable: true,
    priceLabel: '₹1,850 / Box',
    imageUrl: '/images/hamper.jpg',
  },
  {
    id: 'p4',
    name: 'Special Poha Chivda',
    slug: 'poha-chivda',
    shortDescription: 'Crispy fried flattened rice with peanuts, curry leaves, green chilies, and roasted gram.',
    foodType: 'JAIN',
    categorySlug: 'chivda',
    categoryName: 'Chivda',
    isAvailable: true,
    priceLabel: '₹180 / 500g',
    imageUrl: '/images/modak.jpg',
  },
  {
    id: 'p5',
    name: 'Butter Crispy Chakli',
    slug: 'butter-chakli',
    shortDescription: 'Spiced spiral crunchies made with rice & gram flour blend and pure butter.',
    foodType: 'REGULAR',
    categorySlug: 'namkeen-farsan',
    categoryName: 'Namkeen',
    isAvailable: true,
    priceLabel: '₹220 / 500g',
    imageUrl: '/images/ladoo.jpg',
  },
];

const fallbackProductDetails: Record<string, any> = {
  'ukadiche-modak': {
    id: 'prod-1',
    name: 'Steamed Ukadiche Modak',
    slug: 'ukadiche-modak',
    description: 'Traditional steamed rice flour modak stuffed with freshly grated coconut, organic jaggery, cardamom, and nutmeg. Prepared fresh on order with pure ghee.',
    categoryName: 'Modak',
    categorySlug: 'modak',
    isJain: true,
    isAvailable: true,
    shelfLifeDays: 1,
    leadTimeHours: 24,
    images: ['/images/modak.jpg'],
    variants: [
      { id: 'v1', label: 'Pack of 5', pricePaise: 25000, isAvailable: true },
      { id: 'v2', label: 'Pack of 11', pricePaise: 50000, isAvailable: true },
      { id: 'v3', label: 'Pack of 21', pricePaise: 95000, isAvailable: true },
    ],
  },
  'besan-ladoo': {
    id: 'prod-2',
    name: 'Pure Ghee Besan Ladoo',
    slug: 'besan-ladoo',
    description: 'Slow-roasted gram flour in artisanal pure cow ghee, flavored with aromatic cardamom and garnished with crunchy almonds and pistachios.',
    categoryName: 'Laddu',
    categorySlug: 'laddu',
    isJain: true,
    isAvailable: true,
    shelfLifeDays: 20,
    leadTimeHours: 24,
    images: ['/images/ladoo.jpg'],
    variants: [
      { id: 'v4', label: '250g', pricePaise: 22000, isAvailable: true },
      { id: 'v5', label: '500g', pricePaise: 42000, isAvailable: true },
      { id: 'v6', label: '1kg', pricePaise: 80000, isAvailable: true },
    ],
  },
  'royal-faral-gift-hamper': {
    id: 'prod-3',
    name: 'Royal Faral Gift Hamper Box',
    slug: 'royal-faral-gift-hamper',
    description: 'Curated 4-tier Diwali festive hamper with Chakli, Karanji, Besan Ladoo, and spicy Chivda in ethnic box.',
    categoryName: 'Gift Hampers',
    categorySlug: 'sweets',
    isJain: true,
    isAvailable: true,
    shelfLifeDays: 15,
    leadTimeHours: 48,
    images: ['/images/hamper.jpg'],
    variants: [
      { id: 'v7', label: 'Standard Box', pricePaise: 185000, isAvailable: true },
    ],
  },
  'poha-chivda': {
    id: 'prod-4',
    name: 'Special Poha Chivda',
    slug: 'poha-chivda',
    description: 'Light and crispy flattened rice chivda with roasted peanuts, curry leaves, green chilies, and roasted gram.',
    categoryName: 'Chivda',
    categorySlug: 'chivda',
    isJain: true,
    isAvailable: true,
    shelfLifeDays: 30,
    leadTimeHours: 24,
    images: ['/images/modak.jpg'],
    variants: [
      { id: 'v8', label: '250g', pricePaise: 9500, isAvailable: true },
      { id: 'v9', label: '500g', pricePaise: 18000, isAvailable: true },
      { id: 'v10', label: '1kg', pricePaise: 35000, isAvailable: true },
    ],
  },
  'butter-chakli': {
    id: 'prod-5',
    name: 'Butter Crispy Chakli',
    slug: 'butter-chakli',
    description: 'Spiced spiral crunchies made with rice & gram flour blend and pure butter. Crisp and light.',
    categoryName: 'Namkeen',
    categorySlug: 'namkeen-farsan',
    isJain: false,
    isAvailable: true,
    shelfLifeDays: 25,
    leadTimeHours: 24,
    images: ['/images/ladoo.jpg'],
    variants: [
      { id: 'v11', label: '250g', pricePaise: 11500, isAvailable: true },
      { id: 'v12', label: '500g', pricePaise: 22000, isAvailable: true },
      { id: 'v13', label: '1kg', pricePaise: 42000, isAvailable: true },
    ],
  },
};

/**
 * Fetch public products for catalogue with database backing and graceful fallback.
 */
export async function getPublicCatalogueProducts(): Promise<PublicProductItem[]> {
  try {
    const products = await prisma.product.findMany({
      where: { deletedAt: null },
      orderBy: [{ isFeatured: 'desc' }, { updatedAt: 'desc' }],
      include: {
        category: true,
        variants: {
          orderBy: { sortOrder: 'asc' },
        },
        images: {
          orderBy: { position: 'asc' },
          include: { media: true },
        },
      },
    });

    if (products.length > 0) {
      return products.map((p) => {
        const firstVariant = p.variants[0];
        let priceLabel = 'Price on enquiry';
        if (firstVariant && firstVariant.pricePaise) {
          priceLabel = `₹${Math.round(firstVariant.pricePaise / 100)} / ${firstVariant.displayLabel}`;
        }

        // Use the first uploaded image, or fall back to slug-based defaults
        let imageUrl: string | null = null;
        if (p.images.length > 0 && p.images[0].media) {
          const media = p.images[0].media;
          const publicBaseUrl = process.env.STORAGE_PUBLIC_BASE_URL || '/media';
          imageUrl = `${publicBaseUrl}/${media.storageKey}`;
        } else {
          // Fallback for products without uploaded images
          imageUrl = p.slug.includes('modak')
            ? '/images/modak.jpg'
            : p.slug.includes('ladoo') || p.slug.includes('laddu')
            ? '/images/ladoo.jpg'
            : p.slug.includes('hamper')
            ? '/images/hamper.jpg'
            : null;
        }

        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          shortDescription: p.shortDescription || p.description.slice(0, 140),
          foodType: p.foodType,
          categorySlug: p.category.slug,
          categoryName: p.category.name,
          isAvailable: p.isAvailable,
          priceLabel,
          imageUrl,
        };
      });
    }
  } catch (err) {
    console.error('Failed to query products from database:', err);
  }

  return fallbackShowcaseProducts;
}

/**
 * Fetch a single product by slug for product detail view.
 */
export async function getPublicProductDetail(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      where: { slug, deletedAt: null },
      include: {
        category: true,
        variants: {
          orderBy: { sortOrder: 'asc' },
        },
        images: {
          orderBy: { position: 'asc' },
          include: { media: true },
        },
      },
    });

    if (product) {
      const publicBaseUrl = process.env.STORAGE_PUBLIC_BASE_URL || '/media';

      // Use uploaded images from database, or fall back to slug-based defaults
      let images: string[];
      if (product.images.length > 0) {
        images = product.images
          .filter((img) => img.media)
          .map((img) => `${publicBaseUrl}/${img.media.storageKey}`);
      } else {
        images = product.slug.includes('modak')
          ? ['/images/modak.jpg']
          : product.slug.includes('ladoo') || product.slug.includes('laddu')
          ? ['/images/ladoo.jpg']
          : product.slug.includes('hamper')
          ? ['/images/hamper.jpg']
          : ['/images/modak.jpg'];
      }

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        categoryName: product.category.name,
        categorySlug: product.category.slug,
        isJain: product.foodType === 'JAIN',
        isAvailable: product.isAvailable,
        shelfLifeDays: 14,
        leadTimeHours: 24,
        images,
        variants: product.variants.map((v) => ({
          id: v.id,
          label: v.displayLabel,
          pricePaise: v.pricePaise ?? 0,
          isAvailable: v.isAvailable,
        })),
      };
    }
  } catch (err) {
    console.error(`Failed to query product "${slug}" from database:`, err);
  }

  // Check fallback known products
  if (fallbackProductDetails[slug]) {
    return fallbackProductDetails[slug];
  }

  return null;
}

/**
 * Fetch all categories for filter chips and navigation.
 */
export async function getPublicCategories(): Promise<PublicCategoryItem[]> {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    if (categories.length > 0) {
      return categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
      }));
    }
  } catch (err) {
    console.error('Failed to query categories from database:', err);
  }

  return [
    { id: '1', name: 'Laddu', slug: 'laddu', description: null },
    { id: '2', name: 'Modak', slug: 'modak', description: null },
    { id: '3', name: 'Chivda', slug: 'chivda', description: null },
    { id: '4', name: 'Namkeen', slug: 'namkeen-farsan', description: null },
    { id: '5', name: 'Sweets', slug: 'sweets', description: null },
    { id: '6', name: 'Chikki', slug: 'chikki', description: null },
    { id: '7', name: 'Snacks', slug: 'snacks-nashta', description: null },
  ];
}

/**
 * Toggle product availability with immediate cache revalidation.
 */
export async function toggleProductAvailability(id: string, isAvailable: boolean) {
  const updated = await prisma.product.update({
    where: { id },
    data: { isAvailable },
  });

  revalidatePath('/products');
  revalidatePath(`/products/${updated.slug}`);
  revalidatePath('/');
  return updated;
}
