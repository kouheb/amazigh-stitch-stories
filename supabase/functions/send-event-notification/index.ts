import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EventNotificationRequest {
  eventId: string;
  eventTitle: string;
  eventDescription: string;
  creatorName: string;
  eventDate: string;
  eventLocation: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Event notification function called');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { 
      eventId, 
      eventTitle, 
      eventDescription, 
      creatorName, 
      eventDate, 
      eventLocation 
    }: EventNotificationRequest = await req.json();

    console.log('Processing notification for event:', eventTitle);

    // Get all admin users
    const { data: adminUsers, error: adminError } = await supabaseClient
      .from('user_roles')
      .select(`
        user_id,
        profiles (
          email,
          full_name
        )
      `)
      .eq('role', 'admin');

    if (adminError) {
      console.error('Error fetching admin users:', adminError);
      throw adminError;
    }

    console.log('Found admin users:', adminUsers?.length);

    // Send notifications to each admin
    for (const admin of adminUsers || []) {
      const profile = admin.profiles as any;
      
      if (profile?.email) {
        console.log('Sending email to admin:', profile.email);
        
        // Send email notification
        const emailResponse = await resend.emails.send({
          from: "Events Team <onboarding@resend.dev>",
          to: [profile.email],
          subject: `New Event Awaiting Approval: ${eventTitle}`,
          html: `
            <h1>New Event Awaiting Approval</h1>
            <p>A new event has been submitted and requires your approval:</p>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0;">${eventTitle}</h2>
              <p><strong>Description:</strong> ${eventDescription}</p>
              <p><strong>Date:</strong> ${eventDate}</p>
              <p><strong>Location:</strong> ${eventLocation}</p>
              <p><strong>Created by:</strong> ${creatorName}</p>
            </div>
            
            <p>Please log in to your admin panel to review and approve this event.</p>
            <p>
              <a href="${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '.lovableproject.com') || 'your-app-url'}/app" 
                 style="background: #000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Review Event
              </a>
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              This is an automated notification from your Events Management System.
            </p>
          `,
        });

        console.log("Email sent successfully:", emailResponse);
      }

      // Create in-app notification
      const { error: notificationError } = await supabaseClient
        .from('notifications')
        .insert([
          {
            user_id: admin.user_id,
            title: 'New Event Awaiting Approval',
            message: `"${eventTitle}" by ${creatorName} needs your approval`,
            type: 'admin_approval',
            action_url: '/app?tab=admin',
            related_id: eventId
          }
        ]);

      if (notificationError) {
        console.error('Error creating notification:', notificationError);
      } else {
        console.log('In-app notification created for admin:', admin.user_id);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Notifications sent to ${adminUsers?.length || 0} admin(s)` 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-event-notification function:", error);
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