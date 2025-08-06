
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Smile, Image, File } from "lucide-react";
import { toast } from "sonner";

interface MessageInputProps {
  onSendMessage: (content: string) => Promise<boolean>;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (message.trim()) {
      const success = await onSendMessage(message);
      if (success) {
        setMessage("");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, just send a text message about the file
      const success = await onSendMessage(`📎 ${file.name}`);
      if (success) {
        toast.success("File reference sent!");
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, just send a text message about the image
      const success = await onSendMessage(`📷 ${file.name}`);
      if (success) {
        toast.success("Image reference sent!");
      }
    }
  };

  return (
    <div className="bg-background p-4">
      <div className="flex items-end gap-3">
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="hover:bg-accent"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => imageInputRef.current?.click()}
            className="hover:bg-accent"
          >
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-accent">
            <Smile className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSend}
            disabled={!message.trim()}
            variant="default"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="*/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};
