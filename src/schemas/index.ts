/**
 * Zod Validation Schemas — Part F7
 *
 * Shared by client forms and server API handlers.
 * One schema per payload; forms and API cannot drift.
 */
import { z } from 'zod';

// ─── Variant Schema ─────────────────────────────────────

export const variantSchema = z
  .object({
    id: z.string().uuid().optional(),
    unitType: z.enum(['WEIGHT', 'PIECE', 'PACK', 'VOLUME', 'CUSTOM']),
    unit: z.enum(['g', 'kg', 'piece', 'box', 'ml', 'l', 'custom']),
    quantityValue: z.number().positive().max(100000),
    displayLabel: z.string().trim().min(1).max(40),
    pricePaise: z.number().int().min(0).max(100_000_000).nullable(),
    compareAtPricePaise: z.number().int().min(0).max(100_000_000).nullable().optional(),
    isAvailable: z.boolean().default(true),
    sku: z.string().trim().max(40).nullable().optional(),
    sortOrder: z.number().int().min(0).default(0),
  })
  .strict()
  .refine(
    (v) =>
      v.compareAtPricePaise == null ||
      (v.pricePaise != null && v.compareAtPricePaise > v.pricePaise),
    {
      message: 'Compare-at price must be higher than the price',
      path: ['compareAtPricePaise'],
    }
  );

export type VariantInput = z.infer<typeof variantSchema>;

// ─── Product Schema ─────────────────────────────────────

export const productSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    shortDescription: z.string().trim().max(160).nullable().optional(),
    description: z.string().trim().min(10).max(2000),
    productType: z.enum(['FESTIVE', 'REGULAR']),
    foodType: z.enum(['JAIN', 'REGULAR']),
    categoryId: z.string().uuid(),
    festivalIds: z.array(z.string().uuid()).max(10).default([]),
    variants: z.array(variantSchema).min(1).max(12),
    imageIds: z.array(z.string().uuid()).min(1).max(2),
    isAvailable: z.boolean().default(true),
  })
  .strict()
  .superRefine((p, ctx) => {
    if (p.productType === 'FESTIVE' && p.festivalIds.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['festivalIds'],
        message: 'Choose at least one festival',
      });
    }
    if (p.productType === 'REGULAR' && p.festivalIds.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['festivalIds'],
        message: 'Regular products have no festival',
      });
    }
  });

export type ProductInput = z.infer<typeof productSchema>;

// ─── Category Schema ────────────────────────────────────

export const categorySchema = z
  .object({
    name: z.string().trim().min(2).max(60),
    description: z.string().trim().max(500).nullable().optional(),
    sortOrder: z.number().int().min(0).optional(),
  })
  .strict();

export type CategoryInput = z.infer<typeof categorySchema>;

export const categoryUpdateSchema = z
  .object({
    name: z.string().trim().min(2).max(60).optional(),
    description: z.string().trim().max(500).nullable().optional(),
    isActive: z.boolean().optional(),
    sortOrder: z.number().int().min(0).optional(),
  })
  .strict();

export type CategoryUpdateInput = z.infer<typeof categoryUpdateSchema>;

// ─── Festival Schema ────────────────────────────────────

export const festivalSchema = z
  .object({
    name: z.string().trim().min(2).max(60),
    description: z.string().trim().max(1000).nullable().optional(),
    sortOrder: z.number().int().min(0).optional(),
    seoTitle: z.string().trim().max(120).nullable().optional(),
    seoDescription: z.string().trim().max(300).nullable().optional(),
    startsOn: z.string().date().nullable().optional(),
    endsOn: z.string().date().nullable().optional(),
  })
  .strict();

export type FestivalInput = z.infer<typeof festivalSchema>;

export const festivalUpdateSchema = z
  .object({
    name: z.string().trim().min(2).max(60).optional(),
    description: z.string().trim().max(1000).nullable().optional(),
    isActive: z.boolean().optional(),
    sortOrder: z.number().int().min(0).optional(),
    seoTitle: z.string().trim().max(120).nullable().optional(),
    seoDescription: z.string().trim().max(300).nullable().optional(),
    startsOn: z.string().date().nullable().optional(),
    endsOn: z.string().date().nullable().optional(),
  })
  .strict();

export type FestivalUpdateInput = z.infer<typeof festivalUpdateSchema>;

// ─── Hamper Schema ──────────────────────────────────────

export const hamperItemSchema = z.object({
  variantId: z.string().uuid(),
  quantity: z.number().int().min(1).max(20).default(1),
});

export const hamperSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    festivalId: z.string().uuid(),
    description: z.string().trim().max(2000).nullable().optional(),
    pricePaise: z.number().int().min(0).max(100_000_000),
    isAvailable: z.boolean().default(true),
    imageIds: z.array(z.string().uuid()).min(1).max(2),
    items: z.array(hamperItemSchema).min(1).max(30),
  })
  .strict();

export type HamperInput = z.infer<typeof hamperSchema>;

// ─── Auth Schema ────────────────────────────────────────

export const loginSchema = z
  .object({
    email: z.string().email().max(255),
    password: z.string().min(1).max(200),
  })
  .strict();

export type LoginInput = z.infer<typeof loginSchema>;

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1).max(200),
    newPassword: z.string().min(12).max(200),
  })
  .strict();

export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;

// ─── Query Schemas ──────────────────────────────────────

export const productQuerySchema = z.object({
  search: z.string().trim().min(1).max(60).optional(),
  category: z.union([z.string(), z.array(z.string())]).optional(),
  festival: z.union([z.string(), z.array(z.string())]).optional(),
  type: z.enum(['festive', 'regular']).optional(),
  foodType: z.enum(['jain', 'regular']).optional(),
  available: z.enum(['true', 'false']).optional(),
  sort: z
    .enum(['recommended', 'newest', 'name', 'priceAsc', 'priceDesc', 'updated'])
    .default('recommended'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(24),
});

export type ProductQuery = z.infer<typeof productQuerySchema>;

// ─── Availability Schema ────────────────────────────────

export const availabilityToggleSchema = z
  .object({
    isAvailable: z.boolean(),
    variantId: z.string().uuid().optional(),
  })
  .strict();

export const bulkAvailabilitySchema = z
  .object({
    ids: z.array(z.string().uuid()).min(1).max(100),
    isAvailable: z.boolean(),
  })
  .strict();

// ─── Business Profile Schema ────────────────────────────

export const businessProfileSchema = z
  .object({
    displayName: z.string().trim().min(1).max(100).optional(),
    tagline: z.string().trim().max(200).optional(),
    phone: z.string().trim().max(20).optional(),
    whatsappNumber: z.string().trim().max(20).optional(),
    addressLine1: z.string().trim().max(200).optional(),
    addressLine2: z.string().trim().max(200).nullable().optional(),
    city: z.string().trim().max(100).optional(),
    mapUrl: z.string().url().max(500).nullable().optional(),
    hours: z.record(z.string(), z.string()).nullable().optional(),
    instagramUrl: z.string().url().max(200).nullable().optional(),
    fssaiNumber: z.string().trim().max(20).nullable().optional(),
    leadTimeText: z.string().trim().max(200).optional(),
  })
  .strict();

export type BusinessProfileInput = z.infer<typeof businessProfileSchema>;
