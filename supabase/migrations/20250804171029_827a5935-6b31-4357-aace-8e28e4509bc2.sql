-- Remove admin approval requirement for events
-- Drop existing policies that require admin approval
DROP POLICY IF EXISTS "Anyone can view approved active events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can create events" ON public.events;
DROP POLICY IF EXISTS "Admins can view all events" ON public.events;
DROP POLICY IF EXISTS "Admins can update events" ON public.events;
DROP POLICY IF EXISTS "Admins can delete events" ON public.events;

-- Create new simplified policies without admin approval
CREATE POLICY "Anyone can view active events" 
ON public.events 
FOR SELECT 
USING (status = 'active');

CREATE POLICY "Authenticated users can create events" 
ON public.events 
FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL AND 
  created_by = auth.uid() AND
  approval_status = 'approved' AND
  status = 'active'
);

CREATE POLICY "Users can update their own events" 
ON public.events 
FOR UPDATE 
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own events" 
ON public.events 
FOR DELETE 
TO authenticated
USING (auth.uid() = created_by);

-- Update the event submission trigger to auto-approve events
CREATE OR REPLACE FUNCTION public.handle_new_event_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Auto-approve all new events and set them as active
  NEW.approval_status = 'approved';
  NEW.status = 'active';
  NEW.submission_date = now();
  
  RETURN NEW;
END;
$$;

-- Create trigger for auto-approval
DROP TRIGGER IF EXISTS auto_approve_events ON public.events;
CREATE TRIGGER auto_approve_events
  BEFORE INSERT ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_event_submission();