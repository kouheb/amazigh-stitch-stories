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
  Building,
  SlidersHorizontal,
  Grid3X3,
  List
} from "lucide-react";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { BookingModal } from "@/components/marketplace/BookingModal";
import { ListSpaceModal } from "@/components/modals/ListSpaceModal";
import { useLanguage } from "@/contexts/LanguageContext";

export const MarketplacePage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isListSpaceModalOpen, setIsListSpaceModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "all", name: t('marketplace.allServices'), count: 0 },
    { id: "embroidery", name: "Embroidery", count: 0 },
    { id: "beading", name: "Beading", count: 0 },
    { id: "weaving", name: "Weaving", count: 0 },
    { id: "jewelry", name: "Jewelry Making", count: 0 }
  ];

  const services: any[] = [];

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

  const handleSpaceListed = (space: any) => {
    console.log("New space listed:", space);
    setIsListSpaceModalOpen(false);
  };

  const handleFavorite = (serviceId: string) => {
    console.log("Added to favorites:", serviceId);
  };

  const handleMessage = (serviceId: string) => {
    console.log("Message artisan:", serviceId);
  };

  const handleListSpaceClick = () => {
    console.log("Opening List Space Modal");
    setIsListSpaceModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('marketplace.title')}</h1>
              <p className="text-gray-600">{t('marketplace.subtitle')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button 
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={handleListSpaceClick}
              >
                <Building className="h-4 w-4 mr-2" />
                {t('marketplace.listYourSpace')}
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder={t('marketplace.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {t('marketplace.filters')}
              </Button>
              
              <div className="flex border border-gray-300 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 ${
                  selectedCategory === category.id 
                    ? "bg-black hover:bg-gray-800 text-white" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
                <Badge variant="secondary" className="ml-1 bg-gray-200 text-gray-700">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="p-6 mb-6 bg-white border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Under $100</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>$100 - $500</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>$500+</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Available Now</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Within 1 Week</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Within 1 Month</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="flex items-center gap-1">
                      4.5+ <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    </span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="flex items-center gap-1">
                      4.0+ <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredServices.length} {t('marketplace.servicesFound')}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Sort by:</span>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:border-gray-500 focus:ring-gray-500">
              <option>Most Relevant</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
              <option>Most Recent</option>
            </select>
          </div>
        </div>

        {/* Services Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={() => handleBookService(service)}
              onMessage={() => handleMessage(service.id)}
              onFavorite={() => handleFavorite(service.id)}
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
            <p className="text-gray-600 mb-4">
              {t('marketplace.noServicesDesc')}
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Clear Filters
            </Button>
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

      {/* List Space Modal */}
      <ListSpaceModal
        isOpen={isListSpaceModalOpen}
        onClose={() => setIsListSpaceModalOpen(false)}
        onSpaceListed={handleSpaceListed}
      />
    </div>
  );
};
