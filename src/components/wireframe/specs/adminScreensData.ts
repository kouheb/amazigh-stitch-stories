
export const adminScreensData = [
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
