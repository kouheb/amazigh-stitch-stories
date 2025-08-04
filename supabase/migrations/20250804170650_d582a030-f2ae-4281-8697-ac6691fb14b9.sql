-- Re-enable RLS on events table and fix policies
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view approved active events" ON public.events;
DROP POLICY IF EXISTS "Admins can view all events" ON public.events;
DROP POLICY IF EXISTS "Admins can update events" ON public.events;
DROP POLICY IF EXISTS "Admins can delete events" ON public.events;
DROP POLICY IF EXISTS "Admins can update event approval" ON public.events;
DROP POLICY IF EXISTS "Allow event submissions" ON public.events;

-- Create secure RLS policies for events
CREATE POLICY "Anyone can view approved active events" 
ON public.events 
FOR SELECT 
USING (approval_status = 'approved' AND status = 'active');

CREATE POLICY "Authenticated users can create events" 
ON public.events 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

CREATE POLICY "Admins can view all events" 
ON public.events 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update events" 
ON public.events 
FOR UPDATE 
TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete events" 
ON public.events 
FOR DELETE 
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Fix user_roles table security - prevent privilege escalation
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create secure policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert roles" 
ON public.user_roles 
FOR INSERT 
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles" 
ON public.user_roles 
FOR UPDATE 
TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles" 
ON public.user_roles 
FOR DELETE 
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Ensure portfolios and showcase items are properly secured
-- Update portfolio_items policies to require authentication for modifications
DROP POLICY IF EXISTS "Users can create their own portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Users can update their own portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Users can delete their own portfolio items" ON public.portfolio_items;

CREATE POLICY "Authenticated users can create their own portfolio items" 
ON public.portfolio_items 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own portfolio items" 
ON public.portfolio_items 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own portfolio items" 
ON public.portfolio_items 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Update showcase_items policies to require authentication
DROP POLICY IF EXISTS "Users can create their own showcase items" ON public.showcase_items;
DROP POLICY IF EXISTS "Users can update their own showcase items" ON public.showcase_items;
DROP POLICY IF EXISTS "Users can delete their own showcase items" ON public.showcase_items;

CREATE POLICY "Authenticated users can create their own showcase items" 
ON public.showcase_items 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own showcase items" 
ON public.showcase_items 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own showcase items" 
ON public.showcase_items 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);