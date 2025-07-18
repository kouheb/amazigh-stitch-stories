-- Create tables for user-specific content

-- Portfolio items table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  tags TEXT[],
  likes INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  comments INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Showcase items table
CREATE TABLE public.showcase_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL, -- 'video', 'project', 'award', 'certification', 'image'
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  duration TEXT, -- for videos
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  status TEXT, -- for projects: 'Completed', 'Ongoing'
  client TEXT, -- for projects
  organization TEXT, -- for awards/certifications
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User skills table
CREATE TABLE public.user_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  skill_name TEXT NOT NULL,
  skill_type TEXT NOT NULL DEFAULT 'skill', -- 'skill' or 'specialty'
  proficiency_level TEXT DEFAULT 'intermediate', -- 'beginner', 'intermediate', 'advanced', 'expert'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, skill_name, skill_type)
);

-- Enable Row Level Security
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showcase_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;

-- RLS Policies for portfolio_items
CREATE POLICY "Users can view all portfolio items"
ON public.portfolio_items
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own portfolio items"
ON public.portfolio_items
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio items"
ON public.portfolio_items
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolio items"
ON public.portfolio_items
FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for showcase_items
CREATE POLICY "Users can view all showcase items"
ON public.showcase_items
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own showcase items"
ON public.showcase_items
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own showcase items"
ON public.showcase_items
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own showcase items"
ON public.showcase_items
FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for user_skills
CREATE POLICY "Users can view all user skills"
ON public.user_skills
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own skills"
ON public.user_skills
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skills"
ON public.user_skills
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own skills"
ON public.user_skills
FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_showcase_items_updated_at
  BEFORE UPDATE ON public.showcase_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();