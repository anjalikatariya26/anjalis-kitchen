'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/Dialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';
import { Plus, Pencil, Trash2, FolderTree, GripVertical, Search } from 'lucide-react';

/* ─── Types ──────────────────────────────────────────── */

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  _count?: { products: number };
}

/* ─── Sample data for UI development ─────────────────── */

const sampleCategories: Category[] = [
  { id: '1', name: 'Laddu', slug: 'laddu', description: 'All varieties of laddu', isActive: true, sortOrder: 0, _count: { products: 0 } },
  { id: '2', name: 'Chikki', slug: 'chikki', description: 'Traditional chikki and brittle', isActive: true, sortOrder: 1, _count: { products: 0 } },
  { id: '3', name: 'Chivda', slug: 'chivda', description: 'Poha and maka chivda', isActive: true, sortOrder: 2, _count: { products: 0 } },
  { id: '4', name: 'Namkeen & Farsan', slug: 'namkeen-farsan', description: 'Savoury snacks', isActive: true, sortOrder: 3, _count: { products: 0 } },
  { id: '5', name: 'Sweets', slug: 'sweets', description: 'Traditional sweets', isActive: true, sortOrder: 4, _count: { products: 0 } },
  { id: '6', name: 'Modak', slug: 'modak', description: 'Steamed and fried modak', isActive: true, sortOrder: 5, _count: { products: 0 } },
  { id: '7', name: 'Snacks & Nashta', slug: 'snacks-nashta', description: 'Fresh snacks and breakfast', isActive: true, sortOrder: 6, _count: { products: 0 } },
  { id: '8', name: 'Chutney', slug: 'chutney', description: 'Fresh chutneys', isActive: true, sortOrder: 7, _count: { products: 0 } },
  { id: '9', name: 'Cakes', slug: 'cakes', description: 'Bento and customised cakes', isActive: true, sortOrder: 8, _count: { products: 0 } },
  { id: '10', name: 'Cookies', slug: 'cookies', description: 'Cookies and biscuits', isActive: true, sortOrder: 9, _count: { products: 0 } },
];

/* ─── CategoryManager ────────────────────────────────── */

export function CategoryManager() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>(sampleCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formError, setFormError] = useState('');

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreate = () => {
    setEditingCategory(null);
    setFormName('');
    setFormDescription('');
    setFormError('');
    setDialogOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormDescription(cat.description ?? '');
    setFormError('');
    setDialogOpen(true);
  };

  const handleSave = () => {
    const name = formName.trim();
    if (name.length < 2 || name.length > 60) {
      setFormError('Name must be 2–60 characters.');
      return;
    }

    // Duplicate check (simplified name_key logic)
    const nameKey = name.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const existing = categories.find(
      (c) => c.id !== editingCategory?.id && c.name.toLowerCase().replace(/[^\w\s]/g, '').trim() === nameKey
    );

    if (existing) {
      setFormError(`A category with a similar name already exists: "${existing.name}"`);
      return;
    }

    if (editingCategory) {
      // Update
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name, description: formDescription || null }
            : c
        )
      );
      toast({ variant: 'success', message: `Category "${name}" updated.` });
    } else {
      // Create
      const newCat: Category = {
        id: crypto.randomUUID(),
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: formDescription || null,
        isActive: true,
        sortOrder: categories.length,
        _count: { products: 0 },
      };
      setCategories((prev) => [...prev, newCat]);
      toast({ variant: 'success', message: `Category "${name}" created.` });
    }

    setDialogOpen(false);
  };

  const handleToggle = (cat: Category) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === cat.id ? { ...c, isActive: !c.isActive } : c))
    );
    toast({
      variant: 'info',
      message: `"${cat.name}" ${cat.isActive ? 'deactivated' : 'activated'}.`,
      action: {
        label: 'Undo',
        onClick: () =>
          setCategories((prev) =>
            prev.map((c) => (c.id === cat.id ? { ...c, isActive: cat.isActive } : c))
          ),
      },
    });
  };

  const handleDelete = (cat: Category) => {
    if (cat._count && cat._count.products > 0) {
      toast({
        variant: 'error',
        message: `Cannot delete "${cat.name}" — it has ${cat._count.products} products. Deactivate it instead.`,
      });
      setDeleteConfirm(null);
      return;
    }

    setCategories((prev) => prev.filter((c) => c.id !== cat.id));
    toast({ variant: 'success', message: `Category "${cat.name}" deleted.` });
    setDeleteConfirm(null);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-search">
          <Input
            label=""
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
        <Button onClick={openCreate} icon={<Plus size={16} />}>
          Add Category
        </Button>
      </div>

      {/* Table / List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<FolderTree size={48} strokeWidth={1.5} />}
          title={searchQuery ? 'No matching categories' : 'No categories yet'}
          description={searchQuery ? 'Try a different search term.' : 'Create your first category to organise products.'}
          action={!searchQuery ? { label: 'Add Category', onClick: openCreate } : undefined}
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}></th>
                <th>Name</th>
                <th>Products</th>
                <th>Status</th>
                <th style={{ width: '140px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <GripVertical size={16} style={{ color: 'var(--color-border)' }} />
                  </td>
                  <td>
                    <div>
                      <p className="font-medium">{cat.name}</p>
                      {cat.description && (
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <Badge variant="default">{cat._count?.products ?? 0}</Badge>
                  </td>
                  <td>
                    <Switch
                      label=""
                      size="sm"
                      checked={cat.isActive}
                      onCheckedChange={() => handleToggle(cat)}
                    />
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(cat)}>
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(cat)}>
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

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          title={editingCategory ? 'Edit Category' : 'Add Category'}
          size="sm"
        >
          <div className="mt-4 space-y-4">
            <Input
              label="Category name"
              value={formName}
              onChange={(e) => {
                setFormName(e.target.value);
                setFormError('');
              }}
              placeholder="e.g. Laddu"
              error={formError}
              autoFocus
            />
            <Input
              label="Description (optional)"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Brief description"
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingCategory ? 'Save Changes' : 'Create Category'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent
          title="Delete Category"
          description={`Are you sure you want to delete "${deleteConfirm?.name}"? This action cannot be undone.`}
          size="sm"
        >
          {deleteConfirm?._count && deleteConfirm._count.products > 0 && (
            <div
              className="mt-3 rounded-lg p-3"
              style={{
                background: 'var(--color-warning-light)',
                color: 'var(--color-warning)',
              }}
            >
              <p className="text-sm font-medium">
                This category has {deleteConfirm._count.products} products. Move them to another category first, or deactivate this one.
              </p>
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              disabled={!!deleteConfirm?._count && deleteConfirm._count.products > 0}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
