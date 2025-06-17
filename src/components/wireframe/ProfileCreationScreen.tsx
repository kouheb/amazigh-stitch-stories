
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Camera, MapPin, Globe, Award } from "lucide-react";

const ProfileCreationScreen = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const roleCategories = [
    {
      category: "Creator/Artisan Roles",
      roles: [
        "Traditional Craftsperson",
        "Contemporary Designer", 
        "Textile Artist",
        "Jewelry Maker",
        "Ceramicist/Potter",
        "Leather Worker",
        "Metalsmith",
        "Musician/Performer"
      ]
    },
    {
      category: "Cultural/Educational Roles",
      roles: [
        "Cultural Researcher",
        "Historian",
        "Language Preservationist",
        "Storyteller",
        "Cultural Educator",
        "Documentary Filmmaker"
      ]
    },
    {
      category: "Business/Professional Roles", 
      roles: [
        "Cultural Entrepreneur",
        "Event Organizer",
        "Gallery Owner/Curator",
        "Tourism Guide",
        "Fashion Designer",
        "Interior Designer"
      ]
    },
    {
      category: "Community/Advocacy Roles",
      roles: [
        "Community Leader",
        "Cultural Activist", 
        "Youth Mentor",
        "Cultural Consultant"
      ]
    },
    {
      category: "Media/Technology Roles",
      roles: [
        "Content Creator",
        "Photographer",
        "Digital Artist",
        "App Developer"
      ]
    }
  ];

  const experienceLevels = [
    "Beginner (0-2 years)",
    "Intermediate (3-5 years)", 
    "Advanced (6-10 years)",
    "Expert (10+ years)",
    "Master/Elder (Generational knowledge)"
  ];

  const regions = [
    "Morocco (Tamazgha)",
    "Algeria (Dzayer)",
    "Tunisia (Tunis)",
    "Libya (Libya)",
    "Mali (Mali)",
    "Niger (Niger)",
    "Burkina Faso",
    "Diaspora - Europe",
    "Diaspora - North America",
    "Diaspora - Other"
  ];

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Cultural Profile</h1>
          <p className="text-gray-600">Join the Amazigh Nations community and share your cultural journey</p>
        </div>

        <Card className="p-8 bg-white shadow-lg border border-orange-200">
          <div className="space-y-8">
            {/* Profile Image Upload */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-red-100 border-4 border-orange-200 flex items-center justify-center mx-auto mb-4">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <Camera className="h-12 w-12 text-orange-400" />
                  )}
                </div>
                <Button variant="outline" size="sm" className="absolute bottom-0 right-0">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600">Upload your profile photo</p>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" placeholder="Enter your full name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" placeholder="How others will see you" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="region">Region/Location *</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region.toLowerCase().replace(/\s+/g, '-')}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Language Preferences */}
            <div>
              <Label className="text-base font-medium mb-4 block">Language Preferences</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Tamazight", "Arabic", "French", "English", "Spanish", "Other"].map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox id={language} />
                    <Label htmlFor={language} className="text-sm">{language}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Roles and Expertise */}
            <div>
              <Label className="text-base font-medium mb-4 block">Your Roles & Expertise *</Label>
              <p className="text-sm text-gray-600 mb-4">Select all that apply to you</p>
              
              <div className="space-y-6">
                {roleCategories.map((category) => (
                  <div key={category.category}>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      {category.category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-4">
                      {category.roles.map((role) => (
                        <div key={role} className="flex items-center space-x-2">
                          <Checkbox 
                            id={role} 
                            checked={selectedRoles.includes(role)}
                            onCheckedChange={() => handleRoleToggle(role)}
                          />
                          <Label htmlFor={role} className="text-sm cursor-pointer">{role}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <Label htmlFor="experience">Experience Level *</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level.toLowerCase().replace(/\s+/g, '-')}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bio/Description */}
            <div>
              <Label htmlFor="bio">About You *</Label>
              <Textarea 
                id="bio"
                placeholder="Tell us about yourself, your cultural background, your work, and what you hope to contribute to the Amazigh Nations community..."
                className="mt-1 min-h-[120px]"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 50 characters</p>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="website">Website/Portfolio</Label>
                <Input id="website" placeholder="https://yourwebsite.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="social">Social Media Handle</Label>
                <Input id="social" placeholder="@yourusername" className="mt-1" />
              </div>
            </div>

            {/* Goals and Interests */}
            <div>
              <Label className="text-base font-medium mb-4 block">What are you looking for? *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Learn traditional crafts",
                  "Share my knowledge", 
                  "Find collaborators",
                  "Sell my products",
                  "Attend workshops",
                  "Organize events",
                  "Preserve culture",
                  "Research heritage",
                  "Connect with community",
                  "Mentor others"
                ].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox id={goal} />
                    <Label htmlFor={goal} className="text-sm">{goal}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms and Privacy */}
            <div className="border-t pt-6">
              <div className="flex items-start space-x-2 mb-4">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the <span className="text-orange-600 underline cursor-pointer">Terms of Service</span> and <span className="text-orange-600 underline cursor-pointer">Privacy Policy</span>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="newsletter" />
                <Label htmlFor="newsletter" className="text-sm">
                  I would like to receive updates about cultural events, workshops, and community news
                </Label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button variant="outline" className="flex-1">
                Save as Draft
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Create Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-medium">1</div>
            <span>Profile Creation</span>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-medium">2</div>
            <span>Verification</span>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-medium">3</div>
            <span>Welcome</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreationScreen;
