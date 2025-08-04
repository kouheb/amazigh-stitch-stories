import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useGlobalMessaging = () => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    // Set up global real-time listener for messages
    const channel = supabase
      .channel('global-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          const newMessage = payload.new;
          
          // Only show notifications for messages received by current user
          if (newMessage.recipient_id === user.id && newMessage.sender_id !== user.id) {
            // Get sender info for notification
            supabase
              .from('profiles')
              .select('display_name, full_name, email')
              .eq('id', newMessage.sender_id)
              .single()
              .then(({ data: senderProfile }) => {
                const senderName = senderProfile?.display_name || 
                                 senderProfile?.full_name || 
                                 senderProfile?.email || 
                                 'Someone';
                
                toast.success(`New message from ${senderName}`, {
                  description: newMessage.content.substring(0, 50) + (newMessage.content.length > 50 ? '...' : ''),
                  action: {
                    label: 'View',
                    onClick: () => {
                      window.location.href = `/messaging?user=${newMessage.sender_id}`;
                    }
                  }
                });
              }, () => {
                toast.success('New message received!', {
                  description: newMessage.content.substring(0, 50) + (newMessage.content.length > 50 ? '...' : ''),
                  action: {
                    label: 'View',
                    onClick: () => {
                      window.location.href = `/messaging?user=${newMessage.sender_id}`;
                    }
                  }
                });
              });

            // Update unread count
            setUnreadCount(prev => prev + 1);
          }
        }
      )
      .subscribe((status) => {
        console.log('Global messaging status:', status);
      });

    // Load initial unread count
    loadUnreadCount();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const loadUnreadCount = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('id')
        .eq('recipient_id', user.id)
        .eq('is_read', false);

      if (!error && data) {
        setUnreadCount(data.length);
      }
    } catch (error) {
      console.warn('Could not load unread count');
    }
  };

  const markAsRead = async (senderId: string) => {
    if (!user) return;

    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('recipient_id', user.id)
        .eq('sender_id', senderId);

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