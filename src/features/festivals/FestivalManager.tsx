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

import {
  createFestivalAction,
  updateFestivalAction,
  toggleFestivalAction,
  deleteFestivalAction,
} from './actions';

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

interface FestivalManagerProps {
  initialFestivals?: Festival[];
}

/* ─── FestivalManager ────────────────────────────────── */

export function FestivalManager({ initialFestivals = [] }: FestivalManagerProps) {
  const { toast } = useToast();
  const [festivals, setFestivals] = useState<Festival[]>(initialFestivals);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFestival, setEditingFestival] = useState<Festival | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Festival | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async () => {
    const name = formName.trim();
    if (name.length < 2 || name.length > 80) {
      setFormError('Name must be 2–80 characters.');
      return;
    }

    setIsSaving(true);
    setFormError('');

    if (editingFestival) {
      const res = await updateFestivalAction(editingFestival.id, name, formDescription);
      setIsSaving(false);
      if (res.success) {
        setFestivals((prev) =>
          prev.map((f) =>
            f.id === editingFestival.id
              ? { ...f, name, description: formDescription || null }
              : f
          )
        );
        toast({ variant: 'success', message: `Festival "${name}" updated.` });
        setDialogOpen(false);
      } else {
        setFormError(res.error || 'Failed to update festival.');
      }
    } else {
      const res = await createFestivalAction(name, formDescription);
      setIsSaving(false);
      if (res.success && res.festival) {
        setFestivals((prev) => [...prev, res.festival as Festival]);
        toast({ variant: 'success', message: `Festival "${name}" created.` });
        setDialogOpen(false);
      } else {
        setFormError(res.error || 'Failed to create festival.');
      }
    }
  };

  const handleToggle = async (fest: Festival) => {
    const productCount = fest._count?.products ?? 0;
    const hamperCount = fest._count?.hampers ?? 0;
    const nextActive = !fest.isActive;

    setFestivals((prev) =>
      prev.map((f) => (f.id === fest.id ? { ...f, isActive: nextActive } : f))
    );

    const res = await toggleFestivalAction(fest.id, nextActive);
    if (!res.success) {
      setFestivals((prev) =>
        prev.map((f) => (f.id === fest.id ? { ...f, isActive: fest.isActive } : f))
      );
      toast({ variant: 'error', message: res.error || 'Failed to update festival.' });
      return;
    }

    const action = nextActive ? 'activated' : 'deactivated';
    let msg = `"${fest.name}" ${action}.`;
    if (!nextActive && (productCount > 0 || hamperCount > 0)) {
      msg += ` Associated items may be hidden from the public site.`;
    }

    toast({ variant: 'info', message: msg });
  };

  const handleDelete = async (fest: Festival) => {
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

    const res = await deleteFestivalAction(fest.id);
    if (res.success) {
      setFestivals((prev) => prev.filter((f) => f.id !== fest.id));
      toast({ variant: 'success', message: `Festival "${fest.name}" deleted.` });
    } else {
      toast({ variant: 'error', message: res.error || 'Failed to delete festival.' });
    }
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
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : editingFestival ? 'Save Changes' : 'Create Festival'}
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
