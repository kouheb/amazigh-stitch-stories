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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  id: string;
  display_name?: string;
  full_name?: string;
  email?: string;
  bio?: string;
  avatar_url?: string;
  website?: string;
  region?: string;
  experience_level?: string;
  social_handle?: string;
  created_at: string;
}

interface UserStats {
  followers_count: number;
  following_count: number;
  likes_received: number;
  profile_views: number;
  connections_count: number;
}

export const PublicProfilePage = () => {
  const { username } = useParams(); // This is actually the user ID
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isFollowing, setIsFollowing] = useState(false);
  const [updatingFollow, setUpdatingFollow] = useState(false);

  useEffect(() => {
    if (username) {
      loadUserProfile(username);
    }
  }, [username]);

  const loadUserProfile = async (userId: string) => {
    setLoading(true);
    try {
      // Load profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error loading profile:', profileError);
        toast.error('Profile not found');
        navigate('/app');
        return;
      }

      setProfile(profileData);

      // Load user stats
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!statsError && statsData) {
        setStats(statsData);
      } else {
        // Set default stats if none exist
        setStats({
          followers_count: 0,
          following_count: 0,
          likes_received: 0,
          profile_views: 0,
          connections_count: 0
        });
      }

      // Check follow state for current viewer
      if (user && user.id !== userId) {
        const { data: rel } = await supabase
          .from('follow_relationships')
          .select('id')
          .eq('follower_id', user.id)
          .eq('following_id', userId)
          .maybeSingle();
        setIsFollowing(!!rel);
      } else {
        setIsFollowing(false);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      toast.error('Failed to load profile');
      navigate('/app');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToApp = () => {
    navigate('/app');
  };

  const formatMemberSince = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  const handleMessage = () => {
    navigate(`/messaging?user=${profile?.id}`);
  };

  const handleFollow = async () => {
    if (!profile || !user || profile.id === user.id || updatingFollow) return;
    try {
      setUpdatingFollow(true);
      if (isFollowing) {
        const { error } = await supabase
          .from('follow_relationships')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', profile.id);
        if (error) throw error;
        setIsFollowing(false);
        setStats((prev) => prev ? { ...prev, followers_count: Math.max(0, prev.followers_count - 1) } : prev);
        toast.success('Unfollowed');
      } else {
        const { error } = await supabase
          .from('follow_relationships')
          .insert({ follower_id: user.id, following_id: profile.id });
        if (error) throw error;
        setIsFollowing(true);
        setStats((prev) => prev ? { ...prev, followers_count: prev.followers_count + 1 } : prev);
        toast.success('Now following');
      }
    } catch (error) {
      console.error('Error updating follow:', error);
      toast.error('Failed to update follow');
    } finally {
      setUpdatingFollow(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile not found</h2>
          <Button onClick={handleBackToApp}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to App
          </Button>
        </div>
      </div>
    );
  }

  const displayName = profile.display_name || profile.full_name || profile.email || 'Unknown User';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={handleBackToApp}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to App
          </Button>
        </div>
      </div>

      {/* Cover & Profile Section */}
      <div className="relative">
        <div className="h-48 md:h-64 bg-gradient-to-r from-orange-400 to-red-500">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        <div className="absolute -bottom-16 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={profile.avatar_url} alt={displayName} />
                  <AvatarFallback className="bg-orange-100 text-orange-600 text-2xl">
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        {displayName}
                      </h1>
                      <p className="text-lg text-gray-600 mb-2">
                        {profile.experience_level ? `${profile.experience_level} Experience` : 'Artisan'}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        {profile.region && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{profile.region}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Member since {formatMemberSince(profile.created_at)}</span>
                        </div>
                        {profile.website && (
                          <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            <a 
                              href={profile.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Website
                            </a>
                          </div>
                        )}
                      </div>
                      
                      {/* Bio */}
                      <p className="text-gray-700 mb-4 max-w-2xl">
                        {profile.bio || 'Welcome to my profile! I am passionate about creative work and looking forward to connecting with fellow artists and designers.'}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleMessage}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      {profile.id !== user?.id && (
                        <Button variant="outline" size="sm" onClick={handleFollow} disabled={updatingFollow}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        {/* Stats */}
        {stats && (
          <ProfileStats 
            followers={stats.followers_count}
            following={stats.following_count}
            likes={stats.likes_received}
            experience={profile.experience_level || 'New'}
          />
        )}

        {/* Tabs */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="showcase">Showcase</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio" className="mt-6">
              <PortfolioGallery userId={profile.id} isOwnProfile={false} />
            </TabsContent>
            
            <TabsContent value="showcase" className="mt-6">
              <WorkShowcase userId={profile.id} isOwnProfile={false} />
            </TabsContent>
            
            <TabsContent value="skills" className="mt-6">
              <SkillsSection skills={[]} specialties={[]} isOwnProfile={false} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};