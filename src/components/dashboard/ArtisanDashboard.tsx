
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Users, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  Star,
  Eye,
  UserCog,
  Crown,
  RefreshCw,
  AlertTriangle,
  TrendingDown
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDashboardStats } from "@/hooks/useDashboardStats";

interface ArtisanDashboardProps {
  onTabChange?: (tab: string) => void;
}

export const ArtisanDashboard = ({ onTabChange }: ArtisanDashboardProps) => {
  const { t } = useLanguage();
  const { stats, isLoading, error, refetch, useMockData } = useDashboardStats();

  const statsConfig = [
    { 
      key: 'profileViews',
      title: t('dashboard.profileViews'), 
      icon: Eye, 
      color: "text-orange-500",
      bgColor: "bg-orange-50" 
    },
    { 
      key: 'connections',
      title: t('dashboard.connections'), 
      icon: Users, 
      color: "text-orange-600",
      bgColor: "bg-orange-100" 
    },
    { 
      key: 'bookings',
      title: t('dashboard.bookings'), 
      icon: Calendar, 
      color: "text-orange-700",
      bgColor: "bg-orange-200" 
    },
    { 
      key: 'messages',
      title: t('dashboard.messages'), 
      icon: MessageSquare, 
      color: "text-orange-800",
      bgColor: "bg-orange-100" 
    }
  ];

  const recentProjects = [
    { title: "Traditional Wedding Dress", status: t('status.completed'), rating: 5 },
    { title: "Modern Kaftan Design", status: t('status.inProgress'), rating: null },
    { title: "Beaded Evening Gown", status: t('status.completed'), rating: 4.8 }
  ];

  const handleCreateProfile = () => {
    console.log("Navigate to profile creation");
    if (onTabChange) {
      onTabChange("create-profile");
    }
  };

  const handleChooseMembership = () => {
    console.log("Navigate to membership selection");
    if (onTabChange) {
      onTabChange("membership");
    }
  };

  const handleRetry = () => {
    console.log("Retrying stats fetch...");
    refetch();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('dashboard.welcome')}</h1>
          <p className="text-gray-600">{t('dashboard.subtitle')}</p>
          {useMockData && (
            <p className="text-xs text-amber-600 mt-1">Using demo data - updates every 30 seconds</p>
          )}
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleCreateProfile}
            className="bg-orange-500 hover:bg-gray-600 text-white"
          >
            <UserCog className="h-4 w-4 mr-2" />
            {t('dashboard.createProfile')}
          </Button>
          <Button 
            onClick={handleChooseMembership}
            className="bg-orange-600 hover:bg-gray-700 text-white"
          >
            <Crown className="h-4 w-4 mr-2" />
            {t('dashboard.chooseMembership')}
          </Button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Failed to load dashboard statistics. 
            <Button 
              variant="link" 
              size="sm" 
              onClick={handleRetry}
              className="text-orange-600 hover:text-gray-700 p-0 ml-2 h-auto"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsConfig.map((config, index) => {
          const IconComponent = config.icon;
          const statData = stats[index];

          return (
            <Card key={config.key} className="p-4 border-orange-200 bg-white hover:shadow-lg transition-shadow">
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${config.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-gray-800">{statData?.value}</p>
                    <p className="text-sm text-gray-600">{config.title}</p>
                    {statData?.change && (
                      <div className={`flex items-center gap-1 text-xs mt-1 ${
                        statData.changeType === 'increase' ? 'text-orange-600' : 
                        statData.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {statData.changeType === 'increase' ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : statData.changeType === 'decrease' ? (
                          <TrendingDown className="h-3 w-3" />
                        ) : null}
                        <span>{statData.change}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <Card className="lg:col-span-2 p-6 border-orange-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{t('dashboard.recentProjects')}</h3>
            <Button variant="outline" size="sm" className="border-gray-300 text-gray-600 hover:bg-gray-100">{t('dashboard.viewAll')}</Button>
          </div>
          <div className="space-y-3">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-orange-200 rounded-lg bg-orange-50/30">
                <div className="flex-1">
                  <h4 className="font-medium">{project.title}</h4>
                  <Badge 
                    variant={project.status === t('status.completed') ? "default" : "secondary"}
                    className={project.status === t('status.completed') ? "bg-orange-500 hover:bg-gray-600 text-white" : "mt-1"}
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
        <Card className="p-6 border-orange-200 bg-white">
          <h3 className="text-lg font-semibold mb-4">{t('dashboard.quickActions')}</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-600 hover:bg-gray-100">
              <Calendar className="h-4 w-4 mr-2" />
              {t('dashboard.scheduleWorkshop')}
            </Button>
            <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-600 hover:bg-gray-100">
              <BookOpen className="h-4 w-4 mr-2" />
              {t('dashboard.createCourse')}
            </Button>
            <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-600 hover:bg-gray-100">
              <Users className="h-4 w-4 mr-2" />
              {t('dashboard.findCollaborators')}
            </Button>
            <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-600 hover:bg-gray-100">
              <TrendingUp className="h-4 w-4 mr-2" />
              {t('dashboard.viewAnalytics')}
            </Button>
          </div>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="p-6 border-orange-200 bg-white">
        <h3 className="text-lg font-semibold mb-4">{t('dashboard.recentActivity')}</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <p className="text-sm">
              <span className="font-medium">Fatima Al-Zahra</span> liked your traditional embroidery work
            </p>
            <span className="text-xs text-gray-500 ml-auto">2h ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
            <p className="text-sm">
              New workshop booking for <span className="font-medium">Zardozi Techniques</span>
            </p>
            <span className="text-xs text-gray-500 ml-auto">5h ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
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
