
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ProfileImageUploadProps {
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
}

export const ProfileImageUpload = ({ profileImage, setProfileImage }: ProfileImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfileImage(imageUrl);
        toast.success("Image uploaded successfully!");
        setIsUploading(false);
      };
      reader.onerror = () => {
        toast.error("Failed to read image file");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success("Image removed");
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center">
      <div className="relative inline-block">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-red-100 border-4 border-orange-200 flex items-center justify-center mx-auto mb-4 overflow-hidden">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616c163f505?w=128&h=128&fit=crop&crop=face" 
                alt="Default Profile" 
                className="w-full h-full rounded-full object-cover opacity-50"
              />
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 right-0 flex gap-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 bg-white shadow-md"
            onClick={handleUploadClick}
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
          </Button>
          
          {profileImage && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0 bg-white shadow-md text-red-600 hover:text-red-700"
              onClick={handleRemoveImage}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <p className="text-sm text-gray-600">
        {isUploading ? "Uploading..." : "Upload your profile photo"}
      </p>
    </div>
  );
};
