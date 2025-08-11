import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";

interface Course { id: string; title: string; description: string | null; category: string | null; creator_id: string; }
interface Module { id: string; title: string; order_index: number; }
interface Lesson { id: string; title: string; type: string; order_index: number; }

export const CourseDetailPage = () => {
  const { id } = useParams();
  const courseId = id as string;
  const { toast } = useToast();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.title = course ? `${course.title} | Course` : 'Course';
  }, [course]);

  useEffect(() => {
    const load = async () => {
      // course
      const { data: c, error: ce } = await supabase.from('courses').select('id,title,description,category,creator_id').eq('id', courseId).maybeSingle();
      if (ce) { toast({ title: 'Error', description: ce.message, variant: 'destructive' }); return; }
      setCourse(c);

      // my enrollment
      const { data: me, error: meErr } = await supabase.from('enrollments').select('id').eq('course_id', courseId).limit(1);
      if (meErr) { toast({ title: 'Error', description: meErr.message, variant: 'destructive' }); }
      if (me && me[0]) setEnrollmentId(me[0].id);

      // modules
      const { data: mods, error: mErr } = await supabase.from('course_modules').select('id,title,order_index').eq('course_id', courseId).order('order_index');
      if (mErr) { toast({ title: 'Error', description: mErr.message, variant: 'destructive' }); return; }
      setModules(mods || []);

      // lessons per module (RLS will filter unpublished for non-creators)
      const moduleIds = (mods || []).map(m => m.id);
      if (moduleIds.length) {
        const { data: ls, error: lErr } = await supabase.from('lessons').select('id,title,type,order_index,module_id').in('module_id', moduleIds).order('order_index');
        if (lErr) { toast({ title: 'Error', description: lErr.message, variant: 'destructive' }); return; }
        const map: Record<string, Lesson[]> = {};
        (ls || []).forEach((l: any) => { (map[l.module_id] ||= []).push(l); });
        setLessons(map);
      }

      // progress
      if (me && me[0]) {
        const { data: prs } = await supabase.from('lesson_progress').select('lesson_id, completed').eq('enrollment_id', me[0].id);
        const p: Record<string, boolean> = {};
        (prs || []).forEach((r: any) => { p[r.lesson_id] = r.completed; });
        setProgress(p);
      }
    };
    if (courseId) load();
  }, [courseId, toast]);

  const enroll = async () => {
    const { data, error } = await supabase.from('enrollments').insert({ course_id: courseId, user_id: (await supabase.auth.getUser()).data.user?.id }).select('id').single();
    if (error) {
      if ((error as any).code === '23505') {
        toast({ title: 'Already enrolled', description: 'You are already enrolled.' });
      } else {
        toast({ title: 'Enroll failed', description: error.message, variant: 'destructive' });
      }
      return;
    }
    setEnrollmentId(data.id);
    toast({ title: 'Enrolled', description: 'You are now enrolled in this course.' });
  };

  const toggleLesson = async (lessonId: string, current: boolean) => {
    if (!enrollmentId) { toast({ title: 'Sign in to track progress' }); return; }
    const next = !current;
    const payload = { enrollment_id: enrollmentId, lesson_id: lessonId, completed: next, completed_at: next ? new Date().toISOString() : null };
    const { error } = await supabase.from('lesson_progress').upsert(payload, { onConflict: 'enrollment_id,lesson_id' });
    if (error) { toast({ title: 'Update failed', description: error.message, variant: 'destructive' }); return; }
    setProgress(prev => ({ ...prev, [lessonId]: next }));
  };

  const totalLessons = useMemo(() => Object.values(lessons).reduce((acc, arr) => acc + arr.length, 0), [lessons]);
  const completed = useMemo(() => Object.values(progress).filter(Boolean).length, [progress]);
  const percent = totalLessons ? Math.round((completed / totalLessons) * 100) : 0;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="w-fit">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      {course && (
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <div className="flex gap-2 items-center">
            {course.category && <Badge variant="secondary">{course.category}</Badge>}
            {enrollmentId ? <Badge>Enrolled</Badge> : <Badge variant="outline">Not Enrolled</Badge>}
          </div>
          {course.description && <p className="text-muted-foreground">{course.description}</p>}
          {!enrollmentId && (
            <Button onClick={enroll}>Enroll</Button>
          )}
          {enrollmentId && (
            <div className="space-y-2 mt-4">
              <p className="text-sm text-muted-foreground">Your progress: {completed}/{totalLessons} ({percent}%)</p>
              <Progress value={percent} />
            </div>
          )}
        </header>
      )}

      <section className="space-y-4">
        {modules.map((m) => (
          <Card key={m.id} className="p-4">
            <h3 className="font-semibold mb-3">{m.title}</h3>
            <ul className="space-y-2">
              {(lessons[m.id] || []).map((l) => (
                <li key={l.id} className="flex items-center justify-between">
                  <span>{l.title}</span>
                  <Button size="sm" variant={progress[l.id] ? 'default' : 'outline'} onClick={() => toggleLesson(l.id, !!progress[l.id])}>
                    {progress[l.id] ? 'Completed' : 'Mark complete'}
                  </Button>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </section>
    </div>
  );
};
