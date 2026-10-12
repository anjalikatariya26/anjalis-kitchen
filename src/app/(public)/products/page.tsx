/**
 * Public Menu/Products page — Browse all available products.
 * Per spec: Category filter chips, search, Jain toggle, product cards.
 */
import type { Metadata } from 'next';
import { ProductCatalogue } from '@/components/catalogue/ProductCatalogue';

export const metadata: Metadata = {
  title: "Menu — Anjali's Kitchen",
  description: 'Browse our full menu of homemade Maharashtrian sweets, snacks, chivda, laddu, chikki, and more.',
};

export default function ProductsPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Page hero */}
      <section
        className="py-10"
        style={{
          background: 'linear-gradient(180deg, var(--color-primary-light) 0%, var(--color-bg) 100%)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="mx-auto px-4 text-center" style={{ maxWidth: 'var(--content-max-width)' }}>
          <h1
            className="font-bold"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              color: 'var(--color-primary)',
            }}
          >
            Our Menu
          </h1>
          <p className="mt-2" style={{ color: 'var(--color-muted)', fontSize: 'var(--text-base)' }}>
            Fresh, homemade Maharashtrian delicacies. Order 3–4 days in advance.
          </p>
        </div>
      </section>

      {/* Catalogue */}
      <section className="py-8">
        <div className="mx-auto px-4" style={{ maxWidth: 'var(--content-max-width)' }}>
          <ProductCatalogue />
        </div>
      </section>
    </div>
  );
}
