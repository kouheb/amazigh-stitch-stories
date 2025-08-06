export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  file_url?: string;
  file_name?: string;
  is_read: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  participant_1_id: string;
  participant_2_id: string;
  created_at: string;
  updated_at: string;
  last_message_at?: string;
  // Joined data
  other_participant?: {
    id: string;
    display_name?: string;
    full_name?: string;
    email?: string;
    avatar_url?: string;
  };
  last_message?: Message;
  unread_count?: number;
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}