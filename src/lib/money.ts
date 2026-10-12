/**
 * Money utilities — Part C2
 *
 * All money is stored as integer paise (₹1 = 100 paise).
 * No floats, no rounding errors.
 */

/**
 * Format paise as a rupee string with the ₹ symbol.
 *
 * @example
 * formatPrice(45000)  // "₹450"
 * formatPrice(22500)  // "₹225"
 * formatPrice(65000)  // "₹650"
 * formatPrice(150)    // "₹1.50"
 * formatPrice(0)      // "₹0"
 * formatPrice(null)   // "Price on enquiry"
 */
export function formatPrice(paise: number | null | undefined): string {
  if (paise == null) {
    return 'Price on enquiry';
  }

  const rupees = paise / 100;

  // Use Intl for Indian locale formatting
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: rupees % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(rupees);
}

export const formatMoney = formatPrice;


/**
 * Format a price range (used on product cards showing "From ₹X / unit").
 *
 * @example
 * formatPriceFrom(22500, "kg")  // "From ₹225 / kg"
 * formatPriceFrom(null, "kg")   // "Price on enquiry"
 */
export function formatPriceFrom(
  paise: number | null | undefined,
  unit?: string
): string {
  if (paise == null) {
    return 'Price on enquiry';
  }

  const formatted = formatPrice(paise);
  return unit ? `From ${formatted} / ${unit}` : `From ${formatted}`;
}

/**
 * Convert rupees to paise.
 *
 * @example
 * rupeesToPaise(450)   // 45000
 * rupeesToPaise(1.50)  // 150
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/**
 * Convert paise to rupees.
 *
 * @example
 * paiseToRupees(45000) // 450
 * paiseToRupees(150)   // 1.5
 */
export function paiseToRupees(paise: number): number {
  return paise / 100;
}

/**
 * Calculate proportional prices from a rate-per-kg.
 * Used by the variant form's "Rate per kg" helper (C2).
 *
 * @example
 * proportionalPrices(45000, [250, 500, 1000])
 * // [{ grams: 250, paise: 11250 }, { grams: 500, paise: 22500 }, { grams: 1000, paise: 45000 }]
 */
export function proportionalPrices(
  ratePerKgPaise: number,
  gramsArray: number[]
): { grams: number; paise: number }[] {
  return gramsArray.map((grams) => ({
    grams,
    paise: Math.round((ratePerKgPaise * grams) / 1000),
  }));
}

/**
 * Validate that compare-at price is greater than the price.
 */
export function isValidCompareAtPrice(
  pricePaise: number | null,
  compareAtPaise: number | null
): boolean {
  if (compareAtPaise == null) return true;
  if (pricePaise == null) return false;
  return compareAtPaise > pricePaise;
}
