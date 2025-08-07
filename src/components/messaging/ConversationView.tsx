import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Message, Conversation } from '@/types/messaging';
import { useAuth } from '@/contexts/AuthContext';

interface ConversationViewProps {
  conversation: Conversation;
  messages: Message[];
  onSendMessage: (content: string) => Promise<boolean>;
  onBack: () => void;
  onMarkAsRead: () => void;
}

export const ConversationView = ({
  conversation,
  messages,
  onSendMessage,
  onBack,
  onMarkAsRead
}: ConversationViewProps) => {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    onMarkAsRead();
  }, [onMarkAsRead]);

  const otherParticipant = conversation.other_participant;
  const displayName = otherParticipant?.display_name || otherParticipant?.full_name || 'Unknown User';

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="lg:hidden">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <Avatar className="h-10 w-10">
          <AvatarImage src={otherParticipant?.avatar_url} />
          <AvatarFallback>
            {displayName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{displayName}</h3>
          <p className="text-sm text-muted-foreground">
            {otherParticipant?.email}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">No messages yet</p>
              <p className="text-sm text-muted-foreground">
                Start a conversation with {displayName}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.sender_id === user?.id}
                senderName={
                  message.sender_id === user?.id 
                    ? 'You' 
                    : displayName
                }
                senderAvatar={
                  message.sender_id === user?.id 
                    ? user?.user_metadata?.avatar_url
                    : otherParticipant?.avatar_url
                }
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t border-border p-4">
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};