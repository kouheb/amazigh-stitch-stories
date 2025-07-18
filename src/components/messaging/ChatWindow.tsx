import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Video, MoreVertical, Info } from "lucide-react";
import { MessageInput } from "./MessageInput";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { toast } from "sonner";

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

interface ChatWindowProps {
  conversation: Conversation;
  messages: Message[];
}

export const ChatWindow = ({ conversation, messages }: ChatWindowProps) => {
  const [messageList, setMessageList] = useState<Message[]>(messages);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string, type: "text" | "image" | "file" = "text", fileUrl?: string, fileName?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      status: "sending",
      type,
      fileUrl,
      fileName
    };
    
    setMessageList([...messageList, newMessage]);
    
    // Simulate message delivery
    setTimeout(() => {
      setMessageList(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
      ));
    }, 500);
    
    setTimeout(() => {
      setMessageList(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
      ));
    }, 1000);

    // Message sent - real person will reply when they see it
    toast.success("Message sent!");
  };

  const handleVoiceCall = () => {
    console.log(`Starting voice call with ${conversation.participant.name}`);
    toast.success(`Connecting voice call with ${conversation.participant.name}...`);
  };

  const handleVideoCall = () => {
    console.log(`Starting video call with ${conversation.participant.name}`);
    toast.success(`Connecting video call with ${conversation.participant.name}...`);
  };

  const handleShowInfo = () => {
    console.log(`Showing info for ${conversation.participant.name}`);
    toast.info(`Showing profile info for ${conversation.participant.name}`);
  };

  const handleMoreOptions = () => {
    console.log(`Opening more options for ${conversation.participant.name}`);
    toast.info("More options menu opened");
  };

  return (
    <>
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.participant.avatar} />
                <AvatarFallback>
                  {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {conversation.participant.status === "online" && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900">{conversation.participant.name}</h3>
              <p className="text-sm text-gray-500">
                {conversation.participant.status === "online" ? "Active now" : `Last seen ${conversation.participant.lastSeen}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleVoiceCall}
              className="hover:bg-green-50 hover:text-green-600"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleVideoCall}
              className="hover:bg-blue-50 hover:text-blue-600"
            >
              <Video className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleShowInfo}
              className="hover:bg-orange-50 hover:text-orange-600"
            >
              <Info className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleMoreOptions}
              className="hover:bg-gray-50"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messageList.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === "me"}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Message Input */}
      <MessageInput onSend={handleSendMessage} />
    </>
  );
};
