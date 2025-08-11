import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Cert {
  id: string;
  code: string;
  issued_at: string;
  course_id: string;
  user_id: string;
  instructor_name: string | null;
}

export const IssuedCertificatesPage = () => {
  const { toast } = useToast();
  const [certs, setCerts] = useState<Cert[]>([]);
  const [courseTitles, setCourseTitles] = useState<Record<string, string>>({});
  const [studentNames, setStudentNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { document.title = 'Issued Certificates | Learning'; }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // Policy allows instructors to select certificates for their courses.
      const { data, error } = await supabase
        .from('certificates')
        .select('id, code, issued_at, course_id, user_id, instructor_name')
        .order('issued_at', { ascending: false });
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        setLoading(false);
        return;
      }
      setCerts(data || []);

      const courseIds = Array.from(new Set((data || []).map((c: any) => c.course_id)));
      if (courseIds.length) {
        const { data: courses } = await supabase.from('courses').select('id,title').in('id', courseIds);
        const map: Record<string, string> = {}; (courses || []).forEach((c: any) => map[c.id] = c.title);
        setCourseTitles(map);
      }

      const userIds = Array.from(new Set((data || []).map((c: any) => c.user_id)));
      if (userIds.length) {
        const { data: profiles } = await supabase.from('profiles').select('id, display_name, full_name, email').in('id', userIds);
        const pmap: Record<string, string> = {};
        (profiles || []).forEach((p: any) => pmap[p.id] = p.display_name || p.full_name || p.email);
        setStudentNames(pmap);
      }

      setLoading(false);
    };
    load();
  }, [toast]);

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Issued Certificates</h1>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certs.map((c) => (
            <Card key={c.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{courseTitles[c.course_id] || 'Course'}</h3>
                  <p className="text-sm text-muted-foreground">Student: {studentNames[c.user_id] || 'Learner'}</p>
                </div>
                <span className="text-xs text-muted-foreground">{new Date(c.issued_at).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => window.open(`${window.location.origin}/certificates/verify/${c.code}`, '_blank')}>Verify</Button>
                <Button size="sm" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/certificates/verify/${c.code}`)}>Copy Link</Button>
              </div>
              <p className="text-xs text-muted-foreground">ID: {c.code}</p>
            </Card>
          ))}
          {certs.length === 0 && (
            <p className="text-sm text-muted-foreground">No certificates issued yet.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default IssuedCertificatesPage;
