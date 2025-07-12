import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
  Trash2,
  X
} from "lucide-react";
import { toast } from "sonner";
import { AddSkillModal } from "./AddSkillModal";
import { EditSkillModal } from "./EditSkillModal";

interface SkillData {
  level: number;
  experience: string;
  projects: number;
  students: number;
  certifications: string[];
  description: string;
  achievements: string[];
}

interface SkillsSectionProps {
  skills: string[];
  specialties: string[];
  isOwnProfile: boolean;
}

export const SkillsSection = ({ skills, specialties, isOwnProfile }: SkillsSectionProps) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [isEditSkillModalOpen, setIsEditSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [isAddSpecialtyModalOpen, setIsAddSpecialtyModalOpen] = useState(false);
  const [newSpecialtyName, setNewSpecialtyName] = useState("");
  const [currentSkills, setCurrentSkills] = useState<string[]>(skills);
  const [currentSpecialties, setCurrentSpecialties] = useState<string[]>(specialties);

  const [skillDetails, setSkillDetails] = useState<Record<string, SkillData>>({
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
  });

  const handleSkillAdded = (newSkillData: any) => {
    setCurrentSkills(prev => [...prev, newSkillData.name]);
    setSkillDetails(prev => ({
      ...prev,
      [newSkillData.name]: {
        level: newSkillData.level,
        experience: newSkillData.experience,
        projects: newSkillData.projects,
        students: newSkillData.students,
        certifications: newSkillData.certifications,
        description: newSkillData.description,
        achievements: newSkillData.achievements
      }
    }));
  };

  const handleAddSpecialty = () => {
    if (newSpecialtyName.trim()) {
      setCurrentSpecialties(prev => [...prev, newSpecialtyName.trim()]);
      console.log("Adding new specialty:", newSpecialtyName);
      toast.success(`Added specialty: ${newSpecialtyName}`);
      setNewSpecialtyName("");
      setIsAddSpecialtyModalOpen(false);
    } else {
      toast.error("Please enter a specialty name");
    }
  };

  const handleRemoveSkill = (skillName: string) => {
    setCurrentSkills(prev => prev.filter(skill => skill !== skillName));
    setSkillDetails(prev => {
      const updated = { ...prev };
      delete updated[skillName];
      return updated;
    });
    if (selectedSkill === skillName) {
      setSelectedSkill(null);
    }
    toast.success(`Removed skill: ${skillName}`);
  };

  const handleRemoveSpecialty = (specialtyName: string) => {
    setCurrentSpecialties(prev => prev.filter(specialty => specialty !== specialtyName));
    toast.success(`Removed specialty: ${specialtyName}`);
  };

  const handleEditSkill = (skillName: string) => {
    console.log("Edit skill:", skillName);
    setEditingSkill(skillName);
    setIsEditSkillModalOpen(true);
  };

  const handleSkillUpdated = (skillName: string, updatedData: SkillData) => {
    setSkillDetails(prev => ({
      ...prev,
      [skillName]: updatedData
    }));
    setIsEditSkillModalOpen(false);
    setEditingSkill(null);
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
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditSkill(skill);
                      }}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSkill(skill);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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

        {/* Skill Details - keep existing code for skill details display */}
        {selectedSkill && skillDetails[selectedSkill] && (
          <Card className="p-6 bg-orange-50 border-orange-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{selectedSkill}</h3>
              <Badge className="bg-orange-600">{skillDetails[selectedSkill].level}% Proficiency</Badge>
            </div>
            
            <p className="text-gray-700 mb-6">{skillDetails[selectedSkill].description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {skillDetails[selectedSkill].projects}
                </div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {skillDetails[selectedSkill].students}
                </div>
                <div className="text-sm text-gray-600">Students Taught</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {skillDetails[selectedSkill].certifications.length}
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
                {skillDetails[selectedSkill].certifications.map((cert, index) => (
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
                {skillDetails[selectedSkill].achievements.map((achievement, index) => (
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
            {currentSkills.slice(3).map((skill, index) => (
              <div key={index} className="flex items-center gap-1">
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  {skill}
                </Badge>
                {isOwnProfile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
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
          {currentSpecialties.map((specialty, index) => (
            <div key={index} className="flex items-center gap-1">
              <Badge className="bg-green-100 text-green-700 text-sm py-2 px-3">
                {specialty}
              </Badge>
              {isOwnProfile && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                  onClick={() => handleRemoveSpecialty(specialty)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Add Skill Modal */}
      <AddSkillModal
        isOpen={isAddSkillModalOpen}
        onClose={() => setIsAddSkillModalOpen(false)}
        onSkillAdded={handleSkillAdded}
      />

      {/* Edit Skill Modal */}
      {editingSkill && skillDetails[editingSkill] && (
        <EditSkillModal
          isOpen={isEditSkillModalOpen}
          onClose={() => {
            setIsEditSkillModalOpen(false);
            setEditingSkill(null);
          }}
          onSkillUpdated={handleSkillUpdated}
          skillName={editingSkill}
          currentData={skillDetails[editingSkill]}
        />
      )}

      {/* Add Specialty Modal */}
      <Dialog open={isAddSpecialtyModalOpen} onOpenChange={setIsAddSpecialtyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Specialty</DialogTitle>
            <DialogDescription>
              Add a new specialty area to your profile
            </DialogDescription>
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
