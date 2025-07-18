import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MessageNotificationRequest {
  recipientId: string;
  senderName: string;
  messageContent: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { recipientId, senderName, messageContent }: MessageNotificationRequest = await req.json();

    // Get recipient's email and create in-app notification
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('email, display_name, full_name')
      .eq('id', recipientId)
      .single();

    if (profileError || !profile?.email) {
      console.error('Error fetching recipient profile:', profileError);
      return new Response(
        JSON.stringify({ error: 'Recipient not found' }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create in-app notification
    const { error: notificationError } = await supabaseClient
      .from('notifications')
      .insert({
        user_id: recipientId,
        title: `New message from ${senderName}`,
        message: messageContent.length > 100 
          ? messageContent.substring(0, 100) + '...'
          : messageContent,
        type: 'info',
        action_url: '/messaging'
      });

    if (notificationError) {
      console.error('Error creating notification:', notificationError);
      // Don't fail the whole request if notification creation fails
    }

    const recipientName = profile.display_name || profile.full_name || 'there';
    const truncatedMessage = messageContent.length > 100 
      ? messageContent.substring(0, 100) + '...' 
      : messageContent;

    const emailResponse = await resend.emails.send({
      from: "Amazigh Artisan Network <noreply@yourdomain.com>",
      to: [profile.email],
      subject: `New message from ${senderName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">New Message from ${senderName}</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; color: #666; font-size: 16px; line-height: 1.5;">
              "${truncatedMessage}"
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${Deno.env.get("SUPABASE_URL")?.replace('https://tatsijulcgjpadcjnalv.supabase.co', 'https://yourdomain.com')}/app/messaging" 
               style="background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reply to Message
            </a>
          </div>
          
          <p style="color: #888; font-size: 14px; text-align: center;">
            You received this message through the Amazigh Artisan Network platform.
          </p>
        </div>
      `,
    });

    console.log("Email notification sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-message-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);