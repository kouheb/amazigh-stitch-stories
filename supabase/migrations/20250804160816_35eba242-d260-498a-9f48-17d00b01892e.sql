-- Add approval system to events
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS approval_status text DEFAULT 'pending';

-- Update existing events to be approved
UPDATE public.events 
SET approval_status = 'approved' 
WHERE approval_status IS NULL OR approval_status = 'active';

-- Update the status column to be more specific about event lifecycle
-- Keep status for event lifecycle (active/cancelled/completed)
-- Use approval_status for moderation (pending/approved/rejected)

-- Update RLS policies to handle approval status
DROP POLICY IF EXISTS "Anyone can view active events" ON public.events;

-- Create new policy for viewing events
CREATE POLICY "Users can view approved active events" 
ON public.events 
FOR SELECT 
USING (approval_status = 'approved' AND status = 'active');

-- Admins can view all events
CREATE POLICY "Admins can view all events" 
ON public.events 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow authenticated users to create events (will be pending by default)
DROP POLICY IF EXISTS "Admins can create events" ON public.events;

CREATE POLICY "Authenticated users can create events" 
ON public.events 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Admins can update event approval status
CREATE POLICY "Admins can update event approval" 
ON public.events 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));