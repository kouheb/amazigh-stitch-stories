-- Event Management System migration: triggers only (idempotent)
-- Ensure RLS is enabled on events and event_registrations
alter table if exists public.events enable row level security;
alter table if exists public.event_registrations enable row level security;

-- BEFORE INSERT: set defaults on events
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'events' AND t.tgname = 'before_insert_events_set_defaults'
  ) THEN
    CREATE TRIGGER before_insert_events_set_defaults
    BEFORE INSERT ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.before_insert_events_set_defaults();
  END IF;
END$$;

-- BEFORE INSERT: handle new event submission
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'events' AND t.tgname = 'before_insert_events_handle_submission'
  ) THEN
    CREATE TRIGGER before_insert_events_handle_submission
    BEFORE INSERT ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_event_submission();
  END IF;
END$$;

-- Ensure update_updated_at_column exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- BEFORE UPDATE: auto-update updated_at on events
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'events' AND t.tgname = 'update_events_updated_at'
  ) THEN
    CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END$$;

-- AFTER UPDATE: notify attendees
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'events' AND t.tgname = 'after_update_events_notify_attendees'
  ) THEN
    CREATE TRIGGER after_update_events_notify_attendees
    AFTER UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.after_update_events_notify_attendees();
  END IF;
END$$;

-- AFTER DELETE: notify attendees when event is deleted
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'events' AND t.tgname = 'after_delete_events_notify_attendees'
  ) THEN
    CREATE TRIGGER after_delete_events_notify_attendees
    AFTER DELETE ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.after_delete_events_notify_attendees();
  END IF;
END$$;

-- BEFORE INSERT: enforce capacity for event_registrations
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'event_registrations' AND t.tgname = 'before_insert_event_registrations_enforce_capacity'
  ) THEN
    CREATE TRIGGER before_insert_event_registrations_enforce_capacity
    BEFORE INSERT ON public.event_registrations
    FOR EACH ROW EXECUTE FUNCTION public.before_insert_event_registrations_enforce_capacity();
  END IF;
END$$;

-- AFTER INSERT OR DELETE: update counts and notify
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'event_registrations' AND t.tgname = 'after_change_event_registrations_update_counts_and_notify'
  ) THEN
    CREATE TRIGGER after_change_event_registrations_update_counts_and_notify
    AFTER INSERT OR DELETE ON public.event_registrations
    FOR EACH ROW EXECUTE FUNCTION public.after_change_event_registrations_update_counts_and_notify();
  END IF;
END$$;