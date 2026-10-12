'use client';

/**
 * HamperForm — Festival-scoped product picker + hamper details.
 * Per spec Part H: festival first → picker lists only that festival's products.
 */

import { useState } from 'react';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Switch } from '@/components/ui/Switch';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';
import {
  Plus,
  Trash2,
  ImagePlus,
  Save,
  Gift,
  Minus,
  ChevronDown,
} from 'lucide-react';
import type { ChangeEvent } from 'react';

/* ─── Types ──────────────────────────────────────────── */

interface HamperItem {
  id: string;
  productName: string;
  variantLabel: string;
  variantId: string;
  quantity: number;
}

/* ─── Sample festivals ───────────────────────────────── */

const sampleFestivals = [
  { id: '1', name: 'Ganesh Chaturthi' },
  { id: '2', name: 'Raksha Bandhan' },
  { id: '3', name: 'Navratri' },
  { id: '4', name: 'Diwali' },
  { id: '5', name: 'Makar Sankranti' },
];

/* ─── HamperForm ─────────────────────────────────────── */

export function HamperForm() {
  const { toast } = useToast();

  const [festivalId, setFestivalId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pricePaise, setPricePaise] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [items, setItems] = useState<HamperItem[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const festival = sampleFestivals.find((f) => f.id === festivalId);

  const handleFestivalChange = (newId: string) => {
    if (items.length > 0 && newId !== festivalId) {
      if (!confirm('Changing the festival will clear all selected items. Continue?')) return;
      setItems([]);
    }
    setFestivalId(newId);
  };

  const updateItemQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== itemId) return i;
        const newQty = Math.max(1, Math.min(20, i.quantity + delta));
        return { ...i, quantity: newQty };
      })
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (imageFiles.length + files.length > 2) {
      toast({ variant: 'warning', message: '2 photos maximum.' });
      return;
    }
    setImageFiles((prev) => [...prev, ...files].slice(0, 2));
  };

  const handleSave = () => {
    if (!festivalId) {
      toast({ variant: 'error', message: 'Choose a festival.' });
      return;
    }
    if (name.trim().length < 2) {
      toast({ variant: 'error', message: 'Enter a hamper name.' });
      return;
    }
    if (!pricePaise || parseInt(pricePaise) < 0) {
      toast({ variant: 'error', message: 'Enter a valid price.' });
      return;
    }
    if (items.length === 0) {
      toast({ variant: 'error', message: 'Add at least one item to the hamper.' });
      return;
    }

    toast({ variant: 'success', message: `Hamper "${name}" saved!` });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Section 1: Festival */}
      <Card padding="lg">
        <h2
          className="text-lg font-semibold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          1. Choose Festival
        </h2>
        <CardContent>
          <p className="text-sm mt-1 mb-4" style={{ color: 'var(--color-muted)' }}>
            The hamper will only contain products from this festival.
          </p>
          <div className="flex flex-wrap gap-2">
            {sampleFestivals.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFestivalChange(f.id)}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-all"
                style={{
                  borderColor: festivalId === f.id ? 'var(--color-primary)' : 'var(--color-border)',
                  background: festivalId === f.id ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: festivalId === f.id ? 'white' : 'var(--color-text)',
                }}
              >
                {f.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Items picker */}
      <Card padding="lg">
        <h2
          className="text-lg font-semibold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          2. Items
        </h2>
        <CardContent>
          {!festivalId ? (
            <p className="text-sm py-4" style={{ color: 'var(--color-muted)' }}>
              Choose a festival first to see available products.
            </p>
          ) : items.length === 0 ? (
            <EmptyState
              icon={<Gift size={36} strokeWidth={1.5} />}
              title={`No items added`}
              description={`Add products from ${festival?.name} to this hamper.`}
              action={{ label: 'Add Item', onClick: () => {
                toast({ variant: 'info', message: 'Product picker will be available once the database is connected.' });
              }}}
            />
          ) : (
            <div className="space-y-2 mt-3">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <span className="text-xs font-bold w-6 text-center" style={{ color: 'var(--color-muted)' }}>
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.productName}</p>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{item.variantLabel}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateItemQuantity(item.id, -1)}
                      className="flex items-center justify-center w-7 h-7 rounded border"
                      style={{ borderColor: 'var(--color-border)' }}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateItemQuantity(item.id, 1)}
                      className="flex items-center justify-center w-7 h-7 rounded border"
                      style={{ borderColor: 'var(--color-border)' }}
                      disabled={item.quantity >= 20}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex-shrink-0"
                    style={{ color: 'var(--color-error)' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              <Button
                variant="secondary"
                size="sm"
                icon={<Plus size={14} />}
                onClick={() => {
                  toast({ variant: 'info', message: 'Product picker will be available once the database is connected.' });
                }}
              >
                Add Item
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 3: Details */}
      <Card padding="lg">
        <h2
          className="text-lg font-semibold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          3. Details
        </h2>
        <CardContent>
          <div className="space-y-4 mt-4">
            <Input
              label="Hamper name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Diwali Faral Gift Hamper"
            />
            <Input
              label="Price (₹)"
              type="number"
              min="0"
              value={pricePaise}
              onChange={(e) => setPricePaise(e.target.value)}
              placeholder="e.g. 650"
            />
            <Textarea
              label="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What makes this hamper special?"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Photos */}
      <Card padding="lg">
        <h2
          className="text-lg font-semibold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          4. Photos
        </h2>
        <CardContent>
          <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
            Add 1–2 photos. 4:3 ratio looks best (at least 1200×900 px).
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {imageFiles.map((file, idx) => (
              <div
                key={idx}
                className="relative rounded-lg overflow-hidden border"
                style={{ aspectRatio: '4/3', borderColor: 'var(--color-border)', background: 'var(--color-surface-2)' }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Hamper photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageFiles((prev) => prev.filter((_, i) => i !== idx))}
                  className="absolute top-2 right-2 flex items-center justify-center rounded-full"
                  style={{ width: '28px', height: '28px', background: 'rgba(0,0,0,0.6)', color: 'white' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {imageFiles.length < 2 && (
              <label
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-colors"
                style={{ aspectRatio: '4/3', borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
              >
                <ImagePlus size={28} strokeWidth={1.5} />
                <p className="mt-2 text-xs font-medium">Add photo</p>
                <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={handleImageChange} />
              </label>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card padding="lg">
        <Switch
          label="Hamper is available"
          description="When off, this hamper won't appear on the public site."
          checked={isAvailable}
          onCheckedChange={setIsAvailable}
        />
      </Card>

      {/* Save bar */}
      <div
        className="sticky bottom-0 flex items-center justify-between gap-3 rounded-xl border p-4"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-2)', zIndex: 10 }}
      >
        <Button variant="ghost" href="/admin/hampers">Cancel</Button>
        <Button variant="primary" onClick={handleSave} icon={<Save size={16} />}>
          Save Hamper
        </Button>
      </div>
    </div>
  );
}
