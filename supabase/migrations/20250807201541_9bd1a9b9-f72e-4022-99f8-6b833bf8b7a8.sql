-- Enable real-time for messages and conversations tables
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;

-- Set replica identity to FULL to capture complete row data during updates
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER TABLE public.conversations REPLICA IDENTITY FULL;

-- Add indexes for better real-time performance
CREATE INDEX IF NOT EXISTS idx_messages_conversation_created 
ON public.messages (conversation_id, created_at);

CREATE INDEX IF NOT EXISTS idx_messages_sender_conversation 
ON public.messages (sender_id, conversation_id);

CREATE INDEX IF NOT EXISTS idx_conversations_participants 
ON public.conversations (participant_1_id, participant_2_id);

CREATE INDEX IF NOT EXISTS idx_conversations_last_message 
ON public.conversations (last_message_at DESC);

-- Add a function to update conversation timestamp when message is inserted
CREATE OR REPLACE FUNCTION update_conversation_on_message_insert()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations 
  SET 
    last_message_at = NEW.created_at,
    updated_at = now()
  WHERE id = NEW.conversation_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;