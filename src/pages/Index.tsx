
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/Logo";
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  MessageSquare, 
  ShoppingBag,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Sparkles,
  Heart,
  Award,
  User,
  Crown,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [activeFeature, setActiveFeature] = useState("home");

  const features = [
    {
      id: "home",
      title: "Personal Dashboard",
      description: "Your central hub for tracking progress, connections, and recent activities",
      icon: Home,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: "network",
      title: "Artisan Network",
      description: "Connect with traditional craftspeople, share work, and build professional relationships",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: "learn",
      title: "Learning Center",
      description: "Access courses, tutorials, and masterclasses from traditional craft experts",
      icon: GraduationCap,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: "events",
      title: "Events & Workshops",
      description: "Discover local craft fairs, workshops, and cultural events in your area",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: "messages",
      title: "Direct Messaging",
      description: "Communicate with other artisans, mentors, and potential collaborators",
      icon: MessageSquare,
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      id: "marketplace",
      title: "Services Marketplace",
      description: "Offer your services, hire other artisans, and showcase your portfolio",
      icon: ShoppingBag,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  const testimonials = [
    {
      name: "Fatima Al-Zahra",
      role: "Traditional Embroidery Artist",
      content: "The network feature helped me find mentors in my area. I've improved my techniques significantly through the learning center.",
      avatar: "/api/placeholder/60/60",
      rating: 5
    },
    {
      name: "Ahmed Hassan", 
      role: "Ceramic Artist",
      content: "The events section keeps me updated on local workshops. I've attended 5 events this month and made great connections.",
      avatar: "/api/placeholder/60/60",
      rating: 5
    },
    {
      name: "Zahra Bennani",
      role: "Jewelry Designer",
      content: "The marketplace helped me find clients for my custom jewelry work. The messaging system makes communication seamless.",
      avatar: "/api/placeholder/60/60",
      rating: 5
    }
  ];

  const stats = [
    { number: "5,000+", label: "Active Members" },
    { number: "500+", label: "Learning Resources" },
    { number: "100+", label: "Monthly Events" },
    { number: "50+", label: "Craft Categories" }
  ];

  const appFeatures = [
    { icon: Home, title: "Personal Dashboard", description: "Track your progress and stay organized" },
    { icon: Users, title: "Network Building", description: "Connect with artisans worldwide" },
    { icon: GraduationCap, title: "Skill Development", description: "Learn from master craftspeople" },
    { icon: Calendar, title: "Event Discovery", description: "Find workshops and cultural events" },
    { icon: MessageSquare, title: "Direct Communication", description: "Message other community members" },
    { icon: ShoppingBag, title: "Service Marketplace", description: "Offer services and hire talent" },
    { icon: User, title: "Profile Management", description: "Showcase your work and experience" },
    { icon: Crown, title: "Premium Features", description: "Access exclusive content and tools" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 bg-orange-100 text-orange-800">
            <Sparkles className="h-3 w-3 mr-1" />
            Complete Platform for Traditional Artisans
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Creative Journey
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              {" "}Starts Here
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Access your personal dashboard, connect with artisans, learn new skills, 
            discover events, and grow your craft business - all in one integrated platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/app">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                Open Your Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-orange-200 hover:bg-orange-50">
              <Play className="mr-2 h-5 w-5" />
              Take a Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Features Overview */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform includes all the tools and features 
            you need to grow as a traditional artisan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {appFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Explore Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Click on each feature to learn more about how our platform 
              can support your creative journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Feature Cards */}
            <div className="space-y-4">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <Card 
                    key={feature.id}
                    className={`p-6 cursor-pointer transition-all duration-300 ${
                      activeFeature === feature.id 
                        ? 'border-orange-200 bg-orange-50 shadow-lg' 
                        : 'hover:border-gray-200 hover:shadow-md'
                    }`}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                        <IconComponent className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">
                          {feature.description}  
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Feature Preview */}
            <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-8 text-center sticky top-8">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Logo size="md" showText={false} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start Creating?
              </h3>
              <p className="text-gray-600 mb-6">
                Join our community and access all these features in your personalized dashboard.
              </p>
              <Link to="/app">
                <Button className="bg-orange-600 hover:bg-orange-700 mb-4">
                  Access Your Dashboard
                </Button>
              </Link>
              <div className="text-sm text-gray-500">
                Free to join • Premium features available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Success Stories from Our Community
          </h2>
          <p className="text-xl text-gray-600">
            See how artisans are using our platform to grow their craft and business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Your Craft Journey Awaits
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Access your personal dashboard, connect with fellow artisans, 
            and unlock all the tools you need to grow your craft.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg bg-white text-orange-600 hover:bg-gray-50">
                <Heart className="mr-2 h-5 w-5" />
                Enter Your Dashboard
              </Button>
            </Link>
            
            <Link to="/membership">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-orange-600">
                <Award className="mr-2 h-5 w-5" />
                Explore Premium
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <Logo size="md" showText={true} />
            </div>
            
            <div className="flex items-center gap-6 text-gray-400">
              <span>© 2024 Fil et Toile Studio. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
