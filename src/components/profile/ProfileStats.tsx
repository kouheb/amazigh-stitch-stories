
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-gray-200">
      {/* Followers */}
      <div className="text-center group hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-2xl font-bold text-gray-900 mb-1">{formatNumber(followers)}</div>
          <div className="relative">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="text-sm font-medium text-gray-600 mt-1">Followers</div>
        </div>
      </div>
      
      {/* Following */}
      <div className="text-center group hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-2xl font-bold text-gray-900 mb-1">{formatNumber(following)}</div>
          <div className="relative">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
              <Users className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="text-sm font-medium text-gray-600 mt-1">Following</div>
        </div>
      </div>
      
      {/* Likes */}
      <div className="text-center group hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-2xl font-bold text-gray-900 mb-1">{formatNumber(likes)}</div>
          <div className="relative">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
              <Heart className="h-5 w-5 text-red-600 fill-current" />
            </div>
          </div>
          <div className="text-sm font-medium text-gray-600 mt-1">Likes</div>
        </div>
      </div>
      
      {/* Experience */}
      <div className="text-center group hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-lg font-bold text-gray-900 mb-1">{experience}</div>
          <div className="relative">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-200">
              <Award className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <div className="text-sm font-medium text-gray-600 mt-1">Experience</div>
        </div>
      </div>
    </div>
  );
};
