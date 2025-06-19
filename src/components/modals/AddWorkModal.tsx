
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X } from "lucide-react";

interface AddWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddWorkModal = ({ isOpen, onClose }: AddWorkModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    tags: [] as string[],
    newTag: ""
  });

  const categories = [
    "Fashion Design",
    "Jewelry Design", 
    "Textile Arts",
    "Embroidery",
    "Research",
    "Traditional Crafts",
    "Contemporary Design"
  ];

  const handleAddTag = () => {
    if (formData.newTag && !formData.tags.includes(formData.newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag],
        newTag: ""
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Work submitted:", formData);
    // Here you would typically save to your backend
    onClose();
    // Reset form
    setFormData({
      title: "",
      category: "",
      description: "",
      tags: [],
      newTag: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Work</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter the title of your work"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your work, techniques used, inspiration, etc."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Images</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600">Click to upload images or drag and drop</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
              <Button type="button" variant="outline" className="mt-2">
                Choose Files
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={formData.newTag}
                onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Add Work
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
