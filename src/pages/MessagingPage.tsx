
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreVertical } from "lucide-react";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { ChatList } from "@/components/messaging/ChatList";

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
}

export const MessagingPage = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in real app this would come from your backend
  const conversations: Conversation[] = [
    {
      id: "1",
      participant: {
        name: "Fatima Al-Maghribi",
        avatar: "/api/placeholder/40/40",
        status: "online",
        lastSeen: "now"
      },
      lastMessage: {
        text: "I'd love to learn more about traditional Zardozi techniques",
        timestamp: "2m ago",
        isRead: false
      },
      unreadCount: 2
    },
    {
      id: "2",
      participant: {
        name: "Ahmed Ben Hassan",
        avatar: "/api/placeholder/40/40",
        status: "offline",
        lastSeen: "1h ago"
      },
      lastMessage: {
        text: "The beading workshop was amazing, thank you!",
        timestamp: "1h ago",
        isRead: true
      },
      unreadCount: 0
    },
    {
      id: "3",
      participant: {
        name: "Aicha Berber",
        avatar: "/api/placeholder/40/40",
        status: "online",
        lastSeen: "now"
      },
      lastMessage: {
        text: "When is the next cultural event?",
        timestamp: "3h ago",
        isRead: true
      },
      unreadCount: 0
    }
  ];

  const messages: Message[] = [
    {
      id: "1",
      senderId: "other",
      text: "Hello! I saw your profile and I'm really interested in learning traditional Amazigh crafts.",
      timestamp: "10:30 AM",
      isRead: true
    },
    {
      id: "2",
      senderId: "me",
      text: "That's wonderful! I'd be happy to help you get started. What specific techniques are you most interested in?",
      timestamp: "10:32 AM",
      isRead: true
    },
    {
      id: "3",
      senderId: "other",
      text: "I'd love to learn more about traditional Zardozi techniques",
      timestamp: "10:35 AM",
      isRead: false
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <ChatList
          conversations={conversations}
          selectedId={selectedConversationId}
          onSelect={setSelectedConversationId}
          searchQuery={searchQuery}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            messages={messages}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
