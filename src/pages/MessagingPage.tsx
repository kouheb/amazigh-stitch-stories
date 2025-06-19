
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile,
  Plus
} from "lucide-react";
import { ChatMessage } from "@/components/messaging/ChatMessage";
import { ConversationList } from "@/components/messaging/ConversationList";
import { MessageInput } from "@/components/messaging/MessageInput";

export const MessagingPage = () => {
  const [selectedConversation, setSelectedConversation] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock conversations data
  const conversations = [
    {
      id: "1",
      participant: {
        name: "Fatima El Mansouri",
        avatar: "/api/placeholder/40/40",
        status: "online" as const,
        lastSeen: "Active now"
      },
      lastMessage: {
        text: "I'd love to discuss the embroidery project details",
        timestamp: "2m ago",
        isRead: false
      },
      unreadCount: 2
    },
    {
      id: "2",
      participant: {
        name: "Ahmed Benali",
        avatar: "/api/placeholder/40/40",
        status: "offline" as const,
        lastSeen: "Last seen 1h ago"
      },
      lastMessage: {
        text: "The pottery workshop sounds interesting!",
        timestamp: "1h ago",
        isRead: true
      },
      unreadCount: 0
    },
    {
      id: "3",
      participant: {
        name: "Zahra Oudghiri",
        avatar: "/api/placeholder/40/40",
        status: "online" as const,
        lastSeen: "Active now"
      },
      lastMessage: {
        text: "When can we schedule the weaving lesson?",
        timestamp: "3h ago",
        isRead: true
      },
      unreadCount: 0
    }
  ];

  // Mock messages for selected conversation
  const messages = [
    {
      id: "1",
      senderId: "other",
      text: "Hello! I saw your beautiful embroidery work on your profile.",
      timestamp: "10:30 AM",
      isRead: true
    },
    {
      id: "2",
      senderId: "me",
      text: "Thank you so much! I'd be happy to discuss a custom piece for you.",
      timestamp: "10:32 AM",
      isRead: true
    },
    {
      id: "3",
      senderId: "other",
      text: "I'd love to discuss the embroidery project details. What's your availability this week?",
      timestamp: "10:35 AM",
      isRead: false
    }
  ];

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Conversations Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4" />
            </Button>
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

        {/* Conversation List */}
        <ConversationList 
          conversations={conversations}
          selectedId={selectedConversation}
          onSelect={setSelectedConversation}
          searchQuery={searchQuery}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentConversation.participant.avatar} />
                    <AvatarFallback>
                      {currentConversation.participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {currentConversation.participant.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {currentConversation.participant.lastSeen}
                    </p>
                  </div>
                  {currentConversation.participant.status === "online" && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
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
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id}
                  message={message}
                  isOwn={message.senderId === "me"}
                />
              ))}
            </div>

            {/* Message Input */}
            <MessageInput onSend={(text) => console.log("Send:", text)} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Start a conversation
              </h3>
              <p className="text-gray-600">
                Select a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
