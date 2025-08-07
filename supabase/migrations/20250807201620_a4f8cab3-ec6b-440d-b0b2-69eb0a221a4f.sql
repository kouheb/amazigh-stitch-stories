-- Add indexes for better real-time performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_messages_conversation_created 
ON public.messages (conversation_id, created_at);

CREATE INDEX IF NOT EXISTS idx_messages_sender_conversation 
ON public.messages (sender_id, conversation_id);

CREATE INDEX IF NOT EXISTS idx_conversations_participants 
ON public.conversations (participant_1_id, participant_2_id);

CREATE INDEX IF NOT EXISTS idx_conversations_last_message 
ON public.conversations (last_message_at DESC);

-- Create trigger to update conversation timestamp when message is inserted
DROP TRIGGER IF EXISTS trigger_update_conversation_on_message_insert ON public.messages;

CREATE TRIGGER trigger_update_conversation_on_message_insert
    AFTER INSERT ON public.messages
    FOR EACH ROW
    EXECUTE FUNCTION update_conversation_on_message_insert();