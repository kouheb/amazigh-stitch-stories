import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddWorkModal } from "@/components/modals/AddWorkModal";
import { WorkDetailModal } from "./WorkDetailModal";
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
  id: number;
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
}

export const WorkShowcase = ({ isOwnProfile }: WorkShowcaseProps) => {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState("featured");
  const [isAddWorkModalOpen, setIsAddWorkModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [isWorkDetailModalOpen, setIsWorkDetailModalOpen] = useState(false);

  const initialShowcaseItems = {
    featured: [
      {
        id: 1,
        type: "video",
        title: "Zardozi Embroidery Process",
        description: "Step-by-step demonstration of traditional Zardozi techniques",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        duration: "12:34",
        views: 2500,
        likes: 189,
        date: "March 2024"
      },
      {
        id: 2,
        type: "image",
        title: "Award-Winning Kaftan Design",
        description: "Winner of the 2023 Amazigh Fashion Heritage Award",
        thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop",
        views: 1800,
        likes: 234,
        date: "November 2023"
      }
    ],
    videos: [
      {
        id: 1,
        type: "video",
        title: "Zardozi Embroidery Process",
        description: "Step-by-step demonstration of traditional Zardozi techniques",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        duration: "12:34",
        views: 2500,
        likes: 189,
        date: "March 2024"
      },
      {
        id: 3,
        type: "video",
        title: "Traditional Pattern Making",
        description: "Creating geometric patterns inspired by Berber art",
        thumbnail: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
        duration: "8:42",
        views: 1200,
        likes: 145,
        date: "February 2024"
      },
      {
        id: 4,
        type: "video",
        title: "Sustainable Dyeing Workshop",
        description: "Natural dye extraction and application techniques",
        thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
        duration: "15:21",
        views: 980,
        likes: 87,
        date: "January 2024"
      }
    ],
    projects: [
      {
        id: 2,
        type: "project",
        title: "Award-Winning Kaftan Design",
        description: "Winner of the 2023 Amazigh Fashion Heritage Award",
        thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop",
        views: 1800,
        likes: 234,
        date: "November 2023",
        status: "Completed",
        client: "Heritage Fashion Show"
      },
      {
        id: 5,
        type: "project",
        title: "Berber Textile Documentation",
        description: "Comprehensive study of traditional weaving patterns",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        views: 650,
        likes: 92,
        date: "December 2023",
        status: "Ongoing",
        client: "Cultural Heritage Foundation"
      }
    ],
    achievements: [
      {
        id: 6,
        type: "award",
        title: "Amazigh Heritage Preservation Award",
        description: "Recognized for outstanding contribution to preserving traditional crafts",
        thumbnail: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop",
        date: "November 2023",
        organization: "Amazigh Cultural Foundation"
      },
      {
        id: 7,
        type: "certification",
        title: "Master Artisan Certificate",
        description: "Certified master in traditional Zardozi embroidery",
        thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
        date: "June 2022",
        organization: "Ministry of Handicrafts"
      }
    ]
  };

  const [showcaseItems, setShowcaseItems] = useState(initialShowcaseItems);

  const handleWorkAdded = (newWork: any) => {
    setShowcaseItems(prev => {
      const newItems = { ...prev };
      
      // Add to featured
      const featuredItem = {
        ...newWork,
        views: newWork.views || 0,
        likes: newWork.likes || 0
      };
      newItems.featured = [featuredItem, ...prev.featured];
      
      // Add to appropriate category based on type
      if (newWork.type === "video") {
        const videoItem = {
          ...newWork,
          duration: newWork.duration || "0:00",
          views: newWork.views || 0,
          likes: newWork.likes || 0
        };
        newItems.videos = [videoItem, ...prev.videos];
      } else if (newWork.type === "project" || newWork.type === "image") {
        const projectItem = {
          ...newWork,
          status: newWork.status || "Completed",
          client: newWork.client || "Personal Project",
          views: newWork.views || 0,
          likes: newWork.likes || 0
        };
        newItems.projects = [projectItem, ...prev.projects];
      } else if (newWork.type === "award") {
        const achievementItem = {
          ...newWork,
          organization: newWork.organization || "Unknown Organization"
        };
        newItems.achievements = [achievementItem, ...prev.achievements];
      }
      
      return newItems;
    });
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showcaseItems.featured.map(renderShowcaseItem)}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showcaseItems.videos.map(renderShowcaseItem)}
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {showcaseItems.projects.map(renderShowcaseItem)}
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showcaseItems.achievements.map(renderShowcaseItem)}
            </div>
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
