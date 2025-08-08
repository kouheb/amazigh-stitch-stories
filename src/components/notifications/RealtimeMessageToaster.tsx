import { useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const RealtimeMessageToaster = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;
    const channelName = `user-messages-${user.id}`;

    const setup = async () => {
      // Fetch conversation IDs for this user
      const { data: convs } = await supabase
        .from('conversations')
        .select('id, participant_1_id, participant_2_id')
        .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`);

      const channels = (convs || []).map((c) => {
        const ch = supabase
          .channel(`inbox:${c.id}`)
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${c.id}` },
            (payload) => {
              const m = payload.new as any;
              if (m.sender_id === user.id) return; // ignore own
              toast(`New message`, {
                description: m.content,
                action: {
                  label: 'Open',
                  onClick: () => navigate('/messaging'),
                }
              });
            }
          )
          .subscribe();
        return ch;
      });

      return () => {
        channels.forEach((ch) => supabase.removeChannel(ch));
      };
    };

    let cleanup: (() => void) | undefined;
    setup().then((c) => {
      if (isMounted) cleanup = c;
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, [user?.id, navigate]);

  return null;
};
