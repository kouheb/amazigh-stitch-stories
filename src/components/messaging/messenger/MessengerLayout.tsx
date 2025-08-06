import React, { useState, useEffect } from 'react';
import { MessengerConversationList } from './MessengerConversationList';
import { MessengerChat } from './MessengerChat';
import { EmptyState } from '../EmptyState';
import { useConversation } from '@/hooks/useMessaging';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import type { Conversation, Message } from '@/types/messaging';

interface MessengerLayoutProps {
  selectedConversationId?: string | null;
  onSelectConversation?: (conversationId: string) => void;
  onStartConversation?: (userId: string) => void;
  messagingHook?: {
    conversations: Conversation[];
    loading: boolean;
    sendMessage: (conversationId: string, content: string, messageType?: 'text' | 'image' | 'file', fileUrl?: string, fileName?: string) => Promise<boolean>;
    markAsRead: (conversationId: string) => Promise<void>;
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
  
  // Check if this is a mock conversation (offline mode) - kept for backward compatibility
  const isMockConversation = selectedConversationId?.startsWith('mock-');
  const mockUserId = isMockConversation ? selectedConversationId?.replace('mock-', '') : null;
  
  const { conversation, loading: conversationLoading } = useConversation(isMockConversation ? null : selectedConversationId);
  const { user } = useAuth();

  // Create mock conversation for offline mode with message tracking (kept for fallback)
  const [mockMessages, setMockMessages] = useState<Message[]>([]);
  
  const mockConversation = isMockConversation && mockUserId ? {
    id: selectedConversationId,
    participant_1_id: user?.id || 'current-user',
    participant_2_id: mockUserId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_message_at: null,
    last_message_id: null,
    other_participant: {
      id: mockUserId,
      display_name: mockUserId === 'a990b02c-5913-4bdf-9609-68dee14cdd2d' ? 'BRILYSM' : 'User',
      full_name: mockUserId === 'a990b02c-5913-4bdf-9609-68dee14cdd2d' ? 'Nabil' : 'User',
      email: mockUserId === 'a990b02c-5913-4bdf-9609-68dee14cdd2d' ? 'nabilguellil0@gmail.com' : 'user@email.com',
      avatar_url: ''
    },
    messages: mockMessages
  } : null;

  // Listen for mock message events and initialize with welcome message (kept for fallback)
  useEffect(() => {
    const handleMockMessage = (event: CustomEvent) => {
      const { message, conversationId } = event.detail;
      if (conversationId === selectedConversationId) {
        setMockMessages(prev => [...prev, message]);
      }
    };

    // Initialize mock conversation with a welcome message only if it's actually a mock conversation
    if (isMockConversation && mockMessages.length === 0) {
      const welcomeMessage = {
        id: `welcome-${Date.now()}`,
        conversation_id: selectedConversationId!,
        sender_id: mockUserId!,
        content: "Hello! This is a mock conversation since we're currently offline. Your messages will appear here but won't be saved.",
        message_type: 'text' as const,
        is_read: false,
        created_at: new Date().toISOString()
      };
      setMockMessages([welcomeMessage]);
    }

    window.addEventListener('mockMessageSent', handleMockMessage as EventListener);
    return () => {
      window.removeEventListener('mockMessageSent', handleMockMessage as EventListener);
    };
  }, [selectedConversationId, isMockConversation, mockUserId, mockMessages.length]);

  // Use real conversation or mock conversation as fallback
  const activeConversation = conversation || mockConversation;

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
    if (selectedConversationId && activeConversation) {
      return (
        <div className="h-full">
          <MessengerChat
            conversation={activeConversation}
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
          <MessengerChat
            conversation={activeConversation}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <EmptyState onStartConversation={onStartConversation} />
        )}
      </div>
    </div>
  );
};