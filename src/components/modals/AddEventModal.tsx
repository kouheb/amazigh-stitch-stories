import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: any) => void;
  selectedDate?: Date;
}

export const AddEventModal = ({ isOpen, onClose, onAddEvent, selectedDate }: AddEventModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: selectedDate ? selectedDate.toISOString().split('T')[0] : "",
    time: "",
    location: "",
    category: "",
    price: "",
    organizer: ""
  });

  const categories = [
    { value: "workshop", label: "Workshop" },
    { value: "cultural", label: "Cultural" },
    { value: "exhibition", label: "Exhibition" },
    { value: "market", label: "Market" },
    { value: "networking", label: "Networking" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.location || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to create an event.",
        variant: "destructive",
      });
      return;
    }

    try {
      const dateTimeStr = `${formData.date}T${formData.time ? formData.time : "00:00"}:00`;
      const date_time = new Date(dateTimeStr).toISOString();

      const { data, error } = await supabase
        .from("events")
        .insert({
          title: formData.title,
          description: formData.description || null,
          date_time,
          location: formData.location,
          category: formData.category,
          max_attendees: null,
          price: formData.price || "Free",
          organizer: formData.organizer || "Community",
          tags: [formData.category.charAt(0).toUpperCase() + formData.category.slice(1)],
          created_by: user.id,
        })
        .select("*")
        .single();

      if (error) throw error;

      const created = data!;

      const newEvent = {
        id: created.id,
        title: created.title,
        description: created.description,
        date: new Date(created.date_time).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        time: formData.time,
        location: created.location,
        category: created.category,
        price: created.price || "Free",
        organizer: created.organizer || "Community",
        attendees: created.current_attendees || 0,
        image: getCategoryEmoji(created.category),
        tags: created.tags || [formData.category.charAt(0).toUpperCase() + formData.category.slice(1)],
      };

      onAddEvent(newEvent);

      toast({
        title: "Event Created",
        description: "Your event has been successfully added.",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
        price: "",
        organizer: "",
      });

      onClose();
    } catch (err: any) {
      console.error("Error creating event:", err);
      toast({
        title: "Failed to create event",
        description: err?.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      workshop: "🛠️",
      cultural: "🎭", 
      exhibition: "🖼️",
      market: "🛍️",
      networking: "🤝"
    };
    return emojis[category] || "📅";
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Title */}
            <div className="md:col-span-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
              />
            </div>

            {/* Time */}
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                placeholder="e.g. 2:00 PM - 6:00 PM"
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Enter event location"
                required
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="e.g. $25 or Free"
              />
            </div>

            {/* Organizer */}
            <div>
              <Label htmlFor="organizer">Organizer</Label>
              <Input
                id="organizer"
                value={formData.organizer}
                onChange={(e) => handleInputChange("organizer", e.target.value)}
                placeholder="Event organizer"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter event description"
              rows={3}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-black hover:bg-gray-800">
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};