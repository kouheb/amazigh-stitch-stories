
export const authenticationScreens = [
  {
    title: "Admin Login",
    category: "Authentication",
    description: "Secure admin portal access with multi-factor authentication",
    layout: {
      container: "Centered login form with security features",
      dimensions: "400x600px modal or full screen"
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
  }
];
