
import { Card } from "@/components/ui/card";
import { Users, Heart, Clock, Award } from "lucide-react";

interface ProfileStatsProps {
  followers: number;
  following: number;
  likes: number;
  experience: string;
}

export const ProfileStats = ({ followers, following, likes, experience }: ProfileStatsProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t">
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Users className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-2xl font-bold text-gray-800">{formatNumber(followers)}</span>
        </div>
        <div className="text-sm text-gray-600">Followers</div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Users className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-2xl font-bold text-gray-800">{formatNumber(following)}</span>
        </div>
        <div className="text-sm text-gray-600">Following</div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Heart className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-2xl font-bold text-gray-800">{formatNumber(likes)}</span>
        </div>
        <div className="text-sm text-gray-600">Likes</div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Award className="h-5 w-5 text-orange-500 mr-2" />
          <span className="text-2xl font-bold text-gray-800">{experience}</span>
        </div>
        <div className="text-sm text-gray-600">Experience</div>
      </div>
    </div>
  );
};
