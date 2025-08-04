import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const MessageTester = () => {
  const { user } = useAuth();
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testSendMessage = async () => {
    if (!user || !recipientId || !message.trim()) {
      addResult("❌ Missing required fields");
      return;
    }

    addResult(`🔄 Sending message to ${recipientId}...`);

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
        addResult(`❌ Database error: ${error.message}`);
        toast.error(`Send failed: ${error.message}`);
        return;
      }

      addResult(`✅ Message sent successfully! ID: ${data.id}`);
      toast.success("Message sent!");
      setMessage("");
    } catch (error) {
      addResult(`❌ Unexpected error: ${error}`);
      toast.error("Send failed");
    }
  };

  const testReceiveMessages = async () => {
    if (!user) {
      addResult("❌ No user logged in");
      return;
    }

    addResult("🔄 Checking for received messages...");

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('recipient_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        addResult(`❌ Query error: ${error.message}`);
        return;
      }

      if (!data || data.length === 0) {
        addResult("📭 No messages found");
        return;
      }

      addResult(`📬 Found ${data.length} recent messages:`);
      data.forEach((msg, index) => {
        const time = new Date(msg.created_at).toLocaleTimeString();
        addResult(`  ${index + 1}. From ${msg.sender_id.substring(0, 8)}... at ${time}: "${msg.content}"`);
      });
    } catch (error) {
      addResult(`❌ Unexpected error: ${error}`);
    }
  };

  const testRealtimeConnection = () => {
    if (!user) {
      addResult("❌ No user logged in");
      return;
    }

    addResult("🔄 Testing real-time connection...");

    const channel = supabase
      .channel('test-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          const newMessage = payload.new;
          if (newMessage.recipient_id === user.id) {
            addResult(`🔔 Real-time message received: "${newMessage.content}"`);
            toast.success("Real-time message detected!");
          }
        }
      )
      .subscribe((status) => {
        addResult(`📡 Real-time status: ${status}`);
        if (status === 'SUBSCRIBED') {
          addResult("✅ Real-time connection established!");
          
          // Auto-cleanup after 30 seconds
          setTimeout(() => {
            supabase.removeChannel(channel);
            addResult("🔌 Real-time test completed");
          }, 30000);
        }
      });
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Message System Tester</h3>
      
      <div className="space-y-4">
        {/* Send Message Test */}
        <div className="border rounded p-4">
          <h4 className="font-medium mb-2">Send Message Test</h4>
          <div className="space-y-2">
            <Input
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              placeholder="Recipient User ID"
            />
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Test message"
              onKeyPress={(e) => e.key === 'Enter' && testSendMessage()}
            />
            <Button onClick={testSendMessage} className="w-full">
              Send Test Message
            </Button>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Button onClick={testReceiveMessages} variant="outline">
            Check Received
          </Button>
          <Button onClick={testRealtimeConnection} variant="outline">
            Test Real-time
          </Button>
          <Button onClick={clearResults} variant="outline">
            Clear Results
          </Button>
        </div>

        {/* User Info */}
        {user && (
          <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
            <p><strong>Your ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="border rounded p-4 bg-gray-50">
            <h4 className="font-medium mb-2">Test Results:</h4>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono">
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};