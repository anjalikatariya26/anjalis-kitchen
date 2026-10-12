'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search, Package, Eye, Pencil, Trash2, Plus } from 'lucide-react';

/* ─── Types ──────────────────────────────────────────── */

interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  productType: 'FESTIVE' | 'REGULAR';
  foodType: 'JAIN' | 'REGULAR';
  categoryName: string;
  festivals: string[];
  variantCount: number;
  isAvailable: boolean;
  priceLabel: string;
  createdAt: string;
}

/* ─── Sample data ────────────────────────────────────── */

const sampleProducts: ProductListItem[] = [];

/* ─── ProductList ────────────────────────────────────── */

export function ProductList() {
  const [products] = useState<ProductListItem[]>(sampleProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterFood, setFilterFood] = useState<string>('all');
  const [filterAvailable, setFilterAvailable] = useState<string>('all');

  const filtered = products.filter((p) => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterType !== 'all' && p.productType.toLowerCase() !== filterType) return false;
    if (filterFood !== 'all' && p.foodType.toLowerCase() !== filterFood) return false;
    if (filterAvailable === 'true' && !p.isAvailable) return false;
    if (filterAvailable === 'false' && p.isAvailable) return false;
    return true;
  });

  return (
    <>
      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-search">
          <Input
            label=""
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
        <div className="toolbar-filters">
          <select
            className="field-input"
            style={{ height: '36px', width: 'auto', fontSize: 'var(--text-sm)', padding: '0 var(--space-3)' }}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All types</option>
            <option value="festive">Festive</option>
            <option value="regular">Regular</option>
          </select>
          <select
            className="field-input"
            style={{ height: '36px', width: 'auto', fontSize: 'var(--text-sm)', padding: '0 var(--space-3)' }}
            value={filterFood}
            onChange={(e) => setFilterFood(e.target.value)}
          >
            <option value="all">All food types</option>
            <option value="jain">Jain</option>
            <option value="regular">Regular</option>
          </select>
          <select
            className="field-input"
            style={{ height: '36px', width: 'auto', fontSize: 'var(--text-sm)', padding: '0 var(--space-3)' }}
            value={filterAvailable}
            onChange={(e) => setFilterAvailable(e.target.value)}
          >
            <option value="all">All status</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>
      </div>

      {/* Products table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Package size={48} strokeWidth={1.5} />}
          title={searchQuery || filterType !== 'all' ? 'No matching products' : 'No products yet'}
          description={
            searchQuery
              ? 'Try a different search term or adjust your filters.'
              : 'Add your first product to get started.'
          }
          action={
            !searchQuery && filterType === 'all'
              ? { label: 'Add Product', href: '/admin/products/new' }
              : undefined
          }
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Type</th>
                <th>Sizes</th>
                <th>Price</th>
                <th>Available</th>
                <th style={{ width: '140px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-lg"
                        style={{
                          width: '40px',
                          height: '40px',
                          background: 'var(--color-surface-2)',
                          color: 'var(--color-muted)',
                        }}
                      >
                        <Package size={18} />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          {product.foodType === 'JAIN' && <Badge variant="jain">Jain</Badge>}
                          {product.festivals.map((f) => (
                            <Badge key={f} variant="festive">{f}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.categoryName}</td>
                  <td>
                    <Badge variant={product.productType === 'FESTIVE' ? 'festive' : 'default'}>
                      {product.productType === 'FESTIVE' ? 'Festive' : 'Regular'}
                    </Badge>
                  </td>
                  <td>{product.variantCount}</td>
                  <td>{product.priceLabel}</td>
                  <td>
                    <Badge variant={product.isAvailable ? 'available' : 'unavailable'} dot>
                      {product.isAvailable ? 'Available' : 'Unavailable'}
                    </Badge>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Button variant="ghost" size="sm" href={`/products/${product.slug}`}>
                        <Eye size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" href={`/admin/products/${product.id}/edit`}>
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 size={14} style={{ color: 'var(--color-error)' }} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
