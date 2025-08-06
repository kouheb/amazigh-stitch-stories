import { useState, useEffect } from "react";
import { ConversationList } from "./ConversationList";
import { ChatArea } from "./ChatArea";
import { EmptyState } from "./EmptyState";
import { useMessaging } from "@/hooks/useMessaging";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const MessagingTab = () => {
  const { user } = useAuth();
  const { conversations, loading, getOrCreateConversation, sendMessage, markAsRead } = useMessaging();
  
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  // Handle responsive layout
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
  };

  const handleBackToList = () => {
    setSelectedConversationId(null);
  };

  const handleStartConversation = async (userId: string) => {
    try {
      const conversationId = await getOrCreateConversation(userId);
      if (conversationId) {
        setSelectedConversationId(conversationId);
      } else {
        toast.error('Failed to start conversation');
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast.error('Failed to start conversation');
    }
  };

  // Mobile view: show only chat or only list
  if (isMobileView) {
    if (selectedConversationId) {
      return (
        <div className="h-full flex flex-col">
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
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b border-border">
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
    <div className="h-full flex">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b border-border">
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
};