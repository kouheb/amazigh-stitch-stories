import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MessengerLayout } from '@/components/messaging/messenger/MessengerLayout';
import { useMessaging } from '@/hooks/useMessaging';
import { useAuth } from '@/contexts/AuthContext';

export default function MessagingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const messagingHook = useMessaging();

  // Handle direct message URL parameter
  useEffect(() => {
    const targetUserId = searchParams.get('user');
    if (targetUserId && user) {
      startConversationWithUser(targetUserId);
    }
  }, [searchParams, user]);

  const startConversationWithUser = async (targetUserId: string) => {
    try {
      const conversationId = await messagingHook.getOrCreateConversation(targetUserId);
      if (conversationId) {
        // Update URL to remove user parameter and add conversation
        navigate(`/messaging?conversation=${conversationId}`, { replace: true });
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  const handleStartConversation = async (userId: string) => {
    await startConversationWithUser(userId);
  };

  const selectedConversationId = searchParams.get('conversation');

  const handleSelectConversation = (conversationId: string | null) => {
    if (conversationId) {
      navigate(`/messaging?conversation=${conversationId}`);
    } else {
      navigate('/messaging');
    }
  };

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Please sign in to access messaging.</p>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <MessengerLayout 
        selectedConversationId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
        onStartConversation={handleStartConversation}
        messagingHook={messagingHook}
      />
    </div>
  );
}