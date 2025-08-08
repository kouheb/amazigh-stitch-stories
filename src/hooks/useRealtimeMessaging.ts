import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface ConversationVM {
  id: string;
  participant: {
    id: string;
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

export interface MessageVM {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
  type?: "text" | "image" | "file";
  fileUrl?: string | null;
  fileName?: string | null;
}

export const useRealtimeMessaging = (selectedConversationId?: string) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationVM[]>([]);
  const [messages, setMessages] = useState<MessageVM[]>([]);
  const channelsRef = useRef<Record<string, ReturnType<typeof supabase.channel>>>({});

  const userId = user?.id;

  const loadConversations = async () => {
    if (!userId) return;

    // Fetch conversations for current user
    const { data: convs, error } = await supabase
      .from("conversations")
      .select("id, participant_1_id, participant_2_id, last_message_at")
      .or(`participant_1_id.eq.${userId},participant_2_id.eq.${userId}`)
      .order("last_message_at", { ascending: false });

    if (error) {
      console.error("Error loading conversations", error);
      return;
    }

    const otherIds = Array.from(
      new Set(
        (convs || []).map((c) => (c.participant_1_id === userId ? c.participant_2_id : c.participant_1_id))
      )
    );

    // Load participant profiles in batch
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, display_name, avatar_url, updated_at")
      .in("id", otherIds);

    const profileMap = new Map(
      (profiles || []).map((p) => [p.id, p])
    );

    const convIds = (convs || []).map((c) => c.id);

    // Load last messages for all conversations in one query
    const { data: msgs } = await supabase
      .from("messages")
      .select("id, conversation_id, sender_id, content, is_read, created_at")
      .in("conversation_id", convIds)
      .order("created_at", { ascending: false });

    const lastByConv = new Map<string, typeof msgs[number]>();
    (msgs || []).forEach((m) => {
      if (!lastByConv.has(m.conversation_id)) lastByConv.set(m.conversation_id, m);
    });

    const vms: ConversationVM[] = (convs || []).map((c) => {
      const otherId = c.participant_1_id === userId ? c.participant_2_id : c.participant_1_id;
      const p = profileMap.get(otherId);
      const last = lastByConv.get(c.id);
      return {
        id: c.id,
        participant: {
          id: otherId,
          name: p?.display_name || p?.full_name || "Unknown",
          avatar: p?.avatar_url || "/placeholder.svg",
          status: "online",
          lastSeen: "now",
        },
        lastMessage: {
          text: last?.content || "",
          timestamp: last?.created_at ? new Date(last.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
          isRead: last?.is_read ?? true,
        },
        // Basic unread heuristic: 1 if last is not read and not mine
        unreadCount: last && last.sender_id !== userId && !last.is_read ? 1 : 0,
      };
    });

    setConversations(vms);

    // Subscribe to realtime inserts per conversation
    convIds.forEach((id) => {
      if (channelsRef.current[id]) return;
      const channel = supabase
        .channel(`messages:conv:${id}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${id}` },
          (payload) => {
            // Update conversation preview
            setConversations((prev) =>
              prev.map((cv) =>
                cv.id === id
                  ? {
                      ...cv,
                      lastMessage: {
                        text: (payload.new as any).content || "",
                        timestamp: new Date((payload.new as any).created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        isRead: (payload.new as any).is_read,
                      },
                      unreadCount:
                        (payload.new as any).sender_id !== userId ? (cv.unreadCount || 0) + 1 : cv.unreadCount,
                    }
                  : cv
              )
            );

            // If this conversation is open, append the message
            if (selectedConversationId === id) {
              const m = payload.new as any;
              setMessages((prev) => [
                ...prev,
                {
                  id: m.id,
                  senderId: m.sender_id,
                  text: m.content,
                  timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  isRead: m.is_read,
                  status: "delivered",
                  type: (m.message_type as any) || "text",
                  fileUrl: m.file_url,
                  fileName: m.file_name,
                },
              ]);
            }
          }
        )
        .subscribe();

      channelsRef.current[id] = channel as any;
    });
  };

  const loadMessages = async (conversationId?: string) => {
    if (!conversationId) return setMessages([]);
    const { data, error } = await supabase
      .from("messages")
      .select("id, sender_id, content, created_at, is_read, message_type, file_url, file_name")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error loading messages", error);
      return;
    }

    const mapped: MessageVM[] = (data || []).map((m) => ({
      id: m.id,
      senderId: m.sender_id,
      text: m.content,
      timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: m.is_read,
      status: m.is_read ? "read" : "delivered",
      type: (m.message_type as any) || "text",
      fileUrl: m.file_url,
      fileName: m.file_name,
    }));

    setMessages(mapped);
  };

  const sendMessage = async (conversationId: string, text: string, type: "text" | "image" | "file" = "text", fileUrl?: string, fileName?: string) => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: userId,
        content: text,
        message_type: type,
        file_url: fileUrl,
        file_name: fileName,
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error sending message", error);
      throw error;
    }

    if (data) {
      setMessages((prev) => [
        ...prev,
        {
          id: data.id,
          senderId: data.sender_id,
          text: data.content,
          timestamp: new Date(data.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: data.is_read,
          status: "sent",
          type,
          fileUrl: data.file_url,
          fileName: data.file_name,
        },
      ]);
    }
  };

  const markConversationRead = async (conversationId: string) => {
    if (!userId) return;
    const { error } = await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("conversation_id", conversationId)
      .neq("sender_id", userId)
      .eq("is_read", false);

    if (error) console.error("Error marking read", error);

    setConversations((prev) => prev.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c)));
  };

  useEffect(() => {
    loadConversations();
    return () => {
      Object.values(channelsRef.current).forEach((ch) => ch && supabase.removeChannel(ch));
      channelsRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    loadMessages(selectedConversationId);
    if (selectedConversationId) markConversationRead(selectedConversationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversationId]);

  return {
    conversations,
    messages,
    refreshConversations: loadConversations,
    loadMessages,
    sendMessage,
    markConversationRead,
  };
};
