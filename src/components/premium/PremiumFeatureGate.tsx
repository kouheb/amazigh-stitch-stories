
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Lock } from "lucide-react";

interface PremiumFeatureGateProps {
  feature: string;
  description: string;
  requiredPlan: string;
  onUpgrade: () => void;
  children?: React.ReactNode;
  isUnlocked?: boolean;
}

export const PremiumFeatureGate = ({
  feature,
  description,
  requiredPlan,
  onUpgrade,
  children,
  isUnlocked = false
}: PremiumFeatureGateProps) => {
  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <Card className="p-6 border-2 border-dashed border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
          <Crown className="h-8 w-8 text-orange-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          <Lock className="h-4 w-4 inline mr-2" />
          {feature}
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-500 mb-2">Required Plan:</p>
          <div className="font-semibold text-orange-600">{requiredPlan}</div>
        </div>
        <Button onClick={onUpgrade} className="bg-orange-600 hover:bg-orange-700">
          Upgrade to {requiredPlan}
        </Button>
      </div>
    </Card>
  );
};
