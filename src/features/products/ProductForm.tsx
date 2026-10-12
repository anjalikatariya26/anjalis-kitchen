'use client';

/**
 * ProductForm — The complete product create/edit form.
 *
 * Four sections (per spec Part J4):
 * 1. Basics (name, descriptions)
 * 2. Type (food type, product type, festivals, category)
 * 3. Photos (drag-and-drop, up to 2)
 * 4. Sizes and Prices (variant editor)
 */

import { useState, useCallback, type ChangeEvent } from 'react';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Switch } from '@/components/ui/Switch';
import { useToast } from '@/components/ui/Toast';
import {
  Plus,
  Trash2,
  Upload,
  ImagePlus,
  ChevronUp,
  ChevronDown,
  Save,
  Eye,
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────── */

interface Variant {
  id: string;
  unitType: string;
  unit: string;
  quantityValue: string;
  displayLabel: string;
  pricePaise: string;
  isAvailable: boolean;
}

interface ProductFormData {
  name: string;
  shortDescription: string;
  description: string;
  productType: 'FESTIVE' | 'REGULAR';
  foodType: 'JAIN' | 'REGULAR';
  categoryId: string;
  festivalIds: string[];
  variants: Variant[];
  isAvailable: boolean;
}

/* ─── Sample categories and festivals ────────────────── */

const sampleCategories = [
  { id: '1', name: 'Laddu' },
  { id: '2', name: 'Chikki' },
  { id: '3', name: 'Chivda' },
  { id: '4', name: 'Namkeen & Farsan' },
  { id: '5', name: 'Sweets' },
  { id: '6', name: 'Modak' },
  { id: '7', name: 'Snacks & Nashta' },
  { id: '8', name: 'Chutney' },
  { id: '9', name: 'Cakes' },
  { id: '10', name: 'Cookies' },
];

const sampleFestivals = [
  { id: '1', name: 'Ganesh Chaturthi' },
  { id: '2', name: 'Raksha Bandhan' },
  { id: '3', name: 'Navratri' },
  { id: '4', name: 'Diwali' },
  { id: '5', name: 'Makar Sankranti' },
];

/* ─── Variant Presets ────────────────────────────────── */

const weightPresets = [
  { label: '100g · 250g · 500g · 1kg', values: [100, 250, 500, 1000] },
  { label: '250g · 500g · 1kg', values: [250, 500, 1000] },
  { label: '500g · 1kg', values: [500, 1000] },
];

const piecePresets = [
  { label: '1 · 6 · 12', values: [1, 6, 12] },
  { label: '6 · 12 · 24', values: [6, 12, 24] },
];

function createEmptyVariant(): Variant {
  return {
    id: crypto.randomUUID(),
    unitType: 'WEIGHT',
    unit: 'g',
    quantityValue: '',
    displayLabel: '',
    pricePaise: '',
    isAvailable: true,
  };
}

function generateLabel(unit: string, qty: string): string {
  const num = parseFloat(qty);
  if (isNaN(num)) return '';
  if (unit === 'g' && num >= 1000) return `${num / 1000} kg`;
  return `${num} ${unit}`;
}

/* ─── ProductForm Component ──────────────────────────── */

export function ProductForm() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState(0);

  const [form, setForm] = useState<ProductFormData>({
    name: '',
    shortDescription: '',
    description: '',
    productType: 'REGULAR',
    foodType: 'REGULAR',
    categoryId: '',
    festivalIds: [],
    variants: [createEmptyVariant()],
    isAvailable: true,
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ── Handlers ── */

  const updateField = (key: keyof ProductFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const updateVariant = (idx: number, key: keyof Variant, value: unknown) => {
    setForm((prev) => {
      const variants = [...prev.variants];
      const v = { ...variants[idx], [key]: value };

      // Auto-generate label
      if (key === 'unit' || key === 'quantityValue') {
        v.displayLabel = generateLabel(
          key === 'unit' ? (value as string) : v.unit,
          key === 'quantityValue' ? (value as string) : v.quantityValue
        );
      }

      variants[idx] = v;
      return { ...prev, variants };
    });
  };

  const addVariant = () => {
    if (form.variants.length >= 12) {
      toast({ variant: 'warning', message: 'Maximum 12 sizes per product.' });
      return;
    }
    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, createEmptyVariant()],
    }));
  };

  const removeVariant = (idx: number) => {
    if (form.variants.length <= 1) {
      toast({ variant: 'warning', message: 'A product needs at least one size.' });
      return;
    }
    const removed = form.variants[idx];
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== idx),
    }));
    toast({
      variant: 'info',
      message: `Size "${removed.displayLabel || 'untitled'}" removed.`,
      action: {
        label: 'Undo',
        onClick: () =>
          setForm((prev) => {
            const variants = [...prev.variants];
            variants.splice(idx, 0, removed);
            return { ...prev, variants };
          }),
      },
    });
  };

  const applyWeightPreset = (values: number[]) => {
    const variants: Variant[] = values.map((v) => ({
      id: crypto.randomUUID(),
      unitType: 'WEIGHT',
      unit: 'g',
      quantityValue: String(v),
      displayLabel: generateLabel('g', String(v)),
      pricePaise: '',
      isAvailable: true,
    }));
    setForm((prev) => ({ ...prev, variants }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const total = imageFiles.length + files.length;
    if (total > 2) {
      toast({ variant: 'warning', message: '2 photos maximum. Remove one to add another.' });
      return;
    }
    setImageFiles((prev) => [...prev, ...files].slice(0, 2));
  };

  const removeImage = (idx: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleToggleFestival = (festivalId: string) => {
    setForm((prev) => {
      const ids = prev.festivalIds.includes(festivalId)
        ? prev.festivalIds.filter((id) => id !== festivalId)
        : [...prev.festivalIds, festivalId];
      return { ...prev, festivalIds: ids };
    });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters.';
    if (form.description.trim().length < 10) errs.description = 'Description must be at least 10 characters.';
    if (!form.categoryId) errs.categoryId = 'Choose a category.';
    if (form.productType === 'FESTIVE' && form.festivalIds.length === 0) errs.festivalIds = 'Choose at least one festival.';
    if (form.variants.length === 0) errs.variants = 'Add at least one size.';
    form.variants.forEach((v, i) => {
      if (!v.quantityValue || parseFloat(v.quantityValue) <= 0) errs[`variant_${i}_qty`] = 'Enter a valid quantity.';
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      toast({ variant: 'error', message: 'Please fix the errors before saving.' });
      return;
    }
    // TODO: Send to API when backend is connected
    toast({ variant: 'success', message: `Product "${form.name}" saved!` });
  };

  const sections = ['Basics', 'Type', 'Photos', 'Sizes & Prices'];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sticky section nav (desktop) */}
      <nav className="hidden lg:block" style={{ width: '180px', flexShrink: 0 }}>
        <div className="sticky top-24 space-y-1">
          {sections.map((s, i) => (
            <button
              key={s}
              onClick={() => setActiveSection(i)}
              className="admin-sidebar-link w-full text-left"
              style={{
                background: activeSection === i ? 'var(--color-primary-light)' : undefined,
                color: activeSection === i ? 'var(--color-primary)' : undefined,
                fontWeight: activeSection === i ? 600 : undefined,
              }}
            >
              <span
                className="flex items-center justify-center rounded-full text-xs font-bold"
                style={{
                  width: '22px',
                  height: '22px',
                  background: activeSection === i ? 'var(--color-primary)' : 'var(--color-border)',
                  color: activeSection === i ? 'white' : 'var(--color-muted)',
                }}
              >
                {i + 1}
              </span>
              {s}
            </button>
          ))}
        </div>
      </nav>

      {/* Form content */}
      <div className="flex-1 space-y-6 max-w-3xl">
        {/* Section 1: Basics */}
        <Card padding="lg">
          <h2
            className="text-lg font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            1. Basics
          </h2>
          <CardContent>
            <div className="space-y-4 mt-4">
              <Input
                label="Product name"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g. Besan Laddu"
                error={errors.name}
              />
              <Input
                label="Short description (optional)"
                value={form.shortDescription}
                onChange={(e) => updateField('shortDescription', e.target.value)}
                placeholder="One-liner for cards and search"
                hint={`${form.shortDescription.length}/160`}
              />
              <Textarea
                label="Description"
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Tell customers about this product..."
                charCount={{ current: form.description.length, max: 2000 }}
                error={errors.description}
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Type */}
        <Card padding="lg">
          <h2
            className="text-lg font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            2. Type
          </h2>
          <CardContent>
            <div className="space-y-5 mt-4">
              {/* Food type */}
              <div>
                <p className="field-label mb-2">Food type</p>
                <div className="flex gap-3">
                  {(['REGULAR', 'JAIN'] as const).map((ft) => (
                    <button
                      key={ft}
                      type="button"
                      onClick={() => updateField('foodType', ft)}
                      className="flex-1 rounded-xl border-2 p-4 text-center transition-all"
                      style={{
                        borderColor: form.foodType === ft ? (ft === 'JAIN' ? 'var(--color-jain)' : 'var(--color-primary)') : 'var(--color-border)',
                        background: form.foodType === ft ? (ft === 'JAIN' ? '#FDF6E3' : 'var(--color-primary-light)') : 'var(--color-surface)',
                      }}
                    >
                      <p className="text-sm font-semibold">{ft === 'JAIN' ? '🌿 Jain' : '🍽️ Regular'}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
                        {ft === 'JAIN' ? 'Suitable for Jain diet' : 'Vegetarian (not Jain-specific)'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product type */}
              <div>
                <p className="field-label mb-2">Product type</p>
                <div className="flex gap-3">
                  {(['REGULAR', 'FESTIVE'] as const).map((pt) => (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => {
                        updateField('productType', pt);
                        if (pt === 'REGULAR') updateField('festivalIds', []);
                      }}
                      className="flex-1 rounded-xl border-2 p-4 text-center transition-all"
                      style={{
                        borderColor: form.productType === pt ? 'var(--color-primary)' : 'var(--color-border)',
                        background: form.productType === pt ? 'var(--color-primary-light)' : 'var(--color-surface)',
                      }}
                    >
                      <p className="text-sm font-semibold">{pt === 'FESTIVE' ? '✨ Festive' : '📦 Regular'}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
                        {pt === 'FESTIVE' ? 'Linked to festivals' : 'Available year-round'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Festival multi-select (only when FESTIVE) */}
              {form.productType === 'FESTIVE' && (
                <div>
                  <p className="field-label mb-2">Festivals</p>
                  {errors.festivalIds && (
                    <p className="field-error mb-2">{errors.festivalIds}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {sampleFestivals.map((f) => {
                      const selected = form.festivalIds.includes(f.id);
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => handleToggleFestival(f.id)}
                          className="rounded-full border px-3 py-1.5 text-sm font-medium transition-all"
                          style={{
                            borderColor: selected ? 'var(--color-primary)' : 'var(--color-border)',
                            background: selected ? 'var(--color-primary)' : 'var(--color-surface)',
                            color: selected ? 'white' : 'var(--color-text)',
                          }}
                          aria-pressed={selected}
                        >
                          {f.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Category select */}
              <div className="field-wrapper">
                <label className="field-label" htmlFor="categoryId">Category</label>
                <select
                  id="categoryId"
                  className={`field-input ${errors.categoryId ? 'field-input--error' : ''}`}
                  value={form.categoryId}
                  onChange={(e) => updateField('categoryId', e.target.value)}
                >
                  <option value="">Choose a category...</option>
                  {sampleCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.categoryId && <p className="field-error">{errors.categoryId}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Photos */}
        <Card padding="lg">
          <h2
            className="text-lg font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            3. Photos
          </h2>
          <CardContent>
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
              Add 1–2 photos. Square images look best (at least 800×800 px).
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {imageFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="relative rounded-lg overflow-hidden border"
                  style={{
                    aspectRatio: '1',
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-surface-2)',
                  }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Product photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 flex items-center justify-center rounded-full"
                    style={{
                      width: '28px',
                      height: '28px',
                      background: 'rgba(0,0,0,0.6)',
                      color: 'white',
                    }}
                    aria-label={`Remove photo ${idx + 1}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {imageFiles.length < 2 && (
                <label
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-colors hover:border-current"
                  style={{
                    aspectRatio: '1',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-muted)',
                  }}
                >
                  <ImagePlus size={28} strokeWidth={1.5} />
                  <p className="mt-2 text-xs font-medium">Add photo</p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Sizes & Prices */}
        <Card padding="lg">
          <h2
            className="text-lg font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            4. Sizes & Prices
          </h2>
          <CardContent>
            {/* Quick-fill presets */}
            <div className="mt-3">
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-muted)' }}>
                Quick fill:
              </p>
              <div className="flex flex-wrap gap-2">
                {weightPresets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyWeightPreset(p.values)}
                    className="rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:bg-gray-50"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant rows */}
            <div className="mt-4 space-y-3">
              {form.variants.map((variant, idx) => (
                <div
                  key={variant.id}
                  className="rounded-lg border p-4 space-y-3"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-surface)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                      Size {idx + 1}
                      {variant.displayLabel && (
                        <span style={{ color: 'var(--color-muted)', fontWeight: 400 }}>
                          {' '}— {variant.displayLabel}
                        </span>
                      )}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVariant(idx)}
                      disabled={form.variants.length <= 1}
                    >
                      <Trash2 size={14} style={{ color: 'var(--color-error)' }} />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="field-wrapper">
                      <label className="field-label">Unit</label>
                      <select
                        className="field-input"
                        value={variant.unit}
                        onChange={(e) => updateVariant(idx, 'unit', e.target.value)}
                      >
                        <option value="g">Grams (g)</option>
                        <option value="kg">Kilograms (kg)</option>
                        <option value="piece">Piece</option>
                        <option value="box">Box/Pack</option>
                        <option value="ml">Millilitres (ml)</option>
                        <option value="l">Litres (l)</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>

                    <Input
                      label="Quantity"
                      type="number"
                      min="0"
                      step="any"
                      value={variant.quantityValue}
                      onChange={(e) => updateVariant(idx, 'quantityValue', e.target.value)}
                      placeholder="e.g. 250"
                      error={errors[`variant_${idx}_qty`]}
                    />

                    <Input
                      label="Label"
                      value={variant.displayLabel}
                      onChange={(e) => updateVariant(idx, 'displayLabel', e.target.value)}
                      placeholder="e.g. 250 g"
                    />

                    <Input
                      label="Price (₹)"
                      type="number"
                      min="0"
                      step="1"
                      value={variant.pricePaise}
                      onChange={(e) => updateVariant(idx, 'pricePaise', e.target.value)}
                      placeholder="Leave blank for enquiry"
                      hint={variant.pricePaise ? '' : 'Price on enquiry'}
                    />
                  </div>

                  <Switch
                    label="Available"
                    size="sm"
                    checked={variant.isAvailable}
                    onCheckedChange={(c) => updateVariant(idx, 'isAvailable', c)}
                  />
                </div>
              ))}

              {errors.variants && <p className="field-error">{errors.variants}</p>}

              <Button
                variant="secondary"
                size="sm"
                onClick={addVariant}
                icon={<Plus size={14} />}
                disabled={form.variants.length >= 12}
              >
                Add Size
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Availability toggle */}
        <Card padding="lg">
          <Switch
            label="Product is available"
            description="When off, the product shows as 'Currently unavailable' on the public site."
            checked={form.isAvailable}
            onCheckedChange={(c) => updateField('isAvailable', c)}
          />
        </Card>

        {/* Save bar */}
        <div
          className="sticky bottom-0 flex items-center justify-between gap-3 rounded-xl border p-4"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow-2)',
            zIndex: 10,
          }}
        >
          <Button variant="ghost" href="/admin/products">
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleSave} icon={<Eye size={16} />}>
              Save as Unavailable
            </Button>
            <Button variant="primary" onClick={handleSave} icon={<Save size={16} />}>
              Save Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
