-- Fix messaging send error by removing outdated trigger that references NEW.recipient_id
-- The messages table no longer has recipient_id; this trigger causes 42703 errors on insert

-- Drop the problematic trigger if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'messages' AND t.tgname = 'trg_update_conversation_on_message'
  ) THEN
    EXECUTE 'DROP TRIGGER trg_update_conversation_on_message ON public.messages';
  END IF;
END $$;

-- Drop the outdated function if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'update_conversation_timestamp'
  ) THEN
    EXECUTE 'DROP FUNCTION public.update_conversation_timestamp()';
  END IF;
END $$;

-- Ensure we retain a valid trigger that updates last_message_at using conversation_id
-- Create (or replace) a single canonical function and trigger to avoid duplicates
CREATE OR REPLACE FUNCTION public.update_conversation_last_message_canonical()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  UPDATE public.conversations 
  SET 
    last_message_at = NEW.created_at,
    updated_at = now()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;

-- Remove duplicate triggers that perform the same update to keep things clean
DO $$
DECLARE
  rec record;
BEGIN
  FOR rec IN 
    SELECT t.tgname FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'messages' AND NOT t.tgisinternal
  LOOP
    IF rec.tgname <> 'update_conversation_last_message_canonical_trigger' THEN
      EXECUTE format('DROP TRIGGER IF EXISTS %I ON public.messages', rec.tgname);
    END IF;
  END LOOP;
END $$;

-- Create our single canonical trigger
CREATE TRIGGER update_conversation_last_message_canonical_trigger
AFTER INSERT ON public.messages
FOR EACH ROW
EXECUTE FUNCTION public.update_conversation_last_message_canonical();