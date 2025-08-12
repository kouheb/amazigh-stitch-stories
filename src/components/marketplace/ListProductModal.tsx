import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { generateSquareThumbnail } from '@/utils/image';

interface ListProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (listingId: string) => void;
}

const CATEGORIES = ['Fashion', 'Electronics', 'Home', 'Art', 'Sports'];

export const ListProductModal = ({ isOpen, onClose, onCreated }: ListProductModalProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [condition, setCondition] = useState<'new' | 'used'>('new');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
    setImages(prev => [...prev, ...valid].slice(0, 8));
  };

  const reset = () => {
    setTitle(''); setDescription(''); setPrice(''); setCategory(CATEGORIES[0]); setCondition('new');
    setCity(''); setCountry(''); setTagsInput(''); setImages([]);
  };

  const submit = async () => {
    if (!user?.id) {
      toast({ title: 'Please sign in', description: 'You need to be logged in to list a product.' });
      return;
    }
    if (!title || !price) {
      toast({ title: 'Missing fields', description: 'Title and price are required.' });
      return;
    }

    setLoading(true);
    try {
      const priceCents = Math.round(parseFloat(price) * 100);
      const tags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      // 1) Create listing (status pending)
      const { data: listing, error: insertErr } = await supabase
        .from('marketplace_listings')
        .insert({
          seller_id: user.id,
          title,
          description,
          price_cents: priceCents,
          category,
          condition,
          location_city: city,
          location_country: country,
          tags,
          status: 'pending'
        })
        .select('*')
        .maybeSingle();
      if (insertErr || !listing) throw insertErr || new Error('Failed to create listing');

      let primaryImageUrl: string | undefined;
      let primaryThumbUrl: string | undefined;

      // 2) Upload images and thumbnails
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const filePath = `${user.id}/${listing.id}/${Date.now()}_${i}_${file.name}`;
        const { data: uploadRes, error: uploadErr } = await supabase
          .storage
          .from('product-images')
          .upload(filePath, file, { upsert: false });
        if (uploadErr) throw uploadErr;

        // Public URL
        const { data: pub } = supabase
          .storage
          .from('product-images')
          .getPublicUrl(uploadRes.path);
        const url = pub.publicUrl;

        // Thumbnail
        const thumbBlob = await generateSquareThumbnail(file, 400);
        const thumbPath = `${user.id}/${listing.id}/thumb_${Date.now()}_${i}.webp`;
        const { data: thumbUpload, error: thumbErr } = await supabase
          .storage
          .from('product-images')
          .upload(thumbPath, thumbBlob, { contentType: 'image/webp' });
        if (thumbErr) throw thumbErr;
        const { data: thumbPub } = supabase
          .storage
          .from('product-images')
          .getPublicUrl(thumbUpload.path);
        const thumbUrl = thumbPub.publicUrl;

        if (i === 0) {
          primaryImageUrl = url;
          primaryThumbUrl = thumbUrl;
        }

        await supabase.from('marketplace_listing_images').insert({
          listing_id: listing.id,
          url,
          thumbnail_url: thumbUrl,
          is_primary: i === 0,
          position: i,
        });
      }

      // 3) Update listing with primary image urls
      if (primaryImageUrl || primaryThumbUrl) {
        await supabase
          .from('marketplace_listings')
          .update({
            primary_image_url: primaryImageUrl,
            primary_thumbnail_url: primaryThumbUrl,
          })
          .eq('id', listing.id);
      }

      toast({
        title: 'Listing submitted',
        description: 'Your product is pending admin approval.'
      });
      onCreated?.(listing.id);
      reset();
      onClose();
    } catch (e: any) {
      console.error(e);
      toast({ title: 'Error', description: e.message || 'Failed to create listing' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>List a Product</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="price">Price (USD)</Label>
              <Input id="price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Condition</Label>
                <Select value={condition} onValueChange={(v: any) => setCondition(v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>City</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div>
                <Label>Country</Label>
                <Input value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Tags (comma separated)</Label>
              <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="e.g. handmade, vintage, limited" />
              <div className="mt-2 flex flex-wrap gap-1">
                {tagsInput.split(',').map(t => t.trim()).filter(Boolean).slice(0,6).map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label>Images (up to 8)</Label>
              <Input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} />
              <div className="grid grid-cols-4 gap-2 mt-2">
                {images.map((img, idx) => (
                  <div key={idx} className="w-full aspect-square overflow-hidden rounded bg-gray-100 text-xs flex items-center justify-center">
                    {img.name}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea rows={8} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={submit} disabled={loading}>{loading ? 'Submitting...' : 'Submit for Approval'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
