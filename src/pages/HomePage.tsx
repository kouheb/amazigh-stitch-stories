
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  MessageSquare,
  Star,
  Eye,
  ArrowRight,
  Plus
} from "lucide-react";

export const HomePage = () => {
  const stats = [
    { title: "Profile Views", value: "1,234", icon: Eye, change: "+12%", color: "text-blue-600" },
    { title: "New Connections", value: "23", icon: Users, change: "+8%", color: "text-green-600" },
    { title: "Upcoming Events", value: "5", icon: Calendar, change: "→", color: "text-purple-600" },
    { title: "Messages", value: "12", icon: MessageSquare, change: "+3", color: "text-orange-600" }
  ];

  const recentActivity = [
    { type: "connection", user: "Fatima Al-Zahra", action: "liked your embroidery work", time: "2h ago", avatar: "FA" },
    { type: "booking", user: "", action: "New workshop booking: Traditional Weaving", time: "4h ago", avatar: "🎨" },
    { type: "message", user: "Ahmed Hassan", action: "sent you a collaboration request", time: "1d ago", avatar: "AH" }
  ];

  const recommendedArtisans = [
    { name: "Yasmin Berber", skill: "Ceramic Arts", location: "Morocco", rating: 4.9, image: "YB" },
    { name: "Omar Tuareg", skill: "Silver Jewelry", location: "Algeria", rating: 4.8, image: "OT" },
    { name: "Amina Kabyle", skill: "Textile Design", location: "Tunisia", rating: 5.0, image: "AK" }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, Sarah!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening in your artisan network</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50`}>
                  <IconComponent className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Activity</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    {activity.user && <span className="font-medium">{activity.user} </span>}
                    {activity.action}
                  </p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommended Artisans */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Connect</h3>
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {recommendedArtisans.map((artisan, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-medium">
                  {artisan.image}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{artisan.name}</h4>
                  <p className="text-sm text-gray-600">{artisan.skill}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{artisan.location}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{artisan.rating}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">Connect</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
