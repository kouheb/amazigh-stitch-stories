
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
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [activeFeature, setActiveFeature] = useState("network");

  const features = [
    {
      id: "network",
      title: "Connect with Artisans",
      description: "Build your network of traditional craftspeople and modern creators",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: "learn",
      title: "Learn Traditional Crafts",
      description: "Master ancient techniques through expert-led workshops and courses",
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: "events",
      title: "Attend Cultural Events",
      description: "Join craft fairs, exhibitions, and cultural celebrations",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: "marketplace",
      title: "Showcase Your Work",
      description: "Share your creations and connect with potential clients",
      icon: ShoppingBag,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const testimonials = [
    {
      name: "Fatima Al-Zahra",
      role: "Traditional Embroidery Artist",
      content: "This platform helped me connect with other artisans and learn new techniques. My business has grown tremendously.",
      avatar: "/api/placeholder/60/60",
      rating: 5
    },
    {
      name: "Ahmed Hassan",
      role: "Ceramic Artist",
      content: "The workshops are incredible. I've learned traditional glazing techniques that I never knew existed.",
      avatar: "/api/placeholder/60/60",
      rating: 5
    },
    {
      name: "Zahra Bennani",
      role: "Jewelry Designer",
      content: "The community here is amazing. I've found collaborators and made lifelong friendships.",
      avatar: "/api/placeholder/60/60",
      rating: 5
    }
  ];

  const stats = [
    { number: "5,000+", label: "Active Artisans" },
    { number: "500+", label: "Workshops" },
    { number: "100+", label: "Cultural Events" },
    { number: "50+", label: "Traditional Crafts" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 bg-orange-100 text-orange-800">
            <Sparkles className="h-3 w-3 mr-1" />
            Traditional Crafts Meet Modern Community
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Preserve Heritage,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              {" "}Build Community
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join the largest community of traditional artisans and cultural enthusiasts. 
            Learn ancient crafts, connect with masters, and preserve our heritage for future generations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/app">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-orange-200 hover:bg-orange-50">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
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

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Everything You Need to Thrive
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform brings together artisans, learners, and cultural enthusiasts 
            in one vibrant community dedicated to preserving traditional crafts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Logo size="md" showText={false} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of artisans and craft enthusiasts in our growing community.
            </p>
            <Link to="/app">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Explore the Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Loved by Artisans Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our community members have to say about their experience.
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Your Creative Journey Today
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join our community of passionate artisans and help preserve 
            traditional crafts for future generations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg bg-white text-orange-600 hover:bg-gray-50">
                <Heart className="mr-2 h-5 w-5" />
                Join Free Today
              </Button>
            </Link>
            
            <Link to="/membership">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-orange-600">
                <Award className="mr-2 h-5 w-5" />
                Explore Membership
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
