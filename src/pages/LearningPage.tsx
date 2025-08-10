import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter, BookOpen, Plus } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  thumbnail_url: string | null;
  price_cents: number | null;
  creator_id: string;
}

export const LearningPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Courses | Learn crafts";
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("courses")
        .select("id,title,description,category,thumbnail_url,price_cents,creator_id")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) {
        toast({ title: "Failed to load courses", description: error.message, variant: "destructive" });
      } else {
        setCourses(data || []);
      }
      setLoading(false);
    };
    load();
  }, [toast]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach(c => c.category && set.add(c.category));
    return ["all", ...Array.from(set)];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchCat = activeCategory === "all" || (c.category || "").toLowerCase() === activeCategory.toLowerCase();
      const q = searchTerm.toLowerCase();
      const matchSearch = c.title.toLowerCase().includes(q) || (c.description || "").toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [courses, activeCategory, searchTerm]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-2">Learning Platform</h1>
        <p className="text-muted-foreground">Browse published courses and start learning</p>
      </header>

      <section className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </section>

      <section className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
          >
            {cat === "all" ? "All" : cat}
          </Button>
        ))}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Courses ({filteredCourses.length})</h2>
          <Button size="sm" onClick={() => navigate('/learning/creator')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="h-40 flex items-center justify-center bg-muted text-5xl">
                  {course.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={course.thumbnail_url} alt={`${course.title} thumbnail`} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <BookOpen className="h-10 w-10" />
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    {course.category && <Badge variant="secondary">{course.category}</Badge>}
                    {typeof course.price_cents === 'number' && course.price_cents > 0 ? (
                      <Badge>${(course.price_cents / 100).toFixed(2)}</Badge>
                    ) : (
                      <Badge>Free</Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  {course.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
                  )}
                  <div className="flex justify-end">
                    <Button size="sm" onClick={() => navigate(`/learning/course/${course.id}`)}>
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
