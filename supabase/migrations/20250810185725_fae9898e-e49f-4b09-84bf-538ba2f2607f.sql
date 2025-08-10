-- 1) Clean, consistent Events/Registrations backend with RLS, capacity enforcement, and notifications
-- NOTE: We will use existing tables `events` and `event_registrations` and enhance them.
-- We also configure a public storage bucket for event images.

-- =============================
-- EVENTS TABLE ENHANCEMENTS
-- =============================
-- Add attendees_public flag for optional attendee list visibility
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS attendees_public boolean NOT NULL DEFAULT false;

-- Helpful search indexes
CREATE INDEX IF NOT EXISTS idx_events_date_time ON public.events (date_time);
CREATE INDEX IF NOT EXISTS idx_events_category ON public.events (category);
CREATE INDEX IF NOT EXISTS idx_events_location ON public.events (location);

-- =============================
-- REGISTRATIONS TABLE FIXES
-- =============================
-- Ensure user_id is required for proper RLS
ALTER TABLE public.event_registrations
  ALTER COLUMN user_id SET NOT NULL;

-- Ensure unique registration per user per event
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'uniq_event_user_registration'
  ) THEN
    ALTER TABLE public.event_registrations
      ADD CONSTRAINT uniq_event_user_registration UNIQUE (event_id, user_id);
  END IF;
END $$;

-- =============================
-- TRIGGERS & FUNCTIONS
-- =============================
-- 1. BEFORE INSERT on events: set defaults & creator
CREATE OR REPLACE FUNCTION public.before_insert_events_set_defaults()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.created_by IS NULL THEN
    NEW.created_by := auth.uid();
  END IF;
  IF NEW.status IS NULL THEN
    NEW.status := 'active';
  END IF;
  IF NEW.approval_status IS NULL THEN
    NEW.approval_status := 'approved';
  END IF;
  IF NEW.submission_date IS NULL THEN
    NEW.submission_date := now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_before_insert_events_set_defaults ON public.events;
CREATE TRIGGER trg_before_insert_events_set_defaults
BEFORE INSERT ON public.events
FOR EACH ROW EXECUTE FUNCTION public.before_insert_events_set_defaults();

-- 2. BEFORE INSERT on event_registrations: capacity & auth enforcement
CREATE OR REPLACE FUNCTION public.before_insert_event_registrations_enforce_capacity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _event RECORD;
  _current_count integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required to register';
  END IF;

  -- Auto-attach user
  IF NEW.user_id IS NULL THEN
    NEW.user_id := auth.uid();
  ELSIF NEW.user_id <> auth.uid() THEN
    RAISE EXCEPTION 'You can only register yourself';
  END IF;

  SELECT * INTO _event FROM public.events WHERE id = NEW.event_id;
  IF _event IS NULL THEN
    RAISE EXCEPTION 'Event not found';
  END IF;

  IF COALESCE(_event.status, 'active') <> 'active' THEN
    RAISE EXCEPTION 'Event is not active';
  END IF;

  -- Capacity check
  IF _event.max_attendees IS NOT NULL THEN
    SELECT COUNT(*) INTO _current_count FROM public.event_registrations WHERE event_id = NEW.event_id;
    IF _current_count >= _event.max_attendees THEN
      RAISE EXCEPTION 'Event is full';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_before_insert_event_registrations_enforce_capacity ON public.event_registrations;
CREATE TRIGGER trg_before_insert_event_registrations_enforce_capacity
BEFORE INSERT ON public.event_registrations
FOR EACH ROW EXECUTE FUNCTION public.before_insert_event_registrations_enforce_capacity();

-- 3. AFTER INSERT/DELETE on event_registrations: maintain counts & notify
CREATE OR REPLACE FUNCTION public.after_change_event_registrations_update_counts_and_notify()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _event RECORD;
  _actor uuid;
BEGIN
  IF TG_OP = 'INSERT' THEN
    _actor := NEW.user_id;
    SELECT * INTO _event FROM public.events WHERE id = NEW.event_id;

    -- increment counter
    UPDATE public.events SET current_attendees = COALESCE(current_attendees,0) + 1, updated_at = now() WHERE id = NEW.event_id;

    -- notify creator of new registration
    INSERT INTO public.notifications (user_id, title, message, type, action_url)
    VALUES (
      _event.created_by,
      'New Registration',
      'Someone registered for your event: ' || _event.title,
      'event',
      '/events/' || _event.id::text
    );

    -- notify attendee of successful registration
    INSERT INTO public.notifications (user_id, title, message, type, action_url)
    VALUES (
      NEW.user_id,
      'Registration Confirmed',
      'You are registered for: ' || _event.title,
      'event',
      '/events/' || _event.id::text
    );

    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    _actor := OLD.user_id;
    SELECT * INTO _event FROM public.events WHERE id = OLD.event_id;

    -- decrement counter
    UPDATE public.events SET current_attendees = GREATEST(COALESCE(current_attendees,0) - 1, 0), updated_at = now() WHERE id = OLD.event_id;

    -- notify creator of unregister
    INSERT INTO public.notifications (user_id, title, message, type, action_url)
    VALUES (
      _event.created_by,
      'Registration Cancelled',
      'An attendee unregistered from: ' || _event.title,
      'event',
      '/events/' || _event.id::text
    );

    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_after_change_event_registrations_update_counts_and_notify ON public.event_registrations;
