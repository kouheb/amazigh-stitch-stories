import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus, UserCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface FollowButtonProps {
  targetUserId: string;
  className?: string;
}

export const FollowButton = ({ targetUserId, className }: FollowButtonProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const isOwn = useMemo(() => user?.id === targetUserId, [user?.id, targetUserId]);

  const fetchStatus = async () => {
    if (!user || isOwn) return;
    const { error, count } = await supabase
      .from("follow_relationships")
      .select("id", { head: true, count: "exact" })
      .eq("follower_id", user.id)
      .eq("following_id", targetUserId);
    if (error) {
      console.error("Failed to read follow status", error);
      return;
    }
    setIsFollowing((count || 0) > 0);
  };

  useEffect(() => {
    fetchStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, targetUserId]);

  // Realtime updates for follow/unfollow
  useEffect(() => {
    if (!user || isOwn) return;
    const channel = supabase
      .channel(`follow-${user.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'follow_relationships', filter: `follower_id=eq.${user.id}` },
        (payload) => {
          if (payload.new.following_id === targetUserId) setIsFollowing(true);
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'follow_relationships', filter: `follower_id=eq.${user.id}` },
        (payload) => {
          if (payload.old.following_id === targetUserId) setIsFollowing(false);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, targetUserId, isOwn]);

  const toggleFollow = async () => {
    if (!user) return toast.error("Please sign in to follow users");
    if (isOwn) return;
    setLoading(true);
    try {
      if (isFollowing) {
        const { error } = await supabase
          .from("follow_relationships")
          .delete()
          .eq("follower_id", user.id)
          .eq("following_id", targetUserId);
        if (error) throw error;
        setIsFollowing(false);
        toast.success("Unfollowed");
      } else {
        const { error } = await supabase
          .from("follow_relationships")
          .insert({ follower_id: user.id, following_id: targetUserId });
        if (error) throw error;
        setIsFollowing(true);
        toast.success("Following");
      }
    } catch (e: any) {
      console.error("Follow action failed", e);
      toast.error(e?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  if (isOwn) return null;

  return (
    <Button onClick={toggleFollow} disabled={loading} variant={isFollowing ? "secondary" : "default"} className={className}>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isFollowing ? (
        <><UserCheck className="h-4 w-4 mr-2" />Following</>
      ) : (
        <><UserPlus className="h-4 w-4 mr-2" />Follow</>
      )}
    </Button>
  );
};
