
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Heart, 
  MessageSquare, 
  Share, 
  Eye, 
  Download,
  Filter,
  Grid3X3,
  List,
  Plus
} from "lucide-react";

interface PortfolioGalleryProps {
  isOwnProfile: boolean;
}

export const PortfolioGallery = ({ isOwnProfile }: PortfolioGalleryProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const portfolioItems = [
    {
      id: 1,
      title: "Traditional Kaftan Collection",
      category: "Fashion Design",
      image: "👘",
      likes: 234,
      views: 1560,
      comments: 45,
      description: "Modern interpretation of traditional Amazigh kaftan with intricate Zardozi embroidery",
      tags: ["Traditional", "Kaftan", "Zardozi", "Fashion"],
      date: "March 2024"
    },
    {
      id: 2,
      title: "Berber Jewelry Redesign",
      category: "Jewelry Design",
      image: "💍",
      likes: 189,
      views: 890,
      comments: 23,
      description: "Contemporary take on traditional Berber silver jewelry",
      tags: ["Jewelry", "Silver", "Contemporary", "Berber"],
      date: "February 2024"
    },
    {
      id: 3,
      title: "Textile Pattern Study",
      category: "Research",
      image: "🧵",
      likes: 156,
      views: 670,
      comments: 18,
      description: "Documentation of traditional weaving patterns from the Atlas Mountains",
      tags: ["Research", "Patterns", "Weaving", "Documentation"],
      date: "January 2024"
    },
    {
      id: 4,
      title: "Sustainable Fashion Line",
      category: "Fashion Design",
      image: "🌱",
      likes: 298,
      views: 2100,
      comments: 67,
      description: "Eco-friendly fashion collection using organic dyes and traditional techniques",
      tags: ["Sustainable", "Organic", "Fashion", "Eco-friendly"],
      date: "December 2023"
    }
  ];

  const categories = ["all", "Fashion Design", "Jewelry Design", "Research", "Textiles"];

  const filteredItems = selectedCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Portfolio</h2>
          <p className="text-gray-600">{portfolioItems.length} works showcasing traditional and contemporary designs</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Category Filter */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-orange-600 hover:bg-orange-700" : ""}
              >
                {category === "all" ? "All" : category}
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {isOwnProfile && (
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Work
            </Button>
          )}
        </div>
      </div>

      {/* Portfolio Grid/List */}
      <div className={viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-6"
      }>
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {viewMode === "grid" ? (
              <>
                <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-6xl">
                  {item.image}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{item.category}</Badge>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {item.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {item.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {item.comments}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-4 flex gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  {item.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.category}</Badge>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {item.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {item.views}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Card>
  );
};
