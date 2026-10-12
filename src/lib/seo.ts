/**
 * SEO helpers — Part K2
 *
 * Generates metadata objects for Next.js page components.
 */
import type { Metadata } from 'next';

const SITE_NAME = "Anjali's Kitchen";
const SITE_TAGLINE = 'Ghar Ka Swaad';
const DEFAULT_DESCRIPTION =
  "Homemade Maharashtrian sweets, snacks, festival faral and Jain-friendly fresh food. Made fresh to order in Ahilyanagar.";

interface PageSeoParams {
  title: string;
  description?: string;
  path: string;
  image?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
}

/**
 * Generate a Next.js Metadata object for a page.
 *
 * @example
 * export const metadata = pageSeo({
 *   title: "Besan Laddu — Diwali",
 *   description: "Pure ghee besan laddu...",
 *   path: "/products/besan-laddu",
 * });
 */
export function pageSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image,
  noindex = false,
  type = 'website',
}: PageSeoParams): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = path.startsWith('/') ? path : `/${path}`;

  return {
    title: fullTitle,
    description,
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      ...(image && {
        images: [{ url: image, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(image && { images: [image] }),
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate JSON-LD structured data for a LocalBusiness.
 */
export function localBusinessJsonLd(profile: {
  name: string;
  description: string;
  phone: string;
  address: string;
  city: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': profile.url,
    name: profile.name,
    description: profile.description,
    telephone: profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.city,
      streetAddress: profile.address,
      addressCountry: 'IN',
    },
    url: profile.url,
    ...(profile.image && { image: profile.image }),
  };
}

/**
 * Generate JSON-LD for a Product (only when price exists).
 */
export function productJsonLd(product: {
  name: string;
  description: string;
  url: string;
  image: string;
  pricePaise?: number | null;
  availability: boolean;
  category: string;
}) {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: product.url,
    image: product.image,
    category: product.category,
  };

  // Only add Offer when a price exists (Google requires it)
  if (product.pricePaise != null) {
    return {
      ...base,
      offers: {
        '@type': 'Offer',
        price: (product.pricePaise / 100).toFixed(2),
        priceCurrency: 'INR',
        availability: product.availability
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      },
    };
  }

  return base;
}

export { SITE_NAME, SITE_TAGLINE, DEFAULT_DESCRIPTION };
