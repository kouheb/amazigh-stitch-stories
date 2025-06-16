
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  GraduationCap, 
  Search, 
  MessageSquare, 
  Star,
  MapPin,
  Heart,
  Share,
  Settings,
  Bell,
  Plus
} from "lucide-react";

const Wireframe = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Amazigh Nations App Wireframe
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A comprehensive platform for fashion designers, seamstresses, artisans, and craftspeople 
            to network, offer services, hire talent, and share knowledge through classes and events.
          </p>
        </div>

        {/* Main Navigation Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 border-2 border-blue-200 bg-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold">Network</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• Discover artisans nearby</li>
              <li>• Connect with peers</li>
              <li>• Follow favorite creators</li>
              <li>• Join communities</li>
              <li>• Messaging system</li>
            </ul>
          </Card>

          <Card className="p-6 border-2 border-green-200 bg-green-50">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-bold">Services</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• List your services</li>
              <li>• Browse available work</li>
              <li>• Hire specialists</li>
              <li>• Project collaboration</li>
              <li>• Payment integration</li>
            </ul>
          </Card>

          <Card className="p-6 border-2 border-purple-200 bg-purple-50">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-bold">Learn</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• Take online classes</li>
              <li>• Teach your skills</li>
              <li>• Workshop scheduling</li>
              <li>• Skill certifications</li>
              <li>• Resource library</li>
            </ul>
          </Card>

          <Card className="p-6 border-2 border-orange-200 bg-orange-50">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-6 w-6 text-orange-600" />
              <h3 className="text-xl font-bold">Events</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• Local craft fairs</li>
              <li>• Networking events</li>
              <li>• Fashion shows</li>
              <li>• Cultural celebrations</li>
              <li>• Pop-up markets</li>
            </ul>
          </Card>
        </div>

        {/* Key Features Layout */}
        <div className="space-y-12">
          
          {/* Profile & Dashboard */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">User Dashboard & Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Profile Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="font-medium">Profile Photo & Bio</div>
                      <div className="text-sm text-gray-600">Showcase your work & story</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                  <p className="text-sm text-gray-600">Portfolio Gallery</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Embroidery</Badge>
                    <Badge variant="secondary">Beading</Badge>
                    <Badge variant="secondary">Fashion</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Dashboard Widgets</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                    <span className="text-sm">New Messages</span>
                    <Badge>5</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <span className="text-sm">Active Projects</span>
                    <Badge>3</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                    <span className="text-sm">Upcoming Classes</span>
                    <Badge>2</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                    <span className="text-sm">Event Invitations</span>
                    <Badge>1</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Services Marketplace */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Services Marketplace</h2>
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button size="sm"><Search className="h-4 w-4 mr-2" />Search Services</Button>
                  <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />List Service</Button>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">Custom Embroidery</Badge>
                  <Badge variant="outline">Pattern Design</Badge>
                  <Badge variant="outline">Alterations</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <Card key={item} className="p-4 border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="font-medium">Artisan Name</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          4.8 (24 reviews)
                        </div>
                      </div>
                    </div>
                    <div className="h-24 bg-gray-200 rounded mb-3"></div>
                    <h4 className="font-medium mb-2">Custom Amazigh Embroidery</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">$50-200</span>
                      <Button size="sm">View Details</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </section>

          {/* Learning Platform */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Platform</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Available Classes</h3>
                <div className="space-y-4">
                  {['Traditional Berber Embroidery', 'Modern Beading Techniques', 'Fashion Design Basics'].map((title, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded">
                      <div className="w-16 h-12 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <div className="font-medium">{title}</div>
                        <div className="text-sm text-gray-600">4 weeks • Beginner</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">$99</div>
                        <Button size="sm">Enroll</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Teaching Tools</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Course
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Workshop
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Students
                  </Button>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Your Classes</h4>
                    <div className="text-sm text-gray-600">
                      <div>• 23 active students</div>
                      <div>• $1,240 monthly earnings</div>
                      <div>• 4.9 average rating</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Events & Community */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Events & Community</h2>
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'Amazigh Cultural Festival', date: 'March 15-17', location: 'Marrakech' },
                      { title: 'Fashion Design Workshop', date: 'March 22', location: 'Online' },
                      { title: 'Artisan Market Pop-up', date: 'April 5', location: 'Casablanca' }
                    ].map((event, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 border rounded">
                        <div className="w-12 h-12 bg-orange-200 rounded flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <span>{event.date}</span>
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="sm">Join</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Community Features</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Discussion Forums
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Interest Groups
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Share className="h-4 w-4 mr-2" />
                      Share Projects
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Mobile App Features */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mobile App Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="w-16 h-28 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-20 bg-gray-200 rounded"></div>
                </div>
                <h3 className="font-semibold mb-2">Quick Booking</h3>
                <p className="text-sm text-gray-600">Book services and classes on-the-go</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-28 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-20 bg-gray-200 rounded"></div>
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600">Real-time messaging with artisans</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-28 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-20 bg-gray-200 rounded"></div>
                </div>
                <h3 className="font-semibold mb-2">AR Try-On</h3>
                <p className="text-sm text-gray-600">Visualize embroidery on garments</p>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Wireframe;
