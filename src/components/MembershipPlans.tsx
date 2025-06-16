
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Gem, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface MembershipPlansProps {
  profileData: any;
  onBack: () => void;
}

export const MembershipPlans = ({ profileData, onBack }: MembershipPlansProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'community',
      name: 'Community',
      price: 'Free',
      period: '',
      icon: Star,
      color: 'bg-green-500',
      features: [
        'Basic profile creation',
        'Access to community forums',
        'Monthly newsletter',
        'Basic pattern templates',
        'Community event notifications',
      ],
      limitations: [
        'Limited portfolio uploads (5 items)',
        'Basic profile visibility',
      ]
    },
    {
      id: 'creator',
      name: 'Creator',
      price: '$9.99',
      period: '/month',
      icon: Crown,
      color: 'bg-orange-500',
      popular: true,
      features: [
        'Enhanced profile with portfolio',
        'Unlimited pattern access',
        'Priority customer support',
        'Advanced design tools',
        'Collaboration features',
        'Event hosting capabilities',
        'Analytics dashboard',
      ],
      limitations: []
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$29.99',
      period: '/month',
      icon: Gem,
      color: 'bg-purple-500',
      features: [
        'Everything in Creator',
        'Premium marketplace access',
        'Direct client booking',
        'Advanced analytics',
        'Custom branding options',
        'API access for integrations',
        'Dedicated account manager',
        'White-label solutions',
      ],
      limitations: []
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleJoin = () => {
    if (!selectedPlan) {
      toast.error("Please select a membership plan");
      return;
    }

    toast.success("Welcome to Amazigh Nations! Your profile has been created.", {
      duration: 4000,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Membership</h2>
        <p className="text-gray-600">Select the plan that best fits your needs</p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;
          
          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl border-2 p-6 transition-all cursor-pointer ${
                isSelected
                  ? 'border-orange-500 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
              }`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500">
                  Most Popular
                </Badge>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${plan.color} text-white mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-center gap-3 opacity-60">
                    <div className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm text-gray-500">{limitation}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${
                  isSelected
                    ? 'bg-orange-500 hover:bg-orange-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPlan(plan.id);
                }}
              >
                {isSelected ? 'Selected' : 'Select Plan'}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={onBack} className="border-orange-200 hover:bg-orange-50">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Button>

        <Button
          onClick={handleJoin}
          disabled={!selectedPlan}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          size="lg"
        >
          Join Amazigh Nations
        </Button>
      </div>
    </div>
  );
};
