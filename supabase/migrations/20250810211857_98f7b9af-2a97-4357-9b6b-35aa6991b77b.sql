-- LMS Schema Migration (final ordering fix)
-- 1) Core tables first
CREATE TABLE IF NOT EXISTS public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  category text,
  thumbnail_url text,
  price_cents integer,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.course_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'lesson_type' AND n.nspname = 'public'
  ) THEN
    CREATE TYPE public.lesson_type AS ENUM ('video', 'text', 'quiz');
  END IF;
END;
$$;

CREATE TABLE IF NOT EXISTS public.lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  type public.lesson_type NOT NULL,
  content text,
  video_url text,
  quiz jsonb,
  order_index integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'active',
  price_paid_cents integer,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(enrollment_id, lesson_id)
);
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- 2) Indexes
CREATE INDEX IF NOT EXISTS idx_courses_creator ON public.courses(creator_id);
CREATE INDEX IF NOT EXISTS idx_courses_published ON public.courses(is_published);
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category);
CREATE INDEX IF NOT EXISTS idx_modules_course ON public.course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_modules_order ON public.course_modules(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON public.lessons(module_id, order_index);
CREATE INDEX IF NOT EXISTS idx_lessons_published ON public.lessons(is_published);
CREATE UNIQUE INDEX IF NOT EXISTS uniq_enrollment_user_course ON public.enrollments(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.enrollments(course_id);

-- 3) Functions for RLS
CREATE OR REPLACE FUNCTION public.can_edit_course(_course_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.courses c
    WHERE c.id = _course_id AND c.creator_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.can_access_course(_course_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.courses c
    WHERE c.id = _course_id AND c.creator_id = auth.uid()
  )
  OR EXISTS (
    SELECT 1 FROM public.courses c
    WHERE c.id = _course_id AND c.is_published = true
  )
  OR EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.course_id = _course_id AND e.user_id = auth.uid() AND e.status = 'active'
  );
$$;

-- 4) Policies
-- courses
CREATE POLICY "Public can view published or creator can view own courses"
ON public.courses FOR SELECT USING (
  is_published = true OR auth.uid() = creator_id
);
CREATE POLICY "Users can create their own courses"
ON public.courses FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update their own courses"
ON public.courses FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Creators can delete their own courses"
ON public.courses FOR DELETE USING (auth.uid() = creator_id);

-- course_modules
CREATE POLICY "Access modules via course access"
ON public.course_modules FOR SELECT USING (public.can_access_course(course_id));
CREATE POLICY "Create modules only by course creator"
ON public.course_modules FOR INSERT WITH CHECK (public.can_edit_course(course_id));
CREATE POLICY "Update modules only by course creator"
ON public.course_modules FOR UPDATE USING (public.can_edit_course(course_id));
CREATE POLICY "Delete modules only by course creator"
ON public.course_modules FOR DELETE USING (public.can_edit_course(course_id));

-- lessons
CREATE POLICY "Select lessons when published or creator"
ON public.lessons FOR SELECT USING (
  (
    is_published = true AND public.can_access_course(
      (SELECT m.course_id FROM public.course_modules m WHERE m.id = lessons.module_id)
    )
  )
  OR public.can_edit_course((SELECT m.course_id FROM public.course_modules m WHERE m.id = lessons.module_id))
);
CREATE POLICY "Creators manage lessons"
ON public.lessons FOR INSERT WITH CHECK (
  public.can_edit_course((SELECT m.course_id FROM public.course_modules m WHERE m.id = lessons.module_id))
);
CREATE POLICY "Creators update lessons"
ON public.lessons FOR UPDATE USING (
  public.can_edit_course((SELECT m.course_id FROM public.course_modules m WHERE m.id = lessons.module_id))
);
CREATE POLICY "Creators delete lessons"
ON public.lessons FOR DELETE USING (
  public.can_edit_course((SELECT m.course_id FROM public.course_modules m WHERE m.id = lessons.module_id))
);

-- enrollments
CREATE POLICY "Users can enroll themselves"
ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their enrollments"
ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Creators can view enrollments for their courses"
ON public.enrollments FOR SELECT USING (public.can_edit_course(course_id));
CREATE POLICY "Users can delete their enrollment"
ON public.enrollments FOR DELETE USING (auth.uid() = user_id);

