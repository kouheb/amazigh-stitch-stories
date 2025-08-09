
import { useState, useEffect } from "react";
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
  Edit,
  Mail,
  Phone
} from "lucide-react";
import { PortfolioGallery } from "@/components/profile/PortfolioGallery";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { WorkShowcase } from "@/components/profile/WorkShowcase";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { EditProfileModal } from "@/components/profile/EditProfileModal";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const viewedUserId = routeId || user?.id || null;
  const isOwnProfile = !routeId || (routeId === user?.id);
  // Get user's display name or fall back to email or default
  const getUserDisplayName = () => {
    if (user?.user_metadata?.display_name) {
      return user.user_metadata.display_name;
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return "User";
  };

  const [profileData, setProfileData] = useState({
    name: getUserDisplayName(),
    title: user?.user_metadata?.title || "Creative Professional",
    location: user?.user_metadata?.location || "Location not set",
    memberSince: user?.created_at ? new Date(user.created_at).getFullYear().toString() : "2024",
    website: user?.user_metadata?.website || "",
    bio: user?.user_metadata?.bio || "Welcome to my profile! I'm passionate about creative work and looking forward to connecting with fellow artists and designers.",
    avatar: user?.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1494790108755-2616c163f505?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=300&fit=crop",
    followers: 2847,
    following: 456,
    likes: 15420,
    experience: "15+ Years",
    skills: ["Creative Design", "Digital Arts", "Traditional Crafts", "Pattern Making", "Cultural Research", "Teaching"],
    specialties: ["Traditional Arts", "Contemporary Fusion", "Cultural Preservation", "Artisan Training"],
    verified: true,
    rating: 4.9,
    reviewCount: 127,
    email: user?.email || "",
    phone: user?.user_metadata?.phone || ""
  });

  // Load profile data from database on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      if (!viewedUserId) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', viewedUserId)
          .maybeSingle();

        if (error) {
          console.error("Error loading profile:", error);
          return;
        }

        if (profile) {
          console.log("Loaded profile data:", profile);
          setProfileData(prev => ({
            ...prev,
            name: profile.display_name || profile.full_name || getUserDisplayName(),
            bio: profile.bio || prev.bio,
            location: profile.region || prev.location,
            website: profile.website || prev.website,
            avatar: profile.avatar_url || prev.avatar,
            email: profile.email || user.email || "",
          }));
        }
      } catch (error) {
        console.error("Unexpected error loading profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, [user, routeId, viewedUserId]);

  // Update profile data when user metadata changes
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: getUserDisplayName(),
        title: user.user_metadata?.title || prev.title,
        location: user.user_metadata?.location || prev.location,
        website: user.user_metadata?.website || prev.website,
        bio: user.user_metadata?.bio || prev.bio,
        avatar: user.user_metadata?.avatar_url || prev.avatar,
        email: user.email || prev.email,
        phone: user.user_metadata?.phone || prev.phone
      }));
    }
  }, [user]);

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
    setIsEditModalOpen(true);
    toast.success("Opening profile editor");
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveProfile = (updatedData: any) => {
    console.log("Profile updated locally:", updatedData);
    setProfileData(prev => ({
      ...prev,
      ...updatedData
    }));
    // The actual saving is handled in the EditProfileModal component
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    toast.info("Settings feature coming soon");
  };

  const handleMessageClick = () => {
    if (!viewedUserId) return;
    navigate(`/messaging?userId=${viewedUserId}`);
    toast.success("Opening chat...");
  };

  const handleFollowClick = () => {
    console.log("Follow clicked");
    toast.success("Follow feature coming soon");
  };

  const handleShareClick = () => {
    console.log("Share clicked");
    toast.info("Share feature coming soon");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

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
                      {profileData.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {profileData.email}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Member since {profileData.memberSince}
                      </div>
                      {profileData.website && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          <a href={profileData.website} className="text-orange-600 hover:underline">
                            Portfolio Website
                          </a>
                        </div>
                      )}
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
                        <Button variant="outline" onClick={handleSettingsClick}>
                          <Settings className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleMessageClick}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" onClick={handleFollowClick}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Follow
                        </Button>
                        <Button variant="outline" onClick={handleShareClick}>
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
          
          {/* Contact Information */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{profileData.email}</span>
                </div>
              )}
              {profileData.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{profileData.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{profileData.location}</span>
              </div>
              {profileData.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a href={profileData.website} className="text-orange-600 hover:underline">
                    {profileData.website}
                  </a>
                </div>
              )}
            </div>
          </div>
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
        onSave={handleSaveProfile}
      />
    </div>
  );
};
