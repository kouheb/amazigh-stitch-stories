import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const PeopleSearchTest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const searchProfiles = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setSearching(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, full_name, email, avatar_url, bio')
        .or(`display_name.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`)
        .limit(10);

      if (error) {
        console.error("Search error:", error);
        toast.error(`Search failed: ${error.message}`);
        return;
      }

      setSearchResults(data || []);
      
      if (data && data.length > 0) {
        toast.success(`Found ${data.length} result(s)`);
      } else {
        toast.info("No people found with that search term");
      }
    } catch (error) {
      console.error("Unexpected search error:", error);
      toast.error("Search temporarily unavailable");
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

  return (
    <Card className="p-6 max-w-lg mx-auto">
      <h3 className="text-lg font-semibold mb-4">Search People</h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            onKeyPress={(e) => e.key === 'Enter' && searchProfiles()}
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

        {user && (
          <p className="text-sm text-gray-600">
            Your ID: {user.id}
          </p>
        )}

        {searchResults.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Search Results:</h4>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {searchResults.map((person) => (
                <div key={person.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-orange-100 text-orange-600">
                        {(person.display_name || person.full_name || person.email || 'U').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm">
                        {person.display_name || person.full_name || 'Unknown User'}
                      </h5>
                      <p className="text-xs text-gray-500">{person.email}</p>
                      {person.bio && (
                        <p className="text-xs text-gray-400 truncate mt-1">{person.bio}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => viewProfile(person.id)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => startConversation(person.id, person.display_name || person.full_name || 'User')}
                      >
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};