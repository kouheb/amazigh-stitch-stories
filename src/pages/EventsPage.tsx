
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Heart, 
  MessageSquare, 
  Users, 
  Share,
  Building,
  Bell,
  Clock,
  Star,
  Plus,
  ArrowRight
} from "lucide-react";

export const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [rsvpEvents, setRsvpEvents] = useState<number[]>([]);

  const categories = [
    { id: "all", label: "All Events" },
    { id: "workshop", label: "Workshops" },
    { id: "cultural", label: "Cultural" },
    { id: "exhibition", label: "Exhibitions" },
    { id: "market", label: "Markets" },
    { id: "networking", label: "Networking" }
  ];

  const events = [
    {
      id: 1,
      title: "Amazigh Cultural Festival",
      date: "March 15-17, 2024",
      time: "10:00 AM - 8:00 PM",
      location: "Marrakech Cultural Center",
      category: "cultural",
      attendees: 245,
      price: "Free",
      image: "🎭",
      description: "Celebrate Amazigh heritage with traditional music, dance, and crafts",
      organizer: "Cultural Heritage Foundation",
      tags: ["Traditional", "Music", "Dance", "Crafts"]
    },
    {
      id: 2,
      title: "Zardozi Embroidery Workshop",
      date: "March 22, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Artisan Studio, Fez",
      category: "workshop",
      attendees: 18,
      price: "$85",
      image: "✨",
      description: "Learn traditional Zardozi techniques from master artisan Fatima Al-Maghribi",
      organizer: "Fatima Al-Maghribi",
      tags: ["Hands-on", "Traditional", "Embroidery"]
    },
    {
      id: 3,
      title: "Moroccan Textile Exhibition",
      date: "April 1-15, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "National Museum, Rabat",
      category: "exhibition",
      attendees: 156,
      price: "$12",
      image: "🧵",
      description: "Explore centuries of Moroccan textile traditions and contemporary innovations",
      organizer: "National Museum",
      tags: ["Historical", "Contemporary", "Textiles"]
    },
    {
      id: 4,
      title: "Artisan Market Pop-up",
      date: "April 5, 2024",
      time: "10:00 AM - 7:00 PM",
      location: "Jemaa el-Fnaa, Marrakech",
      category: "market",
      attendees: 89,
      price: "Free",
      image: "🛍️",
      description: "Shop directly from local artisans and discover unique handmade pieces",
      organizer: "Artisan Collective",
      tags: ["Shopping", "Local", "Handmade"]
    },
    {
      id: 5,
      title: "Fashion Designer Networking",
      date: "April 12, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Design Hub, Casablanca",
      category: "networking",
      attendees: 67,
      price: "$25",
      image: "👥",
      description: "Connect with fellow designers, share ideas, and build partnerships",
      organizer: "Fashion Network Morocco",
      tags: ["Networking", "Fashion", "Business"]
    }
  ];

  const forumTopics = [
    {
      id: 1,
      title: "Best thread types for Zardozi work?",
      author: "Amina Hassan",
      replies: 12,
      lastActivity: "2 hours ago",
      category: "Techniques"
    },
    {
      id: 2,
      title: "Looking for silk suppliers in Fez",
      author: "Omar Berber",
      replies: 8,
      lastActivity: "4 hours ago",
      category: "Materials"
    },
    {
      id: 3,
      title: "Traditional vs Modern Dabka methods",
      author: "Yasmin Tuareg",
      replies: 15,
      lastActivity: "1 day ago",
      category: "Discussion"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = activeCategory === "all" || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRSVP = (eventId: number) => {
    setRsvpEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Events & Community</h1>
        <p className="text-gray-600">Connect, learn, and celebrate our craft traditions</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={activeCategory === category.id ? "bg-orange-600 hover:bg-orange-700" : ""}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Featured Event */}
          <Card className="p-8 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 bg-orange-600">Featured Event</Badge>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  International Craft Symposium 2024
                </h2>
                <p className="text-gray-600 mb-6">
                  Join artisans from around the world for a week-long celebration of traditional crafts, 
                  featuring workshops, exhibitions, and cultural performances.
                </p>
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">May 15-22, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Marrakech</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">500+ attendees</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Register Now - $299
                  </Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mx-auto flex items-center justify-center text-6xl">
                  🌍
                </div>
              </div>
            </div>
          </Card>

          {/* Events Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Upcoming Events ({filteredEvents.length})
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">This Week</Button>
                <Button variant="outline" size="sm">This Month</Button>
                <Button variant="outline" size="sm">All</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-6xl">
                    {event.image}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{event.category}</Badge>
                      <span className="text-sm font-medium text-green-600">{event.price}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {event.attendees} attending
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={rsvpEvents.includes(event.id) ? "default" : "outline"}
                        onClick={() => handleRSVP(event.id)}
                        className={rsvpEvents.includes(event.id) ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {rsvpEvents.includes(event.id) ? "Going" : "RSVP"}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Community Features */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Community Features</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discussion Forums
                  <Badge className="ml-auto">24 new</Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Craft-Specific Groups
                  <Badge variant="secondary" className="ml-auto">12</Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share className="h-4 w-4 mr-2" />
                  Share Projects
                  <Badge variant="secondary" className="ml-auto">156</Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Building className="h-4 w-4 mr-2" />
                  Studio Partnerships
                  <Badge variant="secondary" className="ml-auto">25</Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Event Notifications
                </Button>
              </div>
            </Card>

            {/* Community Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Community Highlights</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">500+</div>
                  <div className="text-sm text-gray-600">Active Artisans</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-gray-600">Monthly Workshops</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">25+</div>
                  <div className="text-sm text-gray-600">Studio Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Cultural Events</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Forum Topics */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Forum Topics</h3>
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <div className="space-y-4">
              {forumTopics.map((topic) => (
                <div key={topic.id} className="flex items-center gap-4 p-3 border rounded hover:bg-gray-50">
                  <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{topic.title}</h4>
                    <div className="text-sm text-gray-600 flex items-center gap-4">
                      <span>by {topic.author}</span>
                      <span>{topic.replies} replies</span>
                      <span>{topic.lastActivity}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{topic.category}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Event Calendar</h3>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 5; // Start from previous month
                const isCurrentMonth = day > 0 && day <= 31;
                const hasEvent = [15, 17, 22, 28].includes(day);
                
                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center text-sm border rounded ${
                      isCurrentMonth 
                        ? hasEvent 
                          ? 'bg-orange-100 border-orange-300 text-orange-700 font-medium' 
                          : 'border-gray-200 hover:bg-gray-50'
                        : 'text-gray-400 border-gray-100'
                    }`}
                  >
                    {day > 0 && day <= 31 ? day : ''}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
                <span>Events scheduled</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
