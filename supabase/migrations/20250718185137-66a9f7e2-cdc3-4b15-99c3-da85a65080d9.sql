-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
  is_read BOOLEAN NOT NULL DEFAULT false,
  action_url TEXT, -- optional URL to navigate to when clicked
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update notification count when notifications change
CREATE OR REPLACE FUNCTION public.update_notification_count()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update notification count on insert/update/delete
CREATE TRIGGER on_notification_change
  AFTER INSERT OR UPDATE OR DELETE ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_notification_count();