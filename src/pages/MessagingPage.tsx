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

  // Removed auto-retry live mode to avoid toast flapping; manual retry only

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

// Removed cleanup of test conversations to allow test mode navigation


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
          onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-lg font-semibold">Messages</h1>
      </div>

      {messagingHook.testMode && (
        <div className="bg-muted/50 border-b px-4 py-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Database connection issue. Using test mode.</span>
          <Button size="sm" onClick={async () => {
            const ok = await messagingHook.retryLive();
            if (ok) navigate('/messaging');
          }}>
            Start live mode
          </Button>
        </div>
      )}
      
      {/* Messaging interface */}
      <div className="flex-1">
        <MessagingInterface 
          onStartConversation={handleStartConversation}
        />
      </div>
    </div>
  );
}