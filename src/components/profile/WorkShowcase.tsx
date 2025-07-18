import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddWorkModal } from "@/components/modals/AddWorkModal";
import { WorkDetailModal } from "./WorkDetailModal";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  Play, 
  Image, 
  FileText, 
  Award, 
  Calendar,
  Eye,
  Heart,
  Share,
  Download,
  Plus,
  Filter
} from "lucide-react";

interface ShowcaseItem {
  id: string;
  type: string;
  title: string;
  description: string;
  thumbnail: string;
  duration?: string;
  views?: number;
  likes?: number;
  date: string;
  status?: string;
  client?: string;
  organization?: string;
}

interface WorkShowcaseProps {
  isOwnProfile: boolean;
  userId?: string;
}

export const WorkShowcase = ({ isOwnProfile, userId }: WorkShowcaseProps) => {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState("featured");
  const [isAddWorkModalOpen, setIsAddWorkModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [isWorkDetailModalOpen, setIsWorkDetailModalOpen] = useState(false);
  const [showcaseItems, setShowcaseItems] = useState({
    featured: [] as ShowcaseItem[],
    videos: [] as ShowcaseItem[],
    projects: [] as ShowcaseItem[],
    achievements: [] as ShowcaseItem[]
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Get the user ID to query (either passed prop or current user)
  const targetUserId = userId || user?.id;

  // Load showcase items from database
  useEffect(() => {
    const loadShowcaseItems = async () => {
      if (!targetUserId) return;

      try {
        const { data, error } = await supabase
          .from('showcase_items')
          .select('*')
          .eq('user_id', targetUserId)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading showcase items:', error);
          return;
        }

        if (data) {
          const formattedItems = data.map((item: any) => ({
            id: item.id,
            type: item.type,
            title: item.title,
            description: item.description || '',
            thumbnail: item.thumbnail_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
            duration: item.duration,
            views: item.views,
            likes: item.likes,
            date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            status: item.status,
            client: item.client,
            organization: item.organization
          }));

          // Categorize items
          const categorized = {
            featured: formattedItems.slice(0, 6), // Show latest 6 as featured
            videos: formattedItems.filter((item: ShowcaseItem) => item.type === 'video'),
            projects: formattedItems.filter((item: ShowcaseItem) => ['project', 'image'].includes(item.type)),
            achievements: formattedItems.filter((item: ShowcaseItem) => ['award', 'certification'].includes(item.type))
          };

          setShowcaseItems(categorized);
        }
      } catch (error) {
        console.error('Error loading showcase items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadShowcaseItems();
  }, [targetUserId]);

  const handleWorkAdded = async (newWork: any) => {
    if (!user?.id) return;

    try {
      // Insert into database
      const { data, error } = await supabase
        .from('showcase_items')
        .insert({
          user_id: user.id,
          type: newWork.type,
          title: newWork.title,
          description: newWork.description,
          thumbnail_url: newWork.thumbnail,
          duration: newWork.duration,
          status: newWork.status,
          client: newWork.client,
          organization: newWork.organization
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding showcase item:', error);
        return;
      }

      // Format the new item
      const formattedItem: ShowcaseItem = {
        id: data.id,
        type: data.type,
        title: data.title,
        description: data.description || '',
        thumbnail: data.thumbnail_url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        duration: data.duration,
        views: data.views,
        likes: data.likes,
        date: new Date(data.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        status: data.status,
        client: data.client,
        organization: data.organization
      };

      // Add to local state
      setShowcaseItems(prev => {
        const newItems = { ...prev };
        
        // Add to featured
        newItems.featured = [formattedItem, ...prev.featured.slice(0, 5)]; // Keep only 6 featured items
        
        // Add to appropriate category based on type
        if (formattedItem.type === "video") {
          newItems.videos = [formattedItem, ...prev.videos];
        } else if (formattedItem.type === "project" || formattedItem.type === "image") {
          newItems.projects = [formattedItem, ...prev.projects];
        } else if (formattedItem.type === "award" || formattedItem.type === "certification") {
          newItems.achievements = [formattedItem, ...prev.achievements];
        }
        
        return newItems;
      });
    } catch (error) {
      console.error('Error adding showcase item:', error);
    }
  };

  const handleWorkClick = (item: any) => {
    setSelectedWork(item);
    setIsWorkDetailModalOpen(true);
  };

  const renderShowcaseItem = (item: any) => (
    <Card 
      key={item.id} 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => handleWorkClick(item)}
    >
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <img 
            src={item.thumbnail} 
            alt={item.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur">
              <Play className="h-6 w-6 text-white" />
            </Button>
          </div>
        )}
        {item.duration && (
          <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
            {item.duration}
          </Badge>
        )}
        {item.status && (
          <Badge 
            className={`absolute top-2 left-2 ${
              item.status === "Completed" ? "bg-green-600" : "bg-orange-600"
            }`}
          >
            {item.status}
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        
        {item.client && (
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Client:</span> {item.client}
          </div>
        )}
        
        {item.organization && (
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Organization:</span> {item.organization}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {item.date}
            </div>
            {item.views && (
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {item.views}
              </div>
            )}
            {item.likes && (
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {item.likes}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading showcase...</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Work Showcase</h2>
            <p className="text-gray-600">Featured works, videos, projects, and achievements</p>
          </div>
          {isOwnProfile && (
            <Button 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => setIsAddWorkModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Content
            </Button>
          )}
        </div>

        <Tabs value={activeShowcaseTab} onValueChange={setActiveShowcaseTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="achievements">Awards</TabsTrigger>
          </TabsList>

          <TabsContent value="featured">
            {showcaseItems.featured.length === 0 ? (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No featured items yet</h3>
                <p className="text-gray-500">
                  {isOwnProfile ? "Start by adding some showcase content" : "This user hasn't showcased any work yet"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {showcaseItems.featured.map(renderShowcaseItem)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos">
            {showcaseItems.videos.length === 0 ? (
              <div className="text-center py-12">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No videos yet</h3>
                <p className="text-gray-500">
                  {isOwnProfile ? "Share your video content with your audience" : "This user hasn't shared any videos yet"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {showcaseItems.videos.map(renderShowcaseItem)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="projects">
            {showcaseItems.projects.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No projects yet</h3>
                <p className="text-gray-500">
                  {isOwnProfile ? "Add your projects to showcase your work" : "This user hasn't added any projects yet"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {showcaseItems.projects.map(renderShowcaseItem)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="achievements">
            {showcaseItems.achievements.length === 0 ? (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No achievements yet</h3>
                <p className="text-gray-500">
                  {isOwnProfile ? "Add your awards and certifications" : "This user hasn't shared any achievements yet"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {showcaseItems.achievements.map(renderShowcaseItem)}
              </div>
            )}
          </TabsContent>
        </Tabs>
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
