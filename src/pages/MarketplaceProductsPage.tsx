import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ListProductModal } from '@/components/marketplace/ListProductModal';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 12;
const CATEGORIES = ['All', 'Fashion', 'Electronics', 'Home', 'Art', 'Sports'];

export const MarketplaceProductsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [condition, setCondition] = useState<'all' | 'new' | 'used'>('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [listModalOpen, setListModalOpen] = useState(false);

  const load = async (reset = false) => {
    setLoading(true);
    try {
      let q = supabase.from('marketplace_listings').select('*').eq('status', 'approved');
      if (category !== 'All') q = q.eq('category', category);
      if (condition !== 'all') q = q.eq('condition', condition);
      if (minPrice) q = q.gte('price_cents', Math.round(parseFloat(minPrice) * 100));
      if (maxPrice) q = q.lte('price_cents', Math.round(parseFloat(maxPrice) * 100));
      if (query) q = q.or(`title.ilike.%${query}%,description.ilike.%${query}%`);

      const from = reset ? 0 : page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await q.order('created_at', { ascending: false }).range(from, to);
      if (error) throw error;

      const rows = data || [];
      setHasMore(rows.length === PAGE_SIZE);
      setProducts(prev => reset ? rows : [...prev, ...rows]);
      if (reset) setPage(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilters = () => {
    setPage(0);
    load(true);
  };

  const loadMore = () => {
    if (loading || !hasMore) return;
    setPage(p => p + 1);
    setTimeout(() => load(false), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-start md:items-center justify-between gap-3 flex-col md:flex-row">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
            <p className="text-gray-600">Browse products from members. Admin approval keeps listings safe.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" onClick={() => setListModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> List a Product
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="pl-10" />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(s => !s)}>
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
          </Button>
          <Button onClick={applyFilters}>Apply</Button>
        </div>

        {showFilters && (
          <Card className="p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <Button key={c} size="sm" variant={category === c ? 'default' : 'outline'} onClick={() => setCategory(c)}>
                    {c}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant={condition === 'all' ? 'default' : 'outline'} onClick={() => setCondition('all')}>All</Button>
                <Button size="sm" variant={condition === 'new' ? 'default' : 'outline'} onClick={() => setCondition('new')}>New</Button>
                <Button size="sm" variant={condition === 'used' ? 'default' : 'outline'} onClick={() => setCondition('used')}>Used</Button>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="Min $" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <span>-</span>
                <Input placeholder="Max $" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              </div>
              <div className="text-sm text-gray-500 self-center">Results: <Badge variant="secondary">{products.length}</Badge></div>
            </div>
          </Card>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Load more */}
        <div className="flex justify-center my-6">
          {hasMore && (
            <Button onClick={loadMore} disabled={loading}>{loading ? 'Loading...' : 'Load More'}</Button>
          )}
        </div>
      </div>

      <ListProductModal isOpen={listModalOpen} onClose={() => setListModalOpen(false)} onCreated={(id) => navigate(`/marketplace/product/${id}`)} />
    </div>
  );
};
