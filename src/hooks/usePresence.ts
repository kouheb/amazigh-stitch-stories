import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserPresence {
  user_id: string;
  display_name?: string;
  avatar_url?: string;
  online_at: string;
  status: 'online' | 'away' | 'offline';
}

interface UsePresenceOptions {
  conversationId?: string;
  enableTypingIndicator?: boolean;
}

export const usePresence = ({ conversationId, enableTypingIndicator = true }: UsePresenceOptions = {}) => {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Track user presence
  const updatePresence = useCallback(async (status: 'online' | 'away' | 'offline' = 'online') => {
    if (!user || !conversationId) return;

    try {
      const channel = supabase.channel(`presence_${conversationId}`);
      
      await channel.subscribe(async (subscriptionStatus) => {
        if (subscriptionStatus === 'SUBSCRIBED') {
          await channel.track({
            user_id: user.id,
            display_name: user.user_metadata?.display_name || user.email,
            avatar_url: user.user_metadata?.avatar_url,
            online_at: new Date().toISOString(),
            status: status
          });
        }
      });

      // Listen for presence changes
      channel
        .on('presence', { event: 'sync' }, () => {
          const presenceState = channel.presenceState();
          const users: UserPresence[] = [];
          
          for (const [userId, presenceArray] of Object.entries(presenceState)) {
            if (Array.isArray(presenceArray) && presenceArray.length > 0) {
              // Type assertion since we know the structure
              const presence = presenceArray[0] as any;
              if (presence.user_id && presence.online_at && presence.status) {
                users.push({
                  user_id: presence.user_id,
                  display_name: presence.display_name,
                  avatar_url: presence.avatar_url,
                  online_at: presence.online_at,
                  status: presence.status
                });
              }
            }
          }
          
          setOnlineUsers(users.filter(u => u.user_id !== user.id));
        })
        .on('presence', { event: 'join' }, ({ newPresences }) => {
          console.log('User joined:', newPresences);
        })
        .on('presence', { event: 'leave' }, ({ leftPresences }) => {
          console.log('User left:', leftPresences);
        });

      return channel;
    } catch (error) {
      console.error('Error updating presence:', error);
    }
  }, [user, conversationId]);

  // Handle typing indicators
  const startTyping = useCallback(async () => {
    if (!user || !conversationId || !enableTypingIndicator) return;

    setIsTyping(true);
    
    try {
      const channel = supabase.channel(`typing_${conversationId}`);
      await channel.subscribe();
      
      await channel.send({
        type: 'broadcast',
        event: 'typing_start',
        payload: {
          user_id: user.id,
          display_name: user.user_metadata?.display_name || user.email
        }
      });
    } catch (error) {
      console.error('Error sending typing start:', error);
    }
  }, [user, conversationId, enableTypingIndicator]);

  const stopTyping = useCallback(async () => {
    if (!user || !conversationId || !enableTypingIndicator) return;

    setIsTyping(false);
    
    try {
      const channel = supabase.channel(`typing_${conversationId}`);
      await channel.subscribe();
      
      await channel.send({
        type: 'broadcast',
        event: 'typing_stop',
        payload: {
          user_id: user.id
        }
      });
    } catch (error) {
      console.error('Error sending typing stop:', error);
    }
  }, [user, conversationId, enableTypingIndicator]);

  // Set up typing indicator listeners
  useEffect(() => {
    if (!conversationId || !enableTypingIndicator) return;

    const typingChannel = supabase.channel(`typing_${conversationId}`);
    
    typingChannel
      .on('broadcast', { event: 'typing_start' }, (payload) => {
        const { user_id, display_name } = payload.payload;
        if (user_id !== user?.id) {
          setTypingUsers(prev => {
            if (!prev.includes(display_name)) {
              return [...prev, display_name];
            }
            return prev;
          });
        }
      })
      .on('broadcast', { event: 'typing_stop' }, (payload) => {
        const { user_id } = payload.payload;
        if (user_id !== user?.id) {
          // Remove from typing users (we'd need to track user_id -> display_name mapping)
          setTypingUsers(prev => prev.filter(name => {
            // This is a simplified approach - in production you'd want better tracking
            return false;
          }));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(typingChannel);
    };
  }, [conversationId, enableTypingIndicator, user?.id]);

  // Auto-stop typing after a delay
  useEffect(() => {
    if (!isTyping) return;

    const timer = setTimeout(() => {
      stopTyping();
    }, 3000); // Stop typing after 3 seconds of inactivity

    return () => clearTimeout(timer);
  }, [isTyping, stopTyping]);

  return {
    onlineUsers,
    typingUsers,
    isTyping,
    startTyping,
    stopTyping,
    updatePresence
  };
};