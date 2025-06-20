
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Calendar, 
  Globe, 
  Star, 
  MessageSquare, 
  UserPlus,
  Settings,
  Share,
  Edit
} from "lucide-react";
import { PortfolioGallery } from "@/components/profile/PortfolioGallery";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { WorkShowcase } from "@/components/profile/WorkShowcase";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { EditProfileModal } from "@/components/profile/EditProfileModal";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isOwnProfile] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Mock profile data
  const profileData = {
    name: "Aicha Benali",
    title: "Traditional Zardozi Embroidery Artist & Fashion Designer",
    location: "Fes, Morocco",
    memberSince: "2022",
    website: "https://aichabenali.com",
    bio: "Master artisan specializing in traditional Zardozi embroidery with over 15 years of experience. I blend ancient Amazigh techniques with contemporary fashion design, creating unique pieces that honor our cultural heritage while meeting modern aesthetic needs.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c163f505?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=300&fit=crop",
    followers: 2847,
    following: 456,
    likes: 15420,
    experience: "15+ Years",
    skills: ["Zardozi Embroidery", "Fashion Design", "Textile Arts", "Pattern Making", "Cultural Research", "Teaching", "Sustainable Fashion"],
    specialties: ["Traditional Embroidery", "Contemporary Fusion", "Cultural Preservation", "Artisan Training"],
    verified: true,
    rating: 4.9,
    reviewCount: 127
  };

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Cover Photo & Profile Header */}
      <div className="relative">
        <div 
          className="h-64 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${profileData.coverImage})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-red-400/20 to-pink-400/20"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback className="text-2xl bg-orange-100">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold text-gray-800">{profileData.name}</h1>
                      {profileData.verified && (
                        <Badge className="bg-blue-600">
                          <Star className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg text-gray-600 mb-3">{profileData.title}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Member since {profileData.memberSince}
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        <a href={profileData.website} className="text-orange-600 hover:underline">
                          Portfolio Website
                        </a>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {profileData.rating} ({profileData.reviewCount} reviews)
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {isOwnProfile ? (
                      <>
                        <Button variant="outline" onClick={handleEditProfile}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                        <Button variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button className="bg-orange-600 hover:bg-orange-700">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Follow
                        </Button>
                        <Button variant="outline">
                          <Share className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-6 mt-20">
        {/* Profile Stats */}
        <ProfileStats 
          followers={profileData.followers}
          following={profileData.following}
          likes={profileData.likes}
          experience={profileData.experience}
        />

        {/* Bio Section */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
        </Card>

        {/* Profile Tabs */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="showcase">Showcase</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="overview">
                <div className="space-y-8">
                  <SkillsSection 
                    skills={profileData.skills}
                    specialties={profileData.specialties}
                    isOwnProfile={isOwnProfile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="portfolio">
                <PortfolioGallery isOwnProfile={isOwnProfile} />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsSection 
                  skills={profileData.skills}
                  specialties={profileData.specialties}
                  isOwnProfile={isOwnProfile}
                />
              </TabsContent>

              <TabsContent value="showcase">
                <WorkShowcase isOwnProfile={isOwnProfile} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        profileData={profileData}
      />
    </div>
  );
};
