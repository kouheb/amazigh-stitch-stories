-- Update RLS policies for events table to allow anyone to create events
-- and ensure proper approval workflow

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Authenticated users can create events" ON events;

-- Create new policy allowing anyone to create events (they will be pending by default)
CREATE POLICY "Anyone can create events for approval" 
ON events 
FOR INSERT 
WITH CHECK (true);

-- Ensure the events table has the right structure for approval workflow
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS creator_email TEXT,
ADD COLUMN IF NOT EXISTS submission_date TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create trigger to automatically set events as pending and send notification
CREATE OR REPLACE FUNCTION handle_new_event_submission()
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
  JOIN user_roles ur ON u.id = ur.user_id
  WHERE ur.role = 'admin';
  
  -- Only try to call the notification function if we have admins
  IF admin_count > 0 THEN
    -- Insert notification for admins about new event submission
    INSERT INTO notifications (
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
    FROM user_roles ur
    WHERE ur.role = 'admin';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new event submissions
DROP TRIGGER IF EXISTS on_event_submitted ON events;
CREATE TRIGGER on_event_submitted
  BEFORE INSERT ON events
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_event_submission();