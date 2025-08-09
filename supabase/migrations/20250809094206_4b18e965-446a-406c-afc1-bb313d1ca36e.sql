-- Ensure handle_new_user function exists and properly creates profiles on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, display_name, username, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NULLIF(NEW.raw_user_meta_data->>'full_name',''),
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'full_name',''), lower(regexp_replace(split_part(NEW.email,'@',1),'[^a-zA-Z0-9_]+','','g'))),
    lower(regexp_replace(split_part(NEW.email,'@',1),'[^a-zA-Z0-9_]+','','g')),
    NULLIF(NEW.raw_user_meta_data->>'avatar_url','')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Recreate trigger on auth.users to call handle_new_user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Backfill profiles for existing users without a profile
INSERT INTO public.profiles (id, email, full_name, display_name, username, avatar_url)
SELECT 
  u.id,
  u.email,
  NULLIF(u.raw_user_meta_data->>'full_name','') AS full_name,
  COALESCE(NULLIF(u.raw_user_meta_data->>'full_name',''), lower(regexp_replace(split_part(u.email,'@',1),'[^a-zA-Z0-9_]+','','g'))) AS display_name,
  lower(regexp_replace(split_part(u.email,'@',1),'[^a-zA-Z0-9_]+','','g')) AS username,
  NULLIF(u.raw_user_meta_data->>'avatar_url','') AS avatar_url
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL;

-- Make sure the RPC used by the app exists and returns basic profile fields
CREATE OR REPLACE FUNCTION public.search_profiles(q text, limit_count integer DEFAULT 20)
RETURNS TABLE (
  id uuid,
  username text,
  display_name text,
  avatar_url text,
  full_name text,
  email text
)
LANGUAGE sql
STABLE
AS $$
  SELECT p.id, p.username, p.display_name, p.avatar_url, p.full_name, p.email
  FROM public.profiles p
  WHERE (
    p.username IS NOT NULL AND p.username ILIKE '%' || q || '%'
  ) OR (
    p.display_name IS NOT NULL AND p.display_name ILIKE '%' || q || '%'
  ) OR (
    p.full_name IS NOT NULL AND p.full_name ILIKE '%' || q || '%'
  ) OR (
    p.email IS NOT NULL AND p.email ILIKE '%' || q || '%'
  )
  ORDER BY 
    (CASE WHEN p.username ILIKE q || '%' THEN 0 ELSE 1 END),
    p.display_name NULLS LAST,
    p.full_name NULLS LAST
  LIMIT COALESCE(limit_count, 20);
$$;