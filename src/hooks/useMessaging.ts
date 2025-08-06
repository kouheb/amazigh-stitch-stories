import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Conversation, Message, ConversationWithMessages } from '@/types/messaging';

export const useMessaging = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load all conversations for the current user
  const loadConversations = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Get all conversations for the user (without requiring messages)
      const { data: conversationsData, error } = await supabase
        .from('conversations')
        .select('*')
        .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
        .order('last_message_at', { ascending: false, nullsFirst: false });

      if (error) {
        console.error('Error loading conversations:', error);
        toast.error('Failed to load conversations');
        return;
      }

      // Process conversations to get other participant info
      const processedConversations: Conversation[] = [];
      
      for (const conv of conversationsData || []) {
        const otherParticipantId = conv.participant_1_id === user.id 
          ? conv.participant_2_id 
          : conv.participant_1_id;

        // Get other participant profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, display_name, full_name, email, avatar_url')
          .eq('id', otherParticipantId)
          .maybeSingle();

        // Get last message for this conversation
        const { data: lastMessage } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conv.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
          
        // Type assertion to ensure correct message_type
        const typedLastMessage = lastMessage ? {
          ...lastMessage,
          message_type: lastMessage.message_type as 'text' | 'image' | 'file'
        } : undefined;

        // Count unread messages
        const { count: unreadCount } = await supabase
          .from('messages')
          .select('id', { count: 'exact' })
          .eq('conversation_id', conv.id)
          .eq('is_read', false)
          .neq('sender_id', user.id);

        processedConversations.push({
          ...conv,
          other_participant: profile || {
            id: otherParticipantId,
            email: 'Unknown User'
          },
          last_message: typedLastMessage,
          unread_count: unreadCount || 0
        });
      }

      setConversations(processedConversations);

      // Calculate total unread count
      const totalUnread = processedConversations.reduce(
        (sum, conv) => sum + (conv.unread_count || 0), 
        0
      );
      setUnreadCount(totalUnread);

    } catch (error) {
      console.error('Error loading conversations:', error);
      toast.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Create or get existing conversation with another user
  const getOrCreateConversation = useCallback(async (otherUserId: string): Promise<string | null> => {
    if (!user) return null;

    try {
      // Check if conversation already exists - use maybeSingle to avoid errors when no rows found
      const { data: existingConv, error: findError } = await supabase
        .from('conversations')
        .select('id')
        .or(
          `and(participant_1_id.eq.${user.id},participant_2_id.eq.${otherUserId}),and(participant_1_id.eq.${otherUserId},participant_2_id.eq.${user.id})`
        )
        .maybeSingle();

      if (findError) {
        console.error('Error finding conversation:', findError);
        return null;
      }

      if (existingConv) {
        return existingConv.id;
      }

      // Create new conversation
      const { data: newConv, error: createError } = await supabase
        .from('conversations')
        .insert({
          participant_1_id: user.id,
          participant_2_id: otherUserId
        })
        .select('id')
        .single();

      if (createError) {
        // If it's a duplicate key error, try to find the conversation again
        if (createError.code === '23505') {
          const { data: retryConv } = await supabase
            .from('conversations')
            .select('id')
            .or(
              `and(participant_1_id.eq.${user.id},participant_2_id.eq.${otherUserId}),and(participant_1_id.eq.${otherUserId},participant_2_id.eq.${user.id})`
            )
            .maybeSingle();
          
          return retryConv?.id || null;
        }
        
        console.error('Error creating conversation:', createError);
        toast.error('Failed to create conversation');
        return null;
      }

      return newConv.id;
    } catch (error) {
      console.error('Error getting/creating conversation:', error);
      return null;
    }
  }, [user]);

  // Send a message
  const sendMessage = useCallback(async (
    conversationId: string,
    content: string,
    messageType: 'text' | 'image' | 'file' = 'text',
    fileUrl?: string,
    fileName?: string
  ): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content,
          message_type: messageType,
          file_url: fileUrl,
          file_name: fileName
        });

      if (error) {
        console.error('Error sending message:', error);
        toast.error('Failed to send message');
        return false;
      }

      // Reload conversations to update UI
      loadConversations();
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      return false;
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
        .neq('sender_id', user.id)
        .eq('is_read', false);

      // Update local state
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, unread_count: 0 }
            : conv
        )
      );

      // Recalculate total unread count
      setUnreadCount(prev => {
        const conv = conversations.find(c => c.id === conversationId);
        return prev - (conv?.unread_count || 0);
      });

    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }, [user, conversations]);

  // Set up real-time subscriptions
  // Set up real-time subscriptions - only once per user
  useEffect(() => {
    if (!user) return;

    const channelName = `messaging-${user.id}`;
    
    // Remove any existing channel with this name first
    const existingChannels = supabase.getChannels();
    const existingChannel = existingChannels.find(ch => ch.topic === channelName);
    if (existingChannel) {
      supabase.removeChannel(existingChannel);
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        () => {
          loadConversations();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages'
        },
        () => {
          loadConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]); // Only depend on user.id

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return {
    conversations,
    loading,
    unreadCount,
    loadConversations,
    getOrCreateConversation,
    sendMessage,
    markAsRead
  };
};

// Hook for loading a specific conversation with messages
export const useConversation = (conversationId: string | null) => {
  const { user } = useAuth();
  const [conversation, setConversation] = useState<ConversationWithMessages | null>(null);
  const [loading, setLoading] = useState(true);

  const loadConversation = useCallback(async () => {
    if (!conversationId || !user) {
      setLoading(false);
      return;
    }

    try {
      // Get conversation details
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

      if (convError) {
        console.error('Error loading conversation:', convError);
        setLoading(false);
        return;
      }

      // Get other participant info
      const otherParticipantId = convData.participant_1_id === user.id 
        ? convData.participant_2_id 
        : convData.participant_1_id;

      const { data: profile } = await supabase
        .from('profiles')
        .select('id, display_name, full_name, email, avatar_url')
        .eq('id', otherParticipantId)
        .maybeSingle();

      // Get messages
      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (messagesError) {
        console.error('Error loading messages:', messagesError);
        setLoading(false);
        return;
      }

      // Type assertion for messages
      const typedMessages = (messages || []).map(msg => ({
        ...msg,
        message_type: msg.message_type as 'text' | 'image' | 'file'
      }));

      setConversation({
        ...convData,
        other_participant: profile || {
          id: otherParticipantId,
          email: 'Unknown User'
        },
        messages: typedMessages
      });

    } catch (error) {
      console.error('Error loading conversation:', error);
    } finally {
      setLoading(false);
    }
  }, [conversationId, user]);

  // Set up real-time subscription for this conversation
  useEffect(() => {
    if (!conversationId) return;

    const channelName = `conversation-${conversationId}`;
    
    // Remove any existing channel with this name first
    const existingChannels = supabase.getChannels();
    const existingChannel = existingChannels.find(ch => ch.topic === channelName);
    if (existingChannel) {
      supabase.removeChannel(existingChannel);
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          setConversation(prev => {
            if (!prev) return prev;
            const newMessage = {
              ...payload.new,
              message_type: payload.new.message_type as 'text' | 'image' | 'file'
            } as Message;
            return {
              ...prev,
              messages: [...prev.messages, newMessage]
            };
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    loadConversation();
  }, [loadConversation]);

  return {
    conversation,
    loading,
    loadConversation
  };
};