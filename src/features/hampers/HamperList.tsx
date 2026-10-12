'use client';

import { useState } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Gift, Search } from 'lucide-react';

export function HamperList() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <div className="toolbar">
        <div className="toolbar-search">
          <Input
            label=""
            placeholder="Search hampers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
      </div>

      <EmptyState
        icon={<Gift size={48} strokeWidth={1.5} />}
        title="No hampers yet"
        description="Create your first gift hamper bundle for a festival."
        action={{ label: 'Add Hamper', href: '/admin/hampers/new' }}
      />
    </>
  );
}
