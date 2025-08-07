import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Message, Conversation } from '@/types/messaging';

export const useRealTimeMessaging = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load conversations
  const loadConversations = useCallback(async () => {
    if (!user) return;

    try {
      console.log('Loading conversations for user:', user.id);
      
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          participant_1_id,
          participant_2_id,
          created_at,
          updated_at,
          last_message_at
        `)
        .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
        .order('last_message_at', { ascending: false, nullsFirst: false });

      if (error) {
        console.error('Error loading conversations:', error);
        setError('Failed to load conversations');
        return;
      }

      // Get other participants info
      const conversationsWithParticipants = await Promise.all(
        (data || []).map(async (conv) => {
          const otherParticipantId = conv.participant_1_id === user.id 
            ? conv.participant_2_id 
            : conv.participant_1_id;

          const { data: profile } = await supabase
            .from('profiles')
            .select('id, display_name, full_name, email, avatar_url')
            .eq('id', otherParticipantId)
            .single();

          return {
            ...conv,
            other_participant: profile
          };
        })
      );

      setConversations(conversationsWithParticipants);
      setError(null);
    } catch (err) {
      console.error('Failed to load conversations:', err);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      setMessages(prev => ({
        ...prev,
        [conversationId]: (data || []).map(msg => ({
          id: msg.id,
          conversation_id: msg.conversation_id,
          sender_id: msg.sender_id,
          content: msg.content,
          message_type: msg.message_type as 'text' | 'image' | 'file',
          file_url: msg.file_url,
          file_name: msg.file_name,
          is_read: msg.is_read,
          created_at: msg.created_at
        }))
      }));
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(async (conversationId: string, content: string) => {
    if (!user || !content.trim()) return false;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: content.trim(),
          message_type: 'text'
        });

      if (error) {
        console.error('Error sending message:', error);
        toast.error('Failed to send message');
        return false;
      }

      return true;
    } catch (err) {
      console.error('Failed to send message:', err);
      toast.error('Failed to send message');
      return false;
    }
  }, [user]);

  // Create or get existing conversation
  const createConversation = useCallback(async (otherUserId: string) => {
    if (!user) return null;

    try {
      // Check if conversation already exists
      const { data: existing } = await supabase
        .from('conversations')
        .select('id')
        .or(`and(participant_1_id.eq.${user.id},participant_2_id.eq.${otherUserId}),and(participant_1_id.eq.${otherUserId},participant_2_id.eq.${user.id})`)
        .maybeSingle();

      if (existing) {
        return existing.id;
      }

      // Create new conversation
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          participant_1_id: user.id,
          participant_2_id: otherUserId
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error creating conversation:', error);
        return null;
      }

      // Reload conversations
      await loadConversations();
      
      return data.id;
    } catch (err) {
      console.error('Failed to create conversation:', err);
      return null;
    }
  }, [user, loadConversations]);

  // Mark messages as read
  const markAsRead = useCallback(async (conversationId: string) => {
    if (!user) return;

    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', user.id);
    } catch (err) {
      console.error('Failed to mark messages as read:', err);
    }
  }, [user]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    console.log('Setting up real-time subscriptions');

    // Subscribe to new messages
    const messagesChannel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          const newMessage: Message = {
            id: payload.new.id,
            conversation_id: payload.new.conversation_id,
            sender_id: payload.new.sender_id,
            content: payload.new.content,
            message_type: payload.new.message_type as 'text' | 'image' | 'file',
            file_url: payload.new.file_url,
            file_name: payload.new.file_name,
            is_read: payload.new.is_read,
            created_at: payload.new.created_at
          };
          console.log('New message received:', newMessage);

          // Add to messages state
          setMessages(prev => ({
            ...prev,
            [newMessage.conversation_id]: [
              ...(prev[newMessage.conversation_id] || []),
              newMessage
            ]
          }));

          // Show notification if not from current user
          if (newMessage.sender_id !== user.id) {
            toast.success('New message received');
          }
        }
      )
      .subscribe((status) => {
        console.log('Messages subscription status:', status);
      });

    // Subscribe to conversation updates
    const conversationsChannel = supabase
      .channel('conversations_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
          filter: `participant_1_id=eq.${user.id}`
        },
        () => {
          console.log('Conversation updated, reloading...');
          loadConversations();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
          filter: `participant_2_id=eq.${user.id}`
        },
        () => {
          console.log('Conversation updated, reloading...');
          loadConversations();
        }
      )
      .subscribe((status) => {
        console.log('Conversations subscription status:', status);
      });

    return () => {
      console.log('Cleaning up real-time subscriptions');
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(conversationsChannel);
    };
  }, [user, loadConversations]);

  // Load initial data
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user, loadConversations]);

  return {
    conversations,
    messages,
    loading,
    error,
    loadMessages,
    sendMessage,
    createConversation,
    markAsRead,
    refetch: loadConversations
  };
};