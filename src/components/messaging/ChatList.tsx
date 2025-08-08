
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  participant: {
    name: string;
    avatar: string;
    status: "online" | "offline";
    lastSeen: string;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
  };
  unreadCount: number;
}

interface ChatListProps {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
  searchQuery: string;
}

export const ChatList = ({ 
  conversations, 
  selectedId, 
  onSelect, 
  searchQuery 
}: ChatListProps) => {
  const filteredConversations = conversations.filter(conversation =>
    conversation.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredConversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelect(conversation.id)}
          className={cn(
            "p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0",
            selectedId === conversation.id && "bg-orange-50 border-orange-200 hover:bg-orange-50"
          )}
        >
          <div className="flex items-start gap-3">
            <div className="relative flex-shrink-0">
              <Avatar className="h-12 w-12">
                <AvatarImage src={conversation.participant.avatar} />
                <AvatarFallback>
                  {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {conversation.participant.status === "online" && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-gray-800 truncate">
                  {conversation.participant.name}
                </h4>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {conversation.lastMessage.timestamp}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <p className={cn(
                  "text-sm truncate flex-1",
                  conversation.lastMessage.isRead ? "text-gray-600" : "text-gray-800 font-medium"
                )}>
                  {conversation.lastMessage.text}
                </p>
                
                {conversation.unreadCount > 0 && (
                  <Badge className="bg-orange-600 text-white text-xs ml-2 flex-shrink-0">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {filteredConversations.length === 0 && searchQuery && (
        <div className="p-8 text-center">
          <p className="text-gray-500">No conversations found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search</p>
        </div>
      )}
      
      {filteredConversations.length === 0 && !searchQuery && (
        <div className="p-8 text-center">
          <p className="text-gray-500">No conversations yet</p>
          <p className="text-sm text-gray-400 mt-1">Start a new conversation to connect with artisans</p>
        </div>
      )}
    </div>
  );
};
