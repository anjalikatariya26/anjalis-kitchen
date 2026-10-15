'use server';

import { prisma } from '@/server/db';
import { requireAuth } from '@/features/auth/actions';
import { revalidatePath } from 'next/cache';
import { getStorage } from '@/server/storage';
import crypto from 'crypto';

/* ─── Helpers ─────────────────────────────────────────── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function nameKey(name: string): string {
  return name.toLowerCase().replace(/[^\w\s]/g, '').trim();
}

function mapUnit(unit: string): 'WEIGHT' | 'PIECE' | 'PACK' | 'VOLUME' | 'CUSTOM' {
  switch (unit) {
    case 'g':
    case 'kg':
      return 'WEIGHT';
    case 'piece':
      return 'PIECE';
    case 'box':
      return 'PACK';
    case 'ml':
    case 'l':
      return 'VOLUME';
    default:
      return 'CUSTOM';
  }
}

const DEFAULT_CATEGORIES = [
  { id: '93a7d8a0-82d8-4c6b-83b6-deb96b14d88f', name: 'Laddu' },
  { id: '461f2a05-0896-4dff-8986-dd061997c33d', name: 'Chikki' },
  { id: '1a37bf44-7427-47a7-8756-663e2fe3b8f8', name: 'Chivda' },
  { id: 'efcbe5b4-978b-407c-a16f-1b761ad8895b', name: 'Namkeen & Farsan' },
  { id: 'e5f21fca-58b7-47f0-a3b8-22591d8abc2f', name: 'Sweets' },
  { id: 'c5fcc7fa-3686-4ee6-8d71-4b3fcae60c06', name: 'Modak' },
  { id: 'b56bb9ea-3dbd-43cb-b8e2-d3f2c0ce6bff', name: 'Snacks & Nashta' },
  { id: 'f599fe85-a3df-4fa6-965e-99f762ad2271', name: 'Chutney' },
  { id: '67f25d13-380d-40e0-bbcf-48d9dc1a6ba9', name: 'Cakes' },
  { id: 'f242fddf-746f-425b-9612-3984ef765a34', name: 'Cookies' },
];

const DEFAULT_FESTIVALS = [
  { id: '8a9c4bab-fec0-45ee-9231-779b235d09c7', name: 'Ganesh Chaturthi' },
  { id: 'b3cd0632-6429-4c81-bebf-9aba4c66be7b', name: 'Raksha Bandhan' },
  { id: '22baf49b-6dc7-4728-88c5-42c8ef940598', name: 'Navratri' },
  { id: '9d88576d-92fa-47ee-84b4-bc78927b9c29', name: 'Diwali' },
  { id: 'f0850c28-bac0-47d8-beeb-2e68b31acf2e', name: 'Makar Sankranti' },
  { id: '1011e831-1625-4989-a822-4eed57c9ae5b', name: "Father's Day" },
];

/* ─── Create Product ──────────────────────────────────── */

export interface CreateProductPayload {
  name: string;
  shortDescription: string;
  description: string;
  productType: 'FESTIVE' | 'REGULAR';
  foodType: 'JAIN' | 'REGULAR';
  categoryId: string;
  festivalIds: string[];
  isAvailable: boolean;
  variants: {
    unit: string;
    quantityValue: string;
    displayLabel: string;
    pricePaise: string; // Rupees entered in form (e.g. "250")
    isAvailable: boolean;
  }[];
}

