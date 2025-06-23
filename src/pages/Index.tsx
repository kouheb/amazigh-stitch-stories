
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Palette, Calendar, MessageCircle, ShoppingBag, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // If user is authenticated, redirect to app
  useEffect(() => {
    if (user && !loading) {
      console.log("User is authenticated, redirecting to app");
      navigate('/app');
    }
  }, [user, loading, navigate]);

  const handleGetStarted = () => {
    console.log("Get started clicked");
    navigate('/auth');
  };

  const handleExploreFeatures = () => {
    console.log("Explore features clicked");
    navigate('/wireframe');
  };

  const handleDeveloperIcon = () => {
    console.log("Developer icon clicked");
    navigate('/developer-icon');
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  // Only show landing page if user is not authenticated
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Fil et Toile Studio</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleExploreFeatures}>
                Features
              </Button>
              <Button variant="ghost" onClick={handleDeveloperIcon}>
                Developer Icon
              </Button>
              <Button onClick={handleGetStarted} className="bg-orange-600 hover:bg-orange-700">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
            ✨ Now Live - Join the Community
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect, Create, and
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"> Collaborate</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join the premier platform for artisans, designers, and craftspeople. Showcase your work, 
            connect with peers, and grow your creative business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleDeveloperIcon}
              className="border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-4 text-lg"
            >
              Create Developer Icon
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          <Card className="hover:shadow-lg transition-shadow border-orange-100">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Connect with Art</CardTitle>
              <CardDescription>
                Network with talented artisans and designers from around the world
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-100">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Showcase Portfolio</CardTitle>
              <CardDescription>
                Display your finest work with our beautiful portfolio galleries
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-100">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Marketplace</CardTitle>
              <CardDescription>
                Sell your creations and discover unique pieces from other artists
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-100">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Events & Workshops</CardTitle>
              <CardDescription>
                Join exciting events and learn from master craftspeople
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-100">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Community Chat</CardTitle>
              <CardDescription>
                Engage in meaningful conversations with fellow creators
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-100">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Recognition</CardTitle>
              <CardDescription>
                Get recognized for your skills and build your reputation
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join?</h2>
          <p className="text-gray-600 mb-8">
            Start connecting with the global community of artisans today
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg"
          >
            Create Your Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
