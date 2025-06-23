
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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
    phone?: string;
  };
  onSave?: (updatedData: any) => void;
}

export const EditProfileModal = ({ isOpen, onClose, profileData, onSave }: EditProfileModalProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: profileData.name,
    title: profileData.title,
    location: profileData.location,
    website: profileData.website,
    bio: profileData.bio,
    avatar: profileData.avatar || "",
    coverImage: profileData.coverImage || "",
    phone: profileData.phone || "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSave = async () => {
    if (!user) {
      toast.error("No user logged in");
      return;
    }

    setIsLoading(true);
    console.log("Saving profile data:", formData);

    try {
      // Update user metadata in Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          display_name: formData.name,
          full_name: formData.name,
          title: formData.title,
          location: formData.location,
          website: formData.website,
          bio: formData.bio,
          avatar_url: formData.avatar,
          phone: formData.phone,
        }
      });

      if (authError) {
        console.error("Auth update error:", authError);
        toast.error("Failed to update profile");
        return;
      }

      // Update or insert profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.name,
          display_name: formData.name,
          bio: formData.bio,
          avatar_url: formData.avatar,
          region: formData.location,
          website: formData.website,
          email: user.email,
        }, {
          onConflict: 'id'
        });

      if (profileError) {
        console.error("Profile update error:", profileError);
        toast.error("Failed to update profile database");
        return;
      }

      // Call the onSave callback to update local state
      if (onSave) {
        onSave({
          ...formData,
          coverImage: formData.coverImage || profileData.coverImage,
        });
      }

      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
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
      phone: profileData.phone || "",
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1"
              />
            </div>
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
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-orange-600 hover:bg-orange-700"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
