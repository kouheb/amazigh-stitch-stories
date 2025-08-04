import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle, Users, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const SimpleUserSearch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const searchUsers = async () => {
    setSearching(true);
    try {
      console.log('Current user:', user?.email, user?.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(50);

      console.log('All profiles from DB:', data);
      console.log('Search error:', error);

      if (error) {
        console.error('Search error:', error);
        toast.error('Search failed');
        return;
      }

      if (!data || data.length === 0) {
        toast.info('No users found in database');
        setUsers([]);
        return;
      }

      // Filter by search query if provided
      let filteredUsers = data;
      if (searchQuery.trim()) {
        const searchTerm = searchQuery.toLowerCase();
        filteredUsers = data.filter(profile => {
          const displayName = (profile.display_name || '').toLowerCase();
          const fullName = (profile.full_name || '').toLowerCase();
          const email = (profile.email || '').toLowerCase();
          
          return displayName.includes(searchTerm) || 
                 fullName.includes(searchTerm) || 
                 email.includes(searchTerm);
        });
        console.log('Filtered by search term:', filteredUsers);
      }

      // Remove current user
      const finalUsers = filteredUsers.filter(profile => profile.id !== user?.id);
      console.log('Final users after removing current user:', finalUsers);
      
      setUsers(finalUsers);
      toast.success(`Found ${finalUsers.length} users`);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed');
    } finally {
      setSearching(false);
    }
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
        Find Users
      </h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="flex-1"
          />
          <Button onClick={searchUsers} disabled={searching}>
            {searching ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Button 
          onClick={() => {
            setSearchQuery("");
            searchUsers();
          }} 
          variant="outline" 
          disabled={searching}
          className="w-full"
        >
          Show All Users
        </Button>

        {users.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Users ({users.length})</h4>
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
          </div>
        )}

        {user && (
          <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
            Current user: {user.email}
          </div>
        )}
      </div>
    </Card>
  );
};