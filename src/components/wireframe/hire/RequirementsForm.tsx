
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";

export const RequirementsForm = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Project Requirements</h2>
        <p className="text-gray-600">Provide details about your project</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="project-title">Project Title</Label>
            <Input id="project-title" placeholder="e.g., Wedding Dress Embroidery" />
          </div>
          <div>
            <Label htmlFor="deadline">Preferred Deadline</Label>
            <Input id="deadline" type="date" />
          </div>
          <div>
            <Label htmlFor="budget">Budget Range</Label>
            <Input id="budget" placeholder="e.g., $300 - $500" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="description">Project Description</Label>
            <textarea 
              id="description"
              rows={4}
              className="w-full p-3 border rounded-md"
              placeholder="Describe your project in detail..."
            />
          </div>
          <div>
            <Label>Attach Reference Images</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-500">
                <p>Drag & drop images here or click to browse</p>
                <p className="text-sm mt-1">PNG, JPG up to 10MB each</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="p-4 bg-blue-50">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Communication Preferences
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span className="text-sm">Daily progress updates</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span className="text-sm">Video consultations</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="text-sm">SMS notifications</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span className="text-sm">Email updates</span>
          </label>
        </div>
      </Card>
    </div>
  );
};
