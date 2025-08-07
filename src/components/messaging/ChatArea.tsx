import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
// Removed old useConversation hook - using new real-time system
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

interface ChatAreaProps {
  conversationId: string;
  onBack?: () => void;
  onSendMessage: (conversationId: string, content: string) => Promise<boolean>;
  onMarkAsRead: (conversationId: string) => void;
}

export const ChatArea = ({ conversationId, onBack, onSendMessage, onMarkAsRead }: ChatAreaProps) => {
  const { user } = useAuth();
  
  // This component is deprecated - redirect to use ConversationView instead
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="text-muted-foreground mb-2">This component has been updated</div>
        <div className="text-sm text-muted-foreground">Please use the new MessagingInterface</div>
      </div>
    </div>
  );
};