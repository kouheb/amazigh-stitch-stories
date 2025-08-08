-- Create table for storing web push/FCM tokens per user
create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  token text not null unique,
  platform text default 'web',
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.push_subscriptions enable row level security;

-- Basic indexes
create index if not exists idx_push_subscriptions_user_id on public.push_subscriptions (user_id);

-- Helper function to auto-update updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for updated_at
create trigger set_timestamp_push_subscriptions
before update on public.push_subscriptions
for each row execute function public.update_updated_at_column();

-- Policies: users can only manage their own subscriptions
create policy if not exists "Users can view their own push subscriptions"
  on public.push_subscriptions
  for select
  using (auth.uid() = user_id);

create policy if not exists "Users can insert their own push subscriptions"
  on public.push_subscriptions
  for insert
  with check (auth.uid() = user_id);

create policy if not exists "Users can update their own push subscriptions"
  on public.push_subscriptions
  for update
  using (auth.uid() = user_id);

create policy if not exists "Users can delete their own push subscriptions"
  on public.push_subscriptions
  for delete
  using (auth.uid() = user_id);
