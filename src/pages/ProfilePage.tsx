
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  Upload, 
  Edit3, 
  Share,
  Heart,
  MessageSquare,
  Portfolio,
  Award,
  Users,
  Eye,
  Download
} from "lucide-react";
import { PortfolioGallery } from "@/components/profile/PortfolioGallery";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { WorkShowcase } from "@/components/profile/WorkShowcase";
import { ProfileStats } from "@/components/profile/ProfileStats";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isOwnProfile] = useState(true); // Mock for now

  const profileData = {
    name: "Sarah Al-Maghribi",
    username: "@sarah_designs",
    bio: "Master artisan specializing in traditional Zardozi embroidery and contemporary fashion fusion. Preserving Amazigh textile heritage through modern design.",
    location: "Fez, Morocco",
    joinDate: "March 2023",
    followers: 1250,
    following: 340,
    likes: 5600,
    profileImage: "🎨",
    coverImage: "🏔️",
    verified: true,
    skills: ["Zardozi Embroidery", "Fashion Design", "Textile Arts", "Pattern Making", "Cultural Research"],
    specialties: ["Traditional Crafts", "Contemporary Fusion", "Sustainable Fashion"],
    experience: "15+ years",
    rating: 4.9,
    reviewCount: 87
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="h-64 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 relative">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute top-4 right-4">
          {isOwnProfile && (
            <Button variant="secondary" size="sm">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Cover
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10">
        {/* Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-6xl border-4 border-white shadow-lg">
                {profileData.profileImage}
              </div>
              {profileData.verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-white fill-current" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-1">
                    {profileData.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-2">{profileData.username}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profileData.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {profileData.joinDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {profileData.rating} ({profileData.reviewCount} reviews)
                    </div>
                  </div>
                  <p className="text-gray-700 max-w-2xl">{profileData.bio}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {isOwnProfile ? (
                    <>
                      <Button variant="outline">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Add Work
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button>
                        <Users className="h-4 w-4 mr-2" />
                        Follow
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="icon">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Skills & Specialties */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {profileData.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-700">
                      {skill}
                    </Badge>
                  ))}
                  {profileData.skills.length > 4 && (
                    <Badge variant="outline">+{profileData.skills.length - 4} more</Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.specialties.map((specialty, index) => (
                    <Badge key={index} className="bg-green-100 text-green-700">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <ProfileStats 
            followers={profileData.followers}
            following={profileData.following}
            likes={profileData.likes}
            experience={profileData.experience}
          />
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="showcase">Showcase</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <PortfolioGallery isOwnProfile={isOwnProfile} />
          </TabsContent>

          <TabsContent value="showcase">
            <WorkShowcase isOwnProfile={isOwnProfile} />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsSection 
              skills={profileData.skills}
              specialties={profileData.specialties}
              isOwnProfile={isOwnProfile}
            />
          </TabsContent>

          <TabsContent value="about">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">About Sarah</h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  {profileData.bio}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Experience</h4>
                    <p className="text-gray-600">{profileData.experience} in traditional Amazigh crafts</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Education</h4>
                    <p className="text-gray-600">Master's in Textile Design, École des Beaux-Arts Casablanca</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Awards</h4>
                    <p className="text-gray-600">2023 Amazigh Heritage Preservation Award</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Languages</h4>
                    <p className="text-gray-600">Tamazight, Arabic, French, English</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
