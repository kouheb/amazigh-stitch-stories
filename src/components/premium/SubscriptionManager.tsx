
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Calendar, 
  Download, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'cancelled' | 'past_due';
  nextBilling: string;
  amount: number;
  currency: string;
}

export const SubscriptionManager = () => {
  const [subscription, setSubscription] = useState<Subscription>({
    id: "sub_123",
    plan: "Artisan Pro",
    status: "active",
    nextBilling: "2024-02-15",
    amount: 19,
    currency: "USD"
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubscription({ ...subscription, status: 'cancelled' });
      setIsLoading(false);
    }, 1000);
  };

  const handleReactivateSubscription = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubscription({ ...subscription, status: 'active' });
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4" />;
      case 'past_due':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Subscription Management</h2>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Account Settings
        </Button>
      </div>

      {/* Current Plan */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Current Plan</h3>
            <p className="text-gray-600">Manage your subscription details</p>
          </div>
          <Badge className={getStatusColor(subscription.status)}>
            {getStatusIcon(subscription.status)}
            <span className="ml-1 capitalize">{subscription.status}</span>
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-2xl font-bold text-gray-900">{subscription.plan}</div>
            <div className="text-gray-600">
              ${subscription.amount}/{subscription.currency === 'USD' ? 'month' : 'mo'}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500 mb-1">Next Billing Date</div>
            <div className="flex items-center gap-2 text-gray-900">
              <Calendar className="h-4 w-4" />
              {subscription.nextBilling}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500 mb-1">Payment Method</div>
            <div className="flex items-center gap-2 text-gray-900">
              <CreditCard className="h-4 w-4" />
              •••• •••• •••• 4242
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Billing Actions</h4>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Update Payment Method
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Download Invoices
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">Subscription Actions</h4>
          <div className="space-y-2">
            {subscription.status === 'active' ? (
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleCancelSubscription}
                disabled={isLoading}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                {isLoading ? 'Cancelling...' : 'Cancel Subscription'}
              </Button>
            ) : (
              <Button 
                className="w-full justify-start bg-green-600 hover:bg-green-700"
                onClick={handleReactivateSubscription}
                disabled={isLoading}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {isLoading ? 'Reactivating...' : 'Reactivate Subscription'}
              </Button>
            )}
            <Button variant="outline" className="w-full justify-start">
              Change Plan
            </Button>
          </div>
        </Card>
      </div>

      {/* Usage Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Current Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">24</div>
            <div className="text-sm text-gray-500">Portfolio Items</div>
            <div className="text-xs text-gray-400">Unlimited</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">8</div>
            <div className="text-sm text-gray-500">Active Workshops</div>
            <div className="text-xs text-gray-400">Unlimited</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">156</div>
            <div className="text-sm text-gray-500">Students Taught</div>
            <div className="text-xs text-gray-400">This month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">92%</div>
            <div className="text-sm text-gray-500">Satisfaction Rate</div>
            <div className="text-xs text-gray-400">From reviews</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
