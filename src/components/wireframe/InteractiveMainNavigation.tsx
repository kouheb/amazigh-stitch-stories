
import { Card } from "@/components/ui/card";
import { Users, Briefcase, GraduationCap, Calendar, Building } from "lucide-react";
import { useState } from "react";

export const InteractiveMainNavigation = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const navigationItems = [
    {
      icon: Users,
      title: "Network",
      color: "blue",
      features: [
        "Discover artisans nearby",
        "Connect with peers", 
        "Follow favorite creators",
        "Join communities",
        "Messaging system"
      ]
    },
    {
      icon: Briefcase,
      title: "Services", 
      color: "green",
      features: [
        "List your services",
        "Browse available work",
        "Hire specialists", 
        "Project collaboration",
        "Payment integration"
      ]
    },
    {
      icon: GraduationCap,
      title: "Learn",
      color: "purple", 
      features: [
        "Take online classes",
        "Teach your skills",
        "Workshop scheduling",
        "Skill certifications", 
        "Resource library"
      ]
    },
    {
      icon: Calendar,
      title: "Events",
      color: "orange",
      features: [
        "Local craft fairs",
        "Networking events",
        "Fashion shows",
        "Cultural celebrations",
        "Pop-up markets"
      ]
    },
    {
      icon: Building,
      title: "Studios", 
      color: "pink",
      features: [
        "Rent art studios",
        "Book workshop spaces",
        "Shared workspaces",
        "Equipment rental",
        "Creative retreats"
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
      {navigationItems.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = activeCard === index;
        
        return (
          <Card 
            key={index}
            className={`p-6 border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg
              ${item.color === 'blue' ? 'border-blue-200 bg-blue-50 hover:border-blue-300' : ''}
              ${item.color === 'green' ? 'border-green-200 bg-green-50 hover:border-green-300' : ''}
              ${item.color === 'purple' ? 'border-purple-200 bg-purple-50 hover:border-purple-300' : ''}
              ${item.color === 'orange' ? 'border-orange-200 bg-orange-50 hover:border-orange-300' : ''}
              ${item.color === 'pink' ? 'border-pink-200 bg-pink-50 hover:border-pink-300' : ''}
              ${isActive ? 'ring-2 ring-offset-2 ring-blue-400' : ''}
            `}
            onMouseEnter={() => setActiveCard(index)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="flex items-center gap-3 mb-4">
              <IconComponent className={`h-6 w-6 
                ${item.color === 'blue' ? 'text-blue-600' : ''}
                ${item.color === 'green' ? 'text-green-600' : ''}
                ${item.color === 'purple' ? 'text-purple-600' : ''}
                ${item.color === 'orange' ? 'text-orange-600' : ''}
                ${item.color === 'pink' ? 'text-pink-600' : ''}
              `} />
              <h3 className="text-xl font-bold">{item.title}</h3>
            </div>
            
            <ul className={`space-y-2 text-sm transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-75'}`}>
              {item.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full 
                    ${item.color === 'blue' ? 'bg-blue-600' : ''}
                    ${item.color === 'green' ? 'bg-green-600' : ''}
                    ${item.color === 'purple' ? 'bg-purple-600' : ''}
                    ${item.color === 'orange' ? 'bg-orange-600' : ''}
                    ${item.color === 'pink' ? 'bg-pink-600' : ''}
                  `}></div>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
};
