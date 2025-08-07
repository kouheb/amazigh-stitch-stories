import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MessengerLayout } from '@/components/messaging/messenger/MessengerLayout';
import { useMessaging } from '@/hooks/useMessaging';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
      console.log('Attempting to start conversation with user:', targetUserId);
      const conversationId = await messagingHook.getOrCreateConversation(targetUserId);
      if (conversationId) {
        console.log('Conversation created/found:', conversationId);
        // Update URL to show the real conversation
        navigate(`/messaging?conversation=${conversationId}`, { replace: true });
        toast.success('Conversation started successfully!');
      } else {
        console.error('Failed to get conversation ID');
        toast.error('Failed to start conversation. Please try again.');
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast.error('Failed to start conversation. Please try again.');
    }
  };

  const handleStartConversation = async (userId: string) => {
    await startConversationWithUser(userId);
  };

  const selectedConversationId = searchParams.get('conversation');

  // Clean up test conversations
  useEffect(() => {
    if (selectedConversationId && selectedConversationId.startsWith('test-')) {
      navigate('/messaging', { replace: true });
    }
  }, [selectedConversationId, navigate]);

  const handleSelectConversation = (conversationId: string | null) => {
    if (conversationId && !conversationId.startsWith('test-')) {
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