import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const LearningStudentDashboard = () => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { document.title = 'My Courses | Learning'; }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('enrollments')
        .select('id, created_at, course:courses(id,title)')
        .order('created_at', { ascending: false });
      if (!error) setEnrollments(data || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">My Learning</h1>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrollments.map((e) => (
            <Card key={e.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{e.course?.title}</h3>
                <Button size="sm" variant="outline" onClick={() => location.assign(`/learning/course/${e.course?.id}`)}>
                  Continue
                </Button>
              </div>
              <Progress value={0} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
