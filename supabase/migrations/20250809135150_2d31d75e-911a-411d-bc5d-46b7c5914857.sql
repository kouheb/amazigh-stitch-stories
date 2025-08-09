-- Add read_at column to notifications and index for unread counts
ALTER TABLE public.notifications
ADD COLUMN IF NOT EXISTS read_at timestamptz NULL;

-- Helpful index to speed up unread count queries
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
ON public.notifications (user_id, is_read, created_at DESC);
