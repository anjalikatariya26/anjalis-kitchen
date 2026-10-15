'use server';

import { prisma } from '@/server/db';
import { requireAuth } from '@/features/auth/actions';
import { revalidatePath } from 'next/cache';

export async function createFestivalAction(
  name: string,
  description?: string
): Promise<{ success: boolean; festival?: unknown; error?: string }> {
  try {
    await requireAuth();

    const cleanName = name.trim();
    if (cleanName.length < 2 || cleanName.length > 80) {
      return { success: false, error: 'Festival name must be 2–80 characters.' };
    }

    const cleanNameKey = cleanName.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const slug = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = await prisma.festival.findFirst({
      where: {
        OR: [{ slug }, { nameKey: cleanNameKey }],
      },
    });

    if (existing) {
      return { success: false, error: `A festival with this name or slug already exists ("${existing.name}").` };
    }

    const maxSort = await prisma.festival.aggregate({
      _max: { sortOrder: true },
    });
    const sortOrder = (maxSort._max.sortOrder ?? 0) + 1;

    const festival = await prisma.festival.create({
      data: {
        name: cleanName,
        nameKey: cleanNameKey,
        slug,
        description: description?.trim() || null,
        isActive: true,
        sortOrder,
      },
    });

    revalidatePath('/admin/festivals');
    revalidatePath('/festivals');
    revalidatePath('/products');
    revalidatePath('/');

    return { success: true, festival };
  } catch (err: unknown) {
    console.error('Failed to create festival:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to create festival.',
    };
  }
}

export async function updateFestivalAction(
  id: string,
  name: string,
  description?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    const cleanName = name.trim();
    if (cleanName.length < 2 || cleanName.length > 80) {
      return { success: false, error: 'Festival name must be 2–80 characters.' };
    }

    const cleanNameKey = cleanName.toLowerCase().replace(/[^\w\s]/g, '').trim();

    await prisma.festival.update({
      where: { id },
      data: {
        name: cleanName,
        nameKey: cleanNameKey,
        description: description?.trim() || null,
      },
    });

    revalidatePath('/admin/festivals');
    revalidatePath('/festivals');
    revalidatePath('/products');
    revalidatePath('/');

    return { success: true };
  } catch (err: unknown) {
    console.error('Failed to update festival:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to update festival.',
    };
  }
}

export async function toggleFestivalAction(
  id: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    await prisma.festival.update({
      where: { id },
      data: { isActive },
    });

    revalidatePath('/admin/festivals');
    revalidatePath('/festivals');
    revalidatePath('/products');
    revalidatePath('/');

    return { success: true };
  } catch (err: unknown) {
    console.error('Failed to toggle festival status:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to toggle festival status.',
    };
  }
}

export async function deleteFestivalAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    // Check if festival has linked products
    const productCount = await prisma.productFestival.count({
      where: { festivalId: id },
    });
    if (productCount > 0) {
      return {
        success: false,
        error: `Cannot delete festival: it is assigned to ${productCount} product(s). Remove those associations first.`,
      };
    }

    await prisma.festival.delete({
      where: { id },
    });

    revalidatePath('/admin/festivals');
    revalidatePath('/festivals');
    revalidatePath('/products');
    revalidatePath('/');

    return { success: true };
  } catch (err: unknown) {
    console.error('Failed to delete festival:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to delete festival.',
    };
  }
}
