
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CreditCard, Wallet, Smartphone } from "lucide-react";

interface PaymentFormProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

export const PaymentForm = ({ paymentMethod, onPaymentMethodChange }: PaymentFormProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Secure Payment</h2>
        <p className="text-gray-600">Complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <Card className="p-4 space-y-4">
            <div className="flex justify-between">
              <span>Custom Zardozi Design</span>
              <span>$350</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Service fee</span>
              <span>$25</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Processing fee</span>
              <span>$15</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>$390</span>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Secure Payment</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your payment is protected by our secure payment system
              </p>
            </div>
          </Card>
        </div>

        {/* Payment Form */}
        <div>
          <h3 className="font-semibold mb-4">Payment Method</h3>
          
          {/* Payment Method Selection */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <Button
              variant={paymentMethod === "card" ? "default" : "outline"}
              onClick={() => onPaymentMethodChange("card")}
              className="flex items-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              Card
            </Button>
            <Button
              variant={paymentMethod === "paypal" ? "default" : "outline"}
              onClick={() => onPaymentMethodChange("paypal")}
              className="flex items-center gap-2"
            >
              <Wallet className="h-4 w-4" />
              PayPal
            </Button>
            <Button
              variant={paymentMethod === "mobile" ? "default" : "outline"}
              onClick={() => onPaymentMethodChange("mobile")}
              className="flex items-center gap-2"
            >
              <Smartphone className="h-4 w-4" />
              Mobile
            </Button>
          </div>

          {paymentMethod === "card" && (
            <Card className="p-4 space-y-4">
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
              <div>
                <Label htmlFor="cardholder">Cardholder Name</Label>
                <Input id="cardholder" placeholder="John Doe" />
              </div>
              
              <hr />
              
              <div>
                <Label htmlFor="billing-address">Billing Address</Label>
                <Input id="billing-address" placeholder="123 Main Street" className="mb-2" />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="City" />
                  <Input placeholder="ZIP Code" />
                </div>
              </div>
            </Card>
          )}

          {paymentMethod === "paypal" && (
            <Card className="p-8 text-center">
              <Wallet className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600 mb-4">You'll be redirected to PayPal to complete your payment</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Continue with PayPal
              </Button>
            </Card>
          )}

          {paymentMethod === "mobile" && (
            <Card className="p-4 space-y-4">
              <div>
                <Label htmlFor="mobile-number">Mobile Number</Label>
                <Input id="mobile-number" placeholder="+1 (555) 123-4567" />
              </div>
              <p className="text-sm text-gray-600">
                We'll send you a secure payment link via SMS
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
