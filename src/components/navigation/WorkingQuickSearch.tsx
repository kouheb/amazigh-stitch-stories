import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const WorkingQuickSearch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  // Load all users when component mounts
  useEffect(() => {
    loadAllUsers();
  }, [user]);

  const loadAllUsers = async () => {
    console.log('Loading users for quick search...');
    console.log('Current user:', user?.email, user?.id);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, display_name, full_name, avatar_url');

      if (error) {
        console.error('Error loading users for quick search:', error);
        return;
      }

      console.log('Raw profiles data (ALL):', data);
      console.log('Total profiles found:', data?.length || 0);
      
      // Log each profile for debugging
      data?.forEach((profile, index) => {
        console.log(`Profile ${index + 1}:`, {
          id: profile.id,
          email: profile.email,
          display_name: profile.display_name,
          full_name: profile.full_name,
          hasEmail: !!profile.email
        });
      });
      
      // Filter out profiles without email and current user
      const filteredUsers = (data || [])
        .filter(profile => profile.email) // Only include profiles with email
        .filter(profile => user ? profile.id !== user.id : true); // Remove current user if authenticated
      
      setAllUsers(filteredUsers);
      
      console.log('Quick search loaded users (after filtering):', filteredUsers);
      console.log('Filtered user count:', filteredUsers.length);
      console.log('Users with emails:', filteredUsers.map(u => u.email));
    } catch (error) {
      console.error('Error loading users for quick search:', error);
    }
  };

  const search = (query: string) => {
    if (!query.trim()) {
      setResults([]);
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
    }).slice(0, 5); // Limit to 5 results for dropdown
    
    setResults(filtered);
    console.log('Quick search results:', filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    search(value);
  };

  const startChat = (userId: string) => {
    navigate(`/messaging?user=${userId}`);
    setSearchQuery("");
    setResults([]);
  };

  const viewProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
    setSearchQuery("");
    setResults([]);
  };

  const getUserName = (profile: any) => {
    return profile.display_name || profile.full_name || profile.email || 'Unknown';
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search users..."
          className="pl-9 pr-4"
        />
        {searching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 p-2 z-50 max-h-80 overflow-y-auto bg-white shadow-lg">
          <div className="text-xs text-gray-500 px-2 py-1 border-b">
            Found {results.length} user{results.length !== 1 ? 's' : ''}
          </div>
          {results.map((profile) => (
            <div key={profile.id} className="p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                    {getUserName(profile).charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {getUserName(profile)}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{profile.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => viewProfile(profile.id)}
                  className="flex-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center gap-1"
                >
                  <User className="h-3 w-3" />
                  Profile
                </button>
                <button
                  onClick={() => startChat(profile.id)}
                  className="flex-1 px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded flex items-center justify-center gap-1"
                >
                  <MessageCircle className="h-3 w-3" />
                  Chat
                </button>
              </div>
            </div>
          ))}
        </Card>
      )}

      {searchQuery.trim() && results.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 p-3 z-50 bg-white shadow-lg">
          <div className="text-center text-gray-500 text-sm">
            No users found for "{searchQuery}"
          </div>
        </Card>
      )}
    </div>
  );
};