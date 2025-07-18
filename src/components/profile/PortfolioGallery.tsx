
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddWorkModal } from "@/components/modals/AddWorkModal";
import { WorkDetailModal } from "./WorkDetailModal";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
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

interface WorkItem {
  id: string;
  title: string;
  category: string;
  image: string;
  likes: number;
  views: number;
  comments: number;
  description: string;
  tags: string[];
  date: string;
}

interface PortfolioGalleryProps {
  isOwnProfile: boolean;
  userId?: string;
}

export const PortfolioGallery = ({ isOwnProfile, userId }: PortfolioGalleryProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddWorkModalOpen, setIsAddWorkModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [isWorkDetailModalOpen, setIsWorkDetailModalOpen] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Get the user ID to query (either passed prop or current user)
  const targetUserId = userId || user?.id;

  // Load portfolio items from database
  useEffect(() => {
    const loadPortfolioItems = async () => {
      if (!targetUserId) return;

      try {
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('user_id', targetUserId)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading portfolio items:', error);
          return;
        }

        if (data) {
          const formattedItems: WorkItem[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            image: item.image_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
            likes: item.likes,
            views: item.views,
            comments: item.comments,
            description: item.description || '',
            tags: item.tags || [],
            date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          }));
          setPortfolioItems(formattedItems);
        }
      } catch (error) {
        console.error('Error loading portfolio items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioItems();
  }, [targetUserId]);

  const categories = ["all", "Fashion Design", "Jewelry Design", "Research", "Textiles", "Traditional Crafts", "Contemporary Design"];

  const filteredItems = selectedCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const handleWorkAdded = async (newWork: any) => {
    if (!user?.id) return;

    try {
      // Insert into database
      const { data, error } = await supabase
        .from('portfolio_items')
        .insert({
          user_id: user.id,
          title: newWork.title,
          category: newWork.category,
          description: newWork.description,
          image_url: newWork.thumbnail || newWork.image,
          tags: newWork.tags || []
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding portfolio item:', error);
        return;
      }

      // Add to local state
      const portfolioWork: WorkItem = {
        id: data.id,
        title: data.title,
        category: data.category,
        image: data.image_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        likes: data.likes,
        views: data.views,
        comments: data.comments,
        description: data.description || '',
        tags: data.tags || [],
        date: new Date(data.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };
      setPortfolioItems(prev => [portfolioWork, ...prev]);
    } catch (error) {
      console.error('Error adding portfolio item:', error);
    }
  };

  const handleWorkClick = (item: WorkItem) => {
    setSelectedWork({
      ...item,
      thumbnail: item.image,
      type: "project"
    });
    setIsWorkDetailModalOpen(true);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Portfolio</h2>
            <p className="text-gray-600">
              {portfolioItems.length === 0 
                ? "No portfolio items yet" 
                : `${portfolioItems.length} works showcasing traditional and contemporary designs`
              }
            </p>
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
              <Button 
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => setIsAddWorkModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Work
              </Button>
            )}
          </div>
        </div>

        {/* Portfolio Grid/List */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Upload className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              {isOwnProfile ? "No portfolio items yet" : "No portfolio items to display"}
            </h3>
            <p className="text-gray-500 mb-6">
              {isOwnProfile 
                ? "Start building your portfolio by adding your first work" 
                : "This user hasn't added any portfolio items yet"
              }
            </p>
            {isOwnProfile && (
              <Button 
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => setIsAddWorkModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Work
              </Button>
            )}
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-6"
          }>
            {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleWorkClick(item)}
            >
              {viewMode === "grid" ? (
                <>
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
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
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
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
        )}
      </Card>

      <AddWorkModal 
        isOpen={isAddWorkModalOpen}
        onClose={() => setIsAddWorkModalOpen(false)}
        onWorkAdded={handleWorkAdded}
      />

      <WorkDetailModal
        isOpen={isWorkDetailModalOpen}
        onClose={() => {
          setIsWorkDetailModalOpen(false);
          setSelectedWork(null);
        }}
        work={selectedWork}
      />
    </>
  );
};
