
export const configurationScreens = [
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
  }
];
