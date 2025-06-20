
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Star, 
  Award, 
  BookOpen, 
  Users, 
  Clock,
  Edit3,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

interface SkillsSectionProps {
  skills: string[];
  specialties: string[];
  isOwnProfile: boolean;
}

export const SkillsSection = ({ skills, specialties, isOwnProfile }: SkillsSectionProps) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [isAddSpecialtyModalOpen, setIsAddSpecialtyModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSpecialtyName, setNewSpecialtyName] = useState("");

  const skillDetails = {
    "Zardozi Embroidery": {
      level: 95,
      experience: "15+ years",
      projects: 120,
      students: 45,
      certifications: ["Master Artisan Certificate", "UNESCO Heritage Craft Recognition"],
      description: "Expert in traditional Zardozi embroidery techniques with modern applications",
      achievements: ["Featured in Marrakech Fashion Week 2023", "Taught at International Craft Summit"]
    },
    "Fashion Design": {
      level: 88,
      experience: "12 years",
      projects: 85,
      students: 32,
      certifications: ["Fashion Design Diploma", "Sustainable Fashion Certificate"],
      description: "Contemporary fashion design with cultural heritage integration",
      achievements: ["Winner of Amazigh Fashion Award 2022", "Sustainable Fashion Innovation Award"]
    },
    "Textile Arts": {
      level: 90,
      experience: "10 years",
      projects: 95,
      students: 28,
      certifications: ["Textile Arts Mastery", "Traditional Weaving Certificate"],
      description: "Traditional and contemporary textile arts spanning multiple techniques",
      achievements: ["Textile Heritage Preservation Award", "Master Weaver Recognition"]
    }
  };

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      console.log("Adding new skill:", newSkillName);
      toast.success(`Added skill: ${newSkillName}`);
      setNewSkillName("");
      setIsAddSkillModalOpen(false);
    }
  };

  const handleAddSpecialty = () => {
    if (newSpecialtyName.trim()) {
      console.log("Adding new specialty:", newSpecialtyName);
      toast.success(`Added specialty: ${newSpecialtyName}`);
      setNewSpecialtyName("");
      setIsAddSpecialtyModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Skills Overview */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Skills & Expertise</h2>
            <p className="text-gray-600">Professional skills and certifications</p>
          </div>
          {isOwnProfile && (
            <Button 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => setIsAddSkillModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          )}
        </div>

        {/* Main Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Object.entries(skillDetails).map(([skill, details]) => (
            <Card 
              key={skill}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedSkill === skill ? 'ring-2 ring-orange-500 bg-orange-50' : ''
              }`}
              onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{skill}</h3>
                {isOwnProfile && (
                  <Button variant="ghost" size="sm">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Proficiency</span>
                  <span>{details.level}%</span>
                </div>
                <Progress value={details.level} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {details.experience}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {details.projects} projects
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Skill Details */}
        {selectedSkill && skillDetails[selectedSkill as keyof typeof skillDetails] && (
          <Card className="p-6 bg-orange-50 border-orange-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{selectedSkill}</h3>
              <Badge className="bg-orange-600">{skillDetails[selectedSkill as keyof typeof skillDetails].level}% Proficiency</Badge>
            </div>
            
            <p className="text-gray-700 mb-6">{skillDetails[selectedSkill as keyof typeof skillDetails].description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {skillDetails[selectedSkill as keyof typeof skillDetails].projects}
                </div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {skillDetails[selectedSkill as keyof typeof skillDetails].students}
                </div>
                <div className="text-sm text-gray-600">Students Taught</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {skillDetails[selectedSkill as keyof typeof skillDetails].certifications.length}
                </div>
                <div className="text-sm text-gray-600">Certifications</div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillDetails[selectedSkill as keyof typeof skillDetails].certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="border-yellow-300 text-yellow-700">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-purple-500" />
                Achievements
              </h4>
              <ul className="space-y-2">
                {skillDetails[selectedSkill as keyof typeof skillDetails].achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* Additional Skills */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Additional Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.slice(3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Specialties */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Specialties</h3>
          {isOwnProfile && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsAddSpecialtyModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Specialty
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {specialties.map((specialty, index) => (
            <Badge key={index} className="bg-green-100 text-green-700 text-sm py-2 px-3">
              {specialty}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Add Skill Modal */}
      <Dialog open={isAddSkillModalOpen} onOpenChange={setIsAddSkillModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="skillName">Skill Name</Label>
              <Input
                id="skillName"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Enter skill name"
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddSkillModalOpen(false)}>
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

      {/* Add Specialty Modal */}
      <Dialog open={isAddSpecialtyModalOpen} onOpenChange={setIsAddSpecialtyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Specialty</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="specialtyName">Specialty Name</Label>
              <Input
                id="specialtyName"
                value={newSpecialtyName}
                onChange={(e) => setNewSpecialtyName(e.target.value)}
                placeholder="Enter specialty name"
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddSpecialtyModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddSpecialty}
              className="bg-green-600 hover:bg-green-700"
            >
              Add Specialty
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