export async function createProductAction(
  payload: CreateProductPayload,
  formData?: FormData
): Promise<{ success: boolean; productId?: string; error?: string }> {
  try {
    await requireAuth();

    // ── Validate basics ──
    const name = payload.name.trim();
    if (name.length < 2 || name.length > 120) {
      return { success: false, error: 'Product name must be 2–120 characters.' };
    }
    const desc = payload.description.trim();
    if (desc.length < 10) {
      return { success: false, error: 'Description must be at least 10 characters.' };
    }

    // ── Validate or resolve category ──
    let category = await prisma.category.findUnique({
      where: { id: payload.categoryId },
    });
    if (!category) {
      // Fallback: check by first active or create if needed
      category = await prisma.category.findFirst({
        where: { isActive: true },
      });
      if (!category) {
        category = await prisma.category.create({
          data: {
            id: payload.categoryId,
            name: 'General',
            nameKey: 'general',
            slug: 'general',
            isActive: true,
          },
        });
      }
    }

    // ── Validate variants ──
    if (!payload.variants || payload.variants.length === 0) {
      return { success: false, error: 'At least one size/variant is required.' };
    }

    // ── Generate unique slug ──
    let baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // ── Handle image uploads ──
    const mediaAssetIds: string[] = [];

    if (formData) {
      const imageFiles: File[] = [];
      const img1 = formData.get('image_0');
      const img2 = formData.get('image_1');
      if (img1 instanceof Blob && img1.size > 0) {
        imageFiles.push(img1 as File);
      }
      if (img2 instanceof Blob && img2.size > 0) {
        imageFiles.push(img2 as File);
      }

      if (imageFiles.length > 0) {
        const storage = getStorage();
        const driver = (process.env.STORAGE_DRIVER === 's3' ? 's3' : 'local') as 'local' | 's3';

        for (const file of imageFiles) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const hash = crypto.createHash('sha256').update(buffer).digest('hex');
          const ext = file.name.split('.').pop() || 'jpg';
          const storageKey = `products/${slug}/${Date.now()}-${hash.slice(0, 8)}.${ext}`;

          await storage.put(storageKey, buffer, {
            contentType: file.type || 'image/jpeg',
            cacheControl: 'public, max-age=31536000, immutable',
          });

          const mediaAsset = await prisma.mediaAsset.create({
            data: {
              storageKey,
              provider: driver,
              mimeType: file.type || 'image/jpeg',
              bytes: buffer.length,
              width: 800,
              height: 800,
              sha256: hash,
              altText: name,
            },
          });
          mediaAssetIds.push(mediaAsset.id);
        }
      }
    }

    // ── Compute priceFromPaise (lowest variant price in paise: ₹1 = 100 paise) ──
    let priceFromPaise: number | null = null;
    for (const v of payload.variants) {
      const rupees = parseFloat(v.pricePaise);
      const price = !isNaN(rupees) && v.pricePaise.trim() !== '' ? Math.round(rupees * 100) : null;
      if (price != null && (priceFromPaise == null || price < priceFromPaise)) {
        priceFromPaise = price;
      }
    }

    // ── Build search text ──
    const searchText = [
      name,
      payload.shortDescription,
      desc,
      category.name,
      payload.foodType,
      payload.productType,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    // ── Create product with variants in a transaction ──
    const product = await prisma.$transaction(async (tx) => {
      const prod = await tx.product.create({
        data: {
          name,
          nameKey: nameKey(name),
          slug,
          shortDescription: payload.shortDescription?.trim() || null,
          description: desc,
          productType: payload.productType,
          foodType: payload.foodType,
          categoryId: category.id,
          isAvailable: payload.isAvailable,
          isFeatured: false,
          priceFromPaise,
          searchText,
        },
      });

      // Create variants (store in paise)
      for (let i = 0; i < payload.variants.length; i++) {
        const v = payload.variants[i];
        const qtyValue = parseFloat(v.quantityValue) || 0;
        const rupees = parseFloat(v.pricePaise);
        const pricePaise = !isNaN(rupees) && v.pricePaise.trim() !== '' ? Math.round(rupees * 100) : null;

        await tx.productVariant.create({
          data: {
            productId: prod.id,
            unitType: mapUnit(v.unit),
            unit: v.unit || 'g',
            quantityValue: qtyValue,
            displayLabel: v.displayLabel || `${qtyValue} ${v.unit}`,
            pricePaise,
            isAvailable: v.isAvailable,
            sortOrder: i,
          },
        });
      }

      // Create product images
      for (let i = 0; i < mediaAssetIds.length; i++) {
        await tx.productImage.create({
          data: {
            productId: prod.id,
            mediaId: mediaAssetIds[i],
            position: i,
          },
        });
      }

      // Create festival links
      if (payload.productType === 'FESTIVE' && payload.festivalIds.length > 0) {
        for (const festivalId of payload.festivalIds) {
          const festivalExists = await tx.festival.findUnique({
            where: { id: festivalId },
          });
          if (festivalExists) {
            await tx.productFestival.create({
              data: {
                productId: prod.id,
                festivalId,
              },
            });
          }
        }
      }

      return prod;
    });

    // ── Revalidate cached pages ──
    revalidatePath('/products');
    revalidatePath('/admin/products');
    revalidatePath('/');
    revalidatePath(`/products/${slug}`);

    return { success: true, productId: product.id };
  } catch (err: any) {
    console.error('Failed to create product:', err);
    return {
      success: false,
      error: err.message || 'Failed to create product. Please try again.',
    };
  }
}

