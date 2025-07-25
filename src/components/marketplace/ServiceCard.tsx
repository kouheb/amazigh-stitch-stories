
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  MapPin, 
  Clock,
  DollarSign,
  Heart,
  MessageCircle,
  Shield
} from "lucide-react";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    artisan: {
      name: string;
      avatar: string;
      rating: number;
      reviews: number;
      verified: boolean;
    };
    price: { min: number; max: number };
    duration: string;
    category: string;
    featured: boolean;
    images: string[];
    description: string;
    location: string;
    skills: string[];
    availability: string;
  };
  onBook: () => void;
  onMessage: () => void;
  onFavorite: () => void;
}

export const ServiceCard = ({ service, onBook, onMessage, onFavorite }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-gray-200 bg-white">
      {/* Service Image */}
      <div className="relative">
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <img 
            src={service.images[0]} 
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onFavorite}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 shadow-sm"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {service.title}
        </h3>

        {/* Artisan Info */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={service.artisan.avatar} />
            <AvatarFallback className="bg-gray-200 text-gray-700">
              {service.artisan.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-900">{service.artisan.name}</span>
              {service.artisan.verified && (
                <Shield className="h-3 w-3 text-blue-600" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{service.artisan.rating}</span>
              <span>({service.artisan.reviews})</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {service.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
              {skill}
            </Badge>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {service.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span>${service.price.min} - ${service.price.max}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{service.duration}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{service.location}</span>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <Badge 
            variant={service.availability === "Available" ? "default" : "secondary"}
            className={
              service.availability === "Available" 
                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          >
            {service.availability}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            onClick={onBook}
            className="flex-1 bg-black hover:bg-gray-800 text-white disabled:bg-gray-300 disabled:text-gray-500"
            disabled={service.availability !== "Available"}
          >
            Book Now
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onMessage}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
