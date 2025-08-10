-- Event Management System migration: triggers and storage policies (idempotent)
-- Ensure event-images bucket exists
insert into storage.buckets (id, name, public)
values ('event-images','event-images', true)
on conflict (id) do nothing;

-- Create storage policies for event-images bucket if missing
-- Public read
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'Public can read event images'
  ) then
    create policy "Public can read event images"
      on storage.objects
      for select
      using (bucket_id = 'event-images');
  end if;
end$$;

-- Authenticated users can upload to their own folder
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'Users can upload event images to their folder'
  ) then
    create policy "Users can upload event images to their folder"
      on storage.objects
      for insert
      with check (
        bucket_id = 'event-images'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;
end$$;

-- Authenticated users can update their own files
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'Users can update their event images'
  ) then
    create policy "Users can update their event images"
      on storage.objects
      for update
      using (
        bucket_id = 'event-images'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;
end$$;

-- Authenticated users can delete their own files
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'Users can delete their event images'
  ) then
    create policy "Users can delete their event images"
      on storage.objects
      for delete
      using (
        bucket_id = 'event-images'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;
end$$;

-- Enable RLS on storage.objects (already enabled by default, but ensure)
alter table if exists storage.objects enable row level security;

-- Ensure RLS is enabled on events and event_registrations
alter table if exists public.events enable row level security;
alter table if exists public.event_registrations enable row level security;

-- Triggers for events table
-- BEFORE INSERT: set defaults
do $$
begin
  if not exists (
    select 1
    from pg_trigger t
    join pg_class c on c.oid = t.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'events' and t.tgname = 'before_insert_events_set_defaults'
  ) then
    create trigger before_insert_events_set_defaults
    before insert on public.events
    for each row execute function public.before_insert_events_set_defaults();
  end if;
end$$;

-- BEFORE INSERT: handle new event submission (auto-approve/active)
do $$
begin
  if not exists (
    select 1
    from pg_trigger t
    join pg_class c on c.oid = t.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'events' and t.tgname = 'before_insert_events_handle_submission'
  ) then
    create trigger before_insert_events_handle_submission
    before insert on public.events
    for each row execute function public.handle_new_event_submission();
  end if;
end$$;

-- BEFORE UPDATE: auto-update updated_at
-- Ensure helper function exists (provided in project)
-- Create trigger if missing

-- First, ensure update_updated_at_column exists (no-op if it already exists via CREATE OR REPLACE above)
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Now attach trigger

do $$
begin
  if not exists (
    select 1
    from pg_trigger t
    join pg_class c on c.oid = t.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'events' and t.tgname = 'update_events_updated_at'
  ) then
    create trigger update_events_updated_at
    before update on public.events
    for each row execute function public.update_updated_at_column();
  end if;
end$$;

-- AFTER UPDATE: notify attendees on changes

do $$
begin
  if not exists (
    select 1
    from pg_trigger t
    join pg_class c on c.oid = t.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'events' and t.tgname = 'after_update_events_notify_attendees'
  ) then
    create trigger after_update_events_notify_attendees
    after update on public.events
    for each row execute function public.after_update_events_notify_attendees();
  end if;
end$$;

-- AFTER DELETE: notify attendees when event is deleted

do $$
begin
  if not exists (
    select 1
    from pg_trigger t
    join pg_class c on c.oid = t.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'events' and t.tgname = 'after_delete_events_notify_attendees'
  ) then
    create trigger after_delete_events_notify_attendees
    after delete on public.events
    for each row execute function public.after_delete_events_notify_attendees();
  end if;
end$$;

-- Triggers for event_registrations table
-- BEFORE INSERT: enforce capacity and auth rules

do $$
begin
  if not exists (
    select 1
    from pg_trigger t
    join pg_class c on c.oid = t.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'event_registrations' and t.tgname = 'before_insert_event_registrations_enforce_capacity'
  ) then
    create trigger before_insert_event_registrations_enforce_capacity
    before insert on public.event_registrations
    for each row execute function public.before_insert_event_registrations_enforce_capacity();
  end if;
end$$;

-- AFTER INSERT OR DELETE: update counts and notify

do $$
begin
  if not exists (
    select 1
    from pg_trigger t
    join pg_class c on c.oid = t.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'event_registrations' and t.tgname = 'after_change_event_registrations_update_counts_and_notify'
  ) then
    create trigger after_change_event_registrations_update_counts_and_notify
    after insert or delete on public.event_registrations
    for each row execute function public.after_change_event_registrations_update_counts_and_notify();
  end if;
end$$;