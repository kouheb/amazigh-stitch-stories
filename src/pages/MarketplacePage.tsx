
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
  MessageCircle,
  Plus,
  Building
} from "lucide-react";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { BookingModal } from "@/components/marketplace/BookingModal";
import { AddWorkModal } from "@/components/modals/AddWorkModal";
import { ListSpaceModal } from "@/components/modals/ListSpaceModal";
import { useLanguage } from "@/contexts/LanguageContext";

export const MarketplacePage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAddWorkModalOpen, setIsAddWorkModalOpen] = useState(false);
  const [isListSpaceModalOpen, setIsListSpaceModalOpen] = useState(false);

  const categories = [
    { id: "all", name: t('marketplace.allServices'), count: 127 },
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
      description: "Exquisite traditional Z ardozi embroidery for special occasions",
      location: "Casablanca, Morocco",
      skills: ["Zardozi", "Gold Thread", "Traditional Patterns"],
      availability: t('status.available')
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
      availability: t('status.busy')
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
      availability: t('status.available')
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

  const handleWorkAdded = (work: any) => {
    console.log("New work added:", work);
    // You can add logic here to update the services list or refresh data
  };

  const handleSpaceListed = (space: any) => {
    console.log("New space listed:", space);
    // You can add logic here to handle the new space listing
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('marketplace.title')}</h1>
              <p className="text-gray-600">{t('marketplace.subtitle')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => setIsAddWorkModalOpen(true)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('marketplace.addNewWork')}
              </Button>
              <Button 
                variant="outline"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
                onClick={() => setIsListSpaceModalOpen(true)}
              >
                <Building className="h-4 w-4 mr-2" />
                {t('marketplace.listYourSpace')}
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder={t('marketplace.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {t('marketplace.filters')}
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
            {filteredServices.length} {t('marketplace.servicesFound')}
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
              {t('marketplace.noServicesTitle')}
            </h3>
            <p className="text-gray-600">
              {t('marketplace.noServicesDesc')}
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

      {/* Add Work Modal */}
      <AddWorkModal
        isOpen={isAddWorkModalOpen}
        onClose={() => setIsAddWorkModalOpen(false)}
        onWorkAdded={handleWorkAdded}
      />

      {/* List Space Modal */}
      <ListSpaceModal
        isOpen={isListSpaceModalOpen}
        onClose={() => setIsListSpaceModalOpen(false)}
        onSpaceListed={handleSpaceListed}
      />
    </div>
  );
};
