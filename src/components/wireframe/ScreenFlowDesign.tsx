
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  ArrowRight, 
  User, 
  Camera, 
  MapPin, 
  Search, 
  Plus, 
  Heart, 
  Star, 
  MessageSquare, 
  Calendar,
  CreditCard,
  Settings,
  Bell,
  Menu,
  Home,
  Users,
  GraduationCap,
  Briefcase,
  Building
} from "lucide-react";

export const ScreenFlowDesign = () => {
  const [selectedScreen, setSelectedScreen] = useState(0);

  const screens = [
    {
      title: "Splash Screen",
      type: "Onboarding",
      description: "App launch with branding",
      components: [
        "Large app logo with Amazigh patterns",
        "App name: 'Amazigh Nations'",
        "Tagline: 'Connect. Create. Celebrate.'",
        "Loading indicator",
        "Cultural background pattern"
      ]
    },
    {
      title: "Welcome & Onboarding",
      type: "Onboarding", 
      description: "Introduction to app features",
      components: [
        "Welcome message",
        "3-screen carousel explaining features:",
        "• Screen 1: Connect with artisans globally",
        "• Screen 2: Learn traditional techniques", 
        "• Screen 3: Share your creations",
        "Skip/Next buttons",
        "Progress dots indicator"
      ]
    },
    {
      title: "Sign Up / Login",
      type: "Authentication",
      description: "User authentication flow",
      components: [
        "App logo at top",
        "Toggle: Sign Up / Log In",
        "Email input field",
        "Password input field", 
        "Confirm password (sign up only)",
        "Social login buttons (Google, Facebook)",
        "Terms & Privacy links",
        "Continue button",
        "Forgot password link"
      ]
    },
    {
      title: "Profile Setup",
      type: "Onboarding",
      description: "Initial profile creation",
      components: [
        "Profile photo upload area",
        "Name input field",
        "Location selector with map",
        "Craft specialization checkboxes:",
        "• Zardozi • Dabka • Beading • Silk Work",
        "Experience level selector",
        "Bio text area",
        "Portfolio upload section",
        "Skip/Continue buttons"
      ]
    },
    {
      title: "Home Dashboard",
      type: "Main App",
      description: "Main landing screen",
      components: [
        "Top navigation bar with:",
        "• Logo • Search icon • Notifications • Profile",
        "Welcome message with user name",
        "Quick stats cards:",
        "• Connections • Projects • Events",
        "Featured content sections:",
        "• Trending artisans",
        "• Upcoming workshops", 
        "• Recent community posts",
        "Bottom navigation: Home, Network, Learn, Events, Profile"
      ]
    },
    {
      title: "Artisan Network",
      type: "Main App", 
      description: "Browse and connect with artisans",
      components: [
        "Search bar with filters",
        "Filter chips: Location, Craft Type, Experience",
        "Artisan cards with:",
        "• Profile photo • Name • Craft specialization",
        "• Location • Rating • Follow button",
        "Map view toggle",
        "Sort options dropdown",
        "Floating action button: 'Find Nearby'"
      ]
    },
    {
      title: "Artisan Profile View",
      type: "Main App",
      description: "Detailed artisan profile",
      components: [
        "Cover photo with patterns",
        "Profile photo and basic info",
        "Follow/Message/Hire buttons",
        "Stats: Followers, Following, Projects",
        "Portfolio gallery grid",
        "Reviews and ratings section",
        "Available services list", 
        "Contact information",
        "Share profile button"
      ]
    },
    {
      title: "Learning Hub",
      type: "Main App",
      description: "Browse courses and workshops",
      components: [
        "Category tabs: All, Beginner, Intermediate, Advanced",
        "Search and filter bar",
        "Featured course hero section",
        "Course cards with:",
        "• Thumbnail • Title • Instructor",
        "• Duration • Price • Rating",
        "Filter sidebar:",
        "• Price range • Duration • Format",
        "Enroll button on each card"
      ]
    },
    {
      title: "Course Detail",
      type: "Main App", 
      description: "Individual course information",
      components: [
        "Course video/image header",
        "Course title and description",
        "Instructor profile mini-card",
        "Course outline/curriculum",
        "Reviews and ratings",
        "Prerequisites section",
        "What you'll learn bullets",
        "Pricing and enrollment CTA",
        "Share course button"
      ]
    },
    {
      title: "Workshop Calendar",
      type: "Main App",
      description: "Browse and book workshops",
      components: [
        "Calendar view (month/week toggle)",
        "Event dots on calendar dates",
        "Event list view option",
        "Filter by: Location, Type, Price",
        "Event cards with:",
        "• Date/time • Title • Location",
        "• Price • Available spots",
        "Book now buttons",
        "Add to calendar option"
      ]
    },
    {
      title: "Event Detail",
      type: "Main App",
      description: "Workshop/event information",
      components: [
        "Event cover image",
        "Title, date, time, location",
        "Host/instructor info",
        "Event description",
        "What's included section",
        "Attendee list/count",
        "Location map",
        "Booking form with payment",
        "Share event button"
      ]
    },
    {
      title: "Studio Marketplace",
      type: "Main App",
      description: "Browse and book studio spaces",
      components: [
        "Location search bar",
        "Map view with studio pins",
        "List view toggle",
        "Filter options:",
        "• Price range • Equipment • Size",
        "Studio cards with:",
        "• Photos • Name • Hourly rate",
        "• Equipment list • Availability",
        "Book now buttons",
        "Favorites heart icon"
      ]
    },
    {
      title: "Studio Detail",
      type: "Main App",
      description: "Individual studio information",
      components: [
        "Photo gallery carousel",
        "Studio name and description", 
        "Pricing information",
        "Equipment and amenities list",
        "Location map",
        "Availability calendar",
        "Reviews section",
        "Booking form",
        "Contact studio owner button"
      ]
    },
    {
      title: "Services Marketplace",
      type: "Main App",
      description: "Browse artisan services",
      components: [
        "Service category tabs",
        "Search bar with location",
        "Service cards with:",
        "• Service image • Title • Price range",
        "• Artisan name • Rating • Location",
        "Filter sidebar:",
        "• Service type • Price • Rating",
        "Request custom service button",
        "Featured services section"
      ]
    },
    {
      title: "Service Detail",
      type: "Main App", 
      description: "Individual service information",
      components: [
        "Service image gallery",
        "Service title and description",
        "Artisan profile summary",
        "Pricing and packages",
        "Portfolio examples",
        "Reviews and ratings",
        "Delivery timeline",
        "Request service button",
        "Message artisan button"
      ]
    },
    {
      title: "Messaging",
      type: "Main App",
      description: "Chat with artisans",
      components: [
        "Conversation list with:",
        "• Profile photos • Names • Last message",
        "• Timestamp • Unread indicators",
        "Search conversations",
        "Chat interface with:",
        "• Message bubbles • Send button",
        "• Photo sharing • Voice messages",
        "Profile access from chat header"
      ]
    },
    {
      title: "My Portfolio",
      type: "Main App",
      description: "User's own portfolio management",
      components: [
        "Add new project button",
        "Project grid layout",
        "Project cards with:",
        "• Thumbnail • Title • Date",
        "• Likes count • Comments",
        "Filter: All, Public, Private",
        "Edit/Delete options",
        "Share portfolio button"
      ]
    },
    {
      title: "Create Project",
      type: "Main App",
      description: "Add new portfolio item", 
      components: [
        "Photo upload area (multiple)",
        "Project title input",
        "Description text area",
        "Craft type selector",
        "Techniques used checkboxes",
        "Materials list",
        "Time spent input",
        "Privacy settings toggle",
        "Tags input field",
        "Save draft/Publish buttons"
      ]
    },
    {
      title: "Community Feed",
      type: "Main App",
      description: "Social timeline",
      components: [
        "Create post button",
        "Post cards with:",
        "• User profile • Post image/video",
        "• Caption • Like/Comment buttons",
        "• Share option • Timestamp",
        "Story highlights at top",
        "Filter: Following, Trending, Nearby",
        "Infinite scroll"
      ]
    },
    {
      title: "Notifications",
      type: "Main App",
      description: "Activity notifications",
      components: [
        "Notification categories:",
        "• All • Likes • Comments • Follows",
        "• Messages • Bookings • Events",
        "Notification items with:",
        "• Avatar • Action description",
        "• Timestamp • Action button",
        "Mark all read button",
        "Notification settings link"
      ]
    },
    {
      title: "User Profile",
      type: "Main App", 
      description: "User's own profile",
      components: [
        "Edit profile button",
        "Profile photo and cover",
        "Bio and stats",
        "Portfolio grid",
        "Services offered section",
        "Reviews received",
        "Settings gear icon",
        "Share profile button"
      ]
    },
    {
      title: "Settings",
      type: "Main App",
      description: "App settings and preferences",
      components: [
        "Profile settings section",
        "Privacy controls",
        "Notification preferences",
        "Payment methods",
        "Language selection", 
        "Help & Support",
        "Terms & Privacy",
        "Sign out button"
      ]
    },
    {
      title: "Payment Flow",
      type: "Checkout",
      description: "Service/course payment",
      components: [
        "Order summary",
        "Payment method selection:",
        "• Credit card • PayPal • Mobile payment",
        "Billing address form",
        "Coupon code input",
        "Total cost breakdown",
        "Terms acceptance checkbox",
        "Pay now button",
        "Security badges"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Complete Screen Flow Design
        </h2>
        <p className="text-gray-600 mb-6">
          Comprehensive user journey from onboarding to core features
        </p>
        <Badge variant="outline" className="mb-4">
          {screens.length} Screens Total
        </Badge>
      </div>

      {/* Screen Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {screens.map((screen, index) => (
          <Button
            key={index}
            size="sm"
            variant={selectedScreen === index ? "default" : "outline"}
            onClick={() => setSelectedScreen(index)}
            className="text-xs"
          >
            {screen.title}
          </Button>
        ))}
      </div>

      {/* Selected Screen Detail */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            {selectedScreen + 1}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {screens[selectedScreen].title}
            </h3>
            <Badge className="mt-1">{screens[selectedScreen].type}</Badge>
          </div>
        </div>

        <p className="text-gray-600 mb-6 text-lg">
          {screens[selectedScreen].description}
        </p>

        <div className="bg-white rounded-lg p-6">
          <h4 className="font-semibold mb-4 text-gray-800">
            Screen Components & Elements:
          </h4>
          <ul className="space-y-2">
            {screens[selectedScreen].components.map((component, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{component}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setSelectedScreen(Math.max(0, selectedScreen - 1))}
            disabled={selectedScreen === 0}
          >
            Previous Screen
          </Button>
          <Button
            onClick={() => setSelectedScreen(Math.min(screens.length - 1, selectedScreen + 1))}
            disabled={selectedScreen === screens.length - 1}
          >
            Next Screen
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>

      {/* Quick Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        <h3 className="col-span-full text-xl font-bold text-gray-800 mb-4">
          Quick Screen Overview
        </h3>
        {screens.map((screen, index) => (
          <Card
            key={index}
            className={`p-4 cursor-pointer transition-all hover:shadow-lg border-2 ${
              selectedScreen === index 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedScreen(index)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div>
                <h4 className="font-medium text-sm">{screen.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {screen.type}
                </Badge>
              </div>
            </div>
            <p className="text-xs text-gray-600">{screen.description}</p>
          </Card>
        ))}
      </div>

      {/* Design System Notes */}
      <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Design System Notes for Figma
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Colors</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Primary: Orange (#EA580C) to Red (#DC2626)</li>
              <li>• Secondary: Blue (#2563EB), Purple (#7C3AED)</li>
              <li>• Neutrals: Gray scale from #F9FAFB to #111827</li>
              <li>• Success: Green (#16A34A)</li>
              <li>• Warning: Amber (#D97706)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Typography</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Primary font: Inter or System Sans</li>
              <li>• Headers: Bold 24-48px</li>
              <li>• Body text: Regular 14-16px</li>
              <li>• Captions: 12-14px</li>
              <li>• Line height: 1.5 for body, 1.2 for headers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Spacing</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Base unit: 4px</li>
              <li>• Common spacing: 8px, 16px, 24px, 32px</li>
              <li>• Container padding: 16-24px</li>
              <li>• Section margins: 32-48px</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Components</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Button height: 40-48px</li>
              <li>• Border radius: 6-8px</li>
              <li>• Card elevation: Subtle shadows</li>
              <li>• Input fields: 44px minimum touch target</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
