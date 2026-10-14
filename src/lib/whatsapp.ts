/**
 * WhatsApp URL builder — Part K1
 *
 * All WhatsApp enquiries use the wa.me deep link with pre-filled messages.
 * The phone number comes from business_profile or the env fallback.
 */

export interface WhatsAppEnquiryParams {
  /** Phone number with country code, digits only (e.g. "919970599900") */
  phoneNumber: string;
  /** Product or hamper name */
  itemName: string;
  /** Selected variant label (e.g. "500 g") */
  variantLabel?: string;
  /** Formatted price (e.g. "₹225") */
  price?: string;
  /** Whether the item is currently unavailable */
  isUnavailable?: boolean;
  /** Whether this is a hamper enquiry */
  isHamper?: boolean;
}

/**
 * Build a WhatsApp enquiry URL with a pre-filled message.
 *
 * @example
 * whatsappUrl({
 *   phoneNumber: "919970599900",
 *   itemName: "Besan Laddu",
 *   variantLabel: "500 g",
 * })
 * // "https://wa.me/919970599900?text=Hello%20Anjali's%20Kitchen..."
 */
export function whatsappUrl(params: WhatsAppEnquiryParams): string {
  const { phoneNumber, itemName, variantLabel, price, isUnavailable, isHamper } = params;

  let message: string;

  if (isUnavailable) {
    message = `Hello Anjali's Kitchen, please let me know when ${itemName} is available again.`;
  } else if (isHamper) {
    const priceText = price ? ` (${price})` : '';
    message = `Hello Anjali's Kitchen, I am interested in the ${itemName}${priceText}. Please share details.`;
  } else {
    const sizeText = variantLabel ? ` (${variantLabel})` : '';
    message = `Hello Anjali's Kitchen, I am interested in ${itemName}${sizeText}. Is it available?`;
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}

/**
 * Build a tel: link for calling.
 *
 * @example
 * telUrl("919970599900") // "tel:+919970599900"
 */
export function telUrl(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/[^\d]/g, '');
  return `tel:+${cleaned}`;
}

/**
 * Format a phone number for display.
 *
 * @example
 * formatPhone("919970599900") // "+91 99705 99900"
 */
export function formatPhone(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/[^\d]/g, '');

  // Indian number: +91 XXXXX XXXXX
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }

  return `+${cleaned}`;
}

export const DEFAULT_STORE_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919970599900';

export function generateWhatsAppLink({
  text,
  phoneNumber = DEFAULT_STORE_PHONE,
}: {
  text: string;
  phoneNumber?: string;
}): string {
  const cleanPhone = (phoneNumber || DEFAULT_STORE_PHONE).replace(/[^\d]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function generateProductOrderLink({
  productName,
  variantLabel,
  quantity,
  totalPricePaise,
  phoneNumber = DEFAULT_STORE_PHONE,
}: {
  productName: string;
  variantLabel?: string;
  quantity: number;
  totalPricePaise: number;
  phoneNumber?: string;
}): string {
  const priceRupees = (totalPricePaise / 100).toFixed(2).replace(/\.00$/, '');
  const sizeStr = variantLabel ? ` (${variantLabel})` : '';
  const message = `Hello Anjali's Kitchen! I would like to place an order enquiry:\n- Item: ${productName}${sizeStr}\n- Quantity: ${quantity}\n- Est. Total: ₹${priceRupees}\n\nPlease confirm product availability, earliest delivery/pickup slot, and final details.`;
  return generateWhatsAppLink({ text: message, phoneNumber });
}

