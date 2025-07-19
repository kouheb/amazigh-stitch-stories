
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProfileCreationScreenProps {
  onProfileComplete?: () => void;
}

interface ProfileData {
  fullName: string;
  displayName: string;
  bio: string;
  region: string;
  experienceLevel: string;
  website: string;
  socialHandle: string;
  avatarUrl: string;
}

const regions = [
  "Morocco (Al-Maghrib)", "Algeria (Al-Jazāʾir)", "Tunisia (Tūnis)", "Libya (Lībiyā)", "Egypt (Miṣr)",
  "Mali (Mali)", "Niger (Niger)", "Burkina Faso", "Mauritania (Mūrītānyā)", "Senegal (Sénégal)",
  "Nigeria", "Ghana", "South Africa", "Kenya", "Ethiopia (ʾĪtyōṗṗyā)",
  "France (France)", "Spain (España)", "Italy (Italia)", "Germany (Deutschland)", "United Kingdom (UK)",
  "United States (USA)", "Canada", "Diaspora - Europe", "Diaspora - North America", "Other"
];

const experienceLevels = [
  "Beginner (0-2 years)",
  "Intermediate (2-5 years)", 
  "Advanced (5-10 years)",
  "Expert (10+ years)",
  "Master/Professional"
];

const ProfileCreationScreen = ({ onProfileComplete }: ProfileCreationScreenProps) => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "",
    displayName: "",
    bio: "",
    region: "",
    experienceLevel: "",
    website: "",
    socialHandle: "",
    avatarUrl: ""
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!profileData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!profileData.displayName.trim()) {
      toast.error("Display name is required");
      return false;
    }
    if (!profileData.region) {
      toast.error("Please select your region");
      return false;
    }
    if (!agreeToTerms) {
      toast.error("Please accept the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !user) return;

    setLoading(true);
    try {
      // Update the profile in the database
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          full_name: profileData.fullName,
          display_name: profileData.displayName,
          bio: profileData.bio,
          region: profileData.region,
          experience_level: profileData.experienceLevel,
          website: profileData.website,
          social_handle: profileData.socialHandle,
          avatar_url: profileData.avatarUrl,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (error) {
        console.error('Profile update error:', error);
        toast.error("Failed to save profile. Please try again.");
        return;
      }

      toast.success("Profile created successfully!");
      
      if (onProfileComplete) {
        onProfileComplete();
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Tell us about yourself to join the creative community</p>
        </div>

        <Card className="p-8 bg-white shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                {profileData.avatarUrl ? (
                  <img src={profileData.avatarUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <Button type="button" variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="displayName">Display Name *</Label>
                <Input
                  id="displayName"
                  value={profileData.displayName}
                  onChange={(e) => handleInputChange('displayName', e.target.value)}
                  placeholder="How others will see you"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself, your interests, and what you do..."
                className="mt-1 min-h-[100px]"
              />
            </div>

            {/* Region and Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="region">Region/Location *</Label>
                <Select onValueChange={(value) => handleInputChange('region', value)} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <Select onValueChange={(value) => handleInputChange('experienceLevel', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Website and Social */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={profileData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="social">Social Handle</Label>
                <Input
                  id="social"
                  value={profileData.socialHandle}
                  onChange={(e) => handleInputChange('socialHandle', e.target.value)}
                  placeholder="@username or profile link"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2 pt-4 border-t">
              <Checkbox 
                id="terms" 
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                required 
              />
              <Label htmlFor="terms" className="text-sm leading-5">
                I agree to the{" "}
                <a href="#" className="text-orange-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-orange-600 hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              {loading ? "Creating Profile..." : "Create Profile & Continue"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCreationScreen;
