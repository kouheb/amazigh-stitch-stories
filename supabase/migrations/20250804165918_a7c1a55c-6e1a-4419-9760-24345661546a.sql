-- The issue is that auth.uid() is null during INSERT
-- Let's create a more specific policy that allows unauthenticated inserts for event submissions
DROP POLICY IF EXISTS "Anyone can create events for approval" ON public.events;

-- Create a new policy that explicitly allows all inserts without auth requirement
CREATE POLICY "Allow event submissions" 
ON public.events 
FOR INSERT 
TO public
WITH CHECK (true);