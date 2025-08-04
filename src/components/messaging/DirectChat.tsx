import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface DirectChatProps {
  recipientId: string;
}

export const DirectChat = ({ recipientId }: DirectChatProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [recipient, setRecipient] = useState<any>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (user && recipientId) {
      loadRecipientInfo();
      loadMessages();
      setupRealtime();
    }
  }, [user, recipientId]);

  const loadRecipientInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, full_name, email, avatar_url')
        .eq('id', recipientId)
        .single();

      if (!error && data) {
        setRecipient(data);
      }
    } catch (error) {
      console.warn('Could not load recipient info');
    }
  };

  const loadMessages = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${user.id})`)
        .order('created_at', { ascending: true })
        .limit(50);

      if (!error && data) {
        setMessages(data);
      }
    } catch (error) {
      console.warn('Could not load messages');
    }
  };

  const setupRealtime = () => {
    if (!user) return;

    const channel = supabase
      .channel('direct-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          const newMessage = payload.new;
          
          // Check if this message is for this conversation
          const isRelevant = (
            (newMessage.sender_id === user.id && newMessage.recipient_id === recipientId) ||
            (newMessage.sender_id === recipientId && newMessage.recipient_id === user.id)
          );
          
          if (isRelevant) {
            setMessages(prev => {
              const exists = prev.some(msg => msg.id === newMessage.id);
              if (exists) return prev;
              return [...prev, newMessage];
            });
            
            if (newMessage.sender_id !== user.id) {
              toast.success("New message received!");
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!user || !message.trim() || sending) return;

    setSending(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          recipient_id: recipientId,
          content: message.trim(),
          message_type: 'text'
        })
        .select()
        .single();

      if (error) {
        toast.error(`Failed to send: ${error.message}`);
        return;
      }

      setMessage("");
      toast.success("Message sent!");
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const recipientName = recipient?.display_name || recipient?.full_name || recipient?.email || 'Unknown User';

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/app')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-orange-100 text-orange-600">
            {recipientName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h2 className="font-semibold">{recipientName}</h2>
          <p className="text-sm text-gray-500">Direct Message</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender_id === user?.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender_id === user?.id ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            disabled={sending}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={sending || !message.trim()}
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="border-t p-4 bg-gray-50">
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Your ID:</strong> {user?.id}</p>
          <p><strong>Recipient ID:</strong> {recipientId}</p>
          <p><strong>Messages:</strong> {messages.length}</p>
        </div>
      </div>
    </div>
  );
};