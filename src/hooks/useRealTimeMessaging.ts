import { useState, useEffect, useCallback } from 'react';
import { supabase, testSupabaseConnection } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Message, Conversation } from '@/types/messaging';

export const useRealTimeMessaging = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testMode, setTestMode] = useState(false);

  // Load conversations with better error handling
  const loadConversations = useCallback(async () => {
    if (!user) return;
    
    // If already in test mode, don't retry database calls
    if (testMode) {
      loadTestData();
      return;
    }

    console.log('Loading conversations for user:', user.id);
    
    try {
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
        throw error;
      }

      // Get other participants info with error handling per profile
      const conversationsWithParticipants = await Promise.all(
        (data || []).map(async (conv) => {
          try {
            const otherParticipantId = conv.participant_1_id === user.id 
              ? conv.participant_2_id 
              : conv.participant_1_id;

            const { data: profile } = await supabase
              .from('profiles')
              .select('id, display_name, full_name, email, avatar_url')
              .eq('id', otherParticipantId)
              .maybeSingle();

            return {
              ...conv,
              other_participant: profile || {
                id: otherParticipantId,
                display_name: 'Unknown User',
                full_name: 'Unknown User', 
                email: 'unknown@example.com',
                avatar_url: null
              }
            };
          } catch (profileError) {
            console.warn('Failed to load profile for conversation:', conv.id, profileError);
            const otherParticipantId = conv.participant_1_id === user.id 
              ? conv.participant_2_id 
              : conv.participant_1_id;
              
            return {
              ...conv,
              other_participant: {
                id: otherParticipantId,
                display_name: 'Unknown User',
                full_name: 'Unknown User',
                email: 'unknown@example.com', 
                avatar_url: null
              }
            };
          }
        })
      );

      setConversations(conversationsWithParticipants);
      setError(null);
      
    } catch (err) {
      console.error('Error loading conversations:', err);
      console.log('Switching to test mode due to database error');
      setTestMode(true);
      setError('Database connection failed - using demo mode');
      loadTestData();
    } finally {
      setLoading(false);
    }
  }, [user, testMode]);

  // Load test data when database is unavailable
  const loadTestData = useCallback(() => {
    console.log('Loading test messaging data');
    const testConversations: Conversation[] = [
      {
        id: 'test-conv-1',
        participant_1_id: user?.id || 'current-user',
        participant_2_id: 'test-user-1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_message_at: new Date().toISOString(),
        other_participant: {
          id: 'test-user-1',
          display_name: 'Test User',
          full_name: 'Test User',
          email: 'test@example.com',
          avatar_url: undefined
        }
      },
      {
        id: 'test-conv-2',
        participant_1_id: user?.id || 'current-user',
        participant_2_id: 'test-user-2',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_message_at: new Date().toISOString(),
        other_participant: {
          id: 'test-user-2',
          display_name: 'Demo Contact',
          full_name: 'Demo Contact',
          email: 'demo@example.com',
          avatar_url: undefined
        }
      }
    ];

    setConversations(testConversations);
    
    // Set test messages
    const testMessages: Record<string, Message[]> = {
      'test-conv-1': [
        {
          id: 'test-msg-1',
          conversation_id: 'test-conv-1',
          sender_id: 'test-user-1',
          content: 'Hello! This is a test message.',
          message_type: 'text',
          is_read: true,
          created_at: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'test-msg-2',
          conversation_id: 'test-conv-1',
          sender_id: user?.id || 'current-user',
          content: 'Hi there! This is test mode.',
          message_type: 'text',
          is_read: true,
          created_at: new Date(Date.now() - 1800000).toISOString()
        }
      ],
      'test-conv-2': [
        {
          id: 'test-msg-3',
          conversation_id: 'test-conv-2',
          sender_id: 'test-user-2',
          content: 'Demo message in test mode.',
          message_type: 'text',
          is_read: true,
          created_at: new Date(Date.now() - 7200000).toISOString()
        }
      ]
    };

    setMessages(testMessages);
    setError(null);
    
    toast.info('Database connection issue. Using test mode.', {
      description: 'Real messaging requires fixing the connection.'
    });
  }, [user]);

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: string) => {
    if (testMode) {
      // In test mode, messages are already loaded
      console.log('Loading messages in test mode for:', conversationId);
      return;
    }

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
  }, [testMode]);

  // Send a message
  const sendMessage = useCallback(async (conversationId: string, content: string) => {
    if (!user || !content.trim()) return false;

    if (testMode) {
      // In test mode, simulate sending a message
      const newMessage: Message = {
        id: `test-msg-${Date.now()}`,
        conversation_id: conversationId,
        sender_id: user.id,
        content: content.trim(),
        message_type: 'text',
        is_read: true,
        created_at: new Date().toISOString()
      };

      setMessages(prev => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), newMessage]
      }));

      toast.success('Message sent (test mode)');
      return true;
    }

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
  }, [user, testMode]);

  // Create or get existing conversation
  const createConversation = useCallback(async (otherUserId: string) => {
    if (!user) return null;

    if (testMode) {
      // In test mode, return first test conversation
      return 'test-conv-1';
    }

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
        throw error; // Throw to trigger fallback
      }

      // Reload conversations
      await loadConversations();
      
      return data.id;
    } catch (err) {
      console.error('Failed to create conversation, switching to test mode:', err);
      
      // Switch to test mode on any error (network, auth, etc.)
      setTestMode(true);
      loadTestData();
      
      // Return test conversation ID
      return 'test-conv-1';
    }
  }, [user, loadConversations, testMode]);

  // Mark messages as read
  const markAsRead = useCallback(async (conversationId: string) => {
    if (!user) return;

    if (testMode) {
      // In test mode, just log the action
      console.log('Marking messages as read (test mode):', conversationId);
      return;
    }

    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', user.id);
    } catch (err) {
      console.error('Failed to mark messages as read:', err);
    }
  }, [user, testMode]);

  // Set up real-time subscriptions with improved error handling
  useEffect(() => {
    if (!user || testMode) return;

    console.log('Setting up real-time subscriptions');
    let messagesChannel: any = null;
    let conversationsChannel: any = null;

    try {
      // Subscribe to new messages with better filtering
      messagesChannel = supabase
        .channel(`user_messages_${user.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages'
          },
          (payload) => {
            try {
              console.log('New message received:', payload);
              
              // Check if this message involves the current user
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

              // Check if this message is for a conversation the user is part of
              const userConversation = conversations.find(conv => 
                conv.id === newMessage.conversation_id
              );

              if (userConversation) {
                // Add to messages state immediately for real-time effect
                setMessages(prev => ({
                  ...prev,
                  [newMessage.conversation_id]: [
                    ...(prev[newMessage.conversation_id] || []),
                    newMessage
                  ]
                }));

                // Show notification if not from current user
                if (newMessage.sender_id !== user.id) {
                  const senderName = userConversation.other_participant?.display_name 
                    || userConversation.other_participant?.full_name 
                    || 'Someone';
                  
                  toast.success(`New message from ${senderName}`, {
                    description: newMessage.content.substring(0, 50) + 
                      (newMessage.content.length > 50 ? '...' : ''),
                    action: {
                      label: "View",
                      onClick: () => {
                        // Could navigate to the conversation here
                        console.log('Navigate to conversation:', newMessage.conversation_id);
                      }
                    }
                  });
                }

                // Update conversation list to reflect new message
                loadConversations();
              }
            } catch (err) {
              console.error('Error processing new message:', err);
            }
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'messages'
          },
          (payload) => {
            try {
              console.log('Message updated (read status):', payload);
              
              const updatedMessage: Message = {
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

              // Update message in state
              setMessages(prev => ({
                ...prev,
                [updatedMessage.conversation_id]: (prev[updatedMessage.conversation_id] || []).map(msg =>
                  msg.id === updatedMessage.id ? updatedMessage : msg
                )
              }));
            } catch (err) {
              console.error('Error processing message update:', err);
            }
          }
        )
        .subscribe((status) => {
          console.log('Messages subscription status:', status);
          if (status === 'SUBSCRIBED') {
            console.log('Successfully subscribed to messages');
          } else if (status === 'CLOSED') {
            console.warn('Messages subscription closed');
          } else if (status === 'CHANNEL_ERROR') {
            console.error('Messages subscription error');
          }
        });

      // Subscribe to conversation updates
      conversationsChannel = supabase
        .channel(`user_conversations_${user.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'conversations',
            filter: `participant_1_id=eq.${user.id}`
          },
          (payload) => {
            console.log('Conversation updated (participant 1):', payload);
            // Reload conversations to get fresh data with participant info
            setTimeout(() => loadConversations(), 100);
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
          (payload) => {
            console.log('Conversation updated (participant 2):', payload);
            // Reload conversations to get fresh data with participant info
            setTimeout(() => loadConversations(), 100);
          }
        )
        .subscribe((status) => {
          console.log('Conversations subscription status:', status);
          if (status === 'SUBSCRIBED') {
            console.log('Successfully subscribed to conversations');
          }
        });

    } catch (err) {
      console.warn('Failed to set up real-time subscriptions:', err);
    }

    return () => {
      console.log('Cleaning up real-time subscriptions');
      try {
        if (messagesChannel) {
          supabase.removeChannel(messagesChannel);
        }
        if (conversationsChannel) {
          supabase.removeChannel(conversationsChannel);
        }
      } catch (err) {
        console.warn('Error cleaning up subscriptions:', err);
      }
    };
  }, [user, testMode, conversations, loadConversations]);

  // Load initial data only once when user is available and not in test mode
  useEffect(() => {
    if (user && !testMode) {
      loadConversations();
    }
  }, [user, loadConversations]);

  // Allow switching back to live mode
  const retryLive = useCallback(async () => {
    setLoading(true);
    try {
      const ok = await testSupabaseConnection();
      if (ok) {
        setTestMode(false);
        await loadConversations();
        toast.success('Live mode enabled');
        return true;
      } else {
        toast.error('Still offline. Staying in test mode.');
        setTestMode(true);
        loadTestData();
        return false;
      }
    } catch (err) {
      console.error('Retry live mode failed:', err);
      toast.error('Could not enable live mode');
      setTestMode(true);
      loadTestData();
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadConversations, loadTestData]);

  return {
    conversations,
    messages,
    loading,
    error,
    testMode,
    loadMessages,
    sendMessage,
    createConversation,
    markAsRead,
    retryLive,
    refetch: loadConversations
  };
};