-- Tighten certificates policies to authenticated role
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='certificates' AND policyname='Users can view their own certificates'
  ) THEN EXECUTE 'DROP POLICY "Users can view their own certificates" ON public.certificates'; END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='certificates' AND policyname='Instructors can view certificates for their courses'
  ) THEN EXECUTE 'DROP POLICY "Instructors can view certificates for their courses" ON public.certificates'; END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='certificates' AND policyname='Nobody can insert certificates directly'
  ) THEN EXECUTE 'DROP POLICY "Nobody can insert certificates directly" ON public.certificates'; END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='certificates' AND policyname='Nobody can update certificates directly'
  ) THEN EXECUTE 'DROP POLICY "Nobody can update certificates directly" ON public.certificates'; END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='certificates' AND policyname='Nobody can delete certificates directly'
  ) THEN EXECUTE 'DROP POLICY "Nobody can delete certificates directly" ON public.certificates'; END IF;
END $$;

CREATE POLICY "Users can view their own certificates"
ON public.certificates FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Instructors can view certificates for their courses"
ON public.certificates FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.courses c
    WHERE c.id = certificates.course_id AND c.creator_id = auth.uid()
  )
);

CREATE POLICY "Nobody can insert certificates directly"
ON public.certificates FOR INSERT TO authenticated WITH CHECK (false);

CREATE POLICY "Nobody can update certificates directly"
ON public.certificates FOR UPDATE TO authenticated USING (false);

CREATE POLICY "Nobody can delete certificates directly"
ON public.certificates FOR DELETE TO authenticated USING (false);