
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSkillAdded: (skillData: any) => void;
}

export const AddSkillModal = ({ isOpen, onClose, onSkillAdded }: AddSkillModalProps) => {
  const [skillData, setSkillData] = useState({
    name: "",
    level: [75],
    experience: "",
    projects: "",
    students: "",
    description: "",
    certifications: "",
    achievements: ""
  });

  const handleInputChange = (field: string, value: string | number[]) => {
    setSkillData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = () => {
    if (!skillData.name.trim()) {
      toast.error("Please enter a skill name");
      return;
    }

    const newSkill = {
      name: skillData.name,
      level: skillData.level[0],
      experience: skillData.experience || "1 year",
      projects: parseInt(skillData.projects) || 0,
      students: parseInt(skillData.students) || 0,
      description: skillData.description,
      certifications: skillData.certifications.split(',').map(cert => cert.trim()).filter(cert => cert),
      achievements: skillData.achievements.split(',').map(ach => ach.trim()).filter(ach => ach)
    };

    console.log("Adding new skill:", newSkill);
    onSkillAdded(newSkill);
    toast.success(`Added skill: ${skillData.name}`);
    
    // Reset form
    setSkillData({
      name: "",
      level: [75],
      experience: "",
      projects: "",
      students: "",
      description: "",
      certifications: "",
      achievements: ""
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
          <DialogDescription>
            Add a new skill to your profile with details about your expertise
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <Label htmlFor="skillName">Skill Name *</Label>
            <Input
              id="skillName"
              value={skillData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Traditional Embroidery"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Proficiency Level: {skillData.level[0]}%</Label>
            <div className="mt-2">
              <Slider
                value={skillData.level}
                onValueChange={(value) => handleInputChange('level', value)}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={skillData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="e.g., 10+ years"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="projects">Projects Completed</Label>
              <Input
                id="projects"
                type="number"
                value={skillData.projects}
                onChange={(e) => handleInputChange('projects', e.target.value)}
                placeholder="0"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="students">Students Taught</Label>
              <Input
                id="students"
                type="number"
                value={skillData.students}
                onChange={(e) => handleInputChange('students', e.target.value)}
                placeholder="0"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={skillData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your expertise in this skill..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="certifications">Certifications (comma-separated)</Label>
            <Input
              id="certifications"
              value={skillData.certifications}
              onChange={(e) => handleInputChange('certifications', e.target.value)}
              placeholder="Certificate 1, Certificate 2, ..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="achievements">Achievements (comma-separated)</Label>
            <Input
              id="achievements"
              value={skillData.achievements}
              onChange={(e) => handleInputChange('achievements', e.target.value)}
              placeholder="Achievement 1, Achievement 2, ..."
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddSkill}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Add Skill
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
