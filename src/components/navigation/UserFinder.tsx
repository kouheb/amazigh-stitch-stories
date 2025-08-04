import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const UserFinder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [showingAll, setShowingAll] = useState(false);

  const searchProfiles = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setSearching(true);
    try {
      // Multiple search approaches for better reliability
      const searchTerms = [
        `display_name.ilike.%${searchQuery}%`,
        `full_name.ilike.%${searchQuery}%`,
        `email.ilike.%${searchQuery}%`
      ];

      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, full_name, email, avatar_url, bio')
        .or(searchTerms.join(','))
        .limit(15);

      if (error) {
        toast.error(`Search failed: ${error.message}`);
        console.error("Search error:", error);
        return;
      }

      // Filter out current user from results
      const filteredResults = (data || []).filter(profile => profile.id !== user?.id);
      setSearchResults(filteredResults);
      
      if (filteredResults.length > 0) {
        toast.success(`Found ${filteredResults.length} user(s)`);
      } else {
        toast.info("No users found with that search term");
      }
    } catch (error) {
      console.error("Unexpected search error:", error);
      toast.error("Search temporarily unavailable");
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const loadAllUsers = async () => {
    setSearching(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, full_name, email, avatar_url, bio')
        .neq('id', user?.id) // Exclude current user
        .limit(20)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error(`Failed to load users: ${error.message}`);
        return;
      }

      setAllUsers(data || []);
      setShowingAll(true);
      toast.success(`Loaded ${data?.length || 0} users`);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users");
    } finally {
      setSearching(false);
    }
  };

  const startConversation = (personId: string, personName: string) => {
    navigate(`/messaging?user=${personId}`);
    toast.success(`Starting conversation with ${personName}`);
  };

  const viewProfile = (personId: string) => {
    navigate(`/profile/${personId}`);
  };

  const getUserName = (person: any) => {
    return person.display_name || person.full_name || person.email || 'Unknown User';
  };

  const displayResults = showingAll ? allUsers : searchResults;

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Find Users</h3>
      
      <div className="space-y-4">
        {/* Search Section */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              onKeyPress={(e) => e.key === 'Enter' && searchProfiles()}
              className="flex-1"
            />
            <Button 
              onClick={searchProfiles} 
              disabled={searching}
              className="px-6"
            >
              {searching ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={loadAllUsers} 
              variant="outline" 
              disabled={searching}
              className="flex-1"
            >
              Show All Users
            </Button>
            <Button 
              onClick={() => {
                setSearchResults([]);
                setAllUsers([]);
                setShowingAll(false);
                setSearchQuery("");
              }} 
              variant="outline"
              className="flex-1"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Current User Info */}
        {user && (
          <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded">
            <p><strong>Your ID:</strong> {user.id}</p>
            <p><strong>Your Email:</strong> {user.email}</p>
          </div>
        )}

        {/* Results */}
        {displayResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">
              {showingAll ? `All Users (${displayResults.length})` : `Search Results (${displayResults.length})`}
            </h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {displayResults.map((person) => (
                <div key={person.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 mt-1">
                      <AvatarFallback className="bg-orange-100 text-orange-600 text-lg">
                        {getUserName(person).charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-lg">
                        {getUserName(person)}
                      </h5>
                      <p className="text-sm text-gray-600 mb-1">{person.email}</p>
                      {person.bio && (
                        <p className="text-sm text-gray-500 line-clamp-2">{person.bio}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2 font-mono">
                        ID: {person.id}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => viewProfile(person.id)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => startConversation(person.id, getUserName(person))}
                        className="flex items-center gap-2"
                      >
                        <MessageCircle className="h-3 w-3" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!searching && searchQuery && searchResults.length === 0 && !showingAll && (
          <div className="text-center py-8 text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No users found for "{searchQuery}"</p>
            <p className="text-sm">Try a different search term or browse all users</p>
          </div>
        )}
      </div>
    </Card>
  );
};