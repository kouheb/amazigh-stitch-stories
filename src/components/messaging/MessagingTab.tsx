import React from 'react';
import { MessengerLayout } from './messenger/MessengerLayout';

interface MessagingTabProps {
  onStartConversation?: (userId: string) => void;
}

export const MessagingTab = ({ onStartConversation }: MessagingTabProps) => {
  return (
    <div className="h-full">
      <MessengerLayout onStartConversation={onStartConversation} />
    </div>
  );
};