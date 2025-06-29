
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ProfileImageUpload } from "./profile/ProfileImageUpload";
import { BasicInfoForm } from "./profile/BasicInfoForm";
import { LanguagePreferences } from "./profile/LanguagePreferences";
import { RoleSelection } from "./profile/RoleSelection";
import { ExperienceAndGoals } from "./profile/ExperienceAndGoals";
import { FormTermsAndActions } from "./profile/FormTermsAndActions";
import { ProgressIndicator } from "./profile/ProgressIndicator";

interface ProfileCreationScreenProps {
  onProfileComplete?: () => void;
}

const ProfileCreationScreen = ({ onProfileComplete }: ProfileCreationScreenProps) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleProfileSubmit = () => {
    console.log("Profile creation completed");
    if (onProfileComplete) {
      onProfileComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Fashion & Arts Profile</h1>
          <p className="text-gray-600">Join the art community of fashion designers, artists, and artisans</p>
        </div>

        <Card className="p-8 bg-white shadow-lg border border-gray-200">
          <div className="space-y-8">
            <ProfileImageUpload 
              profileImage={profileImage} 
              setProfileImage={setProfileImage} 
            />
            
            <BasicInfoForm />
            
            <LanguagePreferences />
            
            <RoleSelection 
              selectedRoles={selectedRoles} 
              onRoleToggle={handleRoleToggle} 
            />
            
            <ExperienceAndGoals />
            
            <FormTermsAndActions onSubmit={handleProfileSubmit} />
          </div>
        </Card>

        <ProgressIndicator />
      </div>
    </div>
  );
};

export default ProfileCreationScreen;
