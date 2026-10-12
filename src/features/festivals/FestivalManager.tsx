'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/Dialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';
import { Plus, Pencil, Trash2, Sparkles, GripVertical, Search } from 'lucide-react';

/* ─── Types ──────────────────────────────────────────── */

interface Festival {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  _count?: { products: number; hampers: number };
}

/* ─── Sample data ────────────────────────────────────── */

const sampleFestivals: Festival[] = [
  { id: '1', name: 'Ganesh Chaturthi', slug: 'ganesh-chaturthi', description: 'Ganeshotsav faral and modak', isActive: true, sortOrder: 0, _count: { products: 0, hampers: 0 } },
  { id: '2', name: 'Raksha Bandhan', slug: 'raksha-bandhan', description: 'Rakhi special sweets and snacks', isActive: true, sortOrder: 1, _count: { products: 0, hampers: 0 } },
  { id: '3', name: 'Navratri', slug: 'navratri', description: 'Farali snacks for Navratri fasting', isActive: true, sortOrder: 2, _count: { products: 0, hampers: 0 } },
  { id: '4', name: 'Diwali', slug: 'diwali', description: 'Diwali faral and gift hampers', isActive: true, sortOrder: 3, _count: { products: 0, hampers: 0 } },
  { id: '5', name: 'Makar Sankranti', slug: 'makar-sankranti', description: 'Til and chikki for Sankranti', isActive: true, sortOrder: 4, _count: { products: 0, hampers: 0 } },
  { id: '6', name: "Father's Day", slug: 'fathers-day', description: 'Special cakes and treats', isActive: false, sortOrder: 5, _count: { products: 0, hampers: 0 } },
];

/* ─── FestivalManager ────────────────────────────────── */

export function FestivalManager() {
  const { toast } = useToast();
  const [festivals, setFestivals] = useState<Festival[]>(sampleFestivals);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFestival, setEditingFestival] = useState<Festival | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Festival | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formError, setFormError] = useState('');

  const filtered = festivals.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreate = () => {
    setEditingFestival(null);
    setFormName('');
    setFormDescription('');
    setFormError('');
    setDialogOpen(true);
  };

  const openEdit = (fest: Festival) => {
    setEditingFestival(fest);
    setFormName(fest.name);
    setFormDescription(fest.description ?? '');
    setFormError('');
    setDialogOpen(true);
  };

  const handleSave = () => {
    const name = formName.trim();
    if (name.length < 2 || name.length > 60) {
      setFormError('Name must be 2–60 characters.');
      return;
    }

    // Duplicate check
    const nameKey = name.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const existing = festivals.find(
      (f) => f.id !== editingFestival?.id && f.name.toLowerCase().replace(/[^\w\s]/g, '').trim() === nameKey
    );

    if (existing) {
      setFormError(`A festival with a similar name already exists: "${existing.name}"`);
      return;
    }

    if (editingFestival) {
      setFestivals((prev) =>
        prev.map((f) =>
          f.id === editingFestival.id
            ? { ...f, name, description: formDescription || null }
            : f
        )
      );
      toast({ variant: 'success', message: `Festival "${name}" updated.` });
    } else {
      const newFest: Festival = {
        id: crypto.randomUUID(),
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: formDescription || null,
        isActive: true,
        sortOrder: festivals.length,
        _count: { products: 0, hampers: 0 },
      };
      setFestivals((prev) => [...prev, newFest]);
      toast({ variant: 'success', message: `Festival "${name}" created.` });
    }

    setDialogOpen(false);
  };

  const handleToggle = (fest: Festival) => {
    const productCount = fest._count?.products ?? 0;
    const hamperCount = fest._count?.hampers ?? 0;

    setFestivals((prev) =>
      prev.map((f) => (f.id === fest.id ? { ...f, isActive: !f.isActive } : f))
    );

    const action = fest.isActive ? 'deactivated' : 'activated';
    let msg = `"${fest.name}" ${action}.`;
    if (fest.isActive && (productCount > 0 || hamperCount > 0)) {
      msg += ` ${productCount} products and ${hamperCount} hampers will be hidden from the public site.`;
    }

    toast({
      variant: 'info',
      message: msg,
      action: {
        label: 'Undo',
        onClick: () =>
          setFestivals((prev) =>
            prev.map((f) => (f.id === fest.id ? { ...f, isActive: fest.isActive } : f))
          ),
      },
    });
  };

  const handleDelete = (fest: Festival) => {
    const productCount = fest._count?.products ?? 0;
    const hamperCount = fest._count?.hampers ?? 0;

    if (productCount > 0 || hamperCount > 0) {
      toast({
        variant: 'error',
        message: `Cannot delete "${fest.name}" — it has ${productCount} products and ${hamperCount} hampers.`,
      });
      setDeleteConfirm(null);
      return;
    }

    setFestivals((prev) => prev.filter((f) => f.id !== fest.id));
    toast({ variant: 'success', message: `Festival "${fest.name}" deleted.` });
    setDeleteConfirm(null);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-search">
          <Input
            label=""
            placeholder="Search festivals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
        <Button onClick={openCreate} icon={<Plus size={16} />}>
          Add Festival
        </Button>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Sparkles size={48} strokeWidth={1.5} />}
          title={searchQuery ? 'No matching festivals' : 'No festivals yet'}
          description={searchQuery ? 'Try a different search term.' : 'Create your first festival for seasonal products.'}
          action={!searchQuery ? { label: 'Add Festival', onClick: openCreate } : undefined}
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}></th>
                <th>Festival</th>
                <th>Products</th>
                <th>Hampers</th>
                <th>Status</th>
                <th style={{ width: '140px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((fest) => (
                <tr key={fest.id}>
                  <td>
                    <GripVertical size={16} style={{ color: 'var(--color-border)' }} />
                  </td>
                  <td>
                    <div>
                      <p className="font-medium">{fest.name}</p>
                      {fest.description && (
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                          {fest.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <Badge variant="default">{fest._count?.products ?? 0}</Badge>
                  </td>
                  <td>
                    <Badge variant="default">{fest._count?.hampers ?? 0}</Badge>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Switch
                        label=""
                        size="sm"
                        checked={fest.isActive}
                        onCheckedChange={() => handleToggle(fest)}
                      />
                      <Badge variant={fest.isActive ? 'available' : 'unavailable'}>
                        {fest.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(fest)}>
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(fest)}>
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
          title={editingFestival ? 'Edit Festival' : 'Add Festival'}
          size="sm"
        >
          <div className="mt-4 space-y-4">
            <Input
              label="Festival name"
              value={formName}
              onChange={(e) => {
                setFormName(e.target.value);
                setFormError('');
              }}
              placeholder="e.g. Diwali"
              error={formError}
              autoFocus
            />
            <Input
              label="Description (optional)"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Brief description of this festival's offerings"
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingFestival ? 'Save Changes' : 'Create Festival'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent
          title="Delete Festival"
          description={`Are you sure you want to delete "${deleteConfirm?.name}"?`}
          size="sm"
        >
          {deleteConfirm?._count && (deleteConfirm._count.products > 0 || deleteConfirm._count.hampers > 0) && (
            <div
              className="mt-3 rounded-lg p-3"
              style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}
            >
              <p className="text-sm font-medium">
                This festival has {deleteConfirm._count.products} products and {deleteConfirm._count.hampers} hampers. Remove them first.
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
              disabled={
                !!deleteConfirm?._count &&
                (deleteConfirm._count.products > 0 || deleteConfirm._count.hampers > 0)
              }
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
