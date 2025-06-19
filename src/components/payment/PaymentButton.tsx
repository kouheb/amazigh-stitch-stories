
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CreditCard } from "lucide-react";

interface PaymentButtonProps {
  planType: "free" | "artisan" | "master";
  planName: string;
  amount: number;
  disabled?: boolean;
  className?: string;
}

export const PaymentButton = ({ 
  planType, 
  planName, 
  amount, 
  disabled = false,
  className = ""
}: PaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Check if Supabase environment variables are available
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        toast({
          title: "Configuration Required",
          description: "Please connect your project to Supabase to enable payments.",
          variant: "destructive",
        });
        return;
      }

      // Dynamically import and create Supabase client only when needed
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to upgrade your membership.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          planType,
          planName,
          amount
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (planType === "free") {
    return (
      <Button variant="outline" disabled className={className}>
        Current Plan
      </Button>
    );
  }

  return (
    <Button 
      onClick={handlePayment}
      disabled={disabled || loading}
      className={`bg-orange-600 hover:bg-orange-700 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="h-4 w-4 mr-2" />
          Upgrade to {planName}
        </>
      )}
    </Button>
  );
};
