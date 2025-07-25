import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MapPin, Calendar, Globe, Star, MessageSquare, UserPlus, Settings, Share, Edit, Mail, Phone } from "lucide-react";
import { PortfolioGallery } from "@/components/profile/PortfolioGallery";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { WorkShowcase } from "@/components/profile/WorkShowcase";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { EditProfileModal } from "@/components/profile/EditProfileModal";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isOwnProfile] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    user
  } = useAuth();

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
    followers: 0,
    following: 0,
    likes: 0,
    experience: "New User",
    skills: [],
    specialties: [],
    verified: false,
    rating: 0,
    reviewCount: 0,
    email: user?.email || "",
    phone: user?.user_metadata?.phone || ""
  });
  const [userStats, setUserStats] = useState({
    followers: 0,
    following: 0,
    likes: 0,
    views: 0,
    connections: 0,
    books: 0,
    messages: 0,
    notifications: 0
  });

  // Load profile data and user stats from database on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      if (!user) return;
      try {
        // Load profile data
        const {
          data: profile,
          error: profileError
        } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
        if (profileError) {
          console.error("Error loading profile:", profileError);
        } else if (profile) {
          console.log("Loaded profile data:", profile);
          setProfileData(prev => ({
            ...prev,
            name: profile.display_name || profile.full_name || getUserDisplayName(),
            bio: profile.bio || prev.bio,
            location: profile.region || prev.location,
            website: profile.website || prev.website,
            avatar: profile.avatar_url || prev.avatar,
            email: profile.email || user.email || ""
          }));
        }

        // Load user stats
        const {
          data: stats,
          error: statsError
        } = await supabase.from('user_stats').select('*').eq('user_id', user.id).maybeSingle();
        if (statsError) {
          console.error("Error loading user stats:", statsError);
          // Create initial stats if they don't exist
          const {
            error: insertError
          } = await supabase.from('user_stats').insert({
            user_id: user.id
          });
          if (insertError) {
            console.error("Error creating user stats:", insertError);
          }
        } else if (stats) {
          console.log("Loaded user stats:", stats);
          setUserStats({
            followers: stats.followers_count,
            following: stats.following_count,
            likes: stats.likes_received,
            views: stats.profile_views,
            connections: stats.connections_count,
            books: stats.books_count,
            messages: stats.messages_count,
            notifications: stats.notifications_count
          });

          // Update profile data with stats
          setProfileData(prev => ({
            ...prev,
            followers: stats.followers_count,
            following: stats.following_count,
            likes: stats.likes_received,
            experience: stats.experience_years > 0 ? `${stats.experience_years}+ Years` : "New User"
          }));
        }

        // Load user skills
        const {
          data: skills,
          error: skillsError
        } = await supabase.from('user_skills').select('*').eq('user_id', user.id);
        if (skillsError) {
          console.error("Error loading user skills:", skillsError);
        } else if (skills) {
          const userSkills = skills.filter(s => s.skill_type === 'skill').map(s => s.skill_name);
          const userSpecialties = skills.filter(s => s.skill_type === 'specialty').map(s => s.skill_name);
          setProfileData(prev => ({
            ...prev,
            skills: userSkills,
            specialties: userSpecialties
          }));
        }
      } catch (error) {
        console.error("Unexpected error loading profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfileData();
  }, [user]);

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
    console.log("Message clicked");
    // For own profile, redirect to messaging page
    navigate('/messaging');
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
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50 pb-8">
      {/* Cover Photo & Profile Header */}
      <div className="relative">
        <div className="h-64 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${profileData.coverImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-red-400/20 to-pink-400/20"></div>
        </div>
        
        <div className="absolute -bottom-16 left-0 right-0">
          <div className="max-w-6xl mx-auto px-6 py-0">
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
                      {profileData.verified && <Badge className="bg-blue-600">
                          <Star className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>}
                    </div>
                    <p className="text-lg text-gray-600 mb-3">{profileData.title}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      {profileData.email && <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {profileData.email}
                        </div>}
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Member since {profileData.memberSince}
                      </div>
                      {profileData.website && <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          <a href={profileData.website} className="text-orange-600 hover:underline">
                            Portfolio Website
                          </a>
                        </div>}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {profileData.rating} ({profileData.reviewCount} reviews)
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {isOwnProfile ? <>
                        <Button variant="outline" onClick={handleEditProfile}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                        <Button variant="outline" onClick={handleSettingsClick}>
                          <Settings className="h-4 w-4" />
                        </Button>
                      </> : <>
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
                      </>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-6 mt-20 py-0">
        {/* Profile Stats */}
        <ProfileStats followers={userStats.followers} following={userStats.following} likes={userStats.likes} experience={profileData.experience} />

        {/* Bio Section */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
          
          {/* Contact Information */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.email && <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{profileData.email}</span>
                </div>}
              {profileData.phone && <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{profileData.phone}</span>
                </div>}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{profileData.location}</span>
              </div>
              {profileData.website && <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a href={profileData.website} className="text-orange-600 hover:underline">
                    {profileData.website}
                  </a>
                </div>}
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
                  <SkillsSection skills={profileData.skills} specialties={profileData.specialties} isOwnProfile={isOwnProfile} />
                </div>
              </TabsContent>

              <TabsContent value="portfolio">
                <PortfolioGallery isOwnProfile={isOwnProfile} userId={user?.id} />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsSection skills={profileData.skills} specialties={profileData.specialties} isOwnProfile={isOwnProfile} />
              </TabsContent>

              <TabsContent value="showcase">
                <WorkShowcase isOwnProfile={isOwnProfile} userId={user?.id} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} profileData={profileData} onSave={handleSaveProfile} />
    </div>;
};