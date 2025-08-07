-- Create follow relationships table
CREATE TABLE IF NOT EXISTS public.follow_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL,
  following_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT follow_unique UNIQUE (follower_id, following_id),
  CONSTRAINT no_self_follow CHECK (follower_id <> following_id)
);

-- Indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_follow_relationships_follower ON public.follow_relationships (follower_id);
CREATE INDEX IF NOT EXISTS idx_follow_relationships_following ON public.follow_relationships (following_id);

-- Enable RLS
ALTER TABLE public.follow_relationships ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY IF NOT EXISTS "Public can view follower relationships"
ON public.follow_relationships
FOR SELECT
USING (true);

CREATE POLICY IF NOT EXISTS "Users can create follow relationships"
ON public.follow_relationships
FOR INSERT
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY IF NOT EXISTS "Users can delete their follow relationships"
ON public.follow_relationships
FOR DELETE
USING (auth.uid() = follower_id);

-- Create function to keep follower/following counts updated
CREATE OR REPLACE FUNCTION public.update_follow_counts()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment followers_count for the followed user
    INSERT INTO public.user_stats (user_id, followers_count)
    VALUES (NEW.following_id, 1)
    ON CONFLICT (user_id)
    DO UPDATE SET followers_count = public.user_stats.followers_count + 1,
                  updated_at = now();

    -- Increment following_count for the follower
    INSERT INTO public.user_stats (user_id, following_count)
    VALUES (NEW.follower_id, 1)
    ON CONFLICT (user_id)
    DO UPDATE SET following_count = public.user_stats.following_count + 1,
                  updated_at = now();

    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrement followers_count for the unfollowed user
    UPDATE public.user_stats
    SET followers_count = GREATEST(followers_count - 1, 0),
        updated_at = now()
    WHERE user_id = OLD.following_id;

    -- Decrement following_count for the follower
    UPDATE public.user_stats
    SET following_count = GREATEST(following_count - 1, 0),
        updated_at = now()
    WHERE user_id = OLD.follower_id;

    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Trigger to update counts on insert/delete
DROP TRIGGER IF EXISTS trg_update_follow_counts ON public.follow_relationships;
CREATE TRIGGER trg_update_follow_counts
AFTER INSERT OR DELETE ON public.follow_relationships
FOR EACH ROW
EXECUTE FUNCTION public.update_follow_counts();

-- Create API keys table
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT,
  prefix TEXT NOT NULL DEFAULT 'chat',
  hashed_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at TIMESTAMPTZ,
  revoked BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT api_keys_hashed_key_unique UNIQUE (hashed_key)
);

-- Enable RLS on api_keys
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- RLS Policies for api_keys
CREATE POLICY IF NOT EXISTS "Users can view their own api keys"
ON public.api_keys
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can create their own api keys"
ON public.api_keys
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own api keys"
ON public.api_keys
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own api keys"
ON public.api_keys
FOR DELETE
USING (auth.uid() = user_id);

-- Trigger to update updated_at on api_keys
DROP TRIGGER IF EXISTS trg_api_keys_updated_at ON public.api_keys;
CREATE TRIGGER trg_api_keys_updated_at
BEFORE UPDATE ON public.api_keys
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
