
export const supportScreens = [
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
