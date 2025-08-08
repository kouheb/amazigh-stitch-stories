import { CallModal } from './CallModal';
import { useCall } from '@/contexts/CallContext';

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
  } = useCall();

  if (!showCallModal) {
    console.log('GlobalCallPopup: Modal not showing because showCallModal is false');
    return null;
  }

  const currentCall = incomingCall || activeCall;
  const currentParticipant = incomingCallParticipant || activeCallParticipant;

  console.log('GlobalCallPopup render:', {
    showCallModal,
    currentCall: !!currentCall,
    currentParticipant: !!currentParticipant,
    isIncoming,
    callStatus: currentCall?.status
  });

  if (!currentCall || !currentParticipant) {
    console.log('GlobalCallPopup: No call or participant data');
    return null;
  }

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