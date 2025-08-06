import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, MessageSquare } from 'lucide-react';
import { ConversationItem } from './MessengerConversationItem';
import type { Conversation } from '@/types/messaging';

interface MessengerConversationListProps {
  conversations: Conversation[];
  selectedConversationId?: string | null;
  onSelectConversation: (conversationId: string) => void;
  loading?: boolean;
}

export const MessengerConversationList = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
  loading = false
}: MessengerConversationListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conversation => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    const participantName = conversation.other_participant?.display_name || 
                           conversation.other_participant?.full_name || 
                           conversation.other_participant?.email || '';
    const lastMessage = conversation.last_message?.content || '';
    
    return participantName.toLowerCase().includes(query) || 
           lastMessage.toLowerCase().includes(query);
  });

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 rounded-2xl"
              disabled
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold mb-4">Chats</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="pl-10 rounded-2xl border-2 focus:border-primary"
          />
        </div>
      </div>

      {/* Conversations */}
      <ScrollArea className="flex-1">
        {filteredConversations.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery.trim() ? 'No conversations found' : 'No conversations yet'}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery.trim() 
                ? 'Try searching with different keywords' 
                : 'Start a conversation by searching for people'
              }
            </p>
          </div>
        ) : (
          <div className="px-2">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversationId === conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};