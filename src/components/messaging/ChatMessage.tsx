
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
}

export const ChatMessage = ({ message, isOwn }: ChatMessageProps) => {
  return (
    <div className={cn("flex gap-3", isOwn && "flex-row-reverse")}>
      {!isOwn && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/api/placeholder/32/32" />
          <AvatarFallback>FM</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn("max-w-xs lg:max-w-md", isOwn && "items-end")}>
        <div
          className={cn(
            "px-4 py-2 rounded-2xl",
            isOwn
              ? "bg-orange-600 text-white"
              : "bg-gray-100 text-gray-800"
          )}
        >
          <p className="text-sm">{message.text}</p>
        </div>
        
        <div className={cn("mt-1 flex items-center gap-1", isOwn && "justify-end")}>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
          {isOwn && (
            <div className="flex">
              <div className={cn(
                "w-1 h-1 rounded-full",
                message.isRead ? "bg-blue-500" : "bg-gray-400"
              )}></div>
              <div className={cn(
                "w-1 h-1 rounded-full ml-0.5",
                message.isRead ? "bg-blue-500" : "bg-gray-400"
              )}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
