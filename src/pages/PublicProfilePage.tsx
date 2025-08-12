import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  MapPin, 
  Calendar, 
  Globe, 
  Star, 
  MessageSquare, 
  UserPlus,
  Share,
  Mail,
  Phone
} from "lucide-react";
import { PortfolioGallery } from "@/components/profile/PortfolioGallery";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { WorkShowcase } from "@/components/profile/WorkShowcase";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";

export const PublicProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      if (!username) {
        setIsLoading(false);
        return;
      }
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .maybeSingle();
        if (error) throw error;
        if (!profile) {
          setProfileData(null);
          setIsLoading(false);
          return;
        }

        const [{ data: stats }, { data: skills }] = await Promise.all([
          supabase.from('user_stats').select('followers_count, following_count, likes_received, experience_years').eq('user_id', profile.id).maybeSingle(),
          supabase.from('user_skills').select('skill_name').eq('user_id', profile.id).limit(20),
        ]);

        const mapped = {
          name: profile.display_name || profile.full_name || profile.email || username,
          title: profile.experience_level ? `${profile.experience_level} Artisan` : 'Artisan',
          skill: undefined,
          location: profile.region || '—',
          memberSince: profile.created_at ? new Date(profile.created_at).getFullYear().toString() : '',
          website: profile.website,
          bio: profile.bio,
          avatar: profile.avatar_url || '',
          coverImage: profile.avatar_url || '/placeholder.svg',
          followers: stats?.followers_count || 0,
          following: stats?.following_count || 0,
          likes: stats?.likes_received || 0,
          experience: stats?.experience_years ? `${stats.experience_years}+ Years` : undefined,
          skills: (skills || []).map((s: any) => s.skill_name),
          specialties: [],
          verified: false,
          rating: 0,
          reviewCount: 0,
          email: profile.email,
          phone: null,
          isOnline: false,
        };
        setProfileData(mapped);
      } catch (e) {
        console.error(e);
        setProfileData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  const handleMessageClick = () => {
    console.log("Message clicked for", profileData?.name);
    toast.success(`Opening chat with ${profileData?.name}...`);
    navigate('/messaging');
  };

  const handleFollowClick = () => {
    console.log("Follow clicked for", profileData?.name);
    toast.success(`Now following ${profileData?.name}!`);
  };

  const handleShareClick = () => {
    console.log("Share clicked for", profileData?.name);
    navigator.clipboard.writeText(window.location.href);
    toast.success("Profile URL copied to clipboard!");
  };

  const handleBackClick = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/network');
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

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h1>
          <p className="text-gray-600 mb-4">The profile you're looking for doesn't exist.</p>
          <Button onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Network
          </Button>
        </div>
      </div>

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
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={profileData.avatar} />
                  <AvatarFallback className="text-2xl bg-orange-100">
                    {profileData.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {profileData.isOnline && (
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
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
                      {profileData.isOnline && (
                        <Badge className="bg-green-600">Online</Badge>
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
                          <a href={profileData.website} className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
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
                  <a href={profileData.website} className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
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
                    isOwnProfile={false}
                  />
                </div>
              </TabsContent>

              <TabsContent value="portfolio">
                <PortfolioGallery isOwnProfile={false} />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsSection 
                  skills={profileData.skills}
                  specialties={profileData.specialties}
                  isOwnProfile={false}
                />
              </TabsContent>

              <TabsContent value="showcase">
                <WorkShowcase isOwnProfile={false} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};