/* ─── Update Product ──────────────────────────────────── */

export async function updateProductAction(
  productId: string,
  payload: CreateProductPayload,
  formData?: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    const existing = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });
    if (!existing) {
      return { success: false, error: 'Product not found.' };
    }

    const name = payload.name.trim();
    if (name.length < 2 || name.length > 120) {
      return { success: false, error: 'Product name must be 2–120 characters.' };
    }
    const desc = payload.description.trim();
    if (desc.length < 10) {
      return { success: false, error: 'Description must be at least 10 characters.' };
    }

    let category = await prisma.category.findUnique({
      where: { id: payload.categoryId },
    });
    if (!category) {
      category = await prisma.category.findFirst({ where: { isActive: true } });
    }
    if (!category) {
      return { success: false, error: 'Category not found.' };
    }

    // ── Compute lowest price in paise ──
    let priceFromPaise: number | null = null;
    for (const v of payload.variants) {
      const rupees = parseFloat(v.pricePaise);
      const price = !isNaN(rupees) && v.pricePaise.trim() !== '' ? Math.round(rupees * 100) : null;
      if (price != null && (priceFromPaise == null || price < priceFromPaise)) {
        priceFromPaise = price;
      }
    }

    // ── Handle new image uploads if any ──
    const mediaAssetIds: string[] = [];
    if (formData) {
      const imageFiles: File[] = [];
      const img1 = formData.get('image_0');
      const img2 = formData.get('image_1');
      if (img1 && typeof (img1 as any).arrayBuffer === 'function' && (img1 as File).size > 0) {
        imageFiles.push(img1 as File);
      }
      if (img2 && typeof (img2 as any).arrayBuffer === 'function' && (img2 as File).size > 0) {
        imageFiles.push(img2 as File);
      }

      if (imageFiles.length > 0) {
        const storage = getStorage();
        const driver = (process.env.STORAGE_DRIVER === 's3' ? 's3' : 'local') as 'local' | 's3';

        for (const file of imageFiles) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const hash = crypto.createHash('sha256').update(buffer).digest('hex');
          const ext = file.name.split('.').pop() || 'jpg';
          const storageKey = `products/${existing.slug}/${Date.now()}-${hash.slice(0, 8)}.${ext}`;

          await storage.put(storageKey, buffer, {
            contentType: file.type || 'image/jpeg',
            cacheControl: 'public, max-age=31536000, immutable',
          });

          const mediaAsset = await prisma.mediaAsset.create({
            data: {
              storageKey,
              provider: driver,
              mimeType: file.type || 'image/jpeg',
              bytes: buffer.length,
              width: 800,
              height: 800,
              sha256: hash,
              altText: name,
            },
          });
          mediaAssetIds.push(mediaAsset.id);
        }
      }
    }

    const searchText = [
      name,
      payload.shortDescription,
      desc,
      category.name,
      payload.foodType,
      payload.productType,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: productId },
        data: {
          name,
          nameKey: nameKey(name),
          shortDescription: payload.shortDescription?.trim() || null,
          description: desc,
          productType: payload.productType,
          foodType: payload.foodType,
          categoryId: category.id,
          isAvailable: payload.isAvailable,
          priceFromPaise,
          searchText,
        },
      });

      // Recreate variants
      await tx.productVariant.deleteMany({ where: { productId } });
      for (let i = 0; i < payload.variants.length; i++) {
        const v = payload.variants[i];
        const qtyValue = parseFloat(v.quantityValue) || 0;
        const rupees = parseFloat(v.pricePaise);
        const pricePaise = !isNaN(rupees) && v.pricePaise.trim() !== '' ? Math.round(rupees * 100) : null;

        await tx.productVariant.create({
          data: {
            productId,
            unitType: mapUnit(v.unit),
            unit: v.unit || 'g',
            quantityValue: qtyValue,
            displayLabel: v.displayLabel || `${qtyValue} ${v.unit}`,
            pricePaise,
            isAvailable: v.isAvailable,
            sortOrder: i,
          },
        });
      }

      // Append new images if uploaded
      if (mediaAssetIds.length > 0) {
        await tx.productImage.deleteMany({ where: { productId } });
        for (let i = 0; i < mediaAssetIds.length; i++) {
          await tx.productImage.create({
            data: {
              productId,
              mediaId: mediaAssetIds[i],
              position: i,
            },
          });
        }
      }

      // Update festivals
      await tx.productFestival.deleteMany({ where: { productId } });
      if (payload.productType === 'FESTIVE' && payload.festivalIds.length > 0) {
        for (const festivalId of payload.festivalIds) {
          await tx.productFestival.create({
            data: { productId, festivalId },
          });
        }
      }
    });

    revalidatePath('/products');
    revalidatePath('/admin/products');
    revalidatePath('/');
    revalidatePath(`/products/${existing.slug}`);

    return { success: true };
  } catch (err: any) {
    console.error('Failed to update product:', err);
    return {
      success: false,
      error: err.message || 'Failed to update product.',
    };
  }
}

