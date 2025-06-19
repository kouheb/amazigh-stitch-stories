
import { useState } from "react";
import { MembershipPlans } from "@/components/MembershipPlans";
import { SubscriptionManager } from "@/components/premium/SubscriptionManager";
import { PremiumFeatureGate } from "@/components/premium/PremiumFeatureGate";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Star, Zap, Users, Calendar, BarChart3 } from "lucide-react";

export const Membership = () => {
  const [currentPlan, setCurrentPlan] = useState<string>("free"); // free, artisan, master
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleUpgrade = () => {
    setShowUpgrade(true);
  };

  const premiumFeatures = [
    {
      title: "Advanced Analytics",
      description: "Get detailed insights into your workshop performance, student engagement, and revenue trends.",
      requiredPlan: "Artisan Pro",
      icon: <BarChart3 className="h-5 w-5" />,
      demo: (
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Workshop Views</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </Card>
      )
    },
    {
      title: "Unlimited Portfolio",
      description: "Showcase unlimited projects and create multiple galleries for different craft specializations.",
      requiredPlan: "Artisan Pro",
      icon: <Star className="h-5 w-5" />,
      demo: (
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-full h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      )
    },
    {
      title: "Team Collaboration",
      description: "Invite team members, manage multiple studios, and coordinate group workshops.",
      requiredPlan: "Master Craftsperson",
      icon: <Users className="h-5 w-5" />,
      demo: (
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-200 rounded-full"></div>
              <span className="text-sm">Studio Manager</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-200 rounded-full"></div>
              <span className="text-sm">Lead Instructor</span>
            </div>
          </div>
        </Card>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Membership & Pricing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock the full potential of your craft with our premium features and tools
          </p>
          
          {/* Current Plan Badge */}
          <div className="mt-6">
            <Badge className="px-4 py-2 text-sm bg-orange-100 text-orange-800">
              Current Plan: {currentPlan === 'free' ? 'Community' : 
                           currentPlan === 'artisan' ? 'Artisan Pro' : 'Master Craftsperson'}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Plans & Pricing
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Premium Features
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Manage Subscription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans">
            {showUpgrade ? (
              <div className="text-center mb-8">
                <Button 
                  variant="outline" 
                  onClick={() => setShowUpgrade(false)}
                  className="mb-4"
                >
                  ← Back to Overview
                </Button>
              </div>
            ) : null}
            <MembershipPlans />
          </TabsContent>

          <TabsContent value="features">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Premium Features Preview
                </h2>
                <p className="text-gray-600">
                  See what you can unlock with our premium plans
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="space-y-4">
                    <Card className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {feature.requiredPlan}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        {feature.demo}
                      </div>
                    </Card>

                    <PremiumFeatureGate
                      feature={feature.title}
                      description={feature.description}
                      requiredPlan={feature.requiredPlan}
                      onUpgrade={handleUpgrade}
                      isUnlocked={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manage">
            {currentPlan === 'free' ? (
              <Card className="p-8 text-center">
                <Crown className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                <h3 className="text-xl font-semibold mb-2">No Active Subscription</h3>
                <p className="text-gray-600 mb-6">
                  You're currently on the free Community plan. Upgrade to unlock premium features!
                </p>
                <Button onClick={handleUpgrade} className="bg-orange-600 hover:bg-orange-700">
                  View Premium Plans
                </Button>
              </Card>
            ) : (
              <SubscriptionManager />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
