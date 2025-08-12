import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: any;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const price = (product.price_cents || 0) / 100;

  return (
    <Card className="p-3 hover:shadow-md transition cursor-pointer" onClick={() => navigate(`/marketplace/product/${product.id}`)}>
      <div className="w-full aspect-square bg-gray-100 rounded mb-3 overflow-hidden">
        {product.primary_thumbnail_url ? (
          <img src={product.primary_thumbnail_url} alt={`${product.title} thumbnail`} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Image</div>
        )}
      </div>
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-medium line-clamp-1">{product.title}</h3>
        <Badge variant="secondary" className="capitalize">{product.condition}</Badge>
      </div>
      <div className="text-sm text-gray-500 mb-2">{product.location_city || ''}{product.location_city && product.location_country ? ', ' : ''}{product.location_country || ''}</div>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">${price.toFixed(2)}</div>
        <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/marketplace/product/${product.id}`); }}>View</Button>
      </div>
    </Card>
  );
};