/* ─── Delete Product (soft-delete) ────────────────────── */

export async function deleteProductAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return { success: false, error: 'Product not found.' };
    }

    await prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    revalidatePath('/products');
    revalidatePath('/admin/products');
    revalidatePath('/');
    if (product.slug) {
      revalidatePath(`/products/${product.slug}`);
    }

    return { success: true };
  } catch (err: any) {
    console.error('Failed to delete product:', err);
    return {
      success: false,
      error: err.message || 'Failed to delete product.',
    };
  }
}

/* ─── Toggle Product Availability ─────────────────────── */

export async function toggleProductAvailabilityAction(
  id: string,
  isAvailable: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    const product = await prisma.product.update({
      where: { id },
      data: { isAvailable },
    });

    revalidatePath('/products');
    revalidatePath('/admin/products');
    revalidatePath('/');
    if (product.slug) {
      revalidatePath(`/products/${product.slug}`);
    }

    return { success: true };
  } catch (err: any) {
    console.error('Failed to update product availability:', err);
    return {
      success: false,
      error: err.message || 'Failed to update availability.',
    };
  }
}

/* ─── Fetch categories and festivals for the form ─────── */

export async function getFormDataAction(): Promise<{
  categories: { id: string; name: string }[];
  festivals: { id: string; name: string }[];
}> {
  try {
    await requireAuth();

    const [categories, festivals] = await Promise.all([
      prisma.category.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        select: { id: true, name: true },
      }),
      prisma.festival.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        select: { id: true, name: true },
      }),
    ]);

    return {
      categories: categories.length > 0 ? categories : DEFAULT_CATEGORIES,
      festivals: festivals.length > 0 ? festivals : DEFAULT_FESTIVALS,
    };
  } catch (err: any) {
    console.warn('Database not reachable for getFormDataAction, using fallback options:', err?.message);
    return {
      categories: DEFAULT_CATEGORIES,
      festivals: DEFAULT_FESTIVALS,
    };
  }
}
