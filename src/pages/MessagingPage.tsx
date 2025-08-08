import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, MoreVertical, ArrowLeft } from "lucide-react";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { ChatList } from "@/components/messaging/ChatList";
import { useNavigate } from "react-router-dom";
import { useRealtimeMessaging } from "@/hooks/useRealtimeMessaging";
import { supabase } from "@/integrations/supabase/client";
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
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedConversationId, setSelectedConversationId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const { conversations, messages, sendMessage } = useRealtimeMessaging(selectedConversationId);
  const [peopleResults, setPeopleResults] = useState<any[]>([]);
  const [messageResults, setMessageResults] = useState<any[]>([]);

  const handleBackToApp = () => {
    navigate('/app');
  };

  useEffect(() => {
    const run = async () => {
      if (!searchQuery) return setPeopleResults([]);
      const { data } = await supabase
        .from('profiles')
        .select('id, display_name, full_name, email, avatar_url')
        .or(`display_name.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`)
        .limit(10);
      setPeopleResults(data || []);
    };
    run();
  }, [searchQuery]);

  useEffect(() => {
    const run = async () => {
      if (!searchQuery) return setMessageResults([]);
      const { data, error } = await supabase.rpc('search_user_messages', { q: searchQuery, limit_count: 20, offset_count: 0 });
      if (!error) setMessageResults(data || []);
    };
    run();
  }, [searchQuery]);

  const startConversation = async (otherUserId: string) => {
    if (!user?.id || !otherUserId) return;
    // Check if conversation exists
    const { data: existing } = await supabase
      .from('conversations')
      .select('id')
      .or(`and(participant_1_id.eq.${user.id},participant_2_id.eq.${otherUserId}),and(participant_1_id.eq.${otherUserId},participant_2_id.eq.${user.id})`)
      .limit(1);

    let convId = existing && existing.length > 0 ? existing[0].id : undefined;

    if (!convId) {
      const { data, error } = await supabase
        .from('conversations')
        .insert({ participant_1_id: user.id, participant_2_id: otherUserId })
        .select('id')
        .maybeSingle();
      if (error) {
        console.error('Error creating conversation', error);
        return;
      }
      convId = data?.id;
    }

    if (convId) setSelectedConversationId(convId);
    setSearchQuery("");
    setPeopleResults([]);
  };

  const selectedConversation = useMemo(() => conversations.find(c => c.id === selectedConversationId), [conversations, selectedConversationId]);

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
              placeholder="Search conversations or people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* People results */}
        {peopleResults.length > 0 && (
          <div className="p-2 border-b border-gray-200 max-h-60 overflow-y-auto">
            {peopleResults.map((p) => (
              <button key={p.id} onClick={() => startConversation(p.id)} className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">
                <div className="font-medium text-gray-800">{p.display_name || p.full_name || p.email}</div>
                <div className="text-xs text-gray-500">Start chat</div>
              </button>
            ))}
          </div>
        )}
        {messageResults.length > 0 && (
          <div className="p-2 border-b border-gray-200 max-h-60 overflow-y-auto">
            {messageResults.map((m: any) => (
              <button
                key={m.id}
                onClick={() => { setSelectedConversationId(m.conversation_id); setSearchQuery(""); setPeopleResults([]); setMessageResults([]); }}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-50"
              >
                <div className="text-sm text-gray-800 line-clamp-1">{m.content}</div>
                <div className="text-xs text-gray-500">{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </button>
            ))}
          </div>
        )}

        {/* Conversations List */}
        <ChatList
          conversations={conversations as unknown as Conversation[]}
          selectedId={selectedConversationId}
          onSelect={setSelectedConversationId}
          searchQuery={searchQuery}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation as any}
            messages={messages as any}
            onSend={(text, type, fileUrl, fileName) => {
              if (selectedConversationId) {
                sendMessage(selectedConversationId, text, type, fileUrl, fileName);
              }
            }}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
              <p className="text-gray-500">Choose a conversation or search for a user to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
