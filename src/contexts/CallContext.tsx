import React, { createContext, useContext } from 'react';
import { useCallSystem, CallData, CallParticipant } from '@/hooks/useCallSystem';

interface CallContextType {
  // State
  incomingCall: CallData | null;
  incomingCallParticipant: CallParticipant | null;
  activeCall: CallData | null;
  activeCallParticipant: CallParticipant | null;
  showCallModal: boolean;
  isIncoming: boolean;

  // Actions
  initiateCall: (recipientId: string, callType: 'voice' | 'video') => Promise<void>;
  acceptCall: () => Promise<void>;
  rejectCall: () => Promise<void>;
  endCall: (duration?: number) => Promise<void>;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const callSystem = useCallSystem();

  return (
    <CallContext.Provider value={callSystem}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};