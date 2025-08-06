import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { useConversation } from "@/hooks/useMessaging";
import { useAuth } from "@/contexts/AuthContext";
import { useMessaging } from "@/hooks/useMessaging";
import { useEffect } from "react";

interface ChatAreaProps {
  conversationId: string;
  onBack?: () => void;
}

export const ChatArea = ({ conversationId, onBack }: ChatAreaProps) => {
  const { user } = useAuth();
  const { conversation, loading } = useConversation(conversationId);
  const { sendMessage, markAsRead } = useMessaging();

  // Mark messages as read when opening conversation
  useEffect(() => {
    if (conversationId) {
      markAsRead(conversationId);
    }
  }, [conversationId, markAsRead]);

  const getDisplayName = () => {
    const participant = conversation?.other_participant;
    return participant?.display_name || 
           participant?.full_name || 
           participant?.email || 
           'Unknown User';
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const success = await sendMessage(conversationId, content);
    return success;
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-muted-foreground">Loading conversation...</div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-muted-foreground">Conversation not found</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          
          <Avatar className="h-10 w-10">
            <AvatarImage src={conversation.other_participant?.avatar_url} />
            <AvatarFallback>
              {getDisplayName().charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-semibold">{getDisplayName()}</h3>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
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

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-1">
          {conversation.messages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No messages yet</p>
              <p className="text-sm text-muted-foreground mt-1">Start the conversation!</p>
            </div>
          )}
          
          {conversation.messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.sender_id === user?.id}
              showAvatar={true}
              senderName={getDisplayName()}
              senderAvatar={conversation.other_participant?.avatar_url}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};