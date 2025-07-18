import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreVertical, ArrowLeft } from "lucide-react";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { ChatList } from "@/components/messaging/ChatList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
}

export const MessagingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user');
  const [selectedConversationId, setSelectedConversationId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [targetUser, setTargetUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      loadUserProfile(userId);
    }
  }, [userId]);

  const loadUserProfile = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        toast.error('User not found');
        return;
      }

      setTargetUser(data);
      // Start conversation with this user
      if (data) {
        const newConversation = {
          id: userId,
          participant: {
            name: data.display_name || data.full_name || data.email || 'Unknown User',
            avatar: data.avatar_url || "",
            status: "offline" as const,
            lastSeen: "recently"
          },
          lastMessage: {
            text: "Start a conversation...",
            timestamp: "now",
            isRead: true
          },
          unreadCount: 0
        };
        setSelectedConversationId(userId);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      toast.error('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToApp = () => {
    navigate('/app');
  };

  // Generate conversations list including the target user if provided
  const generateConversations = (): Conversation[] => {
    const baseConversations: Conversation[] = [
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
      }
    ];

    // Add target user conversation if we have one
    if (targetUser) {
      const targetConversation: Conversation = {
        id: targetUser.id,
        participant: {
          name: targetUser.display_name || targetUser.full_name || targetUser.email || 'Unknown User',
          avatar: targetUser.avatar_url || "",
          status: "offline",
          lastSeen: "recently"
        },
        lastMessage: {
          text: "Start a conversation...",
          timestamp: "now",
          isRead: true
        },
        unreadCount: 0
      };

      // Add at the beginning if it's not already there
      if (!baseConversations.find(c => c.id === targetUser.id)) {
        return [targetConversation, ...baseConversations];
      }
    }

    return baseConversations;
  };

  const conversations = generateConversations();

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
      {/* Back to App Button - Mobile */}
      <div className="absolute top-4 left-4 z-50 lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToApp}
          className="bg-white shadow-md hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Back button for desktop */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToApp}
                className="hidden lg:flex text-gray-600 hover:text-black hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-black hover:bg-gray-800">
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
