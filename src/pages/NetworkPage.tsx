
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Star, 
  Filter,
  Users,
  MessageCircle,
  Eye
} from "lucide-react";

export const NetworkPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const artisans = [
    {
      id: 1,
      name: "Fatima Al-Zahra",
      skill: "Traditional Embroidery",
      location: "Fez, Morocco",
      rating: 4.9,
      reviews: 127,
      image: "FA",
      isOnline: true,
      description: "Master of Moroccan embroidery with 15+ years experience",
      specialties: ["Zardozi", "Goldwork", "Silk Threading"]
    },
    {
      id: 2,
      name: "Ahmed Ben Ali",
      skill: "Leather Crafting",
      location: "Marrakech, Morocco",
      rating: 4.8,
      reviews: 89,
      image: "AB",
      isOnline: false,
      description: "Traditional leather artisan specializing in bags and accessories",
      specialties: ["Handbags", "Belts", "Decorative Items"]
    },
    {
      id: 3,
      name: "Yasmin Berber",
      skill: "Ceramic Arts",
      location: "Tunis, Tunisia",
      rating: 5.0,
      reviews: 203,
      image: "YB",
      isOnline: true,
      description: "Contemporary ceramic artist blending traditional and modern techniques",
      specialties: ["Pottery", "Glazing", "Sculptural Ceramics"]
    },
    {
      id: 4,
      name: "Omar Tuareg",
      skill: "Silver Jewelry",
      location: "Algiers, Algeria",
      rating: 4.7,
      reviews: 156,
      image: "OT",
      isOnline: true,
      description: "Traditional Tuareg silversmith creating authentic jewelry pieces",
      specialties: ["Rings", "Necklaces", "Bracelets"]
    }
  ];

  const filterOptions = [
    { value: "all", label: "All Artisans" },
    { value: "embroidery", label: "Embroidery" },
    { value: "seamstress", label: "Seamstress" },
    { value: "leather", label: "Leather Work" },
    { value: "ceramics", label: "Ceramics" },
    { value: "jewelry", label: "Jewelry" },
    { value: "textiles", label: "Textiles" },
    { value: "artist", label: "Artist" },
    { value: "abstract-art", label: "Abstract Art" },
    { value: "fashion-design", label: "Fashion Design" },
    { value: "weaving", label: "Weaving" },
    { value: "pottery", label: "Pottery" },
    { value: "metalwork", label: "Metalwork" },
    { value: "woodwork", label: "Woodwork" },
    { value: "glasswork", label: "Glasswork" },
    { value: "painting", label: "Painting" },
    { value: "sculpture", label: "Sculpture" },
    { value: "calligraphy", label: "Calligraphy" },
    { value: "textile-art", label: "Textile Art" },
    { value: "digital-art", label: "Digital Art" }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Discover Artisans</h1>
          <p className="text-gray-600 mt-1">Connect with talented craftspeople from around the world</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search artisans, skills, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-400 focus:border-black focus:ring-gray-500"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-400 text-gray-600 hover:bg-gray-100">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <select 
              className="px-3 py-2 border border-gray-400 rounded-md text-sm focus:border-black focus:ring-gray-500 bg-white z-10"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{artisans.length} artisans found</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-gray-400 text-gray-600 hover:bg-gray-100">Grid</Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">List</Button>
        </div>
      </div>

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artisans.map((artisan) => (
          <Card key={artisan.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-gray-300 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-black rounded-full flex items-center justify-center text-white font-medium">
                    {artisan.image}
                  </div>
                  {artisan.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-black">{artisan.name}</h3>
                  <p className="text-sm text-gray-600">{artisan.skill}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {artisan.location}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gray-400 text-gray-400" />
                  <span className="font-medium">{artisan.rating}</span>
                  <span className="text-sm text-gray-600">({artisan.reviews})</span>
                </div>
              </div>

              <p className="text-sm text-gray-700">{artisan.description}</p>

              <div className="flex flex-wrap gap-1">
                {artisan.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-gray-200 text-gray-800">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-4">
                <Button size="sm" className="flex-1 bg-black hover:bg-gray-800 text-white">
                  <Users className="h-4 w-4 mr-1" />
                  Connect
                </Button>
                <Button size="sm" variant="outline" className="border-gray-400 text-gray-600 hover:bg-gray-100">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="outline" className="border-gray-400 text-gray-600 hover:bg-gray-100">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
