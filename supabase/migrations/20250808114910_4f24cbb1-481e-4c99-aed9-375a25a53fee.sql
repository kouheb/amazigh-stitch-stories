-- Create GIN index for fast text search on profiles
CREATE INDEX IF NOT EXISTS idx_profiles_search ON public.profiles USING GIN (
  to_tsvector('simple', coalesce(display_name,'') || ' ' || coalesce(full_name,'') || ' ' || coalesce(email,''))
);

-- Search function leveraging the index
CREATE OR REPLACE FUNCTION public.search_profiles(q text, limit_count int DEFAULT 20)
RETURNS SETOF public.profiles
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO ''
AS $$
  SELECT p.*
  FROM public.profiles p
  WHERE to_tsvector('simple', coalesce(p.display_name,'') || ' ' || coalesce(p.full_name,'') || ' ' || coalesce(p.email,''))
        @@ plainto_tsquery('simple', q)
  ORDER BY ts_rank(
    to_tsvector('simple', coalesce(p.display_name,'') || ' ' || coalesce(p.full_name,'') || ' ' || coalesce(p.email,'')),
    plainto_tsquery('simple', q)
  ) DESC
  LIMIT limit_count;
$$;