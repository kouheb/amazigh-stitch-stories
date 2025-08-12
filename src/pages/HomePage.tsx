import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Calendar,
  MessageSquare,
  Bell,
  Sparkles,
  Video,
  Heart,
  Share2,
  Plus,
  Clock,
  Star,
  Eye,
  ThumbsUp
} from "lucide-react";
import { RecommendationEngine } from "@/components/ai/RecommendationEngine";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { CollaborationHub } from "@/components/collaboration/CollaborationHub";
import { useAuth } from "@/contexts/AuthContext";

export const HomePage = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();

  // Get user's display name or fall back to email or default
  const getUserDisplayName = () => {
    if (user?.user_metadata?.display_name) {
      return user.user_metadata.display_name;
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      // Extract name from email (everything before @)
      const emailName = user.email.split('@')[0];
      // Capitalize first letter
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return "Friend";
  };

  const handleCreateWork = () => {
    console.log("Create button clicked - opening work creation modal");
    // You can add modal opening logic here or navigation to create page
    alert("Create work functionality - this would open a modal or navigate to create page");
  };

  const handleStartLiveSession = () => {
    console.log("Start live session clicked");
    alert("Live session functionality - this would start a live session");
  };

  const handleBrowseCourses = () => {
    console.log("Browse courses clicked");
    alert("Browse courses functionality - this would navigate to courses");
  };

  const handleJoinEvents = () => {
    console.log("Join events clicked");
    alert("Join events functionality - this would navigate to events");
  };

  const handleExploreAll = () => {
    console.log("Explore all artwork clicked");
    alert("Explore all functionality - this would navigate to the marketplace");
  };

  const handleViewAllActivity = () => {
    console.log("View all activity clicked");
    alert("View all activity functionality - this would show activity feed");
  };

  const handleNotificationSettings = () => {
    console.log("Notification settings clicked");
    alert("Notification settings functionality - this would open notification preferences");
  };

  // Removed demo featuredWork

  // Removed demo recentActivity

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Header with Featured Image */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=300&fit=crop" 
              alt="Amazigh crafts background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 to-black/80"></div>
          </div>
          <div className="relative p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {getUserDisplayName()}! 👋
                </h1>
                <p className="text-gray-200">
                  Continue your creative journey with personalized recommendations
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => setShowNotifications(true)}
                  className="relative bg-white/20 backdrop-blur-sm hover:bg-gray-300 text-white border-white/30 hover:text-black"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleNotificationSettings}
                  className="bg-white/20 backdrop-blur-sm hover:bg-gray-300 text-white border-white/30 hover:text-black"
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats removed to avoid fake numbers */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">


            {/* Collaboration Hub */}
            <CollaborationHub />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* AI Recommendations */}
            <RecommendationEngine />

            {/* Quick Actions */}
            <Card className="p-6 border-gray-300">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-gray-100 hover:text-black hover:border-gray-400 border-gray-300"
                  onClick={handleCreateWork}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Share Your Work
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-gray-100 hover:text-black hover:border-gray-400 border-gray-300"
                  onClick={handleStartLiveSession}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Start Live Session
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-gray-100 hover:text-black hover:border-gray-400 border-gray-300"
                  onClick={handleBrowseCourses}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Courses
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-gray-100 hover:text-black hover:border-gray-400 border-gray-300"
                  onClick={handleJoinEvents}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Join Events
                </Button>
              </div>
            </Card>

            {/* Trending Topics */}
            <Card className="p-6 border-gray-300">
              <h3 className="font-semibold mb-4">Trending Now</h3>
              <div className="space-y-3">
                {[
                  { tag: "#ZellijArt", posts: 127, trend: "+15%" },
                  { tag: "#BerberCrafts", posts: 89, trend: "+8%" },
                  { tag: "#ModernEmbroidery", posts: 76, trend: "+12%" },
                  { tag: "#CeramicGlazing", posts: 54, trend: "+5%" },
                  { tag: "#JewelryMaking", posts: 43, trend: "+20%" }
                ].map((trend) => (
                  <div key={trend.tag} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <span className="text-sm font-medium text-black hover:underline">
                        {trend.tag}
                      </span>
                      <p className="text-xs text-gray-500">{trend.posts} posts</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-800">{trend.trend}</Badge>
                      <TrendingUp className="h-3 w-3 text-gray-600" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
};
