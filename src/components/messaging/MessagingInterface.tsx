import React, { useState } from 'react';
import { ConversationList } from './ConversationList';
import { ConversationView } from './ConversationView';
import { useRealTimeMessaging } from '@/hooks/useRealTimeMessaging';
import { usePresence } from '@/hooks/usePresence';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TypingIndicator } from './TypingIndicator';

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

  const { onlineUsers, typingUsers, updatePresence } = usePresence({ 
    conversationId: selectedConversationId || undefined,
    enableTypingIndicator: true 
  });

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);
  const conversationMessages = selectedConversationId ? messages[selectedConversationId] || [] : [];

  const handleSelectConversation = async (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setShowConversationList(false);
    await loadMessages(conversationId);
    // Update presence for this conversation
    updatePresence('online');
  };

  const handleSendMessage = async (content: string, type?: 'text' | 'image' | 'file', fileUrl?: string, fileName?: string) => {
    if (!selectedConversationId) return false;
    
    if (type && (type === 'image' || type === 'file') && fileUrl) {
      // For multimedia messages, we need to enhance the sendMessage function
      // For now, send as text with file info
      const messageContent = content || `Sent ${type === 'image' ? 'an image' : 'a file'}${fileName ? `: ${fileName}` : ''}`;
      return await sendMessage(selectedConversationId, messageContent);
    }
    
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
        "w-full lg:w-80 lg:border-r border-border bg-background",
        !showConversationList && "hidden lg:block"
      )}>
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Messages</h2>
            <div className="flex items-center gap-2">
              {onlineUsers.length > 0 && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{onlineUsers.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
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
          <div className="flex flex-col h-full">
            <ConversationView
              conversation={selectedConversation}
              messages={conversationMessages}
              onSendMessage={handleSendMessage}
              onBack={handleBack}
              onMarkAsRead={handleMarkAsRead}
            />
            {typingUsers.length > 0 && (
              <TypingIndicator 
                isTyping={true} 
                userNames={typingUsers}
                className="border-t"
              />
            )}
          </div>
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