/**
 * Slug utilities — URL-safe identifiers from names.
 *
 * Slugs are globally unique, lowercase, hyphen-separated.
 * Generated from the product/category/festival name.
 */

/**
 * Generate a URL-safe slug from a string.
 *
 * @example
 * slugify("Besan Laddu")       // "besan-laddu"
 * slugify("Diwali Faral Gift Hamper") // "diwali-faral-gift-hamper"
 * slugify("  Chawal  Laddu  ") // "chawal-laddu"
 * slugify("Ukadiche (Steamed) Modak") // "ukadiche-steamed-modak"
 */
export function slugify(text: string): string {
  return text
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '') // strip non-letter/number/space/hyphen
    .replace(/\s+/g, '-')              // spaces to hyphens
    .replace(/-+/g, '-')               // collapse multiple hyphens
    .replace(/^-|-$/g, '');            // trim leading/trailing hyphens
}

/**
 * Generate a unique slug by appending a numeric suffix if needed.
 *
 * @param base    - The raw text to slugify
 * @param exists  - A function that returns true if the slug is already taken
 * @returns       A slug guaranteed to not collide
 *
 * @example
 * await uniqueSlug("Besan Laddu", async (s) => s === "besan-laddu")
 * // "besan-laddu-2"
 */
export async function uniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>
): Promise<string> {
  const slug = slugify(base);

  if (!(await exists(slug))) {
    return slug;
  }

  // Try numeric suffixes
  for (let i = 2; i <= 100; i++) {
    const candidate = `${slug}-${i}`;
    if (!(await exists(candidate))) {
      return candidate;
    }
  }

  // Extremely unlikely: fall back to a random suffix
  const random = Math.random().toString(36).substring(2, 8);
  return `${slug}-${random}`;
}
