import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Heart, 
  Eye, 
  Share, 
  Download, 
  Calendar, 
  User, 
  Building2,
  Award
} from "lucide-react";

interface WorkDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  work: {
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
    tags?: string[];
    category?: string;
    comments?: number;
  } | null;
}

export const WorkDetailModal = ({ isOpen, onClose, work }: WorkDetailModalProps) => {
  if (!work) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{work.title}</DialogTitle>
          <DialogDescription>
            {work.category || work.type} • {work.date}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Main Image/Video */}
          <div className="relative">
            <div className="h-64 md:h-96 w-full rounded-lg overflow-hidden">
              <img 
                src={work.thumbnail} 
                alt={work.title}
                className="w-full h-full object-cover"
              />
            </div>
            {work.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur">
                  <Play className="h-8 w-8 text-white" />
                </Button>
              </div>
            )}
            {work.duration && (
              <Badge className="absolute bottom-4 right-4 bg-black/70 text-white">
                {work.duration}
              </Badge>
            )}
            {work.status && (
              <Badge 
                className={`absolute top-4 left-4 ${
                  work.status === "Completed" ? "bg-green-600" : "bg-orange-600"
                }`}
              >
                {work.status}
              </Badge>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{work.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stats */}
            <div>
              <h4 className="font-semibold mb-3">Statistics</h4>
              <div className="space-y-2">
                {work.views && (
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span>{work.views.toLocaleString()} views</span>
                  </div>
                )}
                {work.likes && (
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{work.likes.toLocaleString()} likes</span>
                  </div>
                )}
                {work.comments && (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 text-gray-500">💬</span>
                    <span>{work.comments} comments</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{work.date}</span>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h4 className="font-semibold mb-3">Project Details</h4>
              <div className="space-y-2">
                {work.client && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span><strong>Client:</strong> {work.client}</span>
                  </div>
                )}
                {work.organization && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span><strong>Organization:</strong> {work.organization}</span>
                  </div>
                )}
                {work.type === "award" && (
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span><strong>Type:</strong> {work.type}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          {work.tags && work.tags.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};