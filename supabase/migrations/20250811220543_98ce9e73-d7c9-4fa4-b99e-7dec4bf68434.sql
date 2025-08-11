-- Certificates system: table, RLS, trigger for issuance, verification function

-- 1) Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid NOT NULL,
  user_id uuid NOT NULL,
  course_id uuid NOT NULL,
  instructor_id uuid NOT NULL,
  instructor_name text,
  code text UNIQUE NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_certificates_user ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course ON public.certificates(course_id);
CREATE INDEX IF NOT EXISTS idx_certificates_enrollment ON public.certificates(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON public.certificates(code);

-- 2) Security policies
-- Owners can view their own certificates
CREATE POLICY IF NOT EXISTS "Users can view their own certificates"
ON public.certificates FOR SELECT
USING (auth.uid() = user_id);

-- Instructors can view certificates for their courses
CREATE POLICY IF NOT EXISTS "Instructors can view certificates for their courses"
ON public.certificates FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.courses c
    WHERE c.id = certificates.course_id AND c.creator_id = auth.uid()
  )
);

-- Prevent direct insert/update/delete by clients (issued by server-side trigger only)
CREATE POLICY IF NOT EXISTS "Nobody can insert certificates directly"
ON public.certificates FOR INSERT WITH CHECK (false);
CREATE POLICY IF NOT EXISTS "Nobody can update certificates directly"
ON public.certificates FOR UPDATE USING (false);
CREATE POLICY IF NOT EXISTS "Nobody can delete certificates directly"
ON public.certificates FOR DELETE USING (false);

-- 3) Helper to generate random code
CREATE OR REPLACE FUNCTION public._generate_certificate_code()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT encode(gen_random_bytes(6), 'hex'); -- 12 hex chars
$$;

-- 4) Trigger to issue certificate when a course is fully completed
-- Checks on lesson_progress insert/update
CREATE OR REPLACE FUNCTION public.issue_certificate_if_completed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $func$
DECLARE
  _enrollment_id uuid;
  _course_id uuid;
  _user_id uuid;
  _creator_id uuid;
  _instructor_name text;
  _published_lessons int;
  _completed_lessons int;
  _existing uuid;
  _code text;
BEGIN
  -- Determine enrollment and user
  _enrollment_id := COALESCE(NEW.enrollment_id, OLD.enrollment_id);
  IF _enrollment_id IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  SELECT e.course_id, e.user_id INTO _course_id, _user_id
  FROM public.enrollments e WHERE e.id = _enrollment_id;
  IF _course_id IS NULL OR _user_id IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  -- Count published lessons in this course
  SELECT COUNT(*) INTO _published_lessons
  FROM public.lessons l
  JOIN public.course_modules m ON m.id = l.module_id
  WHERE m.course_id = _course_id AND l.is_published = true;

  IF COALESCE(_published_lessons, 0) = 0 THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  -- Count completed lessons for this enrollment restricted to published lessons of this course
  SELECT COUNT(*) INTO _completed_lessons
  FROM public.lesson_progress lp
  JOIN public.lessons l ON l.id = lp.lesson_id AND l.is_published = true
  JOIN public.course_modules m ON m.id = l.module_id AND m.course_id = _course_id
  WHERE lp.enrollment_id = _enrollment_id AND lp.completed = true;

  -- Already has certificate?
  SELECT id INTO _existing FROM public.certificates c
  WHERE c.enrollment_id = _enrollment_id LIMIT 1;

  IF _completed_lessons = _published_lessons AND _existing IS NULL THEN
    -- Find course creator and name
    SELECT c.creator_id INTO _creator_id FROM public.courses c WHERE c.id = _course_id;
    SELECT COALESCE(p.display_name, p.full_name, p.email) INTO _instructor_name
    FROM public.profiles p WHERE p.id = _creator_id;

    _code := public._generate_certificate_code();

    INSERT INTO public.certificates (enrollment_id, user_id, course_id, instructor_id, instructor_name, code)
    VALUES (_enrollment_id, _user_id, _course_id, _creator_id, _instructor_name, _code);
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$func$;

DROP TRIGGER IF EXISTS trg_issue_certificate_on_progress ON public.lesson_progress;
CREATE TRIGGER trg_issue_certificate_on_progress
AFTER INSERT OR UPDATE ON public.lesson_progress
FOR EACH ROW EXECUTE FUNCTION public.issue_certificate_if_completed();

-- 5) Verification RPC - public access by code
CREATE OR REPLACE FUNCTION public.verify_certificate(_code text)
RETURNS TABLE(
  id uuid,
  code text,
  issued_at timestamptz,
  student_id uuid,
  student_name text,
  course_id uuid,
  course_title text,
  instructor_id uuid,
  instructor_name text
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $fn$
BEGIN
  RETURN QUERY
  SELECT c.id,
         c.code,
         c.issued_at,
         c.user_id AS student_id,
         COALESCE(s.display_name, s.full_name, s.email) AS student_name,
         c.course_id,
         co.title AS course_title,
         c.instructor_id,
         c.instructor_name
  FROM public.certificates c
  JOIN public.courses co ON co.id = c.course_id
  LEFT JOIN public.profiles s ON s.id = c.user_id
  WHERE c.code = _code;
END;
$fn$;

-- 6) Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_certificates_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_update_certificates_updated_at ON public.certificates;
CREATE TRIGGER trg_update_certificates_updated_at
BEFORE UPDATE ON public.certificates
FOR EACH ROW EXECUTE FUNCTION public.update_certificates_updated_at();