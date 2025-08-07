import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MessagingInterface } from '@/components/messaging/MessagingInterface';
import { useRealTimeMessaging } from '@/hooks/useRealTimeMessaging';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function MessagingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const messagingHook = useRealTimeMessaging();

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
      const conversationId = await messagingHook.createConversation(targetUserId);
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
    <div className="h-screen flex flex-col">
      {/* Header with back button */}
      <div className="flex items-center gap-4 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-lg font-semibold">Messages</h1>
      </div>
      
      {/* Messaging interface */}
      <div className="flex-1">
        <MessagingInterface 
          onStartConversation={handleStartConversation}
        />
      </div>
    </div>
  );
}