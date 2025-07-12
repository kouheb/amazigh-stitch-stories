import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface SkillData {
  level: number;
  experience: string;
  projects: number;
  students: number;
  certifications: string[];
  description: string;
  achievements: string[];
}

interface EditSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSkillUpdated: (skillName: string, skillData: SkillData) => void;
  skillName: string;
  currentData: SkillData;
}

export const EditSkillModal = ({ isOpen, onClose, onSkillUpdated, skillName, currentData }: EditSkillModalProps) => {
  const [skillData, setSkillData] = useState({
    level: [currentData.level],
    experience: currentData.experience,
    projects: currentData.projects.toString(),
    students: currentData.students.toString(),
    description: currentData.description,
    certifications: currentData.certifications.join(', '),
    achievements: currentData.achievements.join(', ')
  });

  useEffect(() => {
    if (isOpen && currentData) {
      setSkillData({
        level: [currentData.level],
        experience: currentData.experience,
        projects: currentData.projects.toString(),
        students: currentData.students.toString(),
        description: currentData.description,
        certifications: currentData.certifications.join(', '),
        achievements: currentData.achievements.join(', ')
      });
    }
  }, [isOpen, currentData]);

  const handleInputChange = (field: string, value: string | number[]) => {
    setSkillData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateSkill = () => {
    const updatedSkill: SkillData = {
      level: skillData.level[0],
      experience: skillData.experience || "1 year",
      projects: parseInt(skillData.projects) || 0,
      students: parseInt(skillData.students) || 0,
      description: skillData.description,
      certifications: skillData.certifications.split(',').map(cert => cert.trim()).filter(cert => cert),
      achievements: skillData.achievements.split(',').map(ach => ach.trim()).filter(ach => ach)
    };

    console.log("Updating skill:", skillName, updatedSkill);
    onSkillUpdated(skillName, updatedSkill);
    toast.success(`Updated skill: ${skillName}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Skill: {skillName}</DialogTitle>
          <DialogDescription>
            Update your skill details and expertise level
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
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
            onClick={handleUpdateSkill}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Update Skill
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};