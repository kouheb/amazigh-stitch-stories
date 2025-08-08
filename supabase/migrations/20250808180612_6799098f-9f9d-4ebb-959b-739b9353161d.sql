-- Ensure profiles are auto-created on signup and backfill missing profiles
-- Create trigger to call existing public.handle_new_user after insert on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Backfill profiles for existing auth users without a profile
INSERT INTO public.profiles (id, email, full_name, display_name, username, avatar_url)
SELECT 
  u.id,
  u.email,
  NULLIF(u.raw_user_meta_data->>'full_name', '') AS full_name,
  COALESCE(NULLIF(u.raw_user_meta_data->>'full_name', ''), lower(regexp_replace(split_part(u.email, '@', 1), '[^a-zA-Z0-9_]+', '', 'g'))) AS display_name,
  lower(regexp_replace(split_part(u.email, '@', 1), '[^a-zA-Z0-9_]+', '', 'g')) AS username,
  NULL AS avatar_url
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL;