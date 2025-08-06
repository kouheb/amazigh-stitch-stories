import React, { useState, useRef, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Plus, Image, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessengerInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rightItems?: React.ReactNode[];
}

export const MessengerInput = ({ 
  onSendMessage, 
  placeholder = "Type a message...", 
  disabled = false,
  rightItems 
}: MessengerInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="border-t bg-background p-4">
      <div className="flex items-end gap-2">
        {/* Left action button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 p-0 rounded-full flex-shrink-0"
          disabled={disabled}
        >
          <Plus className="h-5 w-5" />
        </Button>

        {/* Message input */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "min-h-[40px] max-h-32 resize-none rounded-2xl border-2 pr-12",
              "focus:border-primary focus:ring-0 focus-visible:ring-0"
            )}
            rows={1}
          />
          
          {/* Emoji button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full"
            disabled={disabled}
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-1">
          {rightItems || (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 rounded-full flex-shrink-0"
                disabled={disabled}
              >
                <Image className="h-5 w-5" />
              </Button>
            </>
          )}
          
          {/* Send button */}
          <Button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            size="sm"
            className="h-10 w-10 p-0 rounded-full flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};