CREATE TRIGGER trg_after_change_event_registrations_update_counts_and_notify
AFTER INSERT OR DELETE ON public.event_registrations
FOR EACH ROW EXECUTE FUNCTION public.after_change_event_registrations_update_counts_and_notify();

-- 4. AFTER UPDATE on events: notify attendees of updates
CREATE OR REPLACE FUNCTION public.after_update_events_notify_attendees()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only notify for meaningful updates
  IF (NEW.title IS DISTINCT FROM OLD.title)
     OR (NEW.description IS DISTINCT FROM OLD.description)
     OR (NEW.date_time IS DISTINCT FROM OLD.date_time)
     OR (NEW.location IS DISTINCT FROM OLD.location)
     OR (NEW.max_attendees IS DISTINCT FROM OLD.max_attendees)
     OR (NEW.status IS DISTINCT FROM OLD.status) THEN

    INSERT INTO public.notifications (user_id, title, message, type, action_url)
    SELECT r.user_id,
           'Event Updated',
           'An event you registered for was updated: ' || NEW.title,
           'event',
           '/events/' || NEW.id::text
    FROM public.event_registrations r
    WHERE r.event_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_after_update_events_notify_attendees ON public.events;
CREATE TRIGGER trg_after_update_events_notify_attendees
AFTER UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.after_update_events_notify_attendees();

-- 5. AFTER DELETE on events: notify all attendees of cancellation
CREATE OR REPLACE FUNCTION public.after_delete_events_notify_attendees()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, action_url)
  SELECT r.user_id,
         'Event Cancelled',
         'An event you registered for was cancelled: ' || OLD.title,
         'event',
         '/events'
  FROM public.event_registrations r
  WHERE r.event_id = OLD.id;

  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS trg_after_delete_events_notify_attendees ON public.events;
CREATE TRIGGER trg_after_delete_events_notify_attendees
AFTER DELETE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.after_delete_events_notify_attendees();

-- =============================
-- RLS POLICY UPDATES
-- =============================
-- EVENTS policies: simplify insert; keep select active only; update/delete by creator
DROP POLICY IF EXISTS "Authenticated users can create events" ON public.events;
DROP POLICY IF EXISTS "Public can view all active events" ON public.events;
DROP POLICY IF EXISTS "Anonymous can view all active events" ON public.events;
DROP POLICY IF EXISTS "Users can delete their own events" ON public.events;
DROP POLICY IF EXISTS "Users can update their own events" ON public.events;

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable when active"
ON public.events
FOR SELECT
USING (status = 'active');

CREATE POLICY "Users can create their own events"
ON public.events
FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own events"
ON public.events
FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own events"
ON public.events
FOR DELETE
USING (auth.uid() = created_by);

-- EVENT_REGISTRATIONS policies
DROP POLICY IF EXISTS "Admins can view all registrations" ON public.event_registrations;
DROP POLICY IF EXISTS "Anyone can register for events" ON public.event_registrations;
DROP POLICY IF EXISTS "Users can update their own registrations" ON public.event_registrations;
DROP POLICY IF EXISTS "Users can view their own registrations" ON public.event_registrations;

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Admins can view all (keep existing behavior)
CREATE POLICY "Admins can view all registrations"
ON public.event_registrations
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Users can insert their own registration (auth required); user_id will be set by trigger if omitted
CREATE POLICY "Authenticated users can register for events"
ON public.event_registrations
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND (user_id = auth.uid()));

-- Users can cancel their own registration
CREATE POLICY "Users can delete their own registrations"
ON public.event_registrations
FOR DELETE
USING (auth.uid() = user_id);

-- Users can view their own registrations
CREATE POLICY "Users can view their own registrations"
ON public.event_registrations
FOR SELECT
USING (auth.uid() = user_id);

-- Event creators can view registrations for their events
CREATE POLICY "Creators can view registrations for their events"
ON public.event_registrations
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.events e
  WHERE e.id = event_registrations.event_id AND e.created_by = auth.uid()
));

-- Public can view registrations if attendees list is public
CREATE POLICY "Public can view registrations for public attendee lists"
ON public.event_registrations
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.events e
  WHERE e.id = event_registrations.event_id AND e.attendees_public = true
));

-- =============================
-- STORAGE: EVENT IMAGES BUCKET & POLICIES
-- =============================
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public can view event images
CREATE POLICY IF NOT EXISTS "Public can view event images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'event-images');

-- Authenticated users can upload to their own folder
CREATE POLICY IF NOT EXISTS "Users can upload event images to their folder"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'event-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Authenticated users can update/delete their own uploads
CREATE POLICY IF NOT EXISTS "Users can update their event images"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'event-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY IF NOT EXISTS "Users can delete their event images"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'event-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
