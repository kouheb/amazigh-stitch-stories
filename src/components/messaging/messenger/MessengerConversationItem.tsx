import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Conversation } from '@/types/messaging';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export const ConversationItem = ({ conversation, isSelected, onClick }: ConversationItemProps) => {
  const getDisplayName = () => {
    return conversation.other_participant?.display_name || 
           conversation.other_participant?.full_name || 
           conversation.other_participant?.email?.split('@')[0] || 
           'Unknown User';
  };

  const getLastMessagePreview = () => {
    if (!conversation.last_message) return 'No messages yet';
    
    const { content, message_type } = conversation.last_message;
    
    switch (message_type) {
      case 'image':
        return '📷 Photo';
      case 'file':
        return '📎 File';
      default:
        return content.length > 50 ? `${content.substring(0, 50)}...` : content;
    }
  };

  const getTimestamp = () => {
    if (!conversation.last_message_at) return '';
    
    try {
      return formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: false });
    } catch {
      return '';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  const isUnread = (conversation.unread_count || 0) > 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-accent/50 mb-1',
        isSelected && 'bg-accent'
      )}
    >
      <div className="relative">
        <Avatar className="h-14 w-14">
          <AvatarImage src={conversation.other_participant?.avatar_url} />
          <AvatarFallback className="text-sm font-semibold">
            {getInitials(getDisplayName())}
          </AvatarFallback>
        </Avatar>
        
        {/* Online indicator */}
        <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-background rounded-full" />
      </div>

      <div className="flex-1 min-w-0 ml-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className={cn(
            'font-semibold text-sm truncate',
            isUnread ? 'text-foreground' : 'text-foreground'
          )}>
            {getDisplayName()}
          </h3>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {getTimestamp() && (
              <span className={cn(
                'text-xs',
                isUnread ? 'text-primary font-medium' : 'text-muted-foreground'
              )}>
                {getTimestamp()}
              </span>
            )}
            
            {isUnread && (
              <Badge 
                variant="default" 
                className="h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full bg-primary"
              >
                {conversation.unread_count}
              </Badge>
            )}
          </div>
        </div>
        
        <p className={cn(
          'text-sm truncate',
          isUnread ? 'text-foreground font-medium' : 'text-muted-foreground'
        )}>
          {getLastMessagePreview()}
        </p>
      </div>
    </div>
  );
};