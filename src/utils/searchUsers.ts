import { supabase } from "@/integrations/supabase/client";

export async function searchUsers(searchTerm: string, currentUserId?: string) {
  const term = searchTerm?.trim();
  if (!term) return [] as Array<{ id: string; username: string | null; display_name: string | null; avatar_url: string | null }>;
  const q = `%${term}%`;

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, display_name, avatar_url')
    .ilike('username', q)
    .neq('id', currentUserId || '')
    .limit(20);

  if (error) {
    console.error('Search users error:', error);
    return [];
  }
  return (data || []) as Array<{ id: string; username: string | null; display_name: string | null; avatar_url: string | null }>;
}
