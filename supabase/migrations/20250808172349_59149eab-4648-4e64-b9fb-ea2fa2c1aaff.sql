-- Create push_subscriptions table and RLS policies for web push notifications

-- Create table
create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  endpoint text not null,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint push_subscriptions_user_endpoint_unique unique (user_id, endpoint)
);

-- Enable RLS
alter table public.push_subscriptions enable row level security;

-- Policies
create policy "Users can view their own push subscriptions"
  on public.push_subscriptions
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own push subscriptions"
  on public.push_subscriptions
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own push subscriptions"
  on public.push_subscriptions
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own push subscriptions"
  on public.push_subscriptions
  for delete
  using (auth.uid() = user_id);

-- updated_at trigger
create trigger push_subscriptions_set_updated_at
before update on public.push_subscriptions
for each row execute function public.update_updated_at_column();