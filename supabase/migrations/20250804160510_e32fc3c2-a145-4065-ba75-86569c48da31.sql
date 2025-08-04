-- Fix function search path security issues
-- Update all functions to have immutable search_path

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$function$;

-- Fix has_role function  
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$function$;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix init_user_stats function
CREATE OR REPLACE FUNCTION public.init_user_stats()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$function$;

-- Fix update_notification_count function
CREATE OR REPLACE FUNCTION public.update_notification_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  -- Update the user_stats table with unread notification count
  INSERT INTO public.user_stats (user_id, notifications_count)
  VALUES (
    COALESCE(NEW.user_id, OLD.user_id),
    (SELECT COUNT(*) FROM public.notifications WHERE user_id = COALESCE(NEW.user_id, OLD.user_id) AND is_read = false)
  )
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    notifications_count = (SELECT COUNT(*) FROM public.notifications WHERE user_id = COALESCE(NEW.user_id, OLD.user_id) AND is_read = false),
    updated_at = now();
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Fix update_conversation_timestamp function
CREATE OR REPLACE FUNCTION public.update_conversation_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
BEGIN
  UPDATE public.conversations 
  SET 
    last_message_id = NEW.id,
    last_message_at = NEW.created_at,
    updated_at = now()
  WHERE 
    (participant_1_id = NEW.sender_id AND participant_2_id = NEW.recipient_id) OR
    (participant_1_id = NEW.recipient_id AND participant_2_id = NEW.sender_id);
  
  -- If no conversation exists, create one
  IF NOT FOUND THEN
    INSERT INTO public.conversations (participant_1_id, participant_2_id, last_message_id, last_message_at)
    VALUES (NEW.sender_id, NEW.recipient_id, NEW.id, NEW.created_at);
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Fix create_missed_call_notification function
CREATE OR REPLACE FUNCTION public.create_missed_call_notification()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  -- Only create notification if call was missed
  IF NEW.status = 'missed' AND OLD.status = 'ringing' THEN
    INSERT INTO public.notifications (
      user_id,
      title,
      message,
      type,
      related_id
    ) VALUES (
      NEW.recipient_id,
      'Missed Call',
      (SELECT 
        CASE 
          WHEN p.full_name IS NOT NULL AND p.full_name != '' 
          THEN 'Missed ' || NEW.call_type || ' call from ' || p.full_name
          ELSE 'Missed ' || NEW.call_type || ' call'
        END
       FROM public.profiles p 
       WHERE p.id = NEW.caller_id
      ),
      'call',
      NEW.id
    );
  END IF;
  
  RETURN NEW;
END;
$function$;