import React, { useState, useEffect } from 'react';
import { MessengerConversationList } from './MessengerConversationList';
import { MessengerChat } from './MessengerChat';
import { EmptyState } from '../EmptyState';
// Removed old useConversation hook - using new real-time system
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import type { Conversation, ConversationWithMessages } from '@/types/messaging';

interface MessengerLayoutProps {
  selectedConversationId?: string | null;
  onSelectConversation?: (conversationId: string) => void;
  onStartConversation?: (userId: string) => void;
  messagingHook?: {
    conversations: Conversation[];
    loading: boolean;
    sendMessage: (conversationId: string, content: string, messageType?: 'text' | 'image' | 'file', fileUrl?: string, fileName?: string) => Promise<boolean>;
    markAsRead: (conversationId: string) => Promise<void>;
    loadMessages: (conversationId: string) => Promise<void>;
  };
}

export const MessengerLayout = ({ 
  selectedConversationId: propSelectedConversationId,
  onSelectConversation: propOnSelectConversation,
  onStartConversation,
  messagingHook
}: MessengerLayoutProps) => {
  const isMobile = useIsMobile();
  const [internalSelectedConversationId, setInternalSelectedConversationId] = useState<string | null>(null);
  
  // Use prop or internal state
  const selectedConversationId = propSelectedConversationId ?? internalSelectedConversationId;
  const onSelectConversation = propOnSelectConversation ?? setInternalSelectedConversationId;

  // Use provided messaging hook or default empty state
  const conversations = messagingHook?.conversations || [];
  const loading = messagingHook?.loading || false;
  const sendMessage = messagingHook?.sendMessage || (async () => false);
  const markAsRead = messagingHook?.markAsRead || (async () => {});
  const loadMessages = messagingHook?.loadMessages || (async () => {});
  
  const { user } = useAuth();

  // Find the active conversation from the loaded conversations
  const activeConversation = selectedConversationId 
    ? conversations.find(conv => conv.id === selectedConversationId) 
    : null;

  const handleSelectConversation = async (conversationId: string) => {
    onSelectConversation(conversationId);
    // Load messages for the conversation and mark as read
    try {
      await loadMessages(conversationId);
      await markAsRead(conversationId);
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
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
    if (selectedConversationId && activeConversation) {
      // Convert to ConversationWithMessages format
      const conversationWithMessages: ConversationWithMessages = {
        ...activeConversation,
        messages: [] // Messages are loaded separately in the new system
      };
      
      return (
        <div className="h-full">
          <MessengerChat
            conversation={conversationWithMessages}
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
        {selectedConversationId && activeConversation ? (
          (() => {
            // Convert to ConversationWithMessages format
            const conversationWithMessages: ConversationWithMessages = {
              ...activeConversation,
              messages: [] // Messages are loaded separately in the new system
            };
            
            return (
              <MessengerChat
                conversation={conversationWithMessages}
                onSendMessage={handleSendMessage}
              />
            );
          })()
        ) : (
          <EmptyState onStartConversation={onStartConversation} />
        )}
      </div>
    </div>
  );
};