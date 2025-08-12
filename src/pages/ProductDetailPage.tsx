import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { toast } from '@/hooks/use-toast';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [seller, setSeller] = useState<any | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      const { data: listing, error } = await supabase
        .from('marketplace_listings')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) {
        toast({ title: 'Error', description: error.message });
        return;
      }
      if (!listing) return;
      setProduct(listing);

      const { data: imgs } = await supabase
        .from('marketplace_listing_images')
        .select('*')
        .eq('listing_id', listing.id)
        .order('position', { ascending: true });
      setImages(imgs || []);

      const { data: prof } = await supabase
        .from('profiles')
        .select('id, display_name, full_name, email, avatar_url')
        .eq('id', listing.seller_id)
        .maybeSingle();
      setSeller(prof || null);
    };
    run();
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1); else navigate('/marketplace');
  };

  const handleMessageSeller = () => {
    if (!product?.seller_id) return;
    navigate(`/messaging?userId=${product.seller_id}`);
  };

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Button variant="ghost" onClick={handleBack}>Back</Button>
      <div className="mt-8 text-gray-500">Product not found.</div>
    </div>
  );

  const price = (product.price_cents || 0) / 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Button variant="ghost" onClick={handleBack} className="mb-4">Back</Button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            {images && images.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((img) => (
                    <CarouselItem key={img.id}>
                      <img src={img.url} alt={product.title} className="w-full h-auto rounded" loading="lazy" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="w-full aspect-square bg-gray-100 rounded" />
            )}
          </Card>
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="capitalize">{product.condition}</Badge>
                <span className="text-gray-500">{product.category}</span>
              </div>
            </div>
            <div className="text-3xl font-semibold">${price.toFixed(2)}</div>
            <div className="text-gray-700 whitespace-pre-line">{product.description || 'No description provided.'}</div>
            <div className="text-gray-500">{product.location_city || ''}{product.location_city && product.location_country ? ', ' : ''}{product.location_country || ''}</div>
            <div className="flex flex-wrap gap-2">
              {(product.tags || []).map((t: string) => <Badge key={t} variant="outline">{t}</Badge>)}
            </div>
            <div className="flex gap-3">
              <Button onClick={handleMessageSeller}>Message Seller</Button>
            </div>
            {seller && (
              <Card className="p-4">
                <div className="text-sm text-gray-500 mb-1">Seller</div>
                <div className="font-medium">{seller.display_name || seller.full_name || seller.email}</div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
