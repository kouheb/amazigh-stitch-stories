
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Eye, Share2, Edit3, Plus, Star, Heart, MessageCircle } from "lucide-react";

export const AfterUploadWork = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'details' | 'visibility'>('preview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Work Successfully Uploaded!</h1>
            <p className="text-gray-600">Your latest creation has been added to your portfolio</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={activeTab === 'preview' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('preview')}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button
              variant={activeTab === 'details' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('details')}
              className="gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Details
            </Button>
            <Button
              variant={activeTab === 'visibility' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('visibility')}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Visibility
            </Button>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'preview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Uploaded Work Preview */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Your Work Preview
              </h3>
              <div className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-orange-200 to-red-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-4xl mb-2">🧵</div>
                    <p className="font-medium">Zardozi Wedding Dress Detail</p>
                    <p className="text-sm">Traditional embroidery work</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">Image {i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Work Information */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Work Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-lg">Traditional Zardozi Embroidery</h4>
                  <p className="text-gray-600 text-sm">Handcrafted with gold threads and pearls</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Zardozi</Badge>
                  <Badge variant="secondary">Traditional</Badge>
                  <Badge variant="secondary">Wedding</Badge>
                  <Badge variant="secondary">Handmade</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span>Embroidery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Technique:</span>
                    <span>Zardozi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time taken:</span>
                    <span>3 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Materials:</span>
                    <span>Gold thread, Pearls</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    This intricate Zardozi embroidery was created for a traditional wedding dress. 
                    The design features delicate floral patterns worked with genuine gold threads 
                    and freshwater pearls, representing centuries-old Amazigh craftsmanship.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'details' && (
          <Card className="p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold mb-6">Edit Work Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Work Title</label>
                <input 
                  type="text" 
                  defaultValue="Traditional Zardozi Embroidery"
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  rows={4}
                  defaultValue="This intricate Zardozi embroidery was created for a traditional wedding dress..."
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>Embroidery</option>
                    <option>Weaving</option>
                    <option>Tailoring</option>
                    <option>Jewelry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Technique</label>
                  <input 
                    type="text" 
                    defaultValue="Zardozi"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <input 
                  type="text" 
                  defaultValue="zardozi, traditional, wedding, handmade"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Separate tags with commas"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'visibility' && (
          <Card className="p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold mb-6">Visibility & Sharing Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Who can see this work?</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="radio" name="visibility" defaultChecked />
                    <div>
                      <div className="font-medium">Public</div>
                      <div className="text-sm text-gray-600">Visible to everyone on the platform</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="visibility" />
                    <div>
                      <div className="font-medium">Community Only</div>
                      <div className="text-sm text-gray-600">Only visible to Amazigh Nations members</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="visibility" />
                    <div>
                      <div className="font-medium">Private</div>
                      <div className="text-sm text-gray-600">Only visible to you</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-3">Available for hire?</h4>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  <div>
                    <div className="font-medium">Accept similar projects</div>
                    <div className="text-sm text-gray-600">Allow clients to hire you for similar work</div>
                  </div>
                </label>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-3">Social Sharing</h4>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Link
                  </Button>
                  <Button variant="outline" size="sm">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    Instagram
                  </Button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">Update Settings</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Engagement Stats */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Engagement Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold">156</span>
              </div>
              <p className="text-sm text-gray-600">Views</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-2xl font-bold">24</span>
              </div>
              <p className="text-sm text-gray-600">Likes</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold">8</span>
              </div>
              <p className="text-sm text-gray-600">Comments</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-2xl font-bold">4.9</span>
              </div>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <Plus className="h-8 w-8 mx-auto mb-3 text-orange-600" />
              <h4 className="font-medium mb-2">Upload More Work</h4>
              <p className="text-sm text-gray-600 mb-4">Continue building your portfolio</p>
              <Button size="sm" variant="outline">Add Work</Button>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Share2 className="h-8 w-8 mx-auto mb-3 text-blue-600" />
              <h4 className="font-medium mb-2">Share Your Work</h4>
              <p className="text-sm text-gray-600 mb-4">Get more visibility for your craft</p>
              <Button size="sm" variant="outline">Share Now</Button>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <MessageCircle className="h-8 w-8 mx-auto mb-3 text-green-600" />
              <h4 className="font-medium mb-2">Engage with Community</h4>
              <p className="text-sm text-gray-600 mb-4">Connect with other artisans</p>
              <Button size="sm" variant="outline">Explore</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
