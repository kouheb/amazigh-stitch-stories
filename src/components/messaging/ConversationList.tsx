import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { ConversationItem } from "./ConversationItem";
import type { Conversation } from "@/types/messaging";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  loading: boolean;
}

export const ConversationList = ({ 
  conversations, 
  selectedConversationId, 
  onSelectConversation,
  loading 
}: ConversationListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(conversation => {
    if (!searchQuery) return true;
    
    const participant = conversation.other_participant;
    const searchTerm = searchQuery.toLowerCase();
    
    return (
      participant?.display_name?.toLowerCase().includes(searchTerm) ||
      participant?.full_name?.toLowerCase().includes(searchTerm) ||
      participant?.email?.toLowerCase().includes(searchTerm) ||
      conversation.last_message?.content?.toLowerCase().includes(searchTerm)
    );
  });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-muted-foreground">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 && searchQuery && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No conversations found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search</p>
          </div>
        )}
        
        {filteredConversations.length === 0 && !searchQuery && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No conversations yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start a new conversation to connect with others</p>
          </div>
        )}

        {filteredConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedConversationId === conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
          />
        ))}
      </div>
    </div>
  );
};