
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Award, Star } from "lucide-react";

export const ArtisanProfile = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Enhanced Artisan Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Craft Specializations</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <div className="font-medium">Artisan Name</div>
                <div className="text-sm text-gray-600">Master Craftsperson</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Craft Types</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Zardozi</Badge>
                <Badge variant="secondary">Dabka</Badge>
                <Badge variant="secondary">Beading</Badge>
                <Badge variant="secondary">Silk Thread</Badge>
                <Badge variant="secondary">Gold Thread</Badge>
                <Badge variant="secondary">Pearl Work</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Techniques</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Hand Embroidery</Badge>
                <Badge variant="outline">Machine Work</Badge>
                <Badge variant="outline">Mixed Media</Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award className="h-4 w-4" />
              <span>15+ years experience</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Portfolio Gallery</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Recent Work</span>
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload New
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square bg-gray-200 rounded relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-gray-400" />
                </div>
                <div className="absolute bottom-1 left-1 right-1">
                  <Badge className="text-xs">Zardozi</Badge>
                </div>
              </div>
              <div className="aspect-square bg-gray-200 rounded relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-gray-400" />
                </div>
                <div className="absolute bottom-1 left-1 right-1">
                  <Badge className="text-xs">Beading</Badge>
                </div>
              </div>
              <div className="aspect-square bg-gray-200 rounded relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-gray-400" />
                </div>
                <div className="absolute bottom-1 left-1 right-1">
                  <Badge className="text-xs">Dabka</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Traditional Wedding Dress</span>
                <div className="flex gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">4.9</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Modern Kaftan Design</span>
                <div className="flex gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">5.0</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
