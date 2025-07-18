import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { WebRTCCall, CallType } from '@/utils/webrtc';
import { toast } from 'sonner';

interface CallModalProps {
  isOpen: boolean;
  callType: CallType;
  participant: {
    id: string;
    name: string;
    avatar?: string;
  };
  isIncoming: boolean;
  onAccept?: () => void;
  onDecline: () => void;
  onEnd: () => void;
  onCallComplete?: (duration: number, callType: CallType) => void;
}

export const CallModal = ({ 
  isOpen, 
  callType, 
  participant, 
  isIncoming, 
  onAccept, 
  onDecline,
  onEnd,
  onCallComplete
}: CallModalProps) => {
  const [callState, setCallState] = useState<'ringing' | 'connecting' | 'connected' | 'ended'>('ringing');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const ringtonRef = useRef<HTMLAudioElement>(null);
  const webrtcCallRef = useRef<WebRTCCall | null>(null);
  const callStartTimeRef = useRef<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (callState === 'connected') {
      callStartTimeRef.current = Date.now();
      interval = setInterval(() => {
        setCallDuration(Math.floor((Date.now() - callStartTimeRef.current) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callState]);

  useEffect(() => {
    if (isOpen) {
      // Create audio elements
      if (!remoteAudioRef.current) {
        const remoteAudio = document.createElement('audio');
        remoteAudio.autoplay = true;
        remoteAudio.controls = false;
        document.body.appendChild(remoteAudio);
        remoteAudioRef.current = remoteAudio;
      }

      // Create ringtone
      if (!ringtonRef.current) {
        const ringtone = document.createElement('audio');
        ringtone.loop = true;
        ringtone.volume = 0.5;
        // Using a simple beep tone data URL
        ringtone.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D2u2AZBzyA0fDZdSEEL4bU8NiINAcZa7zj451KEQ1QqN/xt2EcBj6a3PfKdikGLIXQ6tuaQAkUcLzu58xGFBV9s+nyq1kXCUaj6faXOhEHMo7Y7+CFQR8I+3w='
        document.body.appendChild(ringtone);
        ringtonRef.current = ringtone;
      }

      if (!isIncoming) {
        initializeCall();
      } else {
        // Play ringtone for incoming calls
        startRingtone();
      }
    }

    return () => {
      cleanupCall();
      stopRingtone();
    };
  }, [isOpen, isIncoming]);

  const initializeCall = async () => {
    try {
      setCallState('connecting');
      
      const webrtcCall = new WebRTCCall(
        callType,
        !isIncoming,
        handleRemoteStream,
        handleConnectionStateChange,
        handleDataChannelMessage
      );
      
      webrtcCallRef.current = webrtcCall;
      
      const localStream = await webrtcCall.initializeLocalStream();
      
      if (localVideoRef.current && callType === 'video') {
        localVideoRef.current.srcObject = localStream;
      }

      if (!isIncoming) {
        // Create offer and send to remote peer
        const offer = await webrtcCall.createOffer();
        // In a real implementation, send this offer through signaling server
        console.log('Created offer:', offer);
        
        // Start call ringing sound for outgoing calls
        startRingtone();
      }

      toast.success(`${callType === 'video' ? 'Video' : 'Voice'} call initiated`);
    } catch (error) {
      console.error('Error initializing call:', error);
      toast.error('Failed to access camera/microphone');
      onEnd();
    }
  };

  const handleRemoteStream = (stream: MediaStream) => {
    console.log('Received remote stream:', stream);
    
    // Handle video stream
    if (remoteVideoRef.current && callType === 'video') {
      remoteVideoRef.current.srcObject = stream;
    }
    
    // Handle audio stream (always present)
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = stream;
      // Ensure audio plays
      remoteAudioRef.current.play().catch(e => {
        console.error('Error playing remote audio:', e);
      });
    }
    
    stopRingtone();
    setCallState('connected');
  };

  const handleConnectionStateChange = (state: RTCPeerConnectionState) => {
    console.log('Connection state:', state);
    
    if (state === 'connected') {
      setCallState('connected');
    } else if (state === 'disconnected' || state === 'failed' || state === 'closed') {
      setCallState('ended');
      onEnd();
    }
  };

  const handleDataChannelMessage = (message: any) => {
    console.log('Received message:', message);
    
    switch (message.type) {
      case 'mute':
        toast.info(`${participant.name} ${message.muted ? 'muted' : 'unmuted'}`);
        break;
      case 'video':
        toast.info(`${participant.name} ${message.disabled ? 'disabled' : 'enabled'} video`);
        break;
    }
  };

  const handleAccept = async () => {
    stopRingtone();
    if (onAccept) {
      onAccept();
      await initializeCall();
    }
  };

  const startRingtone = () => {
    if (ringtonRef.current) {
      ringtonRef.current.currentTime = 0;
      ringtonRef.current.play().catch(e => {
        console.error('Error playing ringtone:', e);
      });
    }
  };

  const stopRingtone = () => {
    if (ringtonRef.current) {
      ringtonRef.current.pause();
      ringtonRef.current.currentTime = 0;
    }
  };

  const handleToggleMute = () => {
    if (webrtcCallRef.current) {
      const muted = webrtcCallRef.current.toggleMute();
      setIsMuted(muted);
      
      // Send mute state to remote peer
      webrtcCallRef.current.sendControlMessage({
        type: 'mute',
        muted
      });
      
      toast.info(muted ? 'Microphone muted' : 'Microphone unmuted');
    }
  };

  const handleToggleVideo = () => {
    if (webrtcCallRef.current && callType === 'video') {
      const disabled = webrtcCallRef.current.toggleVideo();
      setIsVideoDisabled(disabled);
      
      // Send video state to remote peer
      webrtcCallRef.current.sendControlMessage({
        type: 'video',
        disabled
      });
      
      toast.info(disabled ? 'Video disabled' : 'Video enabled');
    }
  };

  const handleToggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    // In a real implementation, you'd control audio output device here
    toast.info(isSpeakerOn ? 'Speaker off' : 'Speaker on');
  };

  const handleEndCall = () => {
    // Calculate call duration if the call was connected
    const duration = callState === 'connected' ? callDuration : 0;
    
    // Stop ringtone
    stopRingtone();
    
    // Notify parent component about call completion
    if (onCallComplete && duration > 0) {
      onCallComplete(duration, callType);
    }
    
    cleanupCall();
    onEnd();
  };

  const cleanupCall = () => {
    stopRingtone();
    
    if (webrtcCallRef.current) {
      webrtcCallRef.current.endCall();
      webrtcCallRef.current = null;
    }
    
    // Clean up audio elements
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = null;
      remoteAudioRef.current.remove();
      remoteAudioRef.current = null;
    }
    
    if (ringtonRef.current) {
      ringtonRef.current.remove();
      ringtonRef.current = null;
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-4 p-6 bg-white">
        {/* Video containers */}
        {callType === 'video' && (callState === 'connected' || callState === 'connecting') && (
          <div className="relative mb-6 bg-gray-900 rounded-lg overflow-hidden">
            {/* Remote video - Main display */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-80 bg-gray-900 object-cover"
            />
            
            {/* Local video - Picture-in-picture in bottom right */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 left-1 text-white text-xs bg-black bg-opacity-50 px-1 rounded">
                You
              </div>
            </div>
            
            {/* Connection status overlay */}
            {callState === 'connecting' && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p>Connecting...</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Audio-only or connecting state */}
        {(callType === 'voice' || callState !== 'connected') && (
          <div className="text-center mb-6">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={participant.avatar} />
              <AvatarFallback className="text-2xl bg-orange-100 text-orange-600">
                {participant.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {participant.name}
            </h3>
            
            <p className="text-gray-600">
              {callState === 'ringing' && isIncoming && 'Incoming call...'}
              {callState === 'ringing' && !isIncoming && 'Calling...'}
              {callState === 'connecting' && 'Connecting...'}
              {callState === 'connected' && formatDuration(callDuration)}
            </p>
          </div>
        )}

        {/* Call controls */}
        <div className="flex items-center justify-center gap-4">
          {callState === 'ringing' && isIncoming ? (
            // Incoming call buttons
            <>
              <Button
                onClick={() => {
                  stopRingtone();
                  onDecline();
                }}
                variant="destructive"
                size="lg"
                className="rounded-full h-12 w-12 p-0"
              >
                <PhoneOff className="h-6 w-6" />
              </Button>
              
              <Button
                onClick={handleAccept}
                className="rounded-full h-12 w-12 p-0 bg-green-600 hover:bg-green-700"
              >
                <Phone className="h-6 w-6" />
              </Button>
            </>
          ) : (
            // Active call controls
            <>
              <Button
                onClick={handleToggleMute}
                variant={isMuted ? "destructive" : "outline"}
                size="sm"
                className="rounded-full h-10 w-10 p-0"
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              
              {callType === 'video' && (
                <Button
                  onClick={handleToggleVideo}
                  variant={isVideoDisabled ? "destructive" : "outline"}
                  size="sm"
                  className="rounded-full h-10 w-10 p-0"
                >
                  {isVideoDisabled ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                </Button>
              )}
              
              <Button
                onClick={handleToggleSpeaker}
                variant={isSpeakerOn ? "default" : "outline"}
                size="sm"
                className="rounded-full h-10 w-10 p-0"
              >
                {isSpeakerOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              
              <Button
                onClick={handleEndCall}
                variant="destructive"
                size="lg"
                className="rounded-full h-12 w-12 p-0"
              >
                <PhoneOff className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};