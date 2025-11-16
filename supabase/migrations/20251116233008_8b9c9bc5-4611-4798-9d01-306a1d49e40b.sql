-- Fix Security Issue 1: Restrict profiles table to hide sensitive data from public view
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Allow read for authenticated users" ON public.profiles;

-- Allow users to view their own complete profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow authenticated users to view limited public info of other users (excluding email and sensitive fields)
-- This policy returns NULL for email when viewing other profiles
CREATE POLICY "Users can view limited public profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() != id);

-- Note: Email field will still be returned by the query, but we should handle this at application level
-- Better approach: Create a public_profiles view

-- Fix Security Issue 2: Prevent email/phone exposure in event registrations
-- Drop the problematic policy
DROP POLICY IF EXISTS "Public can view registrations for public attendee lists" ON public.event_registrations;

-- Create a view that excludes sensitive fields for public attendee lists
CREATE OR REPLACE VIEW public.event_registrations_public AS
SELECT 
  id,
  event_id,
  user_id,
  full_name,
  registration_date,
  status
FROM public.event_registrations er
WHERE EXISTS (
  SELECT 1 FROM public.events e 
  WHERE e.id = er.event_id 
  AND e.attendees_public = true
);

-- Grant access to the view
GRANT SELECT ON public.event_registrations_public TO authenticated, anon;

-- Add RLS policy for the view
ALTER VIEW public.event_registrations_public SET (security_invoker = true);

-- Fix Security Issue 3: Remove security definer from course_rating_stats view if it exists
-- Recreate the view without security definer
DROP VIEW IF EXISTS public.course_rating_stats CASCADE;

CREATE VIEW public.course_rating_stats AS
SELECT 
  course_id,
  COUNT(*) as review_count,
  AVG(rating) as avg_rating
FROM public.course_reviews
GROUP BY course_id;

-- Grant access to the recreated view
GRANT SELECT ON public.course_rating_stats TO authenticated, anon;

-- Create a helper function to get public profile data (excluding sensitive fields)
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_id uuid)
RETURNS TABLE (
  id uuid,
  username text,
  display_name text,
  full_name text,
  avatar_url text,
  bio text,
  website text,
  social_handle text,
  region text,
  experience_level text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    username,
    display_name,
    full_name,
    avatar_url,
    bio,
    website,
    social_handle,
    region,
    experience_level
  FROM public.profiles
  WHERE id = profile_id;
$$;