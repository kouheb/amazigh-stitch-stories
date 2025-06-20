
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: {
    name: string;
    title: string;
    location: string;
    website: string;
    bio: string;
    avatar?: string;
    coverImage?: string;
  };
  onSave?: (updatedData: any) => void;
}

export const EditProfileModal = ({ isOpen, onClose, profileData, onSave }: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    name: profileData.name,
    title: profileData.title,
    location: profileData.location,
    website: profileData.website,
    bio: profileData.bio,
    avatar: profileData.avatar || "",
    coverImage: profileData.coverImage || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (field: string, imageUrl: string | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: imageUrl || ""
    }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", formData);
    if (onSave) {
      onSave(formData);
    }
    toast.success("Profile updated successfully!");
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      name: profileData.name,
      title: profileData.title,
      location: profileData.location,
      website: profileData.website,
      bio: profileData.bio,
      avatar: profileData.avatar || "",
      coverImage: profileData.coverImage || "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information and images
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Profile Images Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Profile Picture</Label>
                <div className="mt-2">
                  <ImageUpload 
                    currentImage={formData.avatar}
                    onImageChange={(imageUrl) => handleImageChange('avatar', imageUrl)}
                    size="md"
                  />
                </div>
              </div>
              
              <div>
                <Label>Cover Image</Label>
                <div className="mt-2">
                  <ImageUpload 
                    currentImage={formData.coverImage}
                    onImageChange={(imageUrl) => handleImageChange('coverImage', imageUrl)}
                    size="lg"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="mt-1 min-h-[120px]"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
