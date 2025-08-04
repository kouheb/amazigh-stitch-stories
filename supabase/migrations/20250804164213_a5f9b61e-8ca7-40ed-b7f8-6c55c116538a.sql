-- Set kouheb@gmail.com as admin
-- First, find the user ID for kouheb@gmail.com and set them as admin

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users 
WHERE email = 'kouheb@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;