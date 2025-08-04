import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle, Users, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const WorkingUserSearch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  // Load all users when component mounts
  useEffect(() => {
    loadAllUsers();
  }, [user]);

  const loadAllUsers = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, display_name, full_name, avatar_url, bio');

      if (error) {
        console.error('Error loading users:', error);
        return;
      }

      // Remove current user and store all users
      const otherUsers = (data || []).filter(profile => profile.id !== user.id);
      setAllUsers(otherUsers);
      setUsers(otherUsers); // Show all users initially
      
      console.log('Loaded users:', otherUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const filterUsers = (query: string) => {
    if (!query.trim()) {
      setUsers(allUsers);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = allUsers.filter(profile => {
      const email = (profile.email || '').toLowerCase();
      const displayName = (profile.display_name || '').toLowerCase();
      const fullName = (profile.full_name || '').toLowerCase();
      
      return email.includes(searchTerm) || 
             displayName.includes(searchTerm) || 
             fullName.includes(searchTerm);
    });
    
    setUsers(filtered);
    console.log('Filtered users:', filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterUsers(value);
  };

  const startChat = (userId: string, userName: string) => {
    navigate(`/messaging?user=${userId}`);
    toast.success(`Starting chat with ${userName}`);
  };

  const viewProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const getUserName = (profile: any) => {
    return profile.display_name || profile.full_name || profile.email || 'Unknown User';
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Users className="h-5 w-5" />
        Find Users ({users.length} found)
      </h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name or email..."
            className="flex-1"
          />
          <Button 
            onClick={() => {
              setSearchQuery("");
              setUsers(allUsers);
            }}
            variant="outline"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Button 
          onClick={loadAllUsers}
          variant="outline" 
          className="w-full"
        >
          Refresh All Users
        </Button>

        {user && (
          <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
            Logged in as: {user.email} (ID: {user.id?.slice(0, 8)}...)
          </div>
        )}

        {users.length > 0 ? (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {users.map((profile) => (
              <div key={profile.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {getUserName(profile).charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <p className="font-medium">{getUserName(profile)}</p>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                  <p className="text-xs text-gray-400">ID: {profile.id?.slice(0, 8)}...</p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => viewProfile(profile.id)}
                    className="flex items-center gap-1"
                  >
                    <User className="h-3 w-3" />
                    Profile
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => startChat(profile.id, getUserName(profile))}
                    className="flex items-center gap-1"
                  >
                    <MessageCircle className="h-3 w-3" />
                    Chat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No users found</p>
            <p className="text-sm">Try refreshing or check if you're connected</p>
          </div>
        )}
      </div>
    </Card>
  );
};