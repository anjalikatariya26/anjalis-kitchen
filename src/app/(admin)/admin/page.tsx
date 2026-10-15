/**
 * Admin Dashboard — Connected to PostgreSQL Database.
 * Real-time counts, live activity, dynamic status, and quick actions.
 */
import { requireAuth } from '@/features/auth/actions';
import { prisma } from '@/server/db';
import {
  Package,
  CheckCircle,
  XCircle,
  Sparkles,
  Calendar,
  FolderTree,
  Gift,
  ChefHat,
  Plus,
  ToggleRight,
  Settings,
  List,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  await requireAuth();

  // ── Live counts from PostgreSQL database ──
  let totalProducts = 0;
  let availableProducts = 0;
  let unavailableProducts = 0;
  let festiveProducts = 0;
  let regularProducts = 0;
  let totalFestivals = 0;
  let totalCategories = 0;
  let totalHampers = 0;
  let recentProducts: {
    id: string;
    name: string;
    slug: string;
    categoryName: string;
    priceLabel: string;
    isAvailable: boolean;
    createdAt: string;
  }[] = [];

  try {
    const [
      pTotal,
      pAvail,
      pUnavail,
      pFestive,
      pRegular,
      fTotal,
      cTotal,
      hTotal,
      dbRecentProducts,
    ] = await Promise.all([
      prisma.product.count({ where: { deletedAt: null } }),
      prisma.product.count({ where: { deletedAt: null, isAvailable: true } }),
      prisma.product.count({ where: { deletedAt: null, isAvailable: false } }),
      prisma.product.count({ where: { deletedAt: null, productType: 'FESTIVE' } }),
      prisma.product.count({ where: { deletedAt: null, productType: 'REGULAR' } }),
      prisma.festival.count({ where: { isActive: true } }),
      prisma.category.count({ where: { isActive: true } }),
      prisma.hamper.count({ where: { deletedAt: null } }),
      prisma.product.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          category: true,
          variants: { orderBy: { sortOrder: 'asc' } },
        },
      }),
    ]);

    totalProducts = pTotal;
    availableProducts = pAvail;
    unavailableProducts = pUnavail;
    festiveProducts = pFestive;
    regularProducts = pRegular;
    totalFestivals = fTotal;
    totalCategories = cTotal;
    totalHampers = hTotal;

    recentProducts = dbRecentProducts.map((p) => {
      const minVar = p.variants[0];
      const priceLabel = minVar && minVar.pricePaise
        ? `₹${Math.round(minVar.pricePaise / 100)}`
        : 'On enquiry';

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        categoryName: p.category.name,
        priceLabel,
        isAvailable: p.isAvailable,
        createdAt: p.createdAt.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };
    });
  } catch (err) {
    console.error('Failed to load dashboard metrics from database:', err);
  }

  const statCards = [
    {
      label: 'Total Products',
      value: String(totalProducts),
      icon: Package,
      gradient: 'from-[#7A1F2B] to-[#5C131D]',
      href: '/admin/products',
    },
    {
      label: 'Available',
      value: String(availableProducts),
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-emerald-700',
      href: '/admin/products',
    },
    {
      label: 'Unavailable',
      value: String(unavailableProducts),
      icon: XCircle,
      gradient: 'from-rose-500 to-rose-700',
      href: '/admin/availability',
    },
    {
      label: 'Festive Items',
      value: String(festiveProducts),
      icon: Sparkles,
      gradient: 'from-amber-500 to-orange-600',
      href: '/admin/products',
    },
    {
      label: 'Festivals',
      value: String(totalFestivals),
      icon: Calendar,
      gradient: 'from-purple-500 to-indigo-600',
      href: '/admin/festivals',
    },
    {
      label: 'Categories',
      value: String(totalCategories),
      icon: FolderTree,
      gradient: 'from-teal-500 to-emerald-600',
      href: '/admin/categories',
    },
    {
      label: 'Hampers',
      value: String(totalHampers),
      icon: Gift,
      gradient: 'from-orange-500 to-red-600',
      href: '/admin/hampers',
    },
    {
      label: 'Regular',
      value: String(regularProducts),
      icon: ChefHat,
      gradient: 'from-slate-500 to-slate-700',
      href: '/admin/products',
    },
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

  return (
    <div className="space-y-8">
      {/* Page header with welcome message */}
      <div className="rounded-2xl bg-gradient-to-r from-[#2B080C] via-[#4A101A] to-[#2B080C] p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-rose-500/10 rounded-full blur-[60px]" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
              Welcome Back! 👋
            </h1>
            <p className="text-sm text-amber-200/60">
              Real-time snapshot of your kitchen, products, and festival collections.
            </p>
          </div>
          <a
            href="/admin/products/new"
            className="btn btn-gold btn-md font-bold px-5 flex items-center gap-2 self-start hover-shine"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </a>
        </div>
      </div>

      {/* Stat cards with real database counts */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <a
              key={stat.label}
              href={stat.href}
              className="group rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-amber-300/50 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-amber-50/0 group-hover:from-amber-50/50 group-hover:to-orange-50/30 transition-all duration-300" />

              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-md mb-3`}
                >
                  <Icon size={18} />
                </div>
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                <div className="flex items-end justify-between mt-1">
                  <p
                    className="text-2xl font-bold text-slate-900"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {stat.value}
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.href + action.label}
                href={action.href}
                className={`group flex flex-col items-center justify-center gap-2.5 rounded-2xl border p-5 text-center text-sm font-bold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden ${
                  action.primary
                    ? 'bg-gradient-to-br from-[#7A1F2B] to-[#5C131D] text-white border-transparent shadow-md'
                    : 'bg-white text-[#7A1F2B] border-slate-200/80 hover:border-amber-300/50'
                }`}
                style={{ minHeight: '100px' }}
              >
                {!action.primary && (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-amber-50/0 group-hover:from-amber-50/50 group-hover:to-orange-50/30 transition-all duration-300" />
                )}
                <div className="relative">
                  <Icon
                    size={22}
                    strokeWidth={1.75}
                    className={action.primary ? 'text-amber-300' : ''}
                  />
                </div>
                <span className="relative">{action.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Needs attention + Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Needs attention */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 relative overflow-hidden">
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
              unavailableProducts > 0
                ? 'from-amber-500 to-rose-500'
                : 'from-emerald-400 to-teal-400'
            }`}
          />
          <h3
            className="text-base font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Needs Attention
          </h3>

          {unavailableProducts > 0 ? (
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900">
                <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold">
                    {unavailableProducts} product{unavailableProducts > 1 ? 's are' : ' is'} currently marked unavailable
                  </p>
                  <p className="text-amber-700">
                    Customers cannot order these items on the storefront.
                  </p>
                </div>
              </div>
              <a
                href="/admin/availability"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A1F2B] hover:underline"
              >
                Manage Product Availability →
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-3">
                <CheckCircle size={28} className="text-emerald-500" />
              </div>
              <p className="text-sm font-semibold text-slate-900">All looking good!</p>
              <p className="text-xs text-slate-500 mt-1">
                All {totalProducts} products are currently available in the catalogue.
              </p>
            </div>
          )}
        </div>

        {/* Recently updated products from database */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-base font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              Recent Products
            </h3>
            {recentProducts.length > 0 && (
              <a
                href="/admin/products"
                className="text-xs font-bold text-[#7A1F2B] hover:underline"
              >
                View all ({totalProducts})
              </a>
            )}
          </div>

          {recentProducts.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentProducts.map((p) => (
                <div key={p.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <a
                      href={`/admin/products/${p.id}/edit`}
                      className="text-sm font-bold text-slate-900 hover:text-[#7A1F2B] truncate block"
                    >
                      {p.name}
                    </a>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                      <span>{p.categoryName}</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">{p.priceLabel}</span>
                      <span>•</span>
                      <span>{p.createdAt}</span>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      p.isAvailable
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                    }`}
                  >
                    {p.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-3">
                <Package size={28} className="text-amber-500" />
              </div>
              <p className="text-sm font-semibold text-slate-900">No products yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Add your first product to get started.
              </p>
              <a
                href="/admin/products/new"
                className="mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#7A1F2B] to-[#5C131D] shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Plus size={16} />
                Add Product
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
