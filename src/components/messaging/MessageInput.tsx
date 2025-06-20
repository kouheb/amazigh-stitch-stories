
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Smile, Image, File } from "lucide-react";
import { toast } from "sonner";

interface MessageInputProps {
  onSend: (message: string, type?: "text" | "image" | "file", fileUrl?: string, fileName?: string) => void;
}

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server here
      const mockUrl = URL.createObjectURL(file);
      onSend(`Shared a file: ${file.name}`, "file", mockUrl, file.name);
      toast.success("File shared successfully!");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server here
      const mockUrl = URL.createObjectURL(file);
      onSend("Shared an image", "image", mockUrl, file.name);
      toast.success("Image shared successfully!");
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-end gap-3">
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="hover:bg-gray-100"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => imageInputRef.current?.click()}
            className="hover:bg-blue-50 hover:text-blue-600"
          >
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-yellow-50 hover:text-yellow-600">
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
            className="bg-orange-600 hover:bg-orange-700"
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
