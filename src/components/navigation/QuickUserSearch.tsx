import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle, Eye, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const QuickUserSearch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const quickSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    setResults([]);
    
    try {
      console.log('Quick searching for:', searchQuery);
      console.log('Current user ID:', user?.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, full_name, email')
        .or(`display_name.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`)
        .neq('id', user?.id)
        .limit(5);

      console.log('Quick search results:', data);
      console.log('Quick search error:', error);

      if (!error && data) {
        setResults(data);
        if (data.length === 0) {
          console.log("No users found in quick search");
        }
      } else {
        console.error("Quick search failed:", error);
        toast.error("Search failed");
      }
    } catch (error) {
      console.error("Quick search error:", error);
      toast.error("Search temporarily unavailable");
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Quick search users..."
          className="pl-9 pr-4"
          onKeyPress={(e) => e.key === 'Enter' && quickSearch()}
        />
        {searching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {results.length > 0 && (
        <Card className="mt-2 p-2 max-h-60 overflow-y-auto">
          {results.map((person) => (
            <div
              key={person.id}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
              onClick={() => navigate(`/messaging?user=${person.id}`)}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">
                  {(person.display_name || person.full_name || person.email || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {person.display_name || person.full_name || 'Unknown'}
                </p>
                <p className="text-xs text-gray-500 truncate">{person.email}</p>
              </div>
              <MessageCircle className="h-4 w-4 text-gray-400" />
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};