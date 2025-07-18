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
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user');
  const [selectedConversationId, setSelectedConversationId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  const loadConversations = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Get all conversations for the current user
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('conversations')
        .select('*')
        .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (conversationsError) {
        console.error('Error loading conversations:', conversationsError);
        return;
      }

      if (!conversationsData || conversationsData.length === 0) {
        setConversations([]);
        return;
      }

      // Get all participant IDs except current user
      const participantIds = conversationsData.flatMap(conv => 
        [conv.participant_1_id, conv.participant_2_id].filter(id => id !== user.id)
      );

      // Get participant profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', participantIds);

      if (profilesError) {
        console.error('Error loading participant profiles:', profilesError);
        return;
      }

      const formattedConversations: Conversation[] = conversationsData.map(conv => {
        const otherParticipantId = conv.participant_1_id === user.id ? conv.participant_2_id : conv.participant_1_id;
        const otherParticipant = profiles?.find(p => p.id === otherParticipantId);
        
        return {
          id: otherParticipantId,
          participant: {
            name: otherParticipant?.display_name || otherParticipant?.full_name || otherParticipant?.email || 'Unknown User',
            avatar: otherParticipant?.avatar_url || "",
            status: "offline" as const,
            lastSeen: "recently"
          },
          lastMessage: {
            text: "No messages yet",
            timestamp: "",
            isRead: true
          },
          unreadCount: 0
        };
      });

      setConversations(formattedConversations);
      
      // Auto-select conversation if userId is provided
      if (userId && formattedConversations.some(c => c.id === userId)) {
        setSelectedConversationId(userId);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && user) {
      startConversationWithUser(userId);
    }
  }, [userId, user]);

  const startConversationWithUser = async (targetUserId: string) => {
    if (!user) return;
    
    try {
      // Check if conversation already exists
      const existingConversation = conversations.find(c => c.id === targetUserId);
      if (existingConversation) {
        setSelectedConversationId(targetUserId);
        return;
      }

      // Get target user profile
      const { data: targetProfile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .single();

      if (error || !targetProfile) {
        console.error('Error loading target user:', error);
        toast.error('User not found');
        return;
      }

      // Create new conversation in the UI
      const newConversation: Conversation = {
        id: targetUserId,
        participant: {
          name: targetProfile.display_name || targetProfile.full_name || targetProfile.email || 'Unknown User',
          avatar: targetProfile.avatar_url || "",
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

      setConversations(prev => [newConversation, ...prev]);
      setSelectedConversationId(targetUserId);
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast.error('Failed to start conversation');
    }
  };

  const handleBackToApp = () => {
    navigate('/app');
  };


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
            recipientId={selectedConversationId}
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
