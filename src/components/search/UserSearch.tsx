import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FollowButton } from "./FollowButton";
import { MessageButton } from "./MessageButton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Search } from "lucide-react";

interface Profile {
  id: string;
  display_name?: string | null;
  full_name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
}

export const UserSearch = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Profile[]>([]);
  const debounceRef = useRef<number | null>(null);

  const doSearch = async (q: string) => {
    if (!q || q.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      // Prefer RPC full-text search
      const { data, error } = await supabase.rpc('search_profiles', { q, limit_count: 20 });
      if (error) {
        // Fallback to ILIKE search
        const { data: fbData } = await supabase
          .from('profiles')
          .select('id, display_name, full_name, email, avatar_url')
          .or(`display_name.ilike.%${q}%,full_name.ilike.%${q}%,email.ilike.%${q}%`)
          .limit(20);
        setResults(fbData || []);
      } else {
        setResults((data as any) || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => doSearch(query), 300);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query]);

  const titleFor = (p: Profile) => p.display_name || p.full_name || p.email || 'Unknown';
  const initialsFor = (p: Profile) => (titleFor(p) || '').split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();

  return (
    <section className="w-full max-w-3xl mx-auto">
      <div className="mb-4 flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users by name or email"
          aria-label="Search users"
        />
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground py-6">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching users...
        </div>
      )}

      {!loading && results.length === 0 && query.trim().length >= 2 && (
        <div className="text-muted-foreground py-6">No users found.</div>
      )}

      <div className="space-y-3">
        {results.map((p) => (
          <Card key={p.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src={p.avatar_url || undefined} alt={`${titleFor(p)} avatar`} />
                <AvatarFallback>{initialsFor(p)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h3 className="font-medium truncate">{titleFor(p)}</h3>
                <p className="text-sm text-muted-foreground truncate">{p.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <MessageButton recipientId={p.id} />
              <FollowButton targetUserId={p.id} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
