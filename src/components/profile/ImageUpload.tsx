
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string | null) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const ImageUpload = ({ currentImage, onImageChange, className = "", size = "md" }: ImageUploadProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32", 
    lg: "w-48 h-48"
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setPreviewImage(imageUrl);
        onImageChange(imageUrl);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success("Image removed");
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-orange-100 to-red-100 border-4 border-orange-200 flex items-center justify-center overflow-hidden`}>
        {previewImage ? (
          <img 
            src={previewImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <span className="text-xs text-gray-500">No image</span>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 right-0 flex gap-1">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 w-8 p-0 bg-white shadow-md"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
        </Button>
        
        {previewImage && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 bg-white shadow-md text-red-600 hover:text-red-700"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
