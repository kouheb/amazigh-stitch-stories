
export const analyticsScreens = [
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
  }
];
