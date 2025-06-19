
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export const MessageBubble = ({ message, isOwn }: MessageBubbleProps) => {
  return (
    <div className={cn("flex gap-3 max-w-4xl", isOwn && "flex-row-reverse ml-auto")}>
      {!isOwn && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616c163f505?w=32&h=32&fit=crop&crop=face" />
          <AvatarFallback>FM</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn("flex flex-col", isOwn && "items-end")}>
        <div
          className={cn(
            "px-4 py-3 rounded-2xl max-w-xs lg:max-w-md word-wrap break-word",
            isOwn
              ? "bg-orange-600 text-white rounded-br-md"
              : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
          )}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        
        <div className={cn("mt-1 flex items-center gap-2 px-1", isOwn && "flex-row-reverse")}>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
          {isOwn && (
            <div className="flex gap-1">
              <div className={cn(
                "w-1 h-1 rounded-full",
                message.isRead ? "bg-orange-600" : "bg-gray-400"
              )}></div>
              <div className={cn(
                "w-1 h-1 rounded-full",
                message.isRead ? "bg-orange-600" : "bg-gray-400"
              )}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
