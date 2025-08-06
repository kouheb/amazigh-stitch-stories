import React, { useEffect, useRef, useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import { MessengerToolbar } from './MessengerToolbar';
import { MessengerInput } from './MessengerInput';
import { useAuth } from '@/contexts/AuthContext';
import type { ConversationWithMessages } from '@/types/messaging';

interface MessengerChatProps {
  conversation: ConversationWithMessages;
  onSendMessage: (content: string) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const MessengerChat = ({ 
  conversation, 
  onSendMessage, 
  onBack, 
  showBackButton = false 
}: MessengerChatProps) => {
  const { user } = useAuth();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getDisplayName = () => {
    return conversation.other_participant?.display_name || 
           conversation.other_participant?.full_name || 
           conversation.other_participant?.email?.split('@')[0] || 
           'Unknown User';
  };

  const getSubtitle = () => {
    return 'Active now'; // You can enhance this with real presence data
  };

  // Process messages for bubble grouping
  const processedMessages = useMemo(() => {
    return conversation.messages.map((message, index) => {
      const isMine = message.sender_id === user?.id;
      const prevMessage = conversation.messages[index - 1];
      const nextMessage = conversation.messages[index + 1];
      
      const prevIsMine = prevMessage ? prevMessage.sender_id === user?.id : null;
      const nextIsMine = nextMessage ? nextMessage.sender_id === user?.id : null;
      
      // Check if this message starts a new sequence
      const startsSequence = prevIsMine !== isMine;
      
      // Check if this message ends a sequence
      const endsSequence = nextIsMine !== isMine;
      
      // Show timestamp if it's the first message or significant time gap
      const showTimestamp = index === 0 || 
        (prevMessage && new Date(message.created_at).getTime() - new Date(prevMessage.created_at).getTime() > 300000); // 5 minutes
      
      return {
        ...message,
        isMine,
        startsSequence,
        endsSequence,
        showTimestamp
      };
    });
  }, [conversation.messages, user?.id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Toolbar */}
      <MessengerToolbar
        title={getDisplayName()}
        subtitle={getSubtitle()}
        avatarUrl={conversation.other_participant?.avatar_url}
        onBack={onBack}
        showBackButton={showBackButton}
        onCall={() => console.log('Call initiated')}
        onVideoCall={() => console.log('Video call initiated')}
        onInfo={() => console.log('Info clicked')}
      />

      {/* Messages */}
      <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
        <div className="py-4 space-y-1">
          {processedMessages.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            processedMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isMine={message.isMine}
                startsSequence={message.startsSequence}
                endsSequence={message.endsSequence}
                showTimestamp={message.showTimestamp}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <MessengerInput
        onSendMessage={onSendMessage}
        placeholder={`Message ${getDisplayName()}...`}
      />
    </div>
  );
};