-- lesson_progress
CREATE POLICY "Owner can manage lesson progress"
ON public.lesson_progress FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.id = lesson_progress.enrollment_id AND e.user_id = auth.uid()
  )
);
CREATE POLICY "Owner can insert lesson progress"
ON public.lesson_progress FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.id = lesson_progress.enrollment_id AND e.user_id = auth.uid()
  )
);
CREATE POLICY "Owner can update lesson progress"
ON public.lesson_progress FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.id = lesson_progress.enrollment_id AND e.user_id = auth.uid()
  )
);

-- 5) Timestamp triggers
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_courses_updated_at'
  ) THEN
    CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_modules_updated_at'
  ) THEN
    CREATE TRIGGER update_modules_updated_at
    BEFORE UPDATE ON public.course_modules
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_lessons_updated_at'
  ) THEN
    CREATE TRIGGER update_lessons_updated_at
    BEFORE UPDATE ON public.lessons
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_lesson_progress_updated_at'
  ) THEN
    CREATE TRIGGER update_lesson_progress_updated_at
    BEFORE UPDATE ON public.lesson_progress
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- 6) Notifications when lesson is published
CREATE OR REPLACE FUNCTION public.notify_enrolled_on_lesson_publish()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _course_id uuid;
  _course_title text;
BEGIN
  IF TG_OP = 'UPDATE' AND NEW.is_published = true AND COALESCE(OLD.is_published, false) = false THEN
    SELECT m.course_id INTO _course_id FROM public.course_modules m WHERE m.id = NEW.module_id;
    SELECT c.title INTO _course_title FROM public.courses c WHERE c.id = _course_id;

    INSERT INTO public.notifications (user_id, title, message, type, action_url)
    SELECT e.user_id,
           'New Lesson Published',
           'A new lesson "' || NEW.title || '" was added in course: ' || COALESCE(_course_title, ''),
           'course',
           '/learning/' || _course_id::text
    FROM public.enrollments e
    WHERE e.course_id = _course_id
      AND e.status = 'active';
  END IF;
  RETURN NEW;
END;
$$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'after_update_lessons_notify_enrolled'
  ) THEN
    CREATE TRIGGER after_update_lessons_notify_enrolled
    AFTER UPDATE ON public.lessons
    FOR EACH ROW EXECUTE FUNCTION public.notify_enrolled_on_lesson_publish();
  END IF;
END $$;

-- 7) Notify when module completed by a learner
CREATE OR REPLACE FUNCTION public.notify_on_module_completed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _module_id uuid;
  _course_id uuid;
  _user_id uuid;
  _total_published integer;
  _completed integer;
BEGIN
  IF NEW.completed = true THEN
    SELECT l.module_id INTO _module_id FROM public.lessons l WHERE l.id = NEW.lesson_id;
    SELECT m.course_id INTO _course_id FROM public.course_modules m WHERE m.id = _module_id;
    SELECT e.user_id INTO _user_id FROM public.enrollments e WHERE e.id = NEW.enrollment_id;

    SELECT COUNT(*) INTO _total_published FROM public.lessons l
      WHERE l.module_id = _module_id AND l.is_published = true;

    SELECT COUNT(*) INTO _completed FROM public.lesson_progress lp
      JOIN public.lessons l ON l.id = lp.lesson_id
      WHERE lp.enrollment_id = NEW.enrollment_id
        AND lp.completed = true
        AND l.module_id = _module_id
        AND l.is_published = true;

    IF _total_published > 0 AND _completed = _total_published THEN
      INSERT INTO public.notifications (user_id, title, message, type, action_url)
      VALUES (
        _user_id,
        'Module Completed',
        'Great job! You completed a module in your course.',
        'course',
        '/learning/' || _course_id::text
      );
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'after_upsert_progress_notify_module_completed'
  ) THEN
    CREATE TRIGGER after_upsert_progress_notify_module_completed
    AFTER INSERT OR UPDATE ON public.lesson_progress
    FOR EACH ROW EXECUTE FUNCTION public.notify_on_module_completed();
  END IF;
END $$;
