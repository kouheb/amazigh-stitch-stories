
export const userScreensData = [
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
