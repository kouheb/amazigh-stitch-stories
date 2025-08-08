-- Align profiles RLS with requirement: only logged-in users can read; users update only their own
alter table public.profiles enable row level security;

-- Remove overly permissive existing SELECT policies
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
-- Remove any previous custom policies if they exist to avoid duplicates
drop policy if exists "Allow read for all users" on public.profiles;

-- Create SELECT policy limited to authenticated users
create policy "Allow read for authenticated users"
  on public.profiles
  for select
  to authenticated
  using (true);

-- Ensure only owners can update their profile
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Allow update own profile" on public.profiles;
create policy "Allow update own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id);
