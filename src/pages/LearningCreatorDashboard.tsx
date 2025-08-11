import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LessonEditorModal } from "@/components/learning/LessonEditorModal";

export const LearningCreatorDashboard = () => {
  const { toast } = useToast();
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Learning Creator Dashboard | Courses';
    const content = 'Learning Creator Dashboard to create courses, modules, and video lessons.';
    let md = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (md) md.content = content; else { const m = document.createElement('meta'); m.name = 'description'; m.content = content; document.head.appendChild(m); }
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const href = window.location.origin + '/learning/creator';
    if (canonical) canonical.href = href; else { const l = document.createElement('link'); l.rel = 'canonical'; l.href = href; document.head.appendChild(l); }
  }, []);

  const load = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: 'Sign in required' });
      setMyCourses([]);
      return;
    }

    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .eq('creator_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Load failed', description: error.message, variant: 'destructive' });
      setMyCourses([]);
      return;
    }

    if (!courses || courses.length === 0) {
      setMyCourses([]);
      return;
    }

    const { data: modules, error: modulesError } = await supabase
      .from('course_modules')
      .select('*')
      .in('course_id', courses.map(c => c.id))
      .order('order_index', { ascending: true });

    if (modulesError || !modules) {
      if (modulesError) {
        toast({ title: 'Load modules failed', description: modulesError.message, variant: 'destructive' });
      }
      setMyCourses(courses);
      return;
    }

    const moduleIds = modules.map(m => m.id);
    let lessonsByModule: Record<string, any[]> = {};

    if (moduleIds.length > 0) {
      const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .in('module_id', moduleIds)
        .order('order_index', { ascending: true });

      if (lessonsError) {
        toast({ title: 'Load lessons failed', description: lessonsError.message, variant: 'destructive' });
      } else if (lessons) {
        lessonsByModule = lessons.reduce((acc: Record<string, any[]>, l: any) => {
          (acc[l.module_id] ||= []).push(l);
          return acc;
        }, {});
      }
    }

    const modulesByCourse = modules.reduce((acc: Record<string, any[]>, m: any) => {
      const lessons = lessonsByModule[m.id] || [];
      (acc[m.course_id] ||= []).push({ ...m, lessons });
      return acc;
    }, {});

    const enriched = courses.map((c: any) => ({
      ...c,
      modules_list: modulesByCourse[c.id] || []
    }));

    setMyCourses(enriched);
  };
  useEffect(() => { load(); }, []);

  const createCourse = async () => {
    if (!title.trim()) { toast({ title: 'Title required' }); return; }
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) { toast({ title: 'Sign in required' }); return; }
    const { error } = await supabase.from('courses').insert({
      creator_id: user.id,
      title,
      description,
      category: category || null,
      price_cents: price ? Math.round(price * 100) : null,
      is_published: false,
    });
    if (error) { toast({ title: 'Create failed', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Course created' });
    setTitle(""); setDescription(""); setCategory(""); setPrice(undefined);
    load();
  };

  const publishCourse = async (id: string, is_published: boolean) => {
    const { error } = await supabase.from('courses').update({ is_published: !is_published }).eq('id', id);
    if (error) { toast({ title: 'Update failed', description: error.message, variant: 'destructive' }); return; }
    load();
  };

  const addModule = async (courseId: string) => {
    const title = prompt('Module title?');
    if (!title) return;
    const { error } = await supabase.from('course_modules').insert({ course_id: courseId, title });
    if (error) { toast({ title: 'Add module failed', description: error.message, variant: 'destructive' }); }
    load();
  };

  const addLesson = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setLessonModalOpen(true);
  };
  const publishLesson = async (lessonId: string, is_published: boolean) => {
    const { error } = await supabase.from('lessons').update({ is_published: !is_published }).eq('id', lessonId);
    if (error) { toast({ title: 'Update lesson failed', description: error.message, variant: 'destructive' }); }
    load();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Learning Creator Dashboard</h1>
        <p className="text-muted-foreground">Create and manage your courses</p>
      </header>

      <Card className="p-4 space-y-3">
        <h2 className="font-semibold">Create a new course</h2>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="flex gap-3">
          <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <Input type="number" placeholder="Price (USD)" value={price ?? ''} onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : undefined)} />
        </div>
        <Button onClick={createCourse}>Create</Button>
      </Card>

      <section className="space-y-4">
        {myCourses.map((c) => (
          <Card key={c.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <div className="flex gap-2 mt-1">
                  {c.category && <Badge variant="secondary">{c.category}</Badge>}
                  <Badge>{c.is_published ? 'Published' : 'Draft'}</Badge>
                </div>
              </div>
              <Button variant="outline" onClick={() => publishCourse(c.id, c.is_published)}>Toggle Publish</Button>
            </div>

            <div className="space-y-2">
              <Button size="sm" onClick={() => addModule(c.id)}>Add Module</Button>
              {(c.modules || c.modules_count) && null}
            </div>

            {/* Modules */}
            <div className="space-y-3">
              {(c.modules_list || []).map((m: any) => (
                <Card key={m.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{m.title}</h4>
                    <Button size="sm" onClick={() => addLesson(m.id)}>Add Lesson</Button>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {(m.lessons || []).map((l: any) => (
                      <li key={l.id} className="flex items-center justify-between">
                        <span>{l.title}</span>
                        <Button size="sm" variant="outline" onClick={() => publishLesson(l.id, l.is_published)}>
                          {l.is_published ? 'Unpublish' : 'Publish'}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Card>
        ))}
      </section>
      <LessonEditorModal
        open={lessonModalOpen}
        onOpenChange={(o) => { setLessonModalOpen(o); if (!o) setSelectedModuleId(null); }}
        moduleId={selectedModuleId}
        onSaved={() => { setLessonModalOpen(false); setSelectedModuleId(null); load(); }}
      />
    </div>
  );
};
