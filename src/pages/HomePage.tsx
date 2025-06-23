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

  const featuredWork = [
    {
      id: 1,
      title: "Traditional Berber Carpet",
      artist: "Aicha Berber",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      likes: 127,
      views: 1840,
      price: "$450"
    },
    {
      id: 2,
      title: "Hand-Forged Silver Jewelry",
      artist: "Youssef Al-Maghribi",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
      likes: 89,
      views: 1240,
      price: "$280"
    },
    {
      id: 3,
      title: "Ceramic Tagine Set",
      artist: "Fatima El-Alami",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      likes: 156,
      views: 2100,
      price: "$85"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Fatima El Mansouri",
      action: "shared a new embroidery technique",
      time: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c163f505?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=300&h=200&fit=crop",
      likes: 24,
      comments: 8,
      type: "technique"
    },
    {
      id: 2,
      user: "Ahmed Benali",
      action: "completed the Advanced Weaving course",
      time: "4 hours ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      likes: 18,
      comments: 3,
      type: "achievement",
      badge: "Course Completed"
    },
    {
      id: 3,
      user: "Zahra Oudghiri",
      action: "posted a new jewelry design",
      time: "6 hours ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop",
      likes: 35,
      comments: 12,
      type: "creation"
    },
    {
      id: 4,
      user: "Hassan Amrani",
      action: "started teaching pottery basics",
      time: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      likes: 42,
      comments: 15,
      type: "teaching"
    }
  ];

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
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setShowNotifications(true)}
                className="relative bg-white/20 backdrop-blur-sm hover:bg-gray-300 text-white border-white/30 hover:text-black"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-4 hover:shadow-lg transition-shadow border-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-black" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-gray-600">Network</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-gray-600">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs">+12% this week</span>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-shadow border-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-black" />
              </div>
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-gray-600">Courses</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-gray-600">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs">3 in progress</span>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-shadow border-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-black" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">Events</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-gray-600">
              <Clock className="h-3 w-3" />
              <span className="text-xs">2 upcoming</span>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-shadow border-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-black" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">Messages</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-gray-600">
              <Bell className="h-3 w-3" />
              <span className="text-xs">5 unread</span>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Artwork */}
            <Card className="p-6 border-gray-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-black" />
                  Featured Artwork
                </h3>
                <Button variant="outline" size="sm" className="border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-black">Explore All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredWork.map((work) => (
                  <div key={work.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img 
                        src={work.image} 
                        alt={work.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        {work.price}
                      </div>
                    </div>
                    <h4 className="font-medium mb-1">{work.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">by {work.artist}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {work.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {work.views}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity Feed */}
            <Card className="p-6 border-gray-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Recent Activity</h3>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 hover:text-black">View All</Button>
              </div>
              
              <div className="space-y-6">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback>
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <p className="text-sm mb-2">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      
                      {activity.image && (
                        <div className="mb-3">
                          <img 
                            src={activity.image} 
                            alt="Activity content"
                            className="w-full max-w-sm h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          />
                        </div>
                      )}
                      
                      {activity.badge && (
                        <Badge className="mb-2 bg-gray-100 text-gray-800 border-gray-300">
                          <Star className="h-3 w-3 mr-1" />
                          {activity.badge}
                        </Badge>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{activity.time}</span>
                        <Button variant="ghost" size="sm" className="h-auto p-1 hover:text-gray-700 hover:bg-gray-100">
                          <Heart className="h-3 w-3 mr-1" />
                          {activity.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-auto p-1 hover:text-gray-700 hover:bg-gray-100">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {activity.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-auto p-1 hover:text-gray-700 hover:bg-gray-100">
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

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
