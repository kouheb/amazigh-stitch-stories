import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventRegistrationModal } from "@/components/modals/EventRegistrationModal";
import { AddEventModal } from "@/components/modals/AddEventModal";
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
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const initialEvents = [
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

export const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [rsvpEvents, setRsvpEvents] = useState<number[]>([]);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [eventsList, setEventsList] = useState(initialEvents);

  const categories = [
    { id: "all", label: "All Events" },
    { id: "workshop", label: "Workshops" },
    { id: "cultural", label: "Cultural" },
    { id: "exhibition", label: "Exhibitions" },
    { id: "market", label: "Markets" },
    { id: "networking", label: "Networking" }
  ];

  const { toast } = useToast();

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      workshop: "🛠️",
      cultural: "🎭",
      exhibition: "🖼️",
      market: "🛍️",
      networking: "🤝",
    };
    return emojis[category] || "📅";
  };

  const mapDbEventToCard = (e: any) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    date: new Date(e.date_time).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    time: new Date(e.date_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    location: e.location,
    category: e.category,
    attendees: e.current_attendees || 0,
    price: e.price || "Free",
    organizer: e.organizer || "Community",
    image: getCategoryEmoji(e.category),
    tags: e.tags || [],
  });

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "active")
        .order("date_time", { ascending: true });

      if (error) {
        console.error("Failed to load events:", error);
        toast({
          title: "Failed to load events",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (!isMounted) return;
      const mapped = (data || []).map(mapDbEventToCard);
      setEventsList(prev => {
        const existingIds = new Set(prev.map((e: any) => e.id));
        const newOnes = mapped.filter(m => !existingIds.has(m.id));
        return [...newOnes, ...prev];
      });
    };

    loadEvents();

    const channel = supabase
      .channel("public:events")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "events" },
        (payload) => {
          const row: any = (payload as any).new || (payload as any).record || (payload as any);
          if (row?.status !== "active") return;
          const mapped = mapDbEventToCard(row);
          setEventsList(prev => [mapped, ...prev.filter((e: any) => e.id !== mapped.id)]);
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

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

  const getDateFromString = (dateStr: string) => {
    // Parse date strings like "March 15-17, 2024" or "March 22, 2024"
    const year = new Date().getFullYear();
    const monthMap: { [key: string]: number } = {
      "january": 0, "february": 1, "march": 2, "april": 3, "may": 4, "june": 5,
      "july": 6, "august": 7, "september": 8, "october": 9, "november": 10, "december": 11
    };
    
    const parts = dateStr.toLowerCase().split(' ');
    const month = monthMap[parts[0]];
    const dayPart = parts[1].replace(',', '');
    const day = parseInt(dayPart.split('-')[0]); // Get first day if it's a range
    
    return new Date(year, month, day);
  };

  const filteredEvents = eventsList.filter(event => {
    const matchesCategory = activeCategory === "all" || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Time filtering
    const eventDate = getDateFromString(event.date);
    const now = new Date();
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    let matchesTime = true;
    if (timeFilter === "week") {
      matchesTime = eventDate >= now && eventDate <= oneWeekFromNow;
    } else if (timeFilter === "month") {
      matchesTime = eventDate >= now && eventDate <= oneMonthFromNow;
    }
    
    return matchesCategory && matchesSearch && matchesTime;
  });

  const handleRSVP = (eventId: number) => {
    setRsvpEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleEventRegistration = (event: any) => {
    setSelectedEvent(event);
    setIsRegistrationModalOpen(true);
  };

  // Calendar navigation functions
  const navigateCalendar = (direction: 'prev' | 'next') => {
    setCurrentCalendarDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay(); // 0 = Sunday

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  // Check if a day has events
  const dayHasEvents = (day: number) => {
    if (!day) return false;
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const dayDate = new Date(year, month, day);
    
    return eventsList.some(event => {
      const eventDate = getDateFromString(event.date);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === month && 
             eventDate.getFullYear() === year;
    });
  };

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    if (!day) return [];
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    return eventsList.filter(event => {
      const eventDate = getDateFromString(event.date);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === month && 
             eventDate.getFullYear() === year;
    });
  };

  // Community feature handlers
  const handleCommunityFeature = (feature: string) => {
    console.log(`Opening ${feature}...`);
    // You can add specific navigation or modal logic here
    switch (feature) {
      case 'forums':
        alert('Opening Discussion Forums - Feature coming soon!');
        break;
      case 'groups':
        alert('Opening Craft-Specific Groups - Feature coming soon!');
        break;
      case 'projects':
        alert('Opening Share Projects - Feature coming soon!');
        break;
      case 'partnerships':
        alert('Opening Studio Partnerships - Feature coming soon!');
        break;
      case 'notifications':
        alert('Opening Event Notifications - Feature coming soon!');
        break;
      default:
        alert('Feature coming soon!');
    }
  };

  // Handle adding new event
  const handleAddEvent = (newEvent: any) => {
    setEventsList(prev => [...prev, newEvent]);
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
            <Button className="bg-black hover:bg-gray-800" onClick={() => setIsAddEventModalOpen(true)}>
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
                className={activeCategory === category.id ? "bg-black hover:bg-gray-800" : ""}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Featured Event */}
          <Card className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 bg-black">Featured Event</Badge>
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
                  <Button 
                    className="bg-black hover:bg-gray-800"
                    onClick={() => handleEventRegistration({
                      title: "International Craft Symposium 2024",
                      date: "May 15-22, 2024",
                      location: "Marrakech",
                      price: "$299",
                      attendees: 500
                    })}
                  >
                    Register Now - $299
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedEvent({
                        id: "featured",
                        title: "Global Artisan Festival 2024",
                        description: "Connect with artisans worldwide in our biggest celebration of traditional crafts and modern innovation.",
                        date: "March 15-17, 2024",
                        location: "Marrakech Cultural Center",
                        price: 299,
                        attendees: 500
                      });
                      setIsRegistrationModalOpen(true);
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full mx-auto flex items-center justify-center text-6xl text-white">
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
                <Button 
                  variant={timeFilter === "week" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeFilter("week")}
                  className={timeFilter === "week" ? "bg-black hover:bg-gray-800" : ""}
                >
                  This Week
                </Button>
                <Button 
                  variant={timeFilter === "month" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeFilter("month")}
                  className={timeFilter === "month" ? "bg-black hover:bg-gray-800" : ""}
                >
                  This Month
                </Button>
                <Button 
                  variant={timeFilter === "all" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeFilter("all")}
                  className={timeFilter === "all" ? "bg-black hover:bg-gray-800" : ""}
                >
                  All
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl">
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
                        onClick={() => handleEventRegistration(event)}
                        className={rsvpEvents.includes(event.id) ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {rsvpEvents.includes(event.id) ? "Registered" : "Register"}
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
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleCommunityFeature('forums')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discussion Forums
                  <Badge className="ml-auto">24 new</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleCommunityFeature('groups')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Craft-Specific Groups
                  <Badge variant="secondary" className="ml-auto">12</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleCommunityFeature('projects')}
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share Projects
                  <Badge variant="secondary" className="ml-auto">156</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleCommunityFeature('partnerships')}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Studio Partnerships
                  <Badge variant="secondary" className="ml-auto">25</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleCommunityFeature('notifications')}
                >
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
                  <div className="text-2xl font-bold text-gray-600">500+</div>
                  <div className="text-sm text-gray-600">Active Artisans</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-gray-600">Monthly Workshops</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">25+</div>
                  <div className="text-sm text-gray-600">Studio Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">12</div>
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
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Event Calendar</h3>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateCalendar('prev')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium min-w-[180px] text-center">
                  {currentCalendarDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateCalendar('next')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium py-2 text-gray-600">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {generateCalendarDays().map((day, i) => {
                const hasEvent = day ? dayHasEvents(day) : false;
                const dayEvents = day ? getEventsForDay(day) : [];
                
                return (
                  <div
                    key={i}
                    className={`aspect-square flex flex-col items-center justify-center text-sm border rounded cursor-pointer transition-colors ${
                      day 
                        ? hasEvent 
                          ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium hover:bg-blue-100' 
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                        : 'text-gray-400 border-gray-100'
                    }`}
                    onClick={() => {
                      if (day && hasEvent && dayEvents.length > 0) {
                        handleEventRegistration(dayEvents[0]);
                      }
                    }}
                    title={day && hasEvent ? `${dayEvents.length} event(s) on this day` : ''}
                  >
                    <span className="text-sm">{day || ''}</span>
                    {hasEvent && (
                      <div className="w-1 h-1 bg-blue-500 rounded-full mt-1"></div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
                  <span>Events scheduled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Event indicator</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAddEventModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
          </Card>
          
          {/* Events for current month */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Events in {currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="space-y-3">
              {eventsList.filter(event => {
                const eventDate = getDateFromString(event.date);
                return eventDate.getMonth() === currentCalendarDate.getMonth() && 
                       eventDate.getFullYear() === currentCalendarDate.getFullYear();
              }).map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleEventRegistration(event)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{event.image}</div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="text-sm text-gray-600 flex items-center gap-4">
                        <span>{event.date}</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{event.category}</Badge>
                    <span className="text-sm font-medium text-green-600">{event.price}</span>
                  </div>
                </div>
              ))}
              
              {eventsList.filter(event => {
                const eventDate = getDateFromString(event.date);
                return eventDate.getMonth() === currentCalendarDate.getMonth() && 
                       eventDate.getFullYear() === currentCalendarDate.getFullYear();
              }).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No events scheduled for this month
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      <EventRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        event={selectedEvent}
      />
      
      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={handleAddEvent}
        selectedDate={currentCalendarDate}
      />
    </div>
  );
};
