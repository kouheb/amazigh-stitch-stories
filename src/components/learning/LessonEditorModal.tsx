import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LessonEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleId: string | null;
  onSaved: () => void;
}

export function LessonEditorModal({ open, onOpenChange, moduleId, onSaved }: LessonEditorModalProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [type, setType] = useState<"video" | "text" | "quiz">("video");
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setType("video");
      setVideoUrl("");
      setContent("");
      setIsPublished(false);
    }
  }, [open]);

  const handleSave = async () => {
    if (!moduleId) return;
    if (!title.trim()) {
      toast({ title: "Title is required" });
      return;
    }
    if (type === "video" && !videoUrl.trim()) {
      toast({ title: "Video URL is required for video lessons" });
      return;
    }

    setSaving(true);
    const payload: any = {
      module_id: moduleId,
      title,
      type,
      is_published: isPublished,
    };
    if (type === "video") payload.video_url = videoUrl.trim();
    if (type === "text") payload.content = content.trim() || null;

    const { error } = await supabase.from("lessons").insert(payload);
    setSaving(false);
    if (error) {
      toast({ title: "Add lesson failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Lesson added" });
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Lesson</DialogTitle>
          <DialogDescription>
            Provide lesson details. For videos, paste a YouTube/Vimeo/MP4 URL.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lesson-title">Title</Label>
            <Input id="lesson-title" placeholder="Lesson title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="text">Text</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {type === "video" ? (
            <div className="space-y-2">
              <Label htmlFor="lesson-video">Video URL</Label>
              <Input id="lesson-video" placeholder="https://..." value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="lesson-content">Content</Label>
              <Textarea id="lesson-content" placeholder="Lesson content (optional)" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="lesson-publish">Publish now</Label>
            <Switch id="lesson-publish" checked={isPublished} onCheckedChange={setIsPublished} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || !moduleId}>{saving ? "Saving..." : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
