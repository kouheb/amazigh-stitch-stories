import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { Message } from "@/types/messaging";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  senderName?: string;
  senderAvatar?: string;
}

export const MessageBubble = ({ 
  message, 
  isOwn, 
  showAvatar = true,
  senderName = "User",
  senderAvatar 
}: MessageBubbleProps) => {
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'HH:mm');
  };

  return (
    <div className={cn("flex gap-3 mb-4", isOwn && "flex-row-reverse")}>
      {!isOwn && showAvatar && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={senderAvatar} />
          <AvatarFallback className="text-xs">
            {senderName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn("max-w-xs lg:max-w-md", isOwn && "items-end")}>
        <div
          className={cn(
            "px-4 py-2 rounded-2xl break-words",
            isOwn
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          {message.message_type === 'text' && (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          )}
          
          {message.message_type === 'image' && (
            <div>
              {message.content && (
                <p className="text-sm mb-2">{message.content}</p>
              )}
              {message.file_url && (
                <img 
                  src={message.file_url} 
                  alt="Shared image" 
                  className="max-w-full h-auto rounded-lg"
                />
              )}
            </div>
          )}
          
          {message.message_type === 'file' && (
            <div>
              {message.content && (
                <p className="text-sm mb-2">{message.content}</p>
              )}
              {message.file_url && (
                <a 
                  href={message.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm underline"
                >
                  📎 {message.file_name || 'Download file'}
                </a>
              )}
            </div>
          )}
        </div>
        
        <div className={cn("mt-1 flex items-center gap-1", isOwn && "justify-end")}>
          <span className="text-xs text-muted-foreground">
            {formatTime(message.created_at)}
          </span>
          {isOwn && (
            <div className="flex">
              <div className={cn(
                "w-1 h-1 rounded-full",
                message.is_read ? "bg-primary" : "bg-muted-foreground"
              )}></div>
              <div className={cn(
                "w-1 h-1 rounded-full ml-0.5",
                message.is_read ? "bg-primary" : "bg-muted-foreground"
              )}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};