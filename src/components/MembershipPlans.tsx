
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Zap } from "lucide-react";

export const MembershipPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "free",
      name: "Community",
      price: "Free",
      description: "Perfect for getting started",
      icon: <Star className="h-6 w-6" />,
      color: "border-gray-200",
      features: [
        "Basic profile creation",
        "Browse artisan network",
        "Join public workshops",
        "Basic messaging",
        "Portfolio gallery (5 items)",
        "Community forums access"
      ],
      limitations: [
        "Limited to 5 portfolio items",
        "Basic search filters",
        "Standard support"
      ]
    },
    {
      id: "artisan",
      name: "Artisan Pro",
      price: "$19/month",
      description: "For professional artisans",
      icon: <Crown className="h-6 w-6" />,
      color: "border-orange-300",
      popular: true,
      features: [
        "Everything in Community",
        "Unlimited portfolio items",
        "List services & workshops",
        "Advanced booking calendar",
        "Priority messaging",
        "Analytics dashboard",
        "Custom workshop pricing",
        "Student management tools",
        "Video call integration",
        "Priority support"
      ],
      limitations: []
    },
    {
      id: "master",
      name: "Master Craftsperson",
      price: "$49/month",
      description: "For established studios & masters",
      icon: <Zap className="h-6 w-6" />,
      color: "border-purple-300",
      features: [
        "Everything in Artisan Pro",
        "Multi-studio management",
        "Team collaboration tools",
        "Advanced analytics",
        "White-label workshops",
        "API access",
        "Custom branding",
        "Bulk student enrollment",
        "Advanced payment options",
        "Dedicated account manager"
      ],
      limitations: []
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Here you would integrate with Stripe or payment processing
    console.log(`Selected plan: ${planId}`);
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Membership Plan
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unlock the full potential of the Amazigh Nations platform with our flexible membership options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`p-8 relative ${plan.color} ${
              plan.popular ? 'ring-2 ring-orange-500 scale-105' : ''
            } transition-all hover:shadow-lg`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500">
                Most Popular
              </Badge>
            )}
            
            <div className="text-center mb-6">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
                plan.id === 'free' ? 'bg-gray-100 text-gray-600' :
                plan.id === 'artisan' ? 'bg-orange-100 text-orange-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                {plan.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">{plan.price}</div>
              <p className="text-gray-600">{plan.description}</p>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="font-semibold text-gray-900">Features included:</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => handleSelectPlan(plan.id)}
              className={`w-full ${
                plan.id === 'free' ? 'bg-gray-600 hover:bg-gray-700' :
                plan.id === 'artisan' ? 'bg-orange-600 hover:bg-orange-700' :
                'bg-purple-600 hover:bg-purple-700'
              }`}
              disabled={selectedPlan === plan.id}
            >
              {selectedPlan === plan.id ? 'Selected' : 
               plan.id === 'free' ? 'Get Started Free' : 'Upgrade Now'}
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Need a custom solution for your organization?
        </p>
        <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
          Contact Enterprise Sales
        </Button>
      </div>
    </div>
  );
};
