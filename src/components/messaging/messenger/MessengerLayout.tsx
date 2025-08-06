import React, { useState, useEffect } from 'react';
import { MessengerConversationList } from './MessengerConversationList';
import { MessengerChat } from './MessengerChat';
import { EmptyState } from '../EmptyState';
import { useMessaging } from '@/hooks/useMessaging';
import { useConversation } from '@/hooks/useMessaging';
import { useIsMobile } from '@/hooks/use-mobile';

interface MessengerLayoutProps {
  selectedConversationId?: string | null;
  onSelectConversation?: (conversationId: string) => void;
  onStartConversation?: (userId: string) => void;
}

export const MessengerLayout = ({ 
  selectedConversationId: propSelectedConversationId,
  onSelectConversation: propOnSelectConversation,
  onStartConversation 
}: MessengerLayoutProps) => {
  const isMobile = useIsMobile();
  const [internalSelectedConversationId, setInternalSelectedConversationId] = useState<string | null>(null);
  
  // Use prop or internal state
  const selectedConversationId = propSelectedConversationId ?? internalSelectedConversationId;
  const onSelectConversation = propOnSelectConversation ?? setInternalSelectedConversationId;

  const { conversations, loading, sendMessage, markAsRead } = useMessaging();
  const { conversation, loading: conversationLoading } = useConversation(selectedConversationId);

  const handleSelectConversation = (conversationId: string) => {
    onSelectConversation(conversationId);
    // Mark messages as read when opening conversation
    markAsRead(conversationId);
  };

  const handleSendMessage = async (content: string) => {
    if (selectedConversationId) {
      await sendMessage(selectedConversationId, content);
    }
  };

  const handleBackToList = () => {
    onSelectConversation(null);
  };

  // Mobile layout: show either list or chat
  if (isMobile) {
    if (selectedConversationId && conversation) {
      return (
        <div className="h-full">
          <MessengerChat
            conversation={conversation}
            onSendMessage={handleSendMessage}
            onBack={handleBackToList}
            showBackButton={true}
          />
        </div>
      );
    }

    return (
      <div className="h-full">
        <MessengerConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
          loading={loading}
        />
      </div>
    );
  }

  // Desktop layout: show both list and chat side by side
  return (
    <div className="h-full flex bg-background">
      {/* Conversations sidebar */}
      <div className="w-80 border-r flex-shrink-0">
        <MessengerConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
          loading={loading}
        />
      </div>

      {/* Chat area */}
      <div className="flex-1">
        {selectedConversationId && conversation ? (
          <MessengerChat
            conversation={conversation}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <EmptyState onStartConversation={onStartConversation} />
        )}
      </div>
    </div>
  );
};