import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VerifyRow {
  id: string;
  code: string;
  issued_at: string;
  student_id: string;
  student_name: string | null;
  course_id: string;
  course_title: string | null;
  instructor_id: string;
  instructor_name: string | null;
}

export const VerifyCertificatePage = () => {
  const { code } = useParams();
  const [row, setRow] = useState<VerifyRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { document.title = 'Verify Certificate'; }, []);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc('verify_certificate', { _code: code });
      if (!error && data && data.length > 0) setRow(data[0]);
      setLoading(false);
    };
    if (code) run();
  }, [code]);

  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Certificate Verification</h1>
      {loading ? (
        <p className="text-sm text-muted-foreground">Checking certificate...</p>
      ) : row ? (
        <Card className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">{row.course_title}</h2>
              <p className="text-sm text-muted-foreground">Issued on {new Date(row.issued_at).toLocaleDateString()}</p>
            </div>
            <Badge>Valid</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm">Student</p>
              <p className="font-medium">{row.student_name || row.student_id}</p>
            </div>
            <div>
              <p className="text-sm">Instructor</p>
              <p className="font-medium">{row.instructor_name || row.instructor_id}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Certificate ID: {row.code}</p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => navigator.clipboard.writeText(url)}>Copy Link</Button>
            <Button size="sm" variant="outline" onClick={() => window.print()}>Print</Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <p className="text-sm text-destructive">This certificate could not be verified. Please check the link or contact support.</p>
        </Card>
      )}
    </main>
  );
};

export default VerifyCertificatePage;
