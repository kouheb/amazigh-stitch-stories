-- Fix signup failure: column "_username" does not exist by correcting function structure and ensuring trigger exists
-- 1) Replace handle_new_user with proper DECLARE block and safe logic
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  _username text;
  _full_name text;
BEGIN
  _full_name := NEW.raw_user_meta_data->>'full_name';

  -- Derive a username from email local-part and sanitize
  BEGIN
    _username := lower(regexp_replace(split_part(NEW.email, '@', 1), '[^a-zA-Z0-9_]+', '', 'g'));
  EXCEPTION WHEN others THEN
    _username := NULL;
  END;

  INSERT INTO public.profiles (id, email, full_name, display_name, username, avatar_url)
  VALUES (NEW.id, NEW.email, _full_name, COALESCE(_full_name, _username), _username, NULL)
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
        display_name = COALESCE(public.profiles.display_name, EXCLUDED.display_name),
        username = COALESCE(public.profiles.username, EXCLUDED.username),
        updated_at = now();

  RETURN NEW;
END;
$$;

-- 2) Ensure trigger on auth.users calls this function exactly once
DO $$
BEGIN
  -- Drop any existing conflicting trigger to avoid duplicates
  IF EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'auth' AND c.relname = 'users' AND t.tgname = 'on_auth_user_created'
  ) THEN
    EXECUTE 'DROP TRIGGER on_auth_user_created ON auth.users';
  END IF;

  -- Create fresh trigger
  EXECUTE 'CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user()';
END $$;