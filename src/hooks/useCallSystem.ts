import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface CallData {
  id: string;
  caller_id: string;
  recipient_id: string;
  call_type: 'voice' | 'video';
  status: 'ringing' | 'accepted' | 'rejected' | 'missed' | 'ended';
  started_at: string;
  ended_at?: string;
  duration: number;
}

export interface CallParticipant {
  id: string;
  name: string;
  avatar?: string;
}

export const useCallSystem = () => {
  const { user } = useAuth();
  const [incomingCall, setIncomingCall] = useState<CallData | null>(null);
  const [incomingCallParticipant, setIncomingCallParticipant] = useState<CallParticipant | null>(null);
  const [activeCall, setActiveCall] = useState<CallData | null>(null);
  const [activeCallParticipant, setActiveCallParticipant] = useState<CallParticipant | null>(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [isIncoming, setIsIncoming] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Listen for incoming calls
  useEffect(() => {
    if (!user) return;

    console.log('Setting up call system for user:', user.id);

    const channel = supabase
      .channel(`calls-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'calls',
          filter: `recipient_id=eq.${user.id}`
        },
        async (payload) => {
          console.log('Incoming call received:', payload);
          
          const callData = {
            ...payload.new,
            call_type: payload.new.call_type as 'voice' | 'video',
            status: payload.new.status as 'ringing' | 'accepted' | 'rejected' | 'missed' | 'ended'
          } as CallData;
          
          // Validate call type
          const { data: callerProfile } = await supabase
            .from('profiles')
            .select('id, full_name, display_name, avatar_url')
            .eq('id', callData.caller_id)
            .single();

          const participant: CallParticipant = {
            id: callData.caller_id,
            name: callerProfile?.display_name || callerProfile?.full_name || 'Unknown User',
            avatar: callerProfile?.avatar_url
          };

          setIncomingCall(callData);
          setIncomingCallParticipant(participant);
          setIsIncoming(true);
          setShowCallModal(true);

          // Auto-reject after 30 seconds if no response
          timeoutRef.current = setTimeout(() => {
            handleMissedCall(callData.id);
          }, 30000);

          toast.info(`Incoming ${callData.call_type} call from ${participant.name}`);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'calls',
          filter: `or(caller_id.eq.${user.id},recipient_id.eq.${user.id})`
        },
        (payload) => {
          console.log('Call status updated:', payload);
          
          const callData = {
            ...payload.new,
            call_type: payload.new.call_type as 'voice' | 'video',
            status: payload.new.status as 'ringing' | 'accepted' | 'rejected' | 'missed' | 'ended'
          } as CallData;
          
          // Handle call status changes
          if (callData.status === 'ended' || callData.status === 'rejected') {
            setShowCallModal(false);
            setIncomingCall(null);
            setActiveCall(null);
            clearTimeout(timeoutRef.current);
          }
        }
      )
      .subscribe((status) => {
        console.log('Call system subscription status:', status);
      });

    return () => {
      console.log('Cleaning up call system');
      supabase.removeChannel(channel);
      clearTimeout(timeoutRef.current);
    };
  }, [user]);

  const initiateCall = async (recipientId: string, callType: 'voice' | 'video') => {
    if (!user) {
      toast.error('You must be logged in to make calls');
      return;
    }

    try {
      console.log('Initiating call:', { recipientId, callType });

      // Get recipient information
      const { data: recipientProfile } = await supabase
        .from('profiles')
        .select('id, full_name, display_name, avatar_url')
        .eq('id', recipientId)
        .single();

      if (!recipientProfile) {
        toast.error('User not found');
        return;
      }

      // Create call record
      const { data: callData, error } = await supabase
        .from('calls')
        .insert({
          caller_id: user.id,
          recipient_id: recipientId,
          call_type: callType,
          status: 'ringing'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating call:', error);
        toast.error('Failed to initiate call');
        return;
      }

      console.log('Call created:', callData);

      const participant: CallParticipant = {
        id: recipientId,
        name: recipientProfile.display_name || recipientProfile.full_name || 'Unknown User',
        avatar: recipientProfile.avatar_url
      };

      setActiveCall({
        ...callData,
        call_type: callData.call_type as 'voice' | 'video',
        status: callData.status as 'ringing' | 'accepted' | 'rejected' | 'missed' | 'ended'
      } as CallData);
      setActiveCallParticipant(participant);
      setIsIncoming(false);
      setShowCallModal(true);

      toast.success(`Calling ${participant.name}...`);
    } catch (error) {
      console.error('Error initiating call:', error);
      toast.error('Failed to initiate call');
    }
  };

  const acceptCall = async () => {
    if (!incomingCall) return;

    try {
      console.log('Accepting call:', incomingCall.id);

      // Update call status to accepted
      const { error } = await supabase
        .from('calls')
        .update({ status: 'accepted' })
        .eq('id', incomingCall.id);

      if (error) {
        console.error('Error accepting call:', error);
        toast.error('Failed to accept call');
        return;
      }

      // Move to active call state
      setActiveCall(incomingCall);
      setActiveCallParticipant(incomingCallParticipant);
      setIncomingCall(null);
      setIncomingCallParticipant(null);
      clearTimeout(timeoutRef.current);

      toast.success('Call accepted');
    } catch (error) {
      console.error('Error accepting call:', error);
      toast.error('Failed to accept call');
    }
  };

  const rejectCall = async () => {
    if (!incomingCall) return;

    try {
      console.log('Rejecting call:', incomingCall.id);

      // Update call status to rejected
      const { error } = await supabase
        .from('calls')
        .update({ 
          status: 'rejected',
          ended_at: new Date().toISOString()
        })
        .eq('id', incomingCall.id);

      if (error) {
        console.error('Error rejecting call:', error);
        toast.error('Failed to reject call');
        return;
      }

      setShowCallModal(false);
      setIncomingCall(null);
      setIncomingCallParticipant(null);
      clearTimeout(timeoutRef.current);

      toast.info('Call rejected');
    } catch (error) {
      console.error('Error rejecting call:', error);
      toast.error('Failed to reject call');
    }
  };

  const endCall = async (duration: number = 0) => {
    const currentCall = activeCall || incomingCall;
    if (!currentCall) return;

    try {
      console.log('Ending call:', currentCall.id, 'Duration:', duration);

      // Update call status to ended
      const { error } = await supabase
        .from('calls')
        .update({ 
          status: 'ended',
          ended_at: new Date().toISOString(),
          duration
        })
        .eq('id', currentCall.id);

      if (error) {
        console.error('Error ending call:', error);
        toast.error('Failed to end call');
        return;
      }

      setShowCallModal(false);
      setActiveCall(null);
      setActiveCallParticipant(null);
      setIncomingCall(null);
      setIncomingCallParticipant(null);
      clearTimeout(timeoutRef.current);

      if (duration > 0) {
        toast.success(`Call ended - Duration: ${Math.floor(duration / 60)}m ${duration % 60}s`);
      } else {
        toast.info('Call ended');
      }
    } catch (error) {
      console.error('Error ending call:', error);
      toast.error('Failed to end call');
    }
  };

  const handleMissedCall = async (callId: string) => {
    try {
      console.log('Handling missed call:', callId);

      // Update call status to missed
      const { error } = await supabase
        .from('calls')
        .update({ 
          status: 'missed',
          ended_at: new Date().toISOString()
        })
        .eq('id', callId);

      if (error) {
        console.error('Error updating missed call:', error);
        return;
      }

      setShowCallModal(false);
      setIncomingCall(null);
      setIncomingCallParticipant(null);
      clearTimeout(timeoutRef.current);

      toast.info('Missed call');
    } catch (error) {
      console.error('Error handling missed call:', error);
    }
  };

  return {
    // State
    incomingCall,
    incomingCallParticipant,
    activeCall,
    activeCallParticipant,
    showCallModal,
    isIncoming,

    // Actions
    initiateCall,
    acceptCall,
    rejectCall,
    endCall
  };
};