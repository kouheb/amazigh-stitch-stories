-- 1) Ensure profiles has a username column for searching
alter table public.profiles
  add column if not exists username text;

-- Helpful indexes for ILIKE searches
create index if not exists idx_profiles_username_lower on public.profiles (lower(username));
create index if not exists idx_profiles_display_name_lower on public.profiles (lower(display_name));
create index if not exists idx_profiles_email_lower on public.profiles (lower(email));

-- 2) Replace handle_new_user to also populate username/display_name from email
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  -- Derive a username from email local-part
  -- Sanitize to [a-zA-Z0-9_] and lowercase
  declare _username text;
  begin
    _username := lower(regexp_replace(split_part(new.email, '@', 1), '[^a-zA-Z0-9_]+', '', 'g'));
  exception when others then
    _username := null;
  end;

  insert into public.profiles (id, email, full_name, display_name, username, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', coalesce(new.raw_user_meta_data->>'full_name', _username), _username, null)
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(public.profiles.full_name, excluded.full_name),
        display_name = coalesce(public.profiles.display_name, excluded.display_name),
        username = coalesce(public.profiles.username, excluded.username),
        updated_at = now();

  return new;
end;
$$;

-- 3) Add the auth.users trigger to auto-create profile rows on signup
-- Drop first to avoid duplicate-creation errors on repeated migrations
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4) Ensure RLS is enabled and profiles remain publicly selectable (already configured)
--    Existing policies: "Profiles are viewable by everyone" (USING true) and
--    "Users can update their own profile" (USING auth.uid() = id)
--    Nothing else needed here.