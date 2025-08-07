import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Image, Smile, Mic, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface EnhancedMessageInputProps {
  onSendMessage: (content: string, type?: 'text' | 'image' | 'file', fileUrl?: string, fileName?: string) => Promise<boolean>;
  placeholder?: string;
  disabled?: boolean;
}

export const EnhancedMessageInput = ({ 
  onSendMessage, 
  placeholder = "Type your message...",
  disabled = false
}: EnhancedMessageInputProps) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [attachmentPreview, setAttachmentPreview] = useState<{
    type: 'image' | 'file';
    name: string;
    url: string;
    file: File;
  } | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    const content = message.trim();
    if (!content && !attachmentPreview) return;
    
    setSending(true);
    
    try {
      let fileUrl: string | undefined;
      let fileName: string | undefined;
      let messageType: 'text' | 'image' | 'file' = 'text';

      // Handle file upload if there's an attachment
      if (attachmentPreview) {
        const fileExt = attachmentPreview.file.name.split('.').pop();
        const uploadFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars') // Using existing bucket for now
          .upload(`messages/${uploadFileName}`, attachmentPreview.file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast.error('Failed to upload attachment');
          return;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(`messages/${uploadFileName}`);

        fileUrl = urlData.publicUrl;
        fileName = attachmentPreview.name;
        messageType = attachmentPreview.type;
      }

      const success = await onSendMessage(
        content || `Sent ${messageType === 'image' ? 'an image' : 'a file'}`,
        messageType,
        fileUrl,
        fileName
      );

      if (success) {
        setMessage('');
        setAttachmentPreview(null);
        // Reset textarea height
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    const isImage = file.type.startsWith('image/');
    
    if (isImage) {
      // Create preview for images
      const reader = new FileReader();
      reader.onload = (e) => {
        setAttachmentPreview({
          type: 'image',
          name: file.name,
          url: e.target?.result as string,
          file
        });
      };
      reader.readAsDataURL(file);
    } else {
      // Handle other files
      setAttachmentPreview({
        type: 'file',
        name: file.name,
        url: '',
        file
      });
    }

    // Reset file input
    e.target.value = '';
  };

  const removeAttachment = () => {
    setAttachmentPreview(null);
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 120); // Max height of ~4 lines
      textarea.style.height = `${newHeight}px`;
    }
  };

  React.useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <div className="border-t border-border bg-background">
      {/* Attachment Preview */}
      {attachmentPreview && (
        <div className="p-3 border-b border-border">
          <div className="flex items-center gap-3 p-2 bg-muted rounded-md">
            {attachmentPreview.type === 'image' ? (
              <img 
                src={attachmentPreview.url} 
                alt="Preview" 
                className="w-12 h-12 object-cover rounded"
              />
            ) : (
              <div className="w-12 h-12 bg-accent rounded flex items-center justify-center">
                <Paperclip className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{attachmentPreview.name}</p>
              <p className="text-xs text-muted-foreground">
                {attachmentPreview.type === 'image' ? 'Image' : 'File'} attachment
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeAttachment}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled || sending}
              className="min-h-[44px] max-h-[120px] resize-none pr-20 py-3"
              style={{ height: 'auto' }}
            />
            
            {/* Attachment Controls */}
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,.pdf,.doc,.docx,.txt,.zip,.mp3,.mp4"
                className="hidden"
              />
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || sending}
                className="h-8 w-8 p-0"
                title="Attach file"
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.addEventListener('change', (e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.files && target.files[0]) {
                      handleFileSelect({ target } as any);
                    }
                  });
                  input.click();
                }}
                disabled={disabled || sending}
                className="h-8 w-8 p-0"
                title="Send image"
              >
                <Image className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={disabled || sending || (!message.trim() && !attachmentPreview)}
            size="sm"
            className="h-11 px-4"
          >
            {sending ? (
              <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          {uploading && <span>Uploading...</span>}
        </div>
      </div>
    </div>
  );
};