import { CallModal } from './CallModal';
import { useCallSystem } from '@/hooks/useCallSystem';

export const GlobalCallPopup = () => {
  const {
    incomingCall,
    incomingCallParticipant,
    activeCall,
    activeCallParticipant,
    showCallModal,
    isIncoming,
    acceptCall,
    rejectCall,
    endCall
  } = useCallSystem();

  if (!showCallModal) return null;

  const currentCall = incomingCall || activeCall;
  const currentParticipant = incomingCallParticipant || activeCallParticipant;

  if (!currentCall || !currentParticipant) return null;

  const handleCallComplete = (duration: number) => {
    console.log('Call completed in GlobalCallPopup:', duration);
    endCall(duration);
  };

  return (
    <CallModal
      isOpen={showCallModal}
      callType={currentCall.call_type}
      participant={currentParticipant}
      isIncoming={isIncoming && currentCall.status === 'ringing'}
      onAccept={acceptCall}
      onDecline={rejectCall}
      onEnd={() => endCall()}
      onCallComplete={handleCallComplete}
    />
  );
};