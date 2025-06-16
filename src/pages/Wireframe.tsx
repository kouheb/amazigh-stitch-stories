
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
  Plus,
  Upload,
  Building,
  Palette,
  Camera,
  Award,
  Clock
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
            to network, offer services, hire talent, share knowledge through classes, workshops, and art studios.
          </p>
        </div>

        {/* Main Navigation Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
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

          <Card className="p-6 border-2 border-pink-200 bg-pink-50">
            <div className="flex items-center gap-3 mb-4">
              <Building className="h-6 w-6 text-pink-600" />
              <h3 className="text-xl font-bold">Studios</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• Rent art studios</li>
              <li>• Book workshop spaces</li>
              <li>• Shared workspaces</li>
              <li>• Equipment rental</li>
              <li>• Creative retreats</li>
            </ul>
          </Card>
        </div>

        {/* Key Features Layout */}
        <div className="space-y-12">
          
          {/* Enhanced Artisan Profile */}
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

          {/* Art Studios & Workshop Spaces */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Art Studios & Workshop Spaces</h2>
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button size="sm"><Search className="h-4 w-4 mr-2" />Find Studios</Button>
                  <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />List Your Space</Button>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">Equipment Included</Badge>
                  <Badge variant="outline">Hourly Rental</Badge>
                  <Badge variant="outline">Monthly Lease</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Creative Loft Studio", type: "Embroidery Workshop", price: "$25/hour" },
                  { name: "Artisan Collective", type: "Shared Beading Space", price: "$300/month" },
                  { name: "Traditional Craft Center", type: "Teaching Studio", price: "$40/hour" }
                ].map((studio, index) => (
                  <Card key={index} className="p-4 border">
                    <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                      <Building className="h-8 w-8 text-gray-400" />
                    </div>
                    <h4 className="font-medium mb-1">{studio.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{studio.type}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-green-600">{studio.price}</span>
                      <Button size="sm">Book Now</Button>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>Downtown Arts District</span>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </section>

          {/* Enhanced Learning Platform */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Platform & Workshops</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Available Classes & Workshops</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Zardozi Embroidery Masterclass', duration: '6 weeks', level: 'Advanced', price: '$199', type: 'Online' },
                    { title: 'Beading Techniques Workshop', duration: '2 days', level: 'Beginner', price: '$149', type: 'In-Person' },
                    { title: 'Dabka Traditional Methods', duration: '4 weeks', level: 'Intermediate', price: '$159', type: 'Hybrid' }
                  ].map((course, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded">
                      <div className="w-16 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded flex items-center justify-center">
                        <Palette className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{course.duration}</span>
                          <Badge variant="outline" className="text-xs">{course.level}</Badge>
                          <Badge variant="secondary" className="text-xs">{course.type}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{course.price}</div>
                        <Button size="sm">Enroll</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Teaching & Workshop Hosting</h3>
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
                    <Building className="h-4 w-4 mr-2" />
                    Book Studio Space
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Students
                  </Button>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Your Teaching Stats</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• 23 active students</div>
                      <div>• $1,240 monthly earnings</div>
                      <div>• 4.9 average rating</div>
                      <div>• 3 upcoming workshops</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Enhanced Events & Community */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Events & Cultural Activities</h2>
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'Amazigh Cultural Festival', date: 'March 15-17', location: 'Marrakech', type: 'Cultural' },
                      { title: 'Zardozi Workshop Series', date: 'March 22', location: 'Online', type: 'Workshop' },
                      { title: 'Artisan Market Pop-up', date: 'April 5', location: 'Casablanca', type: 'Market' },
                      { title: 'Traditional Beading Exhibition', date: 'April 12', location: 'Fez', type: 'Exhibition' }
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
                            <Badge variant="outline" className="text-xs">{event.type}</Badge>
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
                      Craft-Specific Groups
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Share className="h-4 w-4 mr-2" />
                      Share Projects
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Building className="h-4 w-4 mr-2" />
                      Studio Partnerships
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Event Notifications
                    </Button>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <h4 className="font-medium mb-2">Community Highlights</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• 500+ active artisans</div>
                      <div>• 50+ workshops monthly</div>
                      <div>• 25+ studio partnerships</div>
                      <div>• 12 cultural events this quarter</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
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
                  <Badge variant="outline">Zardozi Embroidery</Badge>
                  <Badge variant="outline">Beading Services</Badge>
                  <Badge variant="outline">Pattern Design</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { craft: "Zardozi", price: "$80-300", specialty: "Traditional Wedding Designs" },
                  { craft: "Beading", price: "$50-200", specialty: "Modern Fashion Accents" },
                  { craft: "Dabka", price: "$60-250", specialty: "Cultural Ceremonial Pieces" }
                ].map((item, index) => (
                  <Card key={index} className="p-4 border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="font-medium">Master Artisan</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          4.8 (24 reviews)
                        </div>
                      </div>
                    </div>
                    <div className="h-24 bg-gray-200 rounded mb-3"></div>
                    <h4 className="font-medium mb-1">{item.craft} Specialist</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.specialty}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{item.price}</span>
                      <Button size="sm">View Details</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </section>

          {/* Mobile App Features */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mobile App Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="w-16 h-28 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-20 bg-gray-200 rounded"></div>
                </div>
                <h3 className="font-semibold mb-2">Quick Booking</h3>
                <p className="text-sm text-gray-600">Book studios and classes instantly</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-28 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-20 bg-gray-200 rounded"></div>
                </div>
                <h3 className="font-semibold mb-2">Portfolio Upload</h3>
                <p className="text-sm text-gray-600">Upload work photos on-the-go</p>
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
