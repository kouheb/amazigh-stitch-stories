-- Make events publicly viewable by everyone
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can view active events" ON public.events;

-- Create new public viewing policy that allows everyone to see all active events
CREATE POLICY "Public can view all active events" 
ON public.events 
FOR SELECT 
USING (status = 'active');

-- Also allow unauthenticated users to view events
CREATE POLICY "Anonymous can view all active events" 
ON public.events 
FOR SELECT 
TO anon
USING (status = 'active');