-- Messaging system indexes and triggers
-- 1) Efficient text search on messages.content
CREATE INDEX IF NOT EXISTS messages_content_fts_idx
ON public.messages USING GIN (to_tsvector('simple', coalesce(content, '')));

-- 2) Efficient retrieval of messages by conversation and time
CREATE INDEX IF NOT EXISTS messages_conversation_created_at_idx
ON public.messages (conversation_id, created_at DESC);

-- 3) Efficient retrieval of conversations by participants
CREATE INDEX IF NOT EXISTS conversations_participants_idx
ON public.conversations (participant_1_id, participant_2_id);

-- 4) Update conversation timestamps on new messages
DROP TRIGGER IF EXISTS trg_update_conversation_on_message ON public.messages;
CREATE TRIGGER trg_update_conversation_on_message
AFTER INSERT ON public.messages
FOR EACH ROW EXECUTE FUNCTION public.update_conversation_timestamp();

-- 5) Full-text search helper for a user's messages
CREATE OR REPLACE FUNCTION public.search_user_messages(
  q text,
  limit_count integer DEFAULT 50,
  offset_count integer DEFAULT 0
)
RETURNS TABLE (
  id uuid,
  conversation_id uuid,
  sender_id uuid,
  is_read boolean,
  created_at timestamptz,
  content text,
  message_type text,
  file_url text,
  file_name text
) AS $$
  SELECT m.id, m.conversation_id, m.sender_id, m.is_read, m.created_at, m.content, m.message_type, m.file_url, m.file_name
  FROM public.messages m
  JOIN public.conversations c ON c.id = m.conversation_id
  WHERE (c.participant_1_id = auth.uid() OR c.participant_2_id = auth.uid())
    AND to_tsvector('simple', coalesce(m.content, '')) @@ plainto_tsquery('simple', q)
  ORDER BY m.created_at DESC
  LIMIT limit_count OFFSET offset_count;
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO '';