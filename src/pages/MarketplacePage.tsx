
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock,
  DollarSign,
  Heart,
  MessageCircle
} from "lucide-react";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { BookingModal } from "@/components/marketplace/BookingModal";

export const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const categories = [
    { id: "all", name: "All Services", count: 127 },
    { id: "embroidery", name: "Embroidery", count: 45 },
    { id: "beading", name: "Beading", count: 32 },
    { id: "weaving", name: "Weaving", count: 28 },
    { id: "jewelry", name: "Jewelry Making", count: 22 }
  ];

  const services = [
    {
      id: "1",
      title: "Custom Zardozi Wedding Dress Embroidery",
      artisan: {
        name: "Fatima El Mansouri",
        avatar: "/api/placeholder/40/40",
        rating: 4.9,
        reviews: 156,
        verified: true
      },
      price: { min: 300, max: 800 },
      duration: "2-4 weeks",
      category: "embroidery",
      featured: true,
      images: ["/api/placeholder/300/200"],
      description: "Exquisite traditional Zardozi embroidery for special occasions",
      location: "Casablanca, Morocco",
      skills: ["Zardozi", "Gold Thread", "Traditional Patterns"],
      availability: "Available"
    },
    {
      id: "2",
      title: "Modern Beadwork & Jewelry Design",
      artisan: {
        name: "Zahra Oudghiri",
        avatar: "/api/placeholder/40/40",
        rating: 4.8,
        reviews: 89,
        verified: true
      },
      price: { min: 80, max: 250 },
      duration: "1-2 weeks",
      category: "beading",
      featured: false,
      images: ["/api/placeholder/300/200"],
      description: "Contemporary beadwork combining traditional techniques with modern aesthetics",
      location: "Rabat, Morocco",
      skills: ["Beadwork", "Jewelry", "Contemporary Design"],
      availability: "Busy until next month"
    },
    {
      id: "3",
      title: "Traditional Berber Carpet Weaving",
      artisan: {
        name: "Ahmed Benali",
        avatar: "/api/placeholder/40/40",
        rating: 4.7,
        reviews: 203,
        verified: true
      },
      price: { min: 500, max: 1200 },
      duration: "1-3 months",
      category: "weaving",
      featured: true,
      images: ["/api/placeholder/300/200"],
      description: "Authentic Berber carpets woven using ancestral techniques",
      location: "Marrakech, Morocco",
      skills: ["Carpet Weaving", "Traditional Patterns", "Natural Dyes"],
      availability: "Available"
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.artisan.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookService = (service: any) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Services Marketplace</h1>
          <p className="text-gray-600">Discover and book authentic artisan services</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for services, artisans, or techniques..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.name}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredServices.length} services found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={() => handleBookService(service)}
              onMessage={() => console.log("Message artisan")}
              onFavorite={() => console.log("Add to favorites")}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No services found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          service={selectedService}
        />
      )}
    </div>
  );
};
