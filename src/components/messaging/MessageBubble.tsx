
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Download, File, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
  type?: "text" | "image" | "file";
  fileUrl?: string;
  fileName?: string;
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export const MessageBubble = ({ message, isOwn }: MessageBubbleProps) => {
  const getStatusIcon = () => {
    if (!isOwn) return null;
    
    switch (message.status) {
      case "sending":
        return <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin" />;
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-orange-600" />;
      default:
        return null;
    }
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case "image":
        return (
          <div className="space-y-2">
            {message.fileUrl && (
              <img 
                src={message.fileUrl} 
                alt="Shared image" 
                className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.open(message.fileUrl, '_blank')}
              />
            )}
            <p className="text-sm">{message.text}</p>
          </div>
        );
      case "file":
        return (
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <File className="h-8 w-8 text-gray-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">{message.fileName}</p>
              <p className="text-xs text-gray-500">{message.text}</p>
            </div>
            <Button size="sm" variant="ghost" className="p-1">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        );
      default:
        return <p className="text-sm leading-relaxed">{message.text}</p>;
    }
  };

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
          {renderMessageContent()}
        </div>
        
        <div className={cn("mt-1 flex items-center gap-2 px-1", isOwn && "flex-row-reverse")}>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
};
