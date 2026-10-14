'use server';

import { prisma } from '@/server/db';
import { requireAuth } from '@/features/auth/actions';
import { revalidatePath } from 'next/cache';

export async function createCategoryAction(name: string, description?: string): Promise<{ success: boolean; category?: any; error?: string }> {
  try {
    await requireAuth();

    const cleanName = name.trim();
    if (cleanName.length < 2 || cleanName.length > 60) {
      return { success: false, error: 'Name must be 2–60 characters.' };
    }

    const cleanNameKey = cleanName.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const existing = await prisma.category.findFirst({
      where: {
        OR: [{ slug }, { nameKey: cleanNameKey }],
      },
    });

    if (existing) {
      return { success: false, error: `A category with this name or slug already exists ("${existing.name}").` };
    }

    const maxSort = await prisma.category.aggregate({
      _max: { sortOrder: true },
    });
    const sortOrder = (maxSort._max.sortOrder ?? 0) + 1;

    const category = await prisma.category.create({
      data: {
        name: cleanName,
        nameKey: cleanNameKey,
        slug,
        description: description?.trim() || null,
        isActive: true,
        sortOrder,
      },
    });

    revalidatePath('/products');
    revalidatePath('/admin/categories');
    revalidatePath('/');

    return { success: true, category };
  } catch (err: any) {
    console.error('Failed to create category:', err);
    return { success: false, error: err.message || 'Failed to create category.' };
  }
}

export async function updateCategoryAction(
  id: string,
  name: string,
  description?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    const cleanName = name.trim();
    if (cleanName.length < 2 || cleanName.length > 60) {
      return { success: false, error: 'Name must be 2–60 characters.' };
    }

    const cleanNameKey = cleanName.toLowerCase().replace(/[^\w\s]/g, '').trim();

    await prisma.category.update({
      where: { id },
      data: {
        name: cleanName,
        nameKey: cleanNameKey,
        description: description?.trim() || null,
      },
    });

    revalidatePath('/products');
    revalidatePath('/admin/categories');
    revalidatePath('/');

    return { success: true };
  } catch (err: any) {
    console.error('Failed to update category:', err);
    return { success: false, error: err.message || 'Failed to update category.' };
  }
}

export async function deleteCategoryAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    // Check if category has products
    const productCount = await prisma.product.count({
      where: { categoryId: id, deletedAt: null },
    });

    if (productCount > 0) {
      return {
        success: false,
        error: `Cannot delete category: it is assigned to ${productCount} active product(s). Move or delete those products first.`,
      };
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath('/products');
    revalidatePath('/admin/categories');
    revalidatePath('/');

    return { success: true };
  } catch (err: any) {
    console.error('Failed to delete category:', err);
    return { success: false, error: err.message || 'Failed to delete category.' };
  }
}
