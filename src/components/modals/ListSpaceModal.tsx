
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Clock,
  Camera,
  Wifi,
  Car,
  Coffee,
  Palette,
  Lightbulb
} from "lucide-react";

interface ListSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpaceListed?: (space: any) => void;
}

export const ListSpaceModal = ({ isOpen, onClose, onSpaceListed }: ListSpaceModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    pricePerHour: "",
    pricePerMonth: "",
    description: "",
    amenities: [] as string[]
  });

  const spaceTypes = [
    "Embroidery Workshop",
    "Beading Studio",
    "Weaving Room",
    "Pottery Studio",
    "Art Studio",
    "Shared Creative Space",
    "Teaching Studio",
    "Photography Studio"
  ];

  const availableAmenities = [
    { id: "wifi", name: "WiFi", icon: Wifi },
    { id: "parking", name: "Parking", icon: Car },
    { id: "coffee", name: "Coffee/Tea", icon: Coffee },
    { id: "equipment", name: "Equipment Included", icon: Palette },
    { id: "lighting", name: "Professional Lighting", icon: Lightbulb },
    { id: "camera", name: "Photography Setup", icon: Camera }
  ];

  const handleAmenityToggle = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Space listing submitted:", formData);
    onSpaceListed?.(formData);
    onClose();
    setFormData({
      name: "",
      type: "",
      location: "",
      pricePerHour: "",
      pricePerMonth: "",
      description: "",
      amenities: []
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Building className="h-6 w-6 text-orange-600" />
            List Your Creative Space
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Benefits Section */}
          <Card className="p-4 bg-orange-50 border-orange-200">
            <h3 className="font-semibold text-orange-800 mb-2">Why list with us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 text-orange-700">
                <DollarSign className="h-4 w-4" />
                <span>Earn extra income</span>
              </div>
              <div className="flex items-center gap-2 text-orange-700">
                <Building className="h-4 w-4" />
                <span>Easy management</span>
              </div>
              <div className="flex items-center gap-2 text-orange-700">
                <Clock className="h-4 w-4" />
                <span>Flexible scheduling</span>
              </div>
            </div>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Space Name</label>
                <Input
                  placeholder="e.g., Creative Loft Studio"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Space Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  required
                >
                  <option value="">Select type...</option>
                  {spaceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location
              </label>
              <Input
                placeholder="e.g., Downtown Arts District, Casablanca"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                required
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price per Hour ($)</label>
                <Input
                  type="number"
                  placeholder="25"
                  value={formData.pricePerHour}
                  onChange={(e) => setFormData(prev => ({ ...prev, pricePerHour: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price per Month ($)</label>
                <Input
                  type="number"
                  placeholder="300"
                  value={formData.pricePerMonth}
                  onChange={(e) => setFormData(prev => ({ ...prev, pricePerMonth: e.target.value }))}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
                placeholder="Describe your space, what makes it special, and what activities it's perfect for..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium mb-2">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableAmenities.map((amenity) => {
                  const Icon = amenity.icon;
                  const isSelected = formData.amenities.includes(amenity.id);
                  return (
                    <Button
                      key={amenity.id}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAmenityToggle(amenity.id)}
                      className={`justify-start ${
                        isSelected 
                          ? 'bg-orange-100 border-orange-300 text-orange-700' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {amenity.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
                List My Space
              </Button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
            <p className="font-medium mb-1">Next steps:</p>
            <ul className="space-y-1 text-xs">
              <li>• We'll review your listing within 24 hours</li>
              <li>• Add photos and detailed descriptions to attract more bookings</li>
              <li>• Set your availability calendar once approved</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
