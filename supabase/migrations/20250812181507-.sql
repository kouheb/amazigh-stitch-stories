-- Marketplace Phase 1 schema and storage
-- 1) Listings table
CREATE TABLE IF NOT EXISTS public.marketplace_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  price_cents integer NOT NULL CHECK (price_cents >= 0),
  category text NOT NULL,
  condition text NOT NULL CHECK (condition IN ('new','used')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('draft','pending','approved','rejected','sold')),
  location_city text,
  location_country text,
  tags text[],
  featured boolean DEFAULT false,
  views integer DEFAULT 0,
  primary_image_url text,
  primary_thumbnail_url text,
  approved_by uuid,
  approved_at timestamptz,
  rejection_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public can view approved listings; sellers can view their own; admins can view all
CREATE POLICY IF NOT EXISTS "Public can view approved listings or owner/admin"
ON public.marketplace_listings
FOR SELECT
USING (
  status = 'approved'
  OR auth.uid() = seller_id
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Sellers can insert their own listings
CREATE POLICY IF NOT EXISTS "Users can create their own listings"
ON public.marketplace_listings
FOR INSERT
WITH CHECK (auth.uid() = seller_id);

-- Sellers can update their own listings; admins can update all
CREATE POLICY IF NOT EXISTS "Users can update their own listings or admin"
ON public.marketplace_listings
FOR UPDATE
USING (auth.uid() = seller_id OR has_role(auth.uid(), 'admin'::app_role));

-- Sellers can delete their own listings; admins can delete all
CREATE POLICY IF NOT EXISTS "Users can delete their own listings or admin"
ON public.marketplace_listings
FOR DELETE
USING (auth.uid() = seller_id OR has_role(auth.uid(), 'admin'::app_role));

-- Trigger to auto-update updated_at
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_marketplace_listings_updated_at'
  ) THEN
    CREATE TRIGGER trg_marketplace_listings_updated_at
    BEFORE UPDATE ON public.marketplace_listings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- 2) Listing images table
CREATE TABLE IF NOT EXISTS public.marketplace_listing_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL,
  url text NOT NULL,
  thumbnail_url text,
  is_primary boolean DEFAULT false,
  position integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.marketplace_listing_images ENABLE ROW LEVEL SECURITY;

-- Select images when listing is approved or user owns the listing or admin
CREATE POLICY IF NOT EXISTS "Public can view images for approved listings or owner/admin"
ON public.marketplace_listing_images
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.marketplace_listings ml
    WHERE ml.id = listing_id
      AND (ml.status = 'approved' OR ml.seller_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role))
  )
);

-- Insert/Update/Delete only by listing owner or admin
CREATE POLICY IF NOT EXISTS "Owner or admin can insert images"
ON public.marketplace_listing_images
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.marketplace_listings ml
    WHERE ml.id = listing_id AND (ml.seller_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role))
  )
);

CREATE POLICY IF NOT EXISTS "Owner or admin can update images"
ON public.marketplace_listing_images
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.marketplace_listings ml
    WHERE ml.id = listing_id AND (ml.seller_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role))
  )
);

CREATE POLICY IF NOT EXISTS "Owner or admin can delete images"
ON public.marketplace_listing_images
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.marketplace_listings ml
    WHERE ml.id = listing_id AND (ml.seller_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role))
  )
);

-- 3) Storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
-- Public can read product images
CREATE POLICY IF NOT EXISTS "Public read access to product images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'product-images');

-- Users can upload to their own folder (first path segment == user id)
CREATE POLICY IF NOT EXISTS "Users can upload product images to own folder"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can update their own images
CREATE POLICY IF NOT EXISTS "Users can update own product images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own images
CREATE POLICY IF NOT EXISTS "Users can delete own product images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
