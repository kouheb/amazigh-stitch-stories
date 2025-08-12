import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Video, 
  MessageSquare, 
  Share2, 
  Eye,
  Edit,
  FileImage,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

interface CollaborationSession {
  id: string;
  title: string;
  type: 'design_review' | 'live_tutorial' | 'group_project';
  participants: {
    id: string;
    name: string;
    avatar: string;
    role: 'owner' | 'collaborator' | 'viewer';
    status: 'online' | 'offline';
  }[];
  status: 'active' | 'scheduled' | 'completed';
  startTime: string;
  duration: string;
}

export const CollaborationHub = () => {
  const [sessions, setSessions] = useState<CollaborationSession[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'scheduled' | 'completed'>('active');

  const handleStartSession = () => {
    console.log("Starting new collaboration session");
    
    // Create a new session
    const newSession: CollaborationSession = {
      id: Date.now().toString(),
      title: "New Collaboration Session",
      type: "design_review",
      participants: [
        {
          id: "1",
          name: "You",
          avatar: "/api/placeholder/32/32",
          role: "owner",
          status: "online"
        }
      ],
      status: "active",
      startTime: "Now",
      duration: "Open"
    };

    setSessions(prev => [newSession, ...prev]);
    setActiveTab('active');
    toast.success("New collaboration session started!");
  };

  const handleJoinSession = (sessionId: string) => {
    console.log(`Joining session: ${sessionId}`);
    toast.success("Joined collaboration session!");
  };

  const handleRemindMe = (sessionId: string) => {
    console.log(`Setting reminder for session: ${sessionId}`);
    toast.success("Reminder set for scheduled session!");
  };

  const handleOpenChat = (sessionId: string) => {
    console.log(`Opening chat for session: ${sessionId}`);
    toast.info("Opening session chat...");
  };

  const handleShareSession = (sessionId: string) => {
    console.log(`Sharing session: ${sessionId}`);
    toast.success("Session link copied to clipboard!");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'design_review':
        return Eye;
      case 'live_tutorial':
        return Video;
      case 'group_project':
        return Users;
      default:
        return MessageSquare;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'design_review':
        return 'Design Review';
      case 'live_tutorial':
        return 'Live Tutorial';
      case 'group_project':
        return 'Group Project';
      default:
        return 'Collaboration';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return AlertCircle;
      case 'scheduled':
        return Clock;
      case 'completed':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const filteredSessions = sessions.filter(session => session.status === activeTab);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-orange-600" />
          <h3 className="font-semibold">Collaboration Hub</h3>
        </div>
        <Button 
          size="sm" 
          className="bg-orange-600 hover:bg-orange-700"
          onClick={handleStartSession}
        >
          <Video className="h-4 w-4 mr-2" />
          Start Session
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1">
        {(['active', 'scheduled', 'completed'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(tab)}
            className="flex-1 capitalize"
          >
            {tab}
            <Badge variant="secondary" className="ml-2">
              {sessions.filter(s => s.status === tab).length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No {activeTab} sessions</p>
          </div>
        ) : (
          filteredSessions.map((session) => {
            const TypeIcon = getTypeIcon(session.type);
            const StatusIcon = getStatusIcon(session.status);
            
            return (
              <Card key={session.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TypeIcon className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{session.title}</h4>
                      <p className="text-sm text-gray-600">{getTypeLabel(session.type)}</p>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(session.status)}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {session.status}
                  </Badge>
                </div>

                {/* Participants */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    {session.participants.slice(0, 4).map((participant, index) => (
                      <Avatar key={participant.id} className="h-6 w-6 border-2 border-white">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback className="text-xs">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {session.participants.length > 4 && (
                      <div className="h-6 w-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{session.participants.length - 4}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {session.participants.length} participant{session.participants.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Session Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.startTime}
                    </div>
                    <div>Duration: {session.duration}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {session.status === 'active' && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleJoinSession(session.id)}
                    >
                      <Video className="h-3 w-3 mr-1" />
                      Join
                    </Button>
                  )}
                  {session.status === 'scheduled' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRemindMe(session.id)}
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Remind Me
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleOpenChat(session.id)}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Chat
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleShareSession(session.id)}
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </Card>
  );
};
