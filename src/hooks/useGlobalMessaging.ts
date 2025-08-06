import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useGlobalMessaging = () => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    // Set up global real-time listener for new messages
    const channel = supabase
      .channel('global-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        async (payload) => {
          const newMessage = payload.new;
          
          // Get the conversation to check if current user is a participant
          const { data: conversation } = await supabase
            .from('conversations')
            .select('participant_1_id, participant_2_id')
            .eq('id', newMessage.conversation_id)
            .single();

          if (!conversation) return;

          // Only show notifications for messages received by current user
          const isRecipient = (conversation.participant_1_id === user.id && newMessage.sender_id !== user.id) ||
                             (conversation.participant_2_id === user.id && newMessage.sender_id !== user.id);

          if (isRecipient) {
            // Get sender info for notification
            const { data: senderProfile } = await supabase
              .from('profiles')
              .select('display_name, full_name, email')
              .eq('id', newMessage.sender_id)
              .single();

            const senderName = senderProfile?.display_name || 
                             senderProfile?.full_name || 
                             senderProfile?.email || 
                             'Someone';
            
            toast.success(`New message from ${senderName}`, {
              description: newMessage.content.substring(0, 50) + (newMessage.content.length > 50 ? '...' : ''),
              action: {
                label: 'View',
                onClick: () => {
                  window.location.href = `/messaging?conversation=${newMessage.conversation_id}`;
                }
              }
            });

            // Update unread count
            setUnreadCount(prev => prev + 1);
          }
        }
      )
      .subscribe();

    // Load initial unread count
    loadUnreadCount();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const loadUnreadCount = async () => {
    if (!user) return;

    try {
      // Get all conversations for this user
      const { data: conversations } = await supabase
        .from('conversations')
        .select('id')
        .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`);

      if (!conversations) return;

      // Count unread messages across all conversations
      let totalUnread = 0;
      for (const conv of conversations) {
        const { count } = await supabase
          .from('messages')
          .select('id', { count: 'exact' })
          .eq('conversation_id', conv.id)
          .eq('is_read', false)
          .neq('sender_id', user.id);

        totalUnread += count || 0;
      }

      setUnreadCount(totalUnread);
    } catch (error) {
      console.warn('Could not load unread count');
    }
  };

  const markAsRead = async (conversationId: string) => {
    if (!user) return;

    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', user.id)
        .eq('is_read', false);

      // Reload unread count
      loadUnreadCount();
    } catch (error) {
      console.warn('Could not mark messages as read');
    }
  };

  return {
    unreadCount,
    markAsRead,
    loadUnreadCount
  };
};