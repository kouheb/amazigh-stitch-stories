-- Create calls table to track call attempts
CREATE TABLE public.calls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  caller_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  call_type TEXT NOT NULL CHECK (call_type IN ('voice', 'video')),
  status TEXT NOT NULL DEFAULT 'ringing' CHECK (status IN ('ringing', 'accepted', 'rejected', 'missed', 'ended')),
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration INTEGER DEFAULT 0, -- Duration in seconds
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.calls ENABLE ROW LEVEL SECURITY;

-- Create policies for calls
CREATE POLICY "Users can view their own calls" 
ON public.calls 
FOR SELECT 
USING (auth.uid() = caller_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create calls they initiate" 
ON public.calls 
FOR INSERT 
WITH CHECK (auth.uid() = caller_id);

CREATE POLICY "Users can update calls they are involved in" 
ON public.calls 
FOR UPDATE 
USING (auth.uid() = caller_id OR auth.uid() = recipient_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_calls_updated_at
BEFORE UPDATE ON public.calls
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add table to realtime publication for real-time updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.calls;

-- Function to handle missed call notifications
CREATE OR REPLACE FUNCTION public.create_missed_call_notification()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for missed call notifications
CREATE TRIGGER create_missed_call_notification_trigger
AFTER UPDATE ON public.calls
FOR EACH ROW
EXECUTE FUNCTION public.create_missed_call_notification();