import React from 'react';
import { MessagingInterface } from './MessagingInterface';

interface MessagingTabProps {
  onStartConversation?: (userId: string) => void;
}

export const MessagingTab = ({ onStartConversation }: MessagingTabProps) => {
  return (
    <div className="h-full">
      <MessagingInterface onStartConversation={onStartConversation} />
    </div>
  );
};