import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const SimpleChatTest = () => {
  const { user } = useAuth();
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const sendTestMessage = async () => {
    if (!user || !recipientId || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          recipient_id: recipientId,
          content: message,
          message_type: 'text'
        })
        .select()
        .single();

      if (error) {
        console.error("Message error:", error);
        toast.error(`Failed to send: ${error.message}`);
        return;
      }

      toast.success("Message sent successfully!");
      setMessage("");
      loadMessages();
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred");
    }
  };

  const loadMessages = async () => {
    if (!user || !recipientId) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Load messages error:", error);
        toast.error(`Failed to load: ${error.message}`);
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error("Unexpected error loading messages:", error);
      toast.error("Failed to load messages");
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Test Messaging</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Recipient ID</label>
          <Input
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            placeholder="Enter recipient user ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            onKeyPress={(e) => e.key === 'Enter' && sendTestMessage()}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={sendTestMessage} className="flex-1">
            Send Message
          </Button>
          <Button onClick={loadMessages} variant="outline">
            Load Messages
          </Button>
        </div>

        {user && (
          <p className="text-sm text-gray-600">
            Your ID: {user.id}
          </p>
        )}

        {messages.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Messages:</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`p-2 rounded text-sm ${
                  msg.sender_id === user?.id ? 'bg-blue-100 ml-4' : 'bg-gray-100 mr-4'
                }`}>
                  <p>{msg.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};