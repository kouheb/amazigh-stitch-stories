
export const adminScreensData = [
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
  },
  {
    title: "Admin Dashboard",
    category: "Analytics",
    description: "Main admin control center with real-time metrics and system overview",
    layout: {
      container: "Sidebar + main content area with widget grid",
      dimensions: "1440x900px desktop layout"
    },
    components: [
      {
        element: "Admin Sidebar",
        specs: "280px width, full height navigation with collapsible sections",
        position: "Left side, fixed position",
        styling: "Background: #1F2937, Text: #FFFFFF, Active state: #374151"
      },
      {
        element: "Main Content Area",
        specs: "1160px width content area with padding",
        position: "Right of sidebar",
        styling: "Background: #F9FAFB, Padding: 24px"
      },
      {
        element: "Top Stats Row",
        specs: "4 metric cards: Users, Revenue, Orders, Support Tickets",
        position: "Top of content area",
        styling: "Cards: 270x120px, White background, Drop shadow, 16px gap"
      },
      {
        element: "Analytics Charts",
        specs: "Revenue chart (560x300px) + User growth chart (560x300px)",
        position: "Below stats, 24px spacing",
        styling: "White background, Chart.js/Recharts integration, Interactive tooltips"
      },
      {
        element: "Recent Activity Feed",
        specs: "Live activity stream with user actions and system events",
        position: "Below charts, left column",
        styling: "560x400px, Scrollable, Real-time updates, Color-coded by action type"
      },
      {
        element: "System Status Panel",
        specs: "Server health, database status, API response times",
        position: "Below charts, right column",
        styling: "560x400px, Status indicators, Performance metrics, Alert badges"
      },
      {
        element: "Quick Actions Widget",
        specs: "Shortcut buttons for common admin tasks",
        position: "Right sidebar of content",
        styling: "280px width, Grouped actions, Icon + text buttons"
      }
    ],
    interactions: [
      "Real-time metric updates every 30 seconds",
      "Interactive chart drilling down to detailed views",
      "Activity feed auto-refresh with sound notifications",
      "Quick action buttons with confirmation modals",
      "Sidebar collapse/expand with localStorage persistence",
      "Dashboard layout customization with drag-drop widgets"
    ],
    colors: {
      primary: "#1F2937",
      secondary: "#EA580C",
      background: "#F9FAFB",
      cardBackground: "#FFFFFF",
      text: "#1F2937",
      textSecondary: "#6B7280",
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444"
    }
  },
  {
    title: "User Management",
    category: "Administration",
    description: "Comprehensive user management with advanced filtering and bulk operations",
    layout: {
      container: "Data table with advanced search, filters, and action panels",
      dimensions: "1160px content width with expandable details"
    },
    components: [
      {
        element: "Page Header",
        specs: "Title, user count, Add User button, Export options",
        position: "Top of content area",
        styling: "Height: 80px, Flex layout, Title left, Actions right"
      },
      {
        element: "Advanced Search Bar",
        specs: "Search input with filters: Role, Status, Join Date, Last Active",
        position: "Below header, 16px spacing",
        styling: "Full width, Dropdown filters, Date range picker, Clear filters button"
      },
      {
        element: "Users Data Table",
        specs: "Columns: Select, Avatar, Name, Email, Role, Status, Join Date, Last Active, Actions",
        position: "Below search, 16px spacing",
        styling: "Sortable columns, Row hover effects, Status badges, Avatar thumbnails"
      },
      {
        element: "User Details Sidebar",
        specs: "Expandable panel showing full user profile and activity history",
        position: "Right side, slides in on row click",
        styling: "400px width, Background: #FFFFFF, Detailed user info, Activity timeline"
      },
      {
        element: "Bulk Actions Toolbar",
        specs: "Multi-select actions: Delete, Export, Change Role, Send Email",
        position: "Above table when items selected",
        styling: "Background: #FEF3C7, Border: #F59E0B, Slide-down animation"
      },
      {
        element: "Pagination and Stats",
        specs: "Page controls, items per page selector, total count display",
        position: "Below table, 24px spacing",
        styling: "Flex layout, Stats left, Pagination right"
      }
    ],
    interactions: [
      "Real-time search with debounced API calls",
      "Advanced filtering with URL parameter persistence",
      "Inline editing of user roles and status",
      "Bulk operations with progress indicators",
      "User profile sidebar with activity timeline",
      "Export functionality with format options (CSV, JSON, PDF)"
    ],
    colors: {
      primary: "#1F2937",
      secondary: "#EA580C",
      background: "#F9FAFB",
      tableBackground: "#FFFFFF",
      text: "#1F2937",
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
      info: "#3B82F6"
    }
  },
  {
    title: "Content Management",
    category: "Content",
    description: "Manage platform content including posts, tutorials, and media assets",
    layout: {
      container: "Content library with preview and editing capabilities",
      dimensions: "1160px content width with tabbed interface"
    },
    components: [
      {
        element: "Content Tabs",
        specs: "Tabs: Posts, Tutorials, Media Library, Categories, Tags",
        position: "Top of content area",
        styling: "Tab bar, Active tab highlighting, Badge counts"
      },
      {
        element: "Content Toolbar",
        specs: "Create new content, bulk actions, view options, search",
        position: "Below tabs, 16px spacing",
        styling: "Flex layout, Action buttons left, Search and view options right"
      },
      {
        element: "Content Grid/List View",
        specs: "Toggle between grid and list view of content items",
        position: "Main content area",
        styling: "Grid: 3 columns, List: Full width rows, Thumbnail previews"
      },
      {
        element: "Content Preview Panel",
        specs: "Live preview of selected content with editing options",
        position: "Right sidebar, 400px width",
        styling: "Background: #FFFFFF, Scrollable, Edit buttons, Metadata display"
      },
      {
        element: "Content Filters",
        specs: "Filter by status, author, category, date range, content type",
        position: "Left sidebar, collapsible",
        styling: "280px width, Accordion-style filters, Apply/Clear buttons"
      },
      {
        element: "Content Actions Menu",
        specs: "Edit, Duplicate, Archive, Delete, Share, Export options",
        position: "On content item hover/click",
        styling: "Dropdown menu, Context-sensitive actions, Icon buttons"
      }
    ],
    interactions: [
      "Drag-and-drop content organization",
      "Inline editing for quick content updates",
      "Bulk content operations with progress tracking",
      "Content preview with live editing capabilities",
      "Media library with upload and organization tools",
      "Content approval workflow for pending items"
    ],
    colors: {
      primary: "#1F2937",
      secondary: "#EA580C",
      background: "#F9FAFB",
      contentBackground: "#FFFFFF",
      text: "#1F2937",
      textSecondary: "#6B7280",
      accent: "#8B5CF6",
      success: "#10B981"
    }
  },
  {
    title: "Analytics Dashboard",
    category: "Analytics",
    description: "Comprehensive analytics with detailed metrics and custom reporting",
    layout: {
      container: "Multi-section dashboard with customizable widgets",
      dimensions: "1160px content width with scrollable sections"
    },
    components: [
      {
        element: "Analytics Header",
        specs: "Date range picker, export options, refresh button, view presets",
        position: "Top of content area",
        styling: "Height: 80px, Flex layout, Controls right-aligned"
      },
      {
        element: "Key Metrics Row",
        specs: "6 metric cards: Users, Sessions, Revenue, Conversion, Bounce Rate, Avg Session",
        position: "Below header, 24px spacing",
        styling: "Grid 6 columns, Cards: 180x100px, Trend indicators, Comparison values"
      },
      {
        element: "Traffic Analytics Chart",
        specs: "Line chart showing traffic trends over selected period",
        position: "Below metrics, left column",
        styling: "560x320px, Interactive tooltips, Multiple data series, Zoom functionality"
      },
      {
        element: "User Behavior Chart",
        specs: "Funnel chart showing user journey and conversion points",
        position: "Below metrics, right column",
        styling: "560x320px, Interactive segments, Drill-down capability"
      },
      {
        element: "Geographic Data Map",
        specs: "World map showing user distribution and engagement by region",
        position: "Second row, left column",
        styling: "560x300px, Interactive map, Heat map overlay, Country statistics"
      },
      {
        element: "Device and Browser Stats",
        specs: "Pie charts showing device types and browser usage",
        position: "Second row, right column",
        styling: "560x300px, Dual pie charts, Legend, Percentage breakdown"
      },
      {
        element: "Top Content Table",
        specs: "Most viewed/engaged content with performance metrics",
        position: "Third row, full width",
        styling: "1160x300px, Sortable table, Performance indicators, Links to content"
      }
    ],
    interactions: [
      "Interactive charts with drill-down capabilities",
      "Custom date range selection with presets",
      "Real-time data updates with auto-refresh options",
      "Export functionality for reports and charts",
      "Widget customization with drag-drop rearrangement",
      "Advanced filtering and segmentation options"
    ],
    colors: {
      primary: "#1F2937",
      secondary: "#EA580C",
      background: "#F9FAFB",
      chartBackground: "#FFFFFF",
      text: "#1F2937",
      accent: "#3B82F6",
      success: "#10B981",
      warning: "#F59E0B"
    }
  },
  {
    title: "System Settings",
    category: "Configuration",
    description: "Global system configuration and platform settings management",
    layout: {
      container: "Tabbed settings interface with form sections",
      dimensions: "1160px content width with sidebar navigation"
    },
    components: [
      {
        element: "Settings Navigation",
        specs: "Vertical tabs: General, Security, Email, Payment, API, Integrations",
        position: "Left sidebar, 280px width",
        styling: "Background: #FFFFFF, Active tab highlighting, Icon + text labels"
      },
      {
        element: "Settings Content Area",
        specs: "Form sections based on selected navigation tab",
        position: "Main content area, 880px width",
        styling: "Background: #FFFFFF, Padding: 32px, Form styling"
      },
      {
        element: "General Settings Form",
        specs: "Site name, description, timezone, language, maintenance mode",
        position: "Main content when General tab active",
        styling: "Form sections with labels, input validation, Help text"
      },
      {
        element: "Security Settings Form",
        specs: "Password policies, 2FA requirements, session timeout, IP restrictions",
        position: "Main content when Security tab active",
        styling: "Security-focused form controls, Toggle switches, Warning alerts"
      },
      {
        element: "Email Configuration",
        specs: "SMTP settings, email templates, notification preferences",
        position: "Main content when Email tab active",
        styling: "Email preview, Template editor, Test email functionality"
      },
      {
        element: "Settings Actions Bar",
        specs: "Save changes, Reset to defaults, Cancel, Preview changes",
        position: "Bottom of content area, sticky",
        styling: "Background: #F9FAFB, Border top, Button group right-aligned"
      }
    ],
    interactions: [
      "Form validation with real-time feedback",
      "Settings preview before saving changes",
      "Bulk settings import/export functionality",
      "Change confirmation dialogs for critical settings",
      "Settings history and rollback capabilities",
      "Test functionality for email and API configurations"
    ],
    colors: {
      primary: "#1F2937",
      secondary: "#EA580C",
      background: "#F9FAFB",
      formBackground: "#FFFFFF",
      text: "#1F2937",
      textSecondary: "#6B7280",
      border: "#E5E7EB",
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444"
    }
  },
  {
    title: "Order Management",
    category: "E-commerce",
    description: "Comprehensive order tracking and management system",
    layout: {
      container: "Order list with detailed order view and processing tools",
      dimensions: "1160px content width with expandable order details"
    },
    components: [
      {
        element: "Order Filters Bar",
        specs: "Status, date range, payment method, customer, order value filters",
        position: "Top of content area",
        styling: "Height: 60px, Inline filters, Quick status buttons, Clear all option"
      },
      {
        element: "Orders Table",
        specs: "Columns: Order ID, Customer, Date, Items, Total, Status, Payment, Actions",
        position: "Below filters, 16px spacing",
        styling: "Sortable columns, Status badges, Customer links, Payment indicators"
      },
      {
        element: "Order Details Panel",
        specs: "Expandable row or sidebar showing full order information",
        position: "Expands from table row",
        styling: "Customer info, order items, shipping, payment, order timeline"
      },
      {
        element: "Order Actions Toolbar",
        specs: "Process order, Print invoice, Send email, Refund, Update status",
        position: "Top right of order details",
        styling: "Button group, Conditional actions based on order status"
      },
      {
        element: "Order Timeline",
        specs: "Visual timeline showing order progression and status changes",
        position: "Right side of order details",
        styling: "Vertical timeline, Status icons, Timestamps, User actions"
      },
      {
        element: "Bulk Order Actions",
        specs: "Multi-select operations for order processing",
        position: "Above table when orders selected",
        styling: "Background: #FEF3C7, Bulk status updates, Export options"
      }
    ],
    interactions: [
      "Real-time order status updates",
      "Inline order status editing",
      "Bulk order processing with progress tracking",
      "Order search with advanced filtering",
      "Print and email invoice generation",
      "Refund processing with accounting integration"
    ],
    colors: {
      primary: "#1F2937",
      secondary: "#EA580C",
      background: "#F9FAFB",
      tableBackground: "#FFFFFF",
      text: "#1F2937",
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
      pending: "#6B7280"
    }
  },
  {
    title: "Support Tickets",
    category: "Customer Support",
    description: "Customer support ticket management and response system",
    layout: {
      container: "Ticket queue with conversation view and response tools",
      dimensions: "1160px content width with split-view interface"
    },
    components: [
      {
        element: "Ticket Queue Panel",
        specs: "List view of support tickets with priority and status indicators",
        position: "Left panel, 400px width",
        styling: "Background: #FFFFFF, Priority colors, Unread indicators, Search bar"
      },
      {
        element: "Ticket Conversation View",
        specs: "Selected ticket conversation with message history",
        position: "Right panel, 760px width",
        styling: "Chat-like interface, Message bubbles, Timestamps, Attachments"
      },
      {
        element: "Ticket Filters",
        specs: "Filter by status, priority, category, assigned agent, date",
        position: "Top of ticket queue",
        styling: "Horizontal filter bar, Quick filter buttons, Badge counters"
      },
      {
        element: "Response Editor",
        specs: "Rich text editor for ticket responses with templates",
        position: "Bottom of conversation view",
        styling: "WYSIWYG editor, Template dropdown, Attachment upload, Send/Save buttons"
      },
      {
        element: "Ticket Actions Sidebar",
        specs: "Status change, priority, assignment, tags, internal notes",
        position: "Right sidebar, 200px width",
        styling: "Vertical action panel, Dropdown selectors, Tag input, Notes textarea"
      },
      {
        element: "Customer Information Panel",
        specs: "Customer profile, order history, previous tickets",
        position: "Top right of conversation view",
        styling: "Collapsible panel, Customer details, Quick links, Context information"
      }
    ],
    interactions: [
      "Real-time ticket updates and notifications",
      "Auto-assignment based on agent availability",
      "Canned responses and template management",
      "File attachment handling and preview",
      "Ticket escalation and routing workflows",
      "Performance metrics and response time tracking"
    ],
    colors: {
      primary: "#1F2937",
      secondary: "#EA580C",
      background: "#F9FAFB",
      ticketBackground: "#FFFFFF",
      text: "#1F2937",
      urgent: "#EF4444",
      high: "#F59E0B",
      medium: "#3B82F6",
      low: "#10B981"
    }
  }
];
