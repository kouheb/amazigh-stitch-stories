
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  BookOpen,
  Calendar,
  ShoppingBag,
  ArrowRight,
  RefreshCw
} from "lucide-react";

interface Recommendation {
  id: string;
  type: 'artisan' | 'course' | 'event' | 'service';
  title: string;
  description: string;
  image: string;
  score: number;
  reason: string;
  metadata: any;
}

export const RecommendationEngine = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  // Disable mock data in production: start empty and wait for real backend integration
  useEffect(() => {
    setLoading(false);
  }, []);

  const refreshRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'artisan':
        return Users;
      case 'course':
        return BookOpen;
      case 'event':
        return Calendar;
      case 'service':
        return ShoppingBag;
      default:
        return Sparkles;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'artisan':
        return 'bg-blue-100 text-blue-800';
      case 'course':
        return 'bg-green-100 text-green-800';
      case 'event':
        return 'bg-purple-100 text-purple-800';
      case 'service':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-orange-600 animate-pulse" />
          <h3 className="font-semibold">AI Recommendations</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-orange-600" />
          <h3 className="font-semibold">AI Recommendations</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={refreshRecommendations}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const IconComponent = getIcon(rec.type);
          return (
            <div key={rec.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="relative">
                <img 
                  src={rec.image} 
                  alt={rec.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center">
                  <IconComponent className="h-3 w-3 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{rec.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-orange-600">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs font-medium">{rec.score}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <Badge className={`text-xs ${getTypeColor(rec.type)}`}>
                    {rec.type}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    View <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-1">{rec.reason}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
