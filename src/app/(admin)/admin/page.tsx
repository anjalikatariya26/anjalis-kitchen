/**
 * Admin Dashboard — Shows stat cards, quick actions, and recent activity.
 * Stats will be wired to live Prisma queries once DB is running.
 */
import { requireAuth } from '@/features/auth/actions';
import {
  Package,
  CheckCircle,
  XCircle,
  Sparkles,
  Calendar,
  FolderTree,
  Gift,
  Utensils,
  Plus,
  ToggleRight,
  Settings,
  List,
} from 'lucide-react';

const statCards = [
  { label: 'Total Products', value: '0', icon: Package, color: 'var(--color-primary)', bg: 'var(--color-primary-light)', href: '/admin/products' },
  { label: 'Available', value: '0', icon: CheckCircle, color: 'var(--color-success)', bg: 'var(--color-success-light)', href: '/admin/products?available=true' },
  { label: 'Unavailable', value: '0', icon: XCircle, color: 'var(--color-error)', bg: 'var(--color-error-light)', href: '/admin/products?available=false' },
  { label: 'Festive', value: '0', icon: Sparkles, color: 'var(--color-secondary)', bg: 'var(--color-warning-light)', href: '/admin/products?type=festive' },
  { label: 'Festivals', value: '0', icon: Calendar, color: '#6B46C1', bg: '#EDE9FE', href: '/admin/festivals' },
  { label: 'Categories', value: '0', icon: FolderTree, color: 'var(--color-accent)', bg: '#E8F5EC', href: '/admin/categories' },
  { label: 'Hampers', value: '0', icon: Gift, color: '#B45309', bg: '#FEF3C7', href: '/admin/hampers' },
  { label: 'Regular', value: '0', icon: Utensils, color: 'var(--color-muted)', bg: 'var(--color-surface-2)', href: '/admin/products?type=regular' },
];

const quickActions = [
  { label: 'Add Product', icon: Plus, href: '/admin/products/new', primary: true },
  { label: 'Manage Products', icon: List, href: '/admin/products', primary: false },
  { label: 'Availability', icon: ToggleRight, href: '/admin/availability', primary: false },
  { label: 'Add Hamper', icon: Plus, href: '/admin/hampers/new', primary: false },
  { label: 'Categories', icon: FolderTree, href: '/admin/categories', primary: false },
  { label: 'Festivals', icon: Sparkles, href: '/admin/festivals', primary: false },
  { label: 'Hampers', icon: Gift, href: '/admin/hampers', primary: false },
  { label: 'Settings', icon: Settings, href: '/admin/settings', primary: false },
];

export default async function AdminDashboardPage() {
  const user = await requireAuth();

  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>Dashboard</h1>
          <p>Welcome back! Manage your kitchen from here.</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <a key={stat.label} href={stat.href} className="stat-card group">
              <div
                className="stat-card-icon"
                style={{ background: stat.bg, color: stat.color }}
              >
                <Icon size={20} />
              </div>
              <p className="stat-card-label">{stat.label}</p>
              <p className="stat-card-value">{stat.value}</p>
            </a>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2
          className="text-lg font-semibold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          Quick Actions
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.href + action.label}
                href={action.href}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center text-sm font-semibold transition-all hover:shadow-md"
                style={{
                  backgroundColor: action.primary ? 'var(--color-primary)' : 'var(--color-surface)',
                  borderColor: action.primary ? 'var(--color-primary)' : 'var(--color-border)',
                  color: action.primary ? 'var(--color-on-primary)' : 'var(--color-primary)',
                  borderRadius: 'var(--radius-md)',
                  minHeight: '88px',
                }}
              >
                <Icon size={22} strokeWidth={1.75} />
                {action.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* Needs attention + Recent activity */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Needs attention */}
        <div
          className="rounded-xl border p-5"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <h3
            className="text-base font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Needs Attention
          </h3>
          <div
            className="mt-4 flex flex-col items-center justify-center py-8 text-center"
            style={{ color: 'var(--color-muted)' }}
          >
            <CheckCircle size={32} strokeWidth={1.5} style={{ color: 'var(--color-success)' }} />
            <p className="mt-2 text-sm font-medium">All looking good!</p>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              No products need attention right now.
            </p>
          </div>
        </div>

        {/* Recently updated */}
        <div
          className="rounded-xl border p-5"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <h3
            className="text-base font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Recent Activity
          </h3>
          <div
            className="mt-4 flex flex-col items-center justify-center py-8 text-center"
            style={{ color: 'var(--color-muted)' }}
          >
            <Package size={32} strokeWidth={1.5} />
            <p className="mt-2 text-sm font-medium">No products yet</p>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              Add your first product to get started.
            </p>
            <a
              href="/admin/products/new"
              className="mt-3 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Plus size={16} />
              Add Product
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
