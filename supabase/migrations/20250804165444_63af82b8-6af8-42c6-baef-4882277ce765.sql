-- Temporarily disable the trigger to test if it's causing RLS issues
ALTER TABLE public.events DISABLE TRIGGER on_event_submitted;