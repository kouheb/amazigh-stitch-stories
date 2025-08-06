import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ConversationList } from "@/components/messaging/ConversationList";
import { ChatArea } from "@/components/messaging/ChatArea";
import { EmptyState } from "@/components/messaging/EmptyState";
import { useMessaging } from "@/hooks/useMessaging";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function MessagingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { conversations, loading, getOrCreateConversation, sendMessage, markAsRead } = useMessaging();
  
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  // Check for direct message URL parameter
  useEffect(() => {
    const targetUserId = searchParams.get('user');
    if (targetUserId && user) {
      startConversationWithUser(targetUserId);
    }
  }, [searchParams, user]);

  // Handle responsive layout
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const startConversationWithUser = async (targetUserId: string) => {
    try {
      const conversationId = await getOrCreateConversation(targetUserId);
      if (conversationId) {
        setSelectedConversationId(conversationId);
        // Clear the URL parameter
        setSearchParams({});
      } else {
        toast.error('Failed to start conversation');
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast.error('Failed to start conversation');
    }
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
  };

  const handleBackToList = () => {
    setSelectedConversationId(null);
  };

  const handleStartConversation = (userId: string) => {
    startConversationWithUser(userId);
  };

  // Mobile view: show only chat or only list
  if (isMobileView) {
    if (selectedConversationId) {
      return (
        <div className="h-screen flex flex-col">
          <ChatArea 
            conversationId={selectedConversationId} 
            onBack={handleBackToList}
            onSendMessage={sendMessage}
            onMarkAsRead={markAsRead}
          />
        </div>
      );
    }

    return (
      <div className="h-screen flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate('/app')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Messages</h1>
        </div>
        
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
          loading={loading}
        />
      </div>
    );
  }

  // Desktop view: show both panels
  return (
    <div className="h-screen flex">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate('/app')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Messages</h1>
        </div>
        
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
          loading={loading}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversationId ? (
          <ChatArea 
            conversationId={selectedConversationId}
            onSendMessage={sendMessage}
            onMarkAsRead={markAsRead}
          />
        ) : (
          <EmptyState onStartConversation={handleStartConversation} />
        )}
      </div>
    </div>
  );
}