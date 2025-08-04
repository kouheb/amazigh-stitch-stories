-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT DEFAULT 'Free',
  organizer TEXT DEFAULT 'Community',
  image_url TEXT,
  tags TEXT[],
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for events
CREATE POLICY "Anyone can view active events" 
ON public.events 
FOR SELECT 
USING (status = 'active');

CREATE POLICY "Admins can create events" 
ON public.events 
FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update events" 
ON public.events 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete events" 
ON public.events 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Create event registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  special_requests TEXT,
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'cancelled', 'attended')),
  UNIQUE(event_id, user_id)
);

-- Enable RLS for registrations
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Policies for registrations
CREATE POLICY "Users can view their own registrations" 
ON public.event_registrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can register for events" 
ON public.event_registrations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own registrations" 
ON public.event_registrations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all registrations" 
ON public.event_registrations 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updating timestamps
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update attendee count
CREATE OR REPLACE FUNCTION public.update_event_attendees()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.events 
    SET current_attendees = current_attendees + 1 
    WHERE id = NEW.event_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.events 
    SET current_attendees = current_attendees - 1 
    WHERE id = OLD.event_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update attendee count
CREATE TRIGGER update_event_attendees_trigger
AFTER INSERT OR DELETE ON public.event_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_event_attendees();