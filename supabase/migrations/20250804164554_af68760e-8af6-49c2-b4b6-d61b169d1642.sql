-- Let's try to bypass the trigger temporarily and see if the RLS policy itself works
-- First, let's disable the trigger temporarily
ALTER TABLE public.events DISABLE TRIGGER on_event_submitted;

-- Test if we can insert directly without the trigger
-- (This is just to debug - we'll re-enable it right after)