
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface ProfileImageUploadProps {
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
}

export const ProfileImageUpload = ({ profileImage, setProfileImage }: ProfileImageUploadProps) => {
  return (
    <div className="text-center">
      <div className="relative inline-block">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-red-100 border-4 border-orange-200 flex items-center justify-center mx-auto mb-4">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <Camera className="h-12 w-12 text-orange-400" />
          )}
        </div>
        <Button variant="outline" size="sm" className="absolute bottom-0 right-0">
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-gray-600">Upload your profile photo</p>
    </div>
  );
};
