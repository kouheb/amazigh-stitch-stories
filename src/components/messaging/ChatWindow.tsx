import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Info } from "lucide-react";
import { MessageInput } from "./MessageInput";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ChatOptionsMenu } from "./ChatOptionsMenu";

import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
  status?: "sending" | "sent" | "delivered" | "read";
  type?: "text" | "image" | "file";
  fileUrl?: string;
  fileName?: string;
}

interface ChatWindowProps {
  conversation: Conversation;
  recipientId: string;
}

export const ChatWindow = ({ conversation, recipientId }: ChatWindowProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  useEffect(() => {
    if (user && recipientId) {
      loadMessages();
      
      // Set up real-time subscription with improved filtering
      const channel = supabase
        .channel(`messages-${user.id}-${recipientId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `or(and(sender_id.eq.${user.id},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${user.id}))`
          },
          (payload) => {
            console.log('Real-time message received:', payload);
            
            const newMessage: Message = {
              id: payload.new.id,
              senderId: payload.new.sender_id,
              text: payload.new.content,
              timestamp: new Date(payload.new.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isRead: payload.new.is_read,
              type: payload.new.message_type,
              fileUrl: payload.new.file_url || undefined,
              fileName: payload.new.file_name || undefined
            };
            
            console.log('Adding message to chat:', newMessage);
            setMessageList(prev => {
              const updated = [...prev, newMessage];
              console.log('Updated message list:', updated);
              return updated;
            });
          }
        )
        .subscribe((status) => {
          console.log('Real-time subscription status:', status);
        });

      // Return cleanup function
      return () => {
        console.log('Cleaning up real-time subscription');
        supabase.removeChannel(channel);
      };
    }
  }, [user, recipientId]);

  const loadMessages = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading messages:', error);
        toast.error('Failed to load messages');
        return;
      }

      const formattedMessages: Message[] = data.map(msg => ({
        id: msg.id,
        senderId: msg.sender_id,
        text: msg.content,
        timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: msg.is_read,
        type: msg.message_type as "text" | "image" | "file",
        fileUrl: msg.file_url || undefined,
        fileName: msg.file_name || undefined
      }));

      setMessageList(formattedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };


  const handleSendMessage = async (text: string, type: "text" | "image" | "file" = "text", fileUrl?: string, fileName?: string) => {
    if (!user || !text.trim()) return;
    
    try {
      // Insert message into database
      const { data: messageData, error: messageError } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          recipient_id: recipientId,
          content: text,
          message_type: type,
          file_url: fileUrl,
          file_name: fileName
        })
        .select()
        .single();

      if (messageError) {
        console.error('Error sending message:', messageError);
        toast.error('Failed to send message');
        return;
      }

      // Send email notification
      try {
        const { data: senderProfile } = await supabase
          .from('profiles')
          .select('display_name, full_name')
          .eq('id', user.id)
          .single();

        const senderName = senderProfile?.display_name || senderProfile?.full_name || 'Someone';

        await supabase.functions.invoke('send-message-notification', {
          body: {
            recipientId,
            senderName,
            messageContent: text
          }
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't show error to user as message was sent successfully
      }

      toast.success("Message sent!");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };


  const handleShowInfo = () => {
    console.log(`Showing info for ${conversation.participant.name}`);
    // Navigate to the user's profile in the same tab
    navigate(`/profile/${recipientId}`);
    toast.info(`Opening ${conversation.participant.name}'s profile`);
  };


  // Chat options handlers
  const handleToggleNotifications = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
    toast.success(isNotificationsEnabled ? 'Notifications muted' : 'Notifications enabled');
  };

  const handleBlockUser = () => {
    toast.warning(`${conversation.participant.name} has been blocked`);
  };

  const handleReportUser = () => {
    toast.warning(`Report sent for ${conversation.participant.name}`);
  };

  const handleArchiveChat = () => {
    toast.info('Chat archived');
  };

  const handleDeleteChat = () => {
    toast.error('Chat deleted');
  };

  return (
    <>
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.participant.avatar} />
                <AvatarFallback>
                  {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {conversation.participant.status === "online" && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900">{conversation.participant.name}</h3>
              <p className="text-sm text-gray-500">
                {conversation.participant.status === "online" ? "Active now" : `Last seen ${conversation.participant.lastSeen}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleShowInfo}
              className="hover:bg-orange-50 hover:text-orange-600"
            >
              <Info className="h-4 w-4" />
            </Button>
            <ChatOptionsMenu
              participantName={conversation.participant.name}
              isNotificationsEnabled={isNotificationsEnabled}
              onToggleNotifications={handleToggleNotifications}
              onBlockUser={handleBlockUser}
              onReportUser={handleReportUser}
              onArchiveChat={handleArchiveChat}
              onDeleteChat={handleDeleteChat}
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading messages...</div>
          </div>
        ) : messageList.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p>No messages yet</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          </div>
        ) : (
          messageList.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === user?.id}
            />
          ))
        )}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Message Input */}
      <MessageInput onSend={handleSendMessage} />
    </>
  );
};
