-- Let's simplify the trigger function to avoid potential RLS issues
-- The issue might be that the trigger is trying to insert notifications that violate RLS
CREATE OR REPLACE FUNCTION public.handle_new_event_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- Set default values for new events  
  NEW.approval_status = COALESCE(NEW.approval_status, 'pending');
  NEW.status = COALESCE(NEW.status, 'pending');
  NEW.submission_date = COALESCE(NEW.submission_date, now());
  
  -- Don't try to insert notifications here - do it after the event is created
  -- to avoid RLS conflicts
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';