import React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Message } from '@/types/messaging';

interface MessageBubbleProps {
  message: Message;
  isMine: boolean;
  startsSequence: boolean;
  endsSequence: boolean;
  showTimestamp: boolean;
}

export const MessageBubble = ({ 
  message, 
  isMine, 
  startsSequence, 
  endsSequence, 
  showTimestamp 
}: MessageBubbleProps) => {
  const friendlyTimestamp = format(new Date(message.created_at), 'PPPp');

  return (
    <div 
      className={cn(
        'flex w-full mb-1',
        isMine ? 'justify-end' : 'justify-start'
      )}
    >
      <div className={cn(
        'max-w-[70%] px-1',
        isMine ? 'items-end' : 'items-start'
      )}>
        {showTimestamp && (
          <div className="text-xs text-muted-foreground text-center mb-2 px-2">
            {friendlyTimestamp}
          </div>
        )}
        
        <div className={cn(
          'relative px-4 py-2 break-words',
          isMine 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted text-foreground',
          startsSequence && isMine && 'rounded-tl-2xl rounded-tr-lg rounded-bl-2xl rounded-br-2xl',
          startsSequence && !isMine && 'rounded-tl-lg rounded-tr-2xl rounded-bl-2xl rounded-br-2xl',
          !startsSequence && !endsSequence && isMine && 'rounded-tl-2xl rounded-tr-lg rounded-bl-2xl rounded-br-lg',
          !startsSequence && !endsSequence && !isMine && 'rounded-tl-lg rounded-tr-2xl rounded-bl-lg rounded-br-2xl',
          endsSequence && isMine && 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-lg',
          endsSequence && !isMine && 'rounded-tl-2xl rounded-tr-2xl rounded-bl-lg rounded-br-2xl',
          startsSequence && endsSequence && 'rounded-2xl'
        )}
        title={friendlyTimestamp}
        >
          {message.content}
        </div>
        
        {endsSequence && !isMine && (
          <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 ml-2 mb-1" />
        )}
      </div>
    </div>
  );
};