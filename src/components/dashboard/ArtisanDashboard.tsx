
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  Star,
  Plus,
  Eye
} from "lucide-react";

export const ArtisanDashboard = () => {
  const stats = [
    { title: "Profile Views", value: "1,234", icon: Eye, color: "text-blue-600" },
    { title: "Connections", value: "89", icon: Users, color: "text-green-600" },
    { title: "Bookings", value: "12", icon: Calendar, color: "text-purple-600" },
    { title: "Messages", value: "5", icon: MessageSquare, color: "text-orange-600" }
  ];

  const recentProjects = [
    { title: "Traditional Wedding Dress", status: "Completed", rating: 5 },
    { title: "Modern Kaftan Design", status: "In Progress", rating: null },
    { title: "Beaded Evening Gown", status: "Completed", rating: 4.8 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, Sarah!</h1>
          <p className="text-gray-600">Here's what's happening with your artisan profile</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Work
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gray-100`}>
                  <IconComponent className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Projects</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{project.title}</h4>
                  <Badge 
                    variant={project.status === "Completed" ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {project.status}
                  </Badge>
                </div>
                {project.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{project.rating}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Workshop
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              Create Course
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Find Collaborators
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm">
              <span className="font-medium">Fatima Al-Zahra</span> liked your traditional embroidery work
            </p>
            <span className="text-xs text-gray-500 ml-auto">2h ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm">
              New workshop booking for <span className="font-medium">Zardozi Techniques</span>
            </p>
            <span className="text-xs text-gray-500 ml-auto">5h ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <p className="text-sm">
              <span className="font-medium">Ahmed Hassan</span> sent you a collaboration request
            </p>
            <span className="text-xs text-gray-500 ml-auto">1d ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
