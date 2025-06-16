
export const ecommerceScreens = [
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
  }
];
