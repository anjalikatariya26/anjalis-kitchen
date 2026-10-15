'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';
import { Search, ToggleRight, CheckSquare, Package } from 'lucide-react';

import {
  toggleProductAvailabilityAction,
  toggleVariantAvailabilityAction,
  bulkToggleAvailabilityAction,
} from '@/features/products/actions';

/* ─── Types ──────────────────────────────────────────── */

interface AvailabilityItem {
  id: string;
  name: string;
  categoryName: string;
  foodType: 'JAIN' | 'REGULAR';
  productType: 'FESTIVE' | 'REGULAR';
  isAvailable: boolean;
  variants: { id: string; label: string; isAvailable: boolean }[];
}

interface AvailabilityManagerProps {
  initialItems?: AvailabilityItem[];
}

export function AvailabilityManager({ initialItems = [] }: AvailabilityManagerProps) {
  const { toast } = useToast();
  const [items, setItems] = useState<AvailabilityItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'unavailable' | 'festive'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = items.filter((item) => {
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterTab === 'unavailable' && item.isAvailable) return false;
    if (filterTab === 'festive' && item.productType !== 'FESTIVE') return false;
    return true;
  });

  const toggleProduct = async (item: AvailabilityItem) => {
    const prev = item.isAvailable;
    const next = !prev;
    setItems((list) =>
      list.map((i) => (i.id === item.id ? { ...i, isAvailable: next } : i))
    );
    const res = await toggleProductAvailabilityAction(item.id, next);
    if (!res.success) {
      setItems((list) =>
        list.map((i) => (i.id === item.id ? { ...i, isAvailable: prev } : i))
      );
      toast({ variant: 'error', message: res.error || 'Failed to update availability.' });
      return;
    }
    toast({
      variant: 'info',
      message: `"${item.name}" marked ${next ? 'available' : 'unavailable'}.`,
    });
  };

  const toggleVariant = async (productId: string, variantId: string) => {
    let nextState = true;
    setItems((list) =>
      list.map((item) => {
        if (item.id !== productId) return item;
        return {
          ...item,
          variants: item.variants.map((v) => {
            if (v.id === variantId) {
              nextState = !v.isAvailable;
              return { ...v, isAvailable: nextState };
            }
            return v;
          }),
        };
      })
    );
    const res = await toggleVariantAvailabilityAction(variantId, nextState);
    if (!res.success) {
      setItems((list) =>
        list.map((item) => {
          if (item.id !== productId) return item;
          return {
            ...item,
            variants: item.variants.map((v) =>
              v.id === variantId ? { ...v, isAvailable: !nextState } : v
            ),
          };
        })
      );
      toast({ variant: 'error', message: res.error || 'Failed to update size availability.' });
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((i) => i.id)));
    }
  };

  const bulkToggle = async (available: boolean) => {
    const count = selectedIds.size;
    const selectedArray = Array.from(selectedIds);
    if (selectedArray.length === 0) return;

    setItems((list) =>
      list.map((i) => (selectedIds.has(i.id) ? { ...i, isAvailable: available } : i))
    );
    setSelectedIds(new Set());

    const res = await bulkToggleAvailabilityAction(selectedArray, available);
    if (res.success) {
      toast({
        variant: 'success',
        message: `${count} product(s) marked ${available ? 'available' : 'unavailable'}.`,
      });
    } else {
      toast({ variant: 'error', message: res.error || 'Failed to bulk update availability.' });
    }
  };

  const tabs = [
    { key: 'all' as const, label: 'All' },
    { key: 'unavailable' as const, label: 'Unavailable' },
    { key: 'festive' as const, label: 'Festive' },
  ];

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
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterTab(tab.key)}
              className="rounded-full border px-3 py-1.5 text-sm font-medium transition-all"
              style={{
                borderColor: filterTab === tab.key ? 'var(--color-primary)' : 'var(--color-border)',
                background: filterTab === tab.key ? 'var(--color-primary)' : 'transparent',
                color: filterTab === tab.key ? 'white' : 'var(--color-text)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div
          className="flex items-center gap-3 rounded-lg p-3 mb-4"
          style={{
            background: 'var(--color-primary-light)',
            border: '1px solid var(--color-primary)',
          }}
        >
          <CheckSquare size={18} style={{ color: 'var(--color-primary)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
            {selectedIds.size} selected
          </span>
          <div className="flex-1" />
          <Button size="sm" variant="primary" onClick={() => bulkToggle(true)}>
            Mark Available
          </Button>
          <Button size="sm" variant="secondary" onClick={() => bulkToggle(false)}>
            Mark Unavailable
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setSelectedIds(new Set())}>
            Clear
          </Button>
        </div>
      )}

      {/* Product list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<ToggleRight size={48} strokeWidth={1.5} />}
          title={items.length === 0 ? 'No products yet' : 'No matching products'}
          description={
            items.length === 0
              ? 'Add products first, then manage their availability here.'
              : 'Try adjusting your search or filters.'
          }
          action={items.length === 0 ? { label: 'Add Product', href: '/admin/products/new' } : undefined}
        />
      ) : (
        <div className="space-y-2">
          {/* Select all */}
          <div className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              checked={selectedIds.size === filtered.length && filtered.length > 0}
              onChange={selectAll}
              className="w-4 h-4 rounded"
              aria-label="Select all"
            />
            <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border p-4 transition-all"
              style={{
                borderColor: selectedIds.has(item.id) ? 'var(--color-primary)' : 'var(--color-border)',
                background: 'var(--color-surface)',
              }}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.has(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  className="w-4 h-4 rounded flex-shrink-0"
                  aria-label={`Select ${item.name}`}
                />

                {/* Thumbnail placeholder */}
                <div
                  className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'var(--color-surface-2)',
                    color: 'var(--color-muted)',
                  }}
                >
                  <Package size={20} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    {item.foodType === 'JAIN' && <Badge variant="jain">Jain</Badge>}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                    {item.categoryName} · {item.variants.length} size{item.variants.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Big toggle */}
                <Switch
                  label={item.isAvailable ? 'Available' : 'Unavailable'}
                  checked={item.isAvailable}
                  onCheckedChange={() => toggleProduct(item)}
                />

                {/* Expand button for variants */}
                {item.variants.length > 1 && (
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="text-xs font-medium px-2 py-1 rounded"
                    style={{ color: 'var(--color-primary)', background: 'var(--color-primary-light)' }}
                  >
                    Sizes
                  </button>
                )}
              </div>

              {/* Expanded variant toggles */}
              {expandedId === item.id && item.variants.length > 1 && (
                <div
                  className="mt-3 pt-3 space-y-2"
                  style={{ borderTop: '1px solid var(--color-border)' }}
                >
                  {item.variants.map((v) => (
                    <div key={v.id} className="flex items-center justify-between pl-14">
                      <span className="text-sm">{v.label}</span>
                      <Switch
                        label=""
                        size="sm"
                        checked={v.isAvailable}
                        onCheckedChange={() => toggleVariant(item.id, v.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
