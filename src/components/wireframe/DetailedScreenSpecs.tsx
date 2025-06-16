
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  ArrowRight, 
  ArrowLeft,
  Copy,
  Download,
  Palette,
  Layout,
  Type,
  Spacing
} from "lucide-react";

export const DetailedScreenSpecs = () => {
  const [selectedCategory, setSelectedCategory] = useState<'user' | 'admin'>('user');
  const [selectedScreen, setSelectedScreen] = useState(0);

  const userScreens = [
    {
      title: "Splash Screen",
      category: "Onboarding",
      description: "App launch with cultural branding",
      layout: {
        container: "Full screen vertical layout, centered content",
        dimensions: "375x812px (mobile), 1440x900px (desktop)"
      },
      components: [
        {
          element: "App Logo",
          specs: "120x120px circular logo with Amazigh patterns",
          position: "Center, 200px from top",
          styling: "Drop shadow: 0 4px 20px rgba(234, 88, 12, 0.3)"
        },
        {
          element: "App Name",
          specs: "Typography: Inter Bold, 32px, #1F2937",
          position: "24px below logo",
          styling: "Letter spacing: -0.5px"
        },
        {
          element: "Tagline",
          specs: "Typography: Inter Regular, 16px, #6B7280",
          position: "16px below app name",
          styling: "Text align: center, max-width: 280px"
        },
        {
          element: "Loading Indicator",
          specs: "Circular progress, 24px diameter",
          position: "80px below tagline",
          styling: "Color: #EA580C, stroke-width: 3px"
        },
        {
          element: "Background Pattern",
          specs: "Subtle Amazigh geometric pattern overlay",
          position: "Full screen background",
          styling: "Opacity: 0.05, Color: #EA580C"
        }
      ],
      interactions: [
        "Auto-advance after 3 seconds",
        "Tap to skip to next screen",
        "Fade transition to welcome screen"
      ],
      colors: {
        primary: "#EA580C",
        background: "#FFFFFF",
        text: "#1F2937",
        textSecondary: "#6B7280",
        accent: "#F97316"
      }
    },
    {
      title: "Welcome & Onboarding",
      category: "Onboarding",
      description: "Feature introduction carousel",
      layout: {
        container: "Full screen with pagination dots",
        dimensions: "375x812px (mobile), 1440x900px (desktop)"
      },
      components: [
        {
          element: "Header",
          specs: "Skip button (top-right), Back arrow (top-left after first screen)",
          position: "Top, 60px height, 24px horizontal padding",
          styling: "Background: transparent"
        },
        {
          element: "Hero Image",
          specs: "Illustration 280x200px showing app features",
          position: "Center-top, 120px from top",
          styling: "Rounded corners: 16px"
        },
        {
          element: "Title",
          specs: "Typography: Inter Bold, 28px, #1F2937",
          position: "40px below image",
          styling: "Text align: center, max-width: 320px"
        },
        {
          element: "Description",
          specs: "Typography: Inter Regular, 16px, #6B7280",
          position: "20px below title",
          styling: "Text align: center, line-height: 1.5, max-width: 300px"
        },
        {
          element: "Pagination Dots",
          specs: "3 dots, 8px diameter each, 12px spacing",
          position: "60px below description",
          styling: "Active: #EA580C, Inactive: #D1D5DB"
        },
        {
          element: "Next Button",
          specs: "320x48px rounded button",
          position: "80px from bottom",
          styling: "Background: #EA580C, Text: #FFFFFF, Border-radius: 8px"
        }
      ],
      interactions: [
        "Swipe left/right to navigate",
        "Tap dots for direct navigation",
        "Auto-advance with timer (optional)",
        "Skip button jumps to sign-up",
        "Smooth slide transitions"
      ],
      colors: {
        primary: "#EA580C",
        background: "#FFFFFF",
        text: "#1F2937",
        textSecondary: "#6B7280",
        buttonText: "#FFFFFF"
      }
    },
    {
      title: "Sign Up / Login",
      category: "Authentication",
      description: "User authentication with social options",
      layout: {
        container: "Centered form with social options",
        dimensions: "375x812px (mobile), 400x600px (desktop modal)"
      },
      components: [
        {
          element: "Logo",
          specs: "60x60px app logo",
          position: "Top center, 80px from top",
          styling: "Drop shadow: 0 2px 8px rgba(0,0,0,0.1)"
        },
        {
          element: "Toggle Tabs",
          specs: "Sign Up / Log In tabs, 160px each",
          position: "40px below logo",
          styling: "Active: #EA580C background, Inactive: transparent with #6B7280 text"
        },
        {
          element: "Email Input",
          specs: "320x48px input field with icon",
          position: "40px below tabs",
          styling: "Border: 1px solid #D1D5DB, Border-radius: 8px, Focus: #EA580C border"
        },
        {
          element: "Password Input",
          specs: "320x48px input with show/hide toggle",
          position: "16px below email",
          styling: "Same as email + eye icon on right"
        },
        {
          element: "Confirm Password",
          specs: "320x48px input (sign up only)",
          position: "16px below password",
          styling: "Same styling as password field"
        },
        {
          element: "Continue Button",
          specs: "320x48px primary button",
          position: "24px below last input",
          styling: "Background: #EA580C, Text: #FFFFFF, Border-radius: 8px"
        },
        {
          element: "Social Login Section",
          specs: "OR divider + social buttons",
          position: "32px below continue button",
          styling: "Google & Facebook buttons, 320x44px each, 12px spacing"
        },
        {
          element: "Footer Links",
          specs: "Terms, Privacy, Forgot Password links",
          position: "Bottom, 40px from bottom",
          styling: "Typography: 14px, Color: #6B7280, Underline on hover"
        }
      ],
      interactions: [
        "Tab switching with animation",
        "Real-time validation feedback",
        "Password strength indicator",
        "Social login OAuth flow",
        "Forgot password modal",
        "Success/error toast messages"
      ],
      colors: {
        primary: "#EA580C",
        background: "#FFFFFF",
        text: "#1F2937",
        textSecondary: "#6B7280",
        border: "#D1D5DB",
        error: "#EF4444",
        success: "#10B981"
      }
    },
    {
      title: "Profile Setup",
      category: "Onboarding",
      description: "Complete user profile creation",
      layout: {
        container: "Multi-step form with progress indicator",
        dimensions: "375x812px (mobile), 600x800px (desktop)"
      },
      components: [
        {
          element: "Progress Bar",
          specs: "320x4px progress bar showing step completion",
          position: "Top, 24px from top, centered",
          styling: "Background: #F3F4F6, Fill: #EA580C, Border-radius: 2px"
        },
        {
          element: "Step Title",
          specs: "Typography: Inter Semibold, 24px, #1F2937",
          position: "40px below progress bar",
          styling: "Text align: center"
        },
        {
          element: "Profile Photo Upload",
          specs: "120x120px circular upload area with camera icon",
          position: "40px below title, centered",
          styling: "Border: 2px dashed #D1D5DB, Background: #F9FAFB on hover"
        },
        {
          element: "Name Input",
          specs: "320x48px text input",
          position: "40px below photo upload",
          styling: "Border: 1px solid #D1D5DB, Border-radius: 8px, Padding: 12px 16px"
        },
        {
          element: "Location Selector",
          specs: "320x48px dropdown with map icon",
          position: "16px below name",
          styling: "Same as input + map icon + dropdown arrow"
        },
        {
          element: "Craft Specialization",
          specs: "Grid of checkboxes, 2 columns, 8 options",
          position: "24px below location",
          styling: "Each option: 150x40px, Border: 1px solid #D1D5DB, Selected: #EA580C background"
        },
        {
          element: "Experience Level",
          specs: "Radio button group: Beginner, Intermediate, Advanced, Expert",
          position: "24px below specializations",
          styling: "Horizontal layout, 80px each, Custom radio design"
        },
        {
          element: "Bio Textarea",
          specs: "320x80px multi-line text input",
          position: "24px below experience",
          styling: "Border: 1px solid #D1D5DB, Border-radius: 8px, Padding: 12px 16px"
        },
        {
          element: "Portfolio Upload",
          specs: "320x120px drag-and-drop area",
          position: "24px below bio",
          styling: "Border: 2px dashed #D1D5DB, Background pattern, Upload icon"
        },
        {
          element: "Action Buttons",
          specs: "Skip (outline) and Continue (filled) buttons, 150px each",
          position: "Bottom, 40px from bottom, side by side",
          styling: "Skip: Border #D1D5DB, Continue: Background #EA580C"
        }
      ],
      interactions: [
        "Photo upload with crop functionality",
        "Location autocomplete with map",
        "Multi-select specializations",
        "Drag-and-drop portfolio images",
        "Form validation before proceed",
        "Skip options for non-required fields"
      ],
      colors: {
        primary: "#EA580C",
        background: "#FFFFFF",
        text: "#1F2937",
        textSecondary: "#6B7280",
        border: "#D1D5DB",
        accent: "#F97316"
      }
    },
    {
      title: "Home Dashboard",
      category: "Main App",
      description: "Main landing screen with navigation",
      layout: {
        container: "Header + content + bottom navigation",
        dimensions: "375x812px (mobile), 1200x800px (desktop)"
      },
      components: [
        {
          element: "Top Navigation Bar",
          specs: "Full width, 60px height",
          position: "Top, fixed position",
          styling: "Background: #FFFFFF, Border-bottom: 1px solid #F3F4F6, Drop shadow"
        },
        {
          element: "Logo",
          specs: "32x32px app logo",
          position: "Left in nav bar, 16px from left",
          styling: "Vertical center alignment"
        },
        {
          element: "Search Icon",
          specs: "24x24px search icon button",
          position: "Right side of nav, 100px from right",
          styling: "Color: #6B7280, Hover: #EA580C"
        },
        {
          element: "Notifications Icon",
          specs: "24x24px bell icon with badge",
          position: "Right side of nav, 60px from right",
          styling: "Badge: 16x16px red circle with count"
        },
        {
          element: "Profile Avatar",
          specs: "32x32px circular profile image",
          position: "Right side of nav, 16px from right",
          styling: "Border: 2px solid #EA580C"
        },
        {
          element: "Welcome Message",
          specs: "Typography: Inter Medium, 20px, #1F2937",
          position: "24px below nav bar, 16px horizontal padding",
          styling: "Include user's first name"
        },
        {
          element: "Quick Stats Cards",
          specs: "3 cards, 100x80px each, horizontal scroll",
          position: "20px below welcome message",
          styling: "Background: #F9FAFB, Border-radius: 12px, 16px padding"
        },
        {
          element: "Featured Sections",
          specs: "3 sections: Trending Artisans, Workshops, Community Posts",
          position: "24px below stats cards",
          styling: "Each section: Title + horizontal scrolling cards"
        },
        {
          element: "Bottom Navigation",
          specs: "5 tabs, full width, 80px height",
          position: "Bottom, fixed position",
          styling: "Background: #FFFFFF, Border-top: 1px solid #F3F4F6"
        },
        {
          element: "Nav Tabs",
          specs: "Home, Network, Learn, Events, Profile - 20x20px icons + labels",
          position: "Evenly distributed in bottom nav",
          styling: "Active: #EA580C, Inactive: #6B7280, 12px font size"
        }
      ],
      interactions: [
        "Pull-to-refresh on scroll",
        "Horizontal scrolling for cards",
        "Tap navigation between tabs",
        "Search overlay on search tap",
        "Notification panel slide-down",
        "Profile menu dropdown"
      ],
      colors: {
        primary: "#EA580C",
        background: "#FFFFFF",
        cardBackground: "#F9FAFB",
        text: "#1F2937",
        textSecondary: "#6B7280",
        border: "#F3F4F6"
      }
    }
  ];

  const adminScreens = [
    {
      title: "Admin Login",
      category: "Authentication",
      description: "Secure admin portal access",
      layout: {
        container: "Centered login form with security features",
        dimensions: "400x500px modal or full screen"
      },
      components: [
        {
          element: "Admin Logo",
          specs: "80x80px admin badge icon",
          position: "Top center, 60px from top",
          styling: "Background: #1F2937, Icon: #FFFFFF"
        },
        {
          element: "Portal Title",
          specs: "Typography: Inter Bold, 28px, #1F2937",
          position: "20px below logo",
          styling: "Text: 'Admin Portal', Center aligned"
        },
        {
          element: "Email Input",
          specs: "320x48px with admin domain validation",
          position: "40px below title",
          styling: "Border: 1px solid #D1D5DB, Admin icon prefix"
        },
        {
          element: "Password Input",
          specs: "320x48px with strength indicator",
          position: "16px below email",
          styling: "Hide/show toggle, security strength bar"
        },
        {
          element: "2FA Code Input",
          specs: "320x48px 6-digit code input",
          position: "16px below password",
          styling: "Monospace font, auto-tab between digits"
        },
        {
          element: "Login Button",
          specs: "320x48px primary action button",
          position: "24px below 2FA input",
          styling: "Background: #1F2937, Text: #FFFFFF, Loading state"
        },
        {
          element: "Security Notice",
          specs: "Small text about session timeout",
          position: "20px below login button",
          styling: "Typography: 12px, Color: #6B7280, Center aligned"
        }
      ],
      interactions: [
        "Email domain validation",
        "Password complexity checking",
        "2FA code verification",
        "Session timeout warnings",
        "Failed attempt lockout",
        "Secure logout procedures"
      ],
      colors: {
        primary: "#1F2937",
        background: "#FFFFFF",
        text: "#1F2937",
        textSecondary: "#6B7280",
        border: "#D1D5DB",
        error: "#EF4444"
      }
    },
    {
      title: "Admin Dashboard",
      category: "Analytics",
      description: "Main admin control center",
      layout: {
        container: "Sidebar + main content area",
        dimensions: "1440x900px desktop layout"
      },
      components: [
        {
          element: "Admin Sidebar",
          specs: "280px width, full height navigation",
          position: "Left side, fixed position",
          styling: "Background: #1F2937, Text: #FFFFFF"
        },
        {
          element: "Main Content Area",
          specs: "1160px width content area",
          position: "Right of sidebar",
          styling: "Background: #F9FAFB, Padding: 24px"
        },
        {
          element: "Top Stats Row",
          specs: "4 metric cards, 270px each",
          position: "Top of content area",
          styling: "Height: 120px, White background, Shadow, 16px spacing"
        },
        {
          element: "Chart Section",
          specs: "2 charts side by side, 560px each",
          position: "Below stats, 24px spacing",
          styling: "Height: 300px, White background, Chart.js integration"
        },
        {
          element: "Recent Activity Table",
          specs: "Full width data table",
          position: "Below charts, 24px spacing",
          styling: "Height: 400px, Sortable columns, Pagination"
        },
        {
          element: "Quick Actions Panel",
          specs: "280px width, right sidebar",
          position: "Right edge of content",
          styling: "Background: #FFFFFF, Action buttons and shortcuts"
        }
      ],
      interactions: [
        "Real-time data updates",
        "Interactive charts",
        "Table sorting and filtering",
        "Quick action buttons",
        "Sidebar collapse/expand",
        "Data export functions"
      ],
      colors: {
        primary: "#1F2937",
        secondary: "#EA580C",
        background: "#F9FAFB",
        cardBackground: "#FFFFFF",
        text: "#1F2937",
        textSecondary: "#6B7280"
      }
    },
    {
      title: "User Management",
      category: "Administration",
      description: "Manage platform users and permissions",
      layout: {
        container: "Data table with search and filters",
        dimensions: "1160px content width"
      },
      components: [
        {
          element: "Page Header",
          specs: "Title + Add User button, 1160px width",
          position: "Top of content area",
          styling: "Height: 60px, Flex layout, Title left, Button right"
        },
        {
          element: "Search and Filters Bar",
          specs: "Search input + filter dropdowns, full width",
          position: "Below header, 16px spacing",
          styling: "Height: 48px, Background: #FFFFFF, Border-radius: 8px"
        },
        {
          element: "Users Data Table",
          specs: "10 columns: Avatar, Name, Email, Role, Status, Join Date, Last Active, Actions",
          position: "Below filters, 16px spacing",
          styling: "Background: #FFFFFF, Striped rows, Hover effects"
        },
        {
          element: "Table Actions",
          specs: "Edit, Delete, Block/Unblock action buttons",
          position: "Last column of each row",
          styling: "Icon buttons, 32x32px each, Color-coded"
        },
        {
          element: "Pagination Controls",
          specs: "Page numbers + Previous/Next, centered",
          position: "Below table, 24px spacing",
          styling: "Height: 40px, Button style pagination"
        },
        {
          element: "Bulk Actions Bar",
          specs: "Select all + bulk action buttons",
          position: "Above table when items selected",
          styling: "Background: #FEF3C7, Border: #F59E0B, Slide-down animation"
        }
      ],
      interactions: [
        "Real-time search filtering",
        "Multi-column sorting",
        "Bulk selection and actions",
        "Inline editing capabilities",
        "Role permission management",
        "User activity monitoring"
      ],
      colors: {
        primary: "#1F2937",
        secondary: "#EA580C",
        background: "#F9FAFB",
        tableBackground: "#FFFFFF",
        text: "#1F2937",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444"
      }
    }
  ];

  const currentScreens = selectedCategory === 'user' ? userScreens : adminScreens;
  const currentScreen = currentScreens[selectedScreen];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Detailed Screen Specifications for Figma
        </h2>
        <p className="text-gray-600 mb-6">
          Complete UI specifications with layouts, components, colors, and interactions
        </p>
        
        {/* Category Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <Button
            variant={selectedCategory === 'user' ? 'default' : 'outline'}
            onClick={() => {
              setSelectedCategory('user');
              setSelectedScreen(0);
            }}
          >
            End User Screens ({userScreens.length})
          </Button>
          <Button
            variant={selectedCategory === 'admin' ? 'default' : 'outline'}
            onClick={() => {
              setSelectedCategory('admin');
              setSelectedScreen(0);
            }}
          >
            Admin Backend ({adminScreens.length})
          </Button>
        </div>
      </div>

      {/* Screen Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {currentScreens.map((screen, index) => (
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

      {/* Main Screen Detail */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              {selectedScreen + 1}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {currentScreen.title}
              </h3>
              <Badge className="mt-1">{currentScreen.category}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => copyToClipboard(JSON.stringify(currentScreen, null, 2))}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Specs
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <p className="text-gray-600 mb-8 text-lg">
          {currentScreen.description}
        </p>

        {/* Layout Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Layout className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-gray-800">Layout Specifications</h4>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-sm text-gray-600">Container:</span>
                <p className="text-sm">{currentScreen.layout.container}</p>
              </div>
              <div>
                <span className="font-medium text-sm text-gray-600">Dimensions:</span>
                <p className="text-sm">{currentScreen.layout.dimensions}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-purple-600" />
              <h4 className="font-semibold text-gray-800">Color Palette</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(currentScreen.colors).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: value }}
                  ></div>
                  <span className="text-xs font-mono">{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Components Details */}
        <Card className="p-6 bg-white mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Type className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold text-gray-800">Component Specifications</h4>
          </div>
          <div className="space-y-4">
            {currentScreen.components.map((component, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                <h5 className="font-medium text-gray-800 mb-2">{component.element}</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Specs:</span>
                    <p className="text-gray-700">{component.specs}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Position:</span>
                    <p className="text-gray-700">{component.position}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Styling:</span>
                    <p className="text-gray-700">{component.styling}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Interactions */}
        <Card className="p-6 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Spacing className="h-5 w-5 text-orange-600" />
            <h4 className="font-semibold text-gray-800">Interactions & Behaviors</h4>
          </div>
          <ul className="space-y-2">
            {currentScreen.interactions.map((interaction, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{interaction}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setSelectedScreen(Math.max(0, selectedScreen - 1))}
            disabled={selectedScreen === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Screen
          </Button>
          <Button
            onClick={() => setSelectedScreen(Math.min(currentScreens.length - 1, selectedScreen + 1))}
            disabled={selectedScreen === currentScreens.length - 1}
          >
            Next Screen
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>

      {/* Design System Guide */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Figma Recreation Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Typography Scale</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• H1: Inter Bold 32px</li>
              <li>• H2: Inter Bold 28px</li>
              <li>• H3: Inter Semibold 24px</li>
              <li>• Body: Inter Regular 16px</li>
              <li>• Caption: Inter Regular 14px</li>
              <li>• Small: Inter Regular 12px</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Spacing System</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Base unit: 4px</li>
              <li>• XS: 4px</li>
              <li>• SM: 8px</li>
              <li>• MD: 16px</li>
              <li>• LG: 24px</li>
              <li>• XL: 32px</li>
              <li>• XXL: 48px</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Border Radius</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Small: 4px</li>
              <li>• Medium: 8px</li>
              <li>• Large: 12px</li>
              <li>• XLarge: 16px</li>
              <li>• Round: 50%</li>
              <li>• Pill: 9999px</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Shadows</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Small: 0 1px 3px rgba(0,0,0,0.1)</li>
              <li>• Medium: 0 4px 8px rgba(0,0,0,0.1)</li>
              <li>• Large: 0 8px 16px rgba(0,0,0,0.1)</li>
              <li>• XLarge: 0 16px 32px rgba(0,0,0,0.1)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
