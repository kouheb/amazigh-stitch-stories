-- Fix the search path issue for the new function
CREATE OR REPLACE FUNCTION public.handle_new_event_submission()
RETURNS TRIGGER AS $$
DECLARE
  admin_count INTEGER;
BEGIN
  -- Set default values for new events
  NEW.approval_status = COALESCE(NEW.approval_status, 'pending');
  NEW.status = COALESCE(NEW.status, 'pending');
  NEW.submission_date = COALESCE(NEW.submission_date, now());
  
  -- Check if there are any admins to notify
  SELECT COUNT(*) INTO admin_count 
  FROM auth.users u
  JOIN public.user_roles ur ON u.id = ur.user_id
  WHERE ur.role = 'admin';
  
  -- Only try to call the notification function if we have admins
  IF admin_count > 0 THEN
    -- Insert notification for admins about new event submission
    INSERT INTO public.notifications (
      user_id,
      title,
      message,
      type,
      action_url
    )
    SELECT 
      ur.user_id,
      'New Event Submission',
      'A new event "' || NEW.title || '" has been submitted and requires approval.',
      'info',
      '/app?tab=events&admin=true'
    FROM public.user_roles ur
    WHERE ur.role = 'admin';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';