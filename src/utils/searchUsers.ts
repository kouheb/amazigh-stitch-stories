import { supabase } from "@/integrations/supabase/client";

export async function searchUsers(searchTerm: string, currentUserId?: string) {
  const term = searchTerm?.trim();
  if (!term) return [] as Array<{ id: string; username: string | null; display_name: string | null; avatar_url: string | null }>;

  try {
    // Prefer server-side full-text search for better relevance (display_name, full_name, email)
    const { data, error } = await supabase.rpc('search_profiles', { q: term, limit_count: 20 });
    if (error) {
      console.error('Search users (rpc) error:', error);
      // Fallback to ilike across multiple columns
      const q = `%${term}%`;
      const { data: fallback, error: fbErr } = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url')
        .or(`username.ilike.${q},display_name.ilike.${q},full_name.ilike.${q},email.ilike.${q}`)
        .limit(20);
      if (fbErr) {
        console.error('Search users fallback error:', fbErr);
        return [];
      }
      return (fallback || []).filter(u => u.id !== (currentUserId || '')) as Array<{ id: string; username: string | null; display_name: string | null; avatar_url: string | null }>;
    }
    const mapped = (data || []).map((u: any) => ({
      id: u.id,
      username: u.username ?? null,
      display_name: u.display_name ?? u.full_name ?? null,
      avatar_url: u.avatar_url ?? null,
    }));
    return mapped.filter(u => u.id !== (currentUserId || '')) as Array<{ id: string; username: string | null; display_name: string | null; avatar_url: string | null }>;
  } catch (err) {
    console.error('Search users unexpected error:', err);
    return [] as Array<{ id: string; username: string | null; display_name: string | null; avatar_url: string | null }>;
  }
}
