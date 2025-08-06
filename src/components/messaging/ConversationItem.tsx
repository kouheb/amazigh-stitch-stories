import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format, isToday, isYesterday } from "date-fns";
import type { Conversation } from "@/types/messaging";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export const ConversationItem = ({ 
  conversation, 
  isSelected, 
  onClick 
}: ConversationItemProps) => {
  const formatTimestamp = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  const getDisplayName = () => {
    const participant = conversation.other_participant;
    return participant?.display_name || 
           participant?.full_name || 
           participant?.email || 
           'Unknown User';
  };

  const getLastMessagePreview = () => {
    if (!conversation.last_message) return 'No messages yet';
    
    const msg = conversation.last_message;
    if (msg.message_type === 'image') return '📷 Image';
    if (msg.message_type === 'file') return '📎 File';
    return msg.content.length > 50 
      ? msg.content.substring(0, 50) + '...'
      : msg.content;
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 cursor-pointer hover:bg-accent transition-colors border-b border-border last:border-b-0",
        isSelected && "bg-accent border-accent-foreground/20"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <Avatar className="h-12 w-12">
            <AvatarImage src={conversation.other_participant?.avatar_url} />
            <AvatarFallback>
              {getDisplayName().charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* Online status indicator could go here */}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-foreground truncate">
              {getDisplayName()}
            </h4>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatTimestamp(conversation.last_message_at)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className={cn(
              "text-sm truncate flex-1",
              (conversation.unread_count || 0) > 0 
                ? "text-foreground font-medium" 
                : "text-muted-foreground"
            )}>
              {getLastMessagePreview()}
            </p>
            
            {(conversation.unread_count || 0) > 0 && (
              <Badge variant="default" className="text-xs ml-2 flex-shrink-0">
                {conversation.unread_count}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};