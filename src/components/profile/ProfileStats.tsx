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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200">
      {/* Followers */}
      <div className="text-center group hover:bg-gray-50 rounded-lg p-4 transition-colors duration-200">
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-gray-900">{formatNumber(followers)}</div>
            <div className="text-sm font-medium text-gray-600">Followers</div>
          </div>
        </div>
      </div>
      
      {/* Following */}
      <div className="text-center group hover:bg-gray-50 rounded-lg p-4 transition-colors duration-200">
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-gray-900">{formatNumber(following)}</div>
            <div className="text-sm font-medium text-gray-600">Following</div>
          </div>
        </div>
      </div>
      
      {/* Likes */}
      <div className="text-center group hover:bg-gray-50 rounded-lg p-4 transition-colors duration-200">
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
              <Heart className="h-6 w-6 text-red-600 fill-current" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-gray-900">{formatNumber(likes)}</div>
            <div className="text-sm font-medium text-gray-600">Likes</div>
          </div>
        </div>
      </div>
      
      {/* Experience */}
      <div className="text-center group hover:bg-gray-50 rounded-lg p-4 transition-colors duration-200">
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-200">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-gray-900">{experience}</div>
            <div className="text-sm font-medium text-gray-600">Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
};