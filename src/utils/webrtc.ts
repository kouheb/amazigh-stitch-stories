export type CallType = 'voice' | 'video';

export interface CallParticipant {
  id: string;
  name: string;
}

export class WebRTCCall {
  private peerConnection: RTCPeerConnection;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private callType: CallType;
  private isInitiator: boolean;

  constructor(
    callType: CallType,
    isInitiator: boolean,
    private onRemoteStream: (stream: MediaStream) => void,
    private onConnectionStateChange: (state: RTCPeerConnectionState) => void,
    private onDataChannelMessage: (message: any) => void
  ) {
    this.callType = callType;
    this.isInitiator = isInitiator;
    
    // Configure STUN servers for NAT traversal
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    });

    this.setupPeerConnection();
  }

  private setupPeerConnection() {
    // Handle remote stream
    this.peerConnection.ontrack = (event) => {
      console.log('Received remote stream');
      this.remoteStream = event.streams[0];
      this.onRemoteStream(this.remoteStream);
    };

    // Handle connection state changes
    this.peerConnection.onconnectionstatechange = () => {
      console.log('Connection state changed:', this.peerConnection.connectionState);
      this.onConnectionStateChange(this.peerConnection.connectionState);
    };

    // Handle ICE candidates
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('ICE candidate:', event.candidate);
        // In a real implementation, you'd send this to the remote peer via signaling server
        // For now, we'll handle this through Supabase realtime
      }
    };

    // Set up data channel for call control messages
    if (this.isInitiator) {
      this.dataChannel = this.peerConnection.createDataChannel('callControl');
      this.setupDataChannel();
    } else {
      this.peerConnection.ondatachannel = (event) => {
        this.dataChannel = event.channel;
        this.setupDataChannel();
      };
    }
  }

  private setupDataChannel() {
    if (!this.dataChannel) return;

    this.dataChannel.onopen = () => {
      console.log('Data channel opened');
    };

    this.dataChannel.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.onDataChannelMessage(message);
    };
  }

  async initializeLocalStream(): Promise<MediaStream> {
    try {
      const constraints: MediaStreamConstraints = {
        audio: true,
        video: this.callType === 'video'
      };

      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Add tracks to peer connection
      this.localStream.getTracks().forEach(track => {
        if (this.localStream) {
          this.peerConnection.addTrack(track, this.localStream);
        }
      });

      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw new Error('Could not access camera/microphone');
    }
  }

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
    await this.peerConnection.setRemoteDescription(offer);
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }

  async handleAnswer(answer: RTCSessionDescriptionInit) {
    await this.peerConnection.setRemoteDescription(answer);
  }

  async addIceCandidate(candidate: RTCIceCandidateInit) {
    await this.peerConnection.addIceCandidate(candidate);
  }

  sendControlMessage(message: any) {
    if (this.dataChannel && this.dataChannel.readyState === 'open') {
      this.dataChannel.send(JSON.stringify(message));
    }
  }

  toggleMute(): boolean {
    if (!this.localStream) return false;
    
    const audioTrack = this.localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      return !audioTrack.enabled; // Return true if muted
    }
    return false;
  }

  toggleVideo(): boolean {
    if (!this.localStream || this.callType !== 'video') return false;
    
    const videoTrack = this.localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      return !videoTrack.enabled; // Return true if video disabled
    }
    return false;
  }

  endCall() {
    // Close data channel
    if (this.dataChannel) {
      this.dataChannel.close();
    }

    // Stop local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }

    // Close peer connection
    this.peerConnection.close();
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  getRemoteStream(): MediaStream | null {
    return this.remoteStream;
  }
}