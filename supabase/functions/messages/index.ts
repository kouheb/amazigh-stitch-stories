import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const API_KEY = Deno.env.get('MESSAGING_API_KEY');

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  try {
    const authHeader = req.headers.get('authorization');
    const apiKeyHeader = req.headers.get('x-api-key');

    // Validate: either a valid JWT or a valid API key must be provided
    let authedUserId: string | null = null;

    if (authHeader?.startsWith('Bearer ')) {
      const jwt = authHeader.split(' ')[1];
      const { data: { user }, error } = await supabase.auth.getUser(jwt);
      if (!error && user) authedUserId = user.id;
    } else if (API_KEY && apiKeyHeader && apiKeyHeader === API_KEY) {
      // Server-to-server access via API key
      authedUserId = null; // operations must validate inputs explicitly
    } else {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const { action, payload } = await req.json();

    if (action === 'send') {
      const { conversation_id, sender_id, content, message_type = 'text', file_url = null, file_name = null } = payload || {};
      if (!conversation_id || !sender_id || typeof content !== 'string') {
        return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      if (authedUserId && sender_id !== authedUserId) {
        return new Response(JSON.stringify({ error: 'Sender mismatch' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // Verify sender belongs to conversation
      const { data: conv, error: convErr } = await supabase
        .from('conversations')
        .select('id, participant_1_id, participant_2_id')
        .eq('id', conversation_id)
        .maybeSingle();
      if (convErr || !conv) {
        return new Response(JSON.stringify({ error: 'Conversation not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      if (![conv.participant_1_id, conv.participant_2_id].includes(sender_id)) {
        return new Response(JSON.stringify({ error: 'Not a participant' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      const { data: msg, error: msgErr } = await supabase
        .from('messages')
        .insert({ conversation_id, sender_id, content, message_type, file_url, file_name })
        .select()
        .maybeSingle();

      if (msgErr) throw msgErr;
      return new Response(JSON.stringify({ data: msg }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (action === 'list') {
      const { conversation_id, limit = 50, offset = 0 } = payload || {};
      if (!conversation_id) return new Response(JSON.stringify({ error: 'conversation_id required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversation_id)
        .order('created_at', { ascending: true })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (action === 'mark_read') {
      const { conversation_id, user_id } = payload || {};
      if (!conversation_id || !user_id) return new Response(JSON.stringify({ error: 'conversation_id and user_id required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      if (authedUserId && user_id !== authedUserId) return new Response(JSON.stringify({ error: 'User mismatch' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', conversation_id)
        .neq('sender_id', user_id)
        .eq('is_read', false);
      if (error) throw error;

      return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (action === 'search') {
      const { q, limit = 50, offset = 0 } = payload || {};
      if (!q || typeof q !== 'string') return new Response(JSON.stringify({ error: 'q required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

      const { data, error } = await supabase.rpc('search_user_messages', { q, limit_count: limit, offset_count: offset });
      if (error) throw error;

      return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e: any) {
    console.error('messages function error', e);
    return new Response(JSON.stringify({ error: e.message || 'Internal error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
