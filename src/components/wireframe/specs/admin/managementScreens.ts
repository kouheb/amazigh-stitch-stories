
export const managementScreens = [
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
  }
];
