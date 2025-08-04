import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const RealtimeMessageTest = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Set up real-time listener for all messages involving this user
    const channel = supabase
      .channel('all-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          const newMessage = payload.new;
          
          // Only show messages involving the current user
          if (newMessage.sender_id === user.id || newMessage.recipient_id === user.id) {
            setMessages(prev => [...prev, newMessage]);
            
            if (newMessage.sender_id !== user.id) {
              toast.success(`New message from user ${newMessage.sender_id.substring(0, 8)}...`);
            }
          }
        }
      )
      .subscribe((status) => {
        setIsListening(status === 'SUBSCRIBED');
        console.log('Real-time status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
      setIsListening(false);
    };
  }, [user]);

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Real-time Message Test</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Real-time Status:</span>
          <span className={`px-2 py-1 rounded text-xs ${
            isListening ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isListening ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <Button onClick={clearMessages} variant="outline" className="w-full">
          Clear Messages
        </Button>

        {user && (
          <p className="text-sm text-gray-600">
            Your ID: {user.id}
          </p>
        )}

        <div className="space-y-2">
          <h4 className="font-medium">Recent Messages:</h4>
          {messages.length === 0 ? (
            <p className="text-sm text-gray-500">No messages yet...</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {messages.slice(-10).map((msg, index) => (
                <div key={`${msg.id}-${index}`} className={`p-2 rounded text-sm ${
                  msg.sender_id === user?.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <p className="font-medium">
                    {msg.sender_id === user?.id ? 'You' : `User ${msg.sender_id.substring(0, 8)}...`}
                    → {msg.recipient_id === user?.id ? 'You' : `User ${msg.recipient_id.substring(0, 8)}...`}
                  </p>
                  <p>{msg.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};