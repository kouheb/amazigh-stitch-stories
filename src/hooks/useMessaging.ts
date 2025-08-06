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
  const loadConversations = useCallback(async (retryCount = 0) => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Check connection status
    if (!navigator.onLine) {
      toast.error('You are offline. Please check your internet connection.');
      setLoading(false);
      return;
    }

    try {
      // Get all conversations for the user with better error handling
      const { data: conversationsData, error } = await supabase
        .from('conversations')
        .select('*')
        .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
        .order('last_message_at', { ascending: false, nullsFirst: false });

      if (error) {
        console.error('Error loading conversations:', error);
        
        // Retry on network errors
        if ((error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) && retryCount < 2) {
          console.log(`Retrying conversation load... (attempt ${retryCount + 1})`);
          setTimeout(() => loadConversations(retryCount + 1), 2000 * (retryCount + 1));
          return;
        }
        
        // If we can't load conversations, show empty state instead of error
        console.log('Using empty conversation list due to connection issues');
        setConversations([]);
        setUnreadCount(0);
        setLoading(false);
        return;
      }

      if (!conversationsData || conversationsData.length === 0) {
        console.log('No conversations found');
        setConversations([]);
        setUnreadCount(0);
        setLoading(false);
        return;
      }

      // Process conversations with better error handling
      const processedConversations: Conversation[] = [];
      
      for (const conv of conversationsData) {
        try {
          const otherParticipantId = conv.participant_1_id === user.id 
            ? conv.participant_2_id 
            : conv.participant_1_id;

          // Get other participant profile with timeout and error handling
          const profilePromise = supabase
            .from('profiles')
            .select('id, display_name, full_name, email, avatar_url')
            .eq('id', otherParticipantId)
            .maybeSingle();

          // Get last message with timeout and error handling
          const messagePromise = supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          // Get unread count with error handling
          const unreadPromise = supabase
            .from('messages')
            .select('id', { count: 'exact' })
            .eq('conversation_id', conv.id)
            .eq('is_read', false)
            .neq('sender_id', user.id);

          // Execute all queries with a timeout
          const results = await Promise.allSettled([
            Promise.race([profilePromise, new Promise((_, reject) => setTimeout(() => reject(new Error('Profile timeout')), 5000))]),
            Promise.race([messagePromise, new Promise((_, reject) => setTimeout(() => reject(new Error('Message timeout')), 5000))]),
            Promise.race([unreadPromise, new Promise((_, reject) => setTimeout(() => reject(new Error('Unread timeout')), 5000))])
          ]);

          // Extract results with fallbacks
          const profileResult = results[0];
          const messageResult = results[1];
          const unreadResult = results[2];

          const profile = profileResult.status === 'fulfilled' && (profileResult.value as any)?.data ? 
            (profileResult.value as any).data : {
              id: otherParticipantId,
              email: 'Unknown User',
              display_name: 'Unknown'
            };

          const lastMessage = messageResult.status === 'fulfilled' && (messageResult.value as any)?.data ? {
            ...(messageResult.value as any).data,
            message_type: (messageResult.value as any).data.message_type as 'text' | 'image' | 'file'
          } : undefined;

          const unreadCount = unreadResult.status === 'fulfilled' ? 
            ((unreadResult.value as any)?.count || 0) : 0;

          processedConversations.push({
            ...conv,
            other_participant: profile,
            last_message: lastMessage,
            unread_count: unreadCount
          });

        } catch (error) {
          console.error('Error processing conversation:', conv.id, error);
          // Continue with next conversation instead of failing entirely
          continue;
        }
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
      
      // Retry on network errors
      if (error instanceof Error && (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) && retryCount < 2) {
        console.log(`Retrying conversation load... (attempt ${retryCount + 1})`);
        setTimeout(() => loadConversations(retryCount + 1), 2000 * (retryCount + 1));
        return;
      }
      
      // Show empty state instead of error
      console.log('Using empty conversation list due to connection error');
      setConversations([]);
      setUnreadCount(0);
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

    // Handle mock conversations (offline mode) - allow local message sending
    if (conversationId.startsWith('mock-')) {
      console.log('Sending message in mock conversation:', conversationId);
      
      // Create a mock message that appears in the conversation
      const mockMessage = {
        id: `mock-msg-${Date.now()}`,
        conversation_id: conversationId,
        sender_id: user.id,
        content,
        message_type: messageType,
        file_url: fileUrl,
        file_name: fileName,
        is_read: false,
        created_at: new Date().toISOString()
      };

      // Dispatch a custom event to update the conversation with the new message
      window.dispatchEvent(new CustomEvent('mockMessageSent', { 
        detail: { message: mockMessage, conversationId } 
      }));

      toast.success('Message sent (offline mode)');
      return true;
    }

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
        toast.error('Failed to send message due to connection issues');
        return false;
      }

      // Reload conversations to update UI
      loadConversations();
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please check your connection and try again.');
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

  // Set up real-time subscriptions - only once per user with proper cleanup
  useEffect(() => {
    if (!user) return;

    const channelName = `messaging-list-${user.id}`;
    
    // Remove any existing channels completely before creating new ones
    const cleanup = async () => {
      const existingChannels = supabase.getChannels();
      const matchingChannels = existingChannels.filter(ch => 
        ch.topic.includes(`messaging-list-${user.id}`)
      );
      
      // Unsubscribe and remove existing channels
      for (const ch of matchingChannels) {
        await ch.unsubscribe();
        supabase.removeChannel(ch);
      }
      
      // Wait a bit to ensure cleanup is complete
      await new Promise(resolve => setTimeout(resolve, 100));
    };

    const setupChannel = async () => {
      await cleanup();
      
      const channel = supabase
        .channel(channelName, {
          config: {
            presence: {
              key: user.id,
            },
          },
        })
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages'
          },
          () => {
            console.log('New message detected, reloading conversations');
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
            console.log('Message updated, reloading conversations');
            loadConversations();
          }
        )
        .subscribe((status) => {
          console.log('Messaging subscription status:', status);
          if (status === 'CHANNEL_ERROR') {
            console.error('Real-time messaging subscription failed');
          }
        });

      return channel;
    };

    let channel: any;
    setupChannel().then(ch => {
      channel = ch;
    });

    return () => {
      if (channel) {
        channel.unsubscribe().then(() => {
          supabase.removeChannel(channel);
        });
      }
    };
  }, [user?.id, loadConversations]);

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

  const loadConversation = useCallback(async (retryCount = 0) => {
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
        
        // Retry on network errors
        if ((convError.message?.includes('Failed to fetch') || convError.message?.includes('NetworkError')) && retryCount < 2) {
          console.log(`Retrying conversation detail load... (attempt ${retryCount + 1})`);
          setTimeout(() => loadConversation(retryCount + 1), 2000 * (retryCount + 1));
          return;
        }
        
        toast.error('Failed to load conversation. Please check your connection.');
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
      
      // Retry on network errors
      if (error instanceof Error && (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) && retryCount < 2) {
        console.log(`Retrying conversation detail load... (attempt ${retryCount + 1})`);
        setTimeout(() => loadConversation(retryCount + 1), 2000 * (retryCount + 1));
        return;
      }
      
      toast.error('Connection error. Please check your internet and try again.');
    } finally {
      setLoading(false);
    }
  }, [conversationId, user]);

  // Set up real-time subscription for this conversation with proper cleanup
  useEffect(() => {
    if (!conversationId) return;

    const channelName = `conversation-detail-${conversationId}`;
    
    // Remove any existing channels completely before creating new ones
    const cleanup = async () => {
      const existingChannels = supabase.getChannels();
      const matchingChannels = existingChannels.filter(ch => 
        ch.topic.includes(`conversation-detail-${conversationId}`)
      );
      
      // Unsubscribe and remove existing channels
      for (const ch of matchingChannels) {
        await ch.unsubscribe();
        supabase.removeChannel(ch);
      }
      
      // Wait a bit to ensure cleanup is complete
      await new Promise(resolve => setTimeout(resolve, 100));
    };

    const setupChannel = async () => {
      await cleanup();
      
      const channel = supabase
        .channel(channelName, {
          config: {
            presence: {
              key: conversationId,
            },
          },
        })
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`
          },
          (payload) => {
            console.log('New message in conversation:', payload);
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
        .subscribe((status) => {
          console.log('Conversation subscription status:', status);
          if (status === 'CHANNEL_ERROR') {
            console.error('Real-time conversation subscription failed');
          }
        });

      return channel;
    };

    let channel: any;
    setupChannel().then(ch => {
      channel = ch;
    });

    return () => {
      if (channel) {
        channel.unsubscribe().then(() => {
          supabase.removeChannel(channel);
        });
      }
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