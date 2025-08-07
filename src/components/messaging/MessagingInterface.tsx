import React, { useState } from 'react';
import { ConversationList } from './ConversationList';
import { ConversationView } from './ConversationView';
import { useRealTimeMessaging } from '@/hooks/useRealTimeMessaging';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessagingInterfaceProps {
  onStartConversation?: (userId: string) => void;
}

export const MessagingInterface = ({ onStartConversation }: MessagingInterfaceProps) => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [showConversationList, setShowConversationList] = useState(true);

  const {
    conversations,
    messages,
    loading,
    error,
    loadMessages,
    sendMessage,
    createConversation,
    markAsRead
  } = useRealTimeMessaging();

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);
  const conversationMessages = selectedConversationId ? messages[selectedConversationId] || [] : [];

  const handleSelectConversation = async (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setShowConversationList(false);
    await loadMessages(conversationId);
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedConversationId) return false;
    return await sendMessage(selectedConversationId, content);
  };

  const handleBack = () => {
    setShowConversationList(true);
    setSelectedConversationId(null);
  };

  const handleMarkAsRead = () => {
    if (selectedConversationId) {
      markAsRead(selectedConversationId);
    }
  };

  const handleStartConversation = async (userId: string) => {
    const conversationId = await createConversation(userId);
    if (conversationId) {
      handleSelectConversation(conversationId);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-destructive mb-2">Failed to load messaging</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-background">
      {/* Conversation List */}
      <div className={cn(
        "w-full lg:w-80 lg:border-r border-border",
        !showConversationList && "hidden lg:block"
      )}>
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
          loading={loading}
        />
      </div>

      {/* Conversation View */}
      <div className={cn(
        "flex-1",
        showConversationList && "hidden lg:block"
      )}>
        {selectedConversation ? (
          <ConversationView
            conversation={selectedConversation}
            messages={conversationMessages}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
            onMarkAsRead={handleMarkAsRead}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Select a conversation
              </h3>
              <p className="text-muted-foreground mb-4">
                Choose a conversation to start messaging
              </p>
              {onStartConversation && (
                <Button onClick={() => onStartConversation('')}>
                  Start New Conversation
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};