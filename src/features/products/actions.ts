'use server';

import { prisma } from '@/server/db';
import { requireAuth } from '@/features/auth/actions';
import { revalidatePath } from 'next/cache';

export async function deleteProductAction(id: string): Promise<{ success: boolean; error?: string }> {
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
    return { success: false, error: err.message || 'Failed to delete product.' };
  }
}

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
    return { success: false, error: err.message || 'Failed to update availability.' };
  }
}
