import React from 'react';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  isTyping: boolean;
  userNames?: string[];
  className?: string;
}

export const TypingIndicator = ({ 
  isTyping, 
  userNames = [], 
  className 
}: TypingIndicatorProps) => {
  if (!isTyping) return null;

  const getTypingText = () => {
    if (userNames.length === 0) {
      return 'Someone is typing...';
    } else if (userNames.length === 1) {
      return `${userNames[0]} is typing...`;
    } else if (userNames.length === 2) {
      return `${userNames[0]} and ${userNames[1]} are typing...`;
    } else {
      return `${userNames[0]} and ${userNames.length - 1} others are typing...`;
    }
  };

  return (
    <div className={cn("flex items-center gap-2 p-3 text-sm text-muted-foreground", className)}>
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="italic">{getTypingText()}</span>
    </div>
  );
};