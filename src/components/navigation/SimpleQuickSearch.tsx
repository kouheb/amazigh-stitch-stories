import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const SimpleQuickSearch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setSearching(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(5);

      if (!error && data) {
        const filtered = data.filter(profile => {
          const searchTerm = query.toLowerCase();
          return (
            profile.id !== user?.id &&
            (profile.display_name?.toLowerCase().includes(searchTerm) ||
             profile.full_name?.toLowerCase().includes(searchTerm) ||
             profile.email?.toLowerCase().includes(searchTerm))
          );
        });
        setResults(filtered);
      }
    } catch (error) {
      console.error('Quick search error:', error);
    } finally {
      setSearching(false);
    }
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
          placeholder="Quick search users..."
          className="pl-9 pr-4"
        />
        {searching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 p-2 z-50 max-h-60 overflow-y-auto">
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
    </div>
  );
};