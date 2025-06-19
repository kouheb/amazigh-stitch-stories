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
  Clock
} from "lucide-react";
import { RecommendationEngine } from "@/components/ai/RecommendationEngine";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { CollaborationHub } from "@/components/collaboration/CollaborationHub";

export const HomePage = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome back, Artisan! 👋
              </h1>
              <p className="text-gray-600">
                Continue your creative journey with personalized recommendations
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowNotifications(true)}
              className="relative"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-gray-600">Network</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs">+12% this week</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-gray-600">Courses</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs">3 in progress</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">Events</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-orange-600">
              <Clock className="h-3 w-3" />
              <span className="text-xs">2 upcoming</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">Messages</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-blue-600">
              <Bell className="h-3 w-3" />
              <span className="text-xs">5 unread</span>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity Feed */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Recent Activity</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    user: "Fatima El Mansouri",
                    action: "shared a new embroidery technique",
                    time: "2 hours ago",
                    avatar: "/api/placeholder/40/40",
                    likes: 24,
                    comments: 8
                  },
                  {
                    id: 2,
                    user: "Ahmed Benali",
                    action: "completed the Advanced Weaving course",
                    time: "4 hours ago",
                    avatar: "/api/placeholder/40/40",
                    likes: 18,
                    comments: 3
                  },
                  {
                    id: 3,
                    user: "Zahra Oudghiri",
                    action: "posted a new jewelry design",
                    time: "6 hours ago",
                    avatar: "/api/placeholder/40/40",
                    likes: 35,
                    comments: 12
                  }
                ].map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback>
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <Button variant="ghost" size="sm" className="h-auto p-1">
                          <Heart className="h-3 w-3 mr-1" />
                          {activity.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-auto p-1">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {activity.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-auto p-1">
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
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Share Your Work
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Start Live Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Courses
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Join Events
                </Button>
              </div>
            </Card>

            {/* Trending Topics */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Trending Now</h3>
              <div className="space-y-3">
                {[
                  { tag: "#ZellijArt", posts: 127 },
                  { tag: "#BerberCrafts", posts: 89 },
                  { tag: "#ModernEmbroidery", posts: 76 },
                  { tag: "#CeramicGlazing", posts: 54 },
                  { tag: "#JewelryMaking", posts: 43 }
                ].map((trend) => (
                  <div key={trend.tag} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-orange-600 hover:underline cursor-pointer">
                      {trend.tag}
                    </span>
                    <Badge variant="secondary">{trend.posts}</Badge>
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
