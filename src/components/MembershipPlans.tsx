
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Zap } from "lucide-react";
import { PaymentButton } from "@/components/payment/PaymentButton";

export const MembershipPlans = () => {
  const plans = [
    {
      id: "free",
      name: "Community",
      price: 0,
      period: "Forever",
      description: "Perfect for getting started",
      icon: <Star className="h-6 w-6" />,
      features: [
        "Basic profile creation",
        "Browse artisan directory", 
        "Join community discussions",
        "Access to free workshops",
        "Basic messaging",
        "Limited portfolio (5 items)"
      ],
      popular: false,
      buttonText: "Current Plan"
    },
    {
      id: "artisan",
      name: "Artisan Pro",
      price: 29,
      period: "month",
      description: "For serious craftspeople",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Everything in Community",
        "Unlimited portfolio items",
        "Advanced analytics dashboard",
        "Priority customer support",
        "Workshop hosting tools",
        "Commission marketplace access",
        "Advanced messaging features",
        "Custom profile themes"
      ],
      popular: true,
      buttonText: "Upgrade to Pro"
    },
    {
      id: "master",
      name: "Master Craftsperson",
      price: 99,
      period: "month", 
      description: "For established artisan businesses",
      icon: <Crown className="h-6 w-6" />,
      features: [
        "Everything in Artisan Pro",
        "Team collaboration tools",
        "Multi-studio management",
        "White-label solutions",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced business analytics",
        "Priority feature requests"
      ],
      popular: false,
      buttonText: "Upgrade to Master"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <Card key={plan.id} className={`relative p-8 ${plan.popular ? 'border-2 border-orange-500 shadow-xl' : 'border border-gray-200'}`}>
          {plan.popular && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1">
              Most Popular
            </Badge>
          )}
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {plan.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            
            <div className="mb-6">
              {plan.price === 0 ? (
                <div className="text-4xl font-bold text-gray-900">Free</div>
              ) : (
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
              )}
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <PaymentButton
            planType={plan.id as "free" | "artisan" | "master"}
            planName={plan.name}
            amount={plan.price}
            className="w-full"
          />
        </Card>
      ))}
    </div>
  );
};
