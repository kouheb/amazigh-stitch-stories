
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  CreditCard,
  PayPal,
  Smartphone,
  Check,
  MessageSquare,
  Calendar
} from "lucide-react";

export const HirePaymentFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState("custom");
  const [selectedPackage, setSelectedPackage] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const steps = [
    { id: 1, title: "Service Details", description: "Choose your service" },
    { id: 2, title: "Requirements", description: "Project specifications" },
    { id: 3, title: "Payment", description: "Secure checkout" },
    { id: 4, title: "Confirmation", description: "Order complete" }
  ];

  const services = [
    { id: "custom", name: "Custom Zardozi Design", price: 250, duration: "2-3 weeks" },
    { id: "repair", name: "Garment Repair & Restoration", price: 80, duration: "5-7 days" },
    { id: "consultation", name: "Design Consultation", price: 120, duration: "1-2 hours" }
  ];

  const packages = [
    { id: "basic", name: "Basic", price: 200, features: ["Simple design", "1 revision", "Standard delivery"] },
    { id: "standard", name: "Standard", price: 350, features: ["Detailed design", "3 revisions", "Progress updates", "Priority support"] },
    { id: "premium", name: "Premium", price: 500, features: ["Complex design", "Unlimited revisions", "Daily updates", "Express delivery", "Video consultation"] }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Service</h2>
              <p className="text-gray-600">Select the service you'd like to hire Fatima for</p>
            </div>

            {/* Artisan Info */}
            <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium">F</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Fatima Al-Zahra</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.9 (127 reviews)</span>
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>Fez, Morocco</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Master Zardozi Artisan</Badge>
                </div>
              </div>
            </Card>

            {/* Service Selection */}
            <div className="space-y-3">
              {services.map((service) => (
                <Card 
                  key={service.id}
                  className={`p-4 cursor-pointer transition-all border-2 ${
                    selectedService === service.id 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {service.duration}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">${service.price}</span>
                      <p className="text-sm text-gray-500">Starting price</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Package Selection */}
            <div>
              <h3 className="font-semibold mb-4">Choose Package</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <Card 
                    key={pkg.id}
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      selectedPackage === pkg.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-lg">{pkg.name}</h4>
                      <span className="text-3xl font-bold">${pkg.price}</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Project Requirements</h2>
              <p className="text-gray-600">Provide details about your project</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="project-title">Project Title</Label>
                  <Input id="project-title" placeholder="e.g., Wedding Dress Embroidery" />
                </div>
                <div>
                  <Label htmlFor="deadline">Preferred Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Input id="budget" placeholder="e.g., $300 - $500" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Project Description</Label>
                  <textarea 
                    id="description"
                    rows={4}
                    className="w-full p-3 border rounded-md"
                    placeholder="Describe your project in detail..."
                  />
                </div>
                <div>
                  <Label>Attach Reference Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="text-gray-500">
                      <p>Drag & drop images here or click to browse</p>
                      <p className="text-sm mt-1">PNG, JPG up to 10MB each</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-4 bg-blue-50">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Communication Preferences
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Daily progress updates</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Video consultations</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">SMS notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Email updates</span>
                </label>
              </div>
            </Card>
          </div>
        );

      case 3:
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
                    onClick={() => setPaymentMethod("card")}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Card
                  </Button>
                  <Button
                    variant={paymentMethod === "paypal" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("paypal")}
                    className="flex items-center gap-2"
                  >
                    <PayPal className="h-4 w-4" />
                    PayPal
                  </Button>
                  <Button
                    variant={paymentMethod === "mobile" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("mobile")}
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
                    <PayPal className="h-12 w-12 mx-auto mb-4 text-blue-600" />
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

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600">Your project has been successfully submitted</p>
            </div>

            <Card className="p-6 max-w-md mx-auto text-left">
              <h3 className="font-semibold mb-4">Order Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-mono">#AZ-2024-001</span>
                </div>
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span>Custom Zardozi Design</span>
                </div>
                <div className="flex justify-between">
                  <span>Artisan:</span>
                  <span>Fatima Al-Zahra</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span>2-3 weeks</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Paid:</span>
                  <span>$390</span>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Card className="p-4 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-medium mb-1">Direct Chat</h4>
                <p className="text-xs text-gray-600">Message Fatima directly</p>
                <Button size="sm" className="mt-2 w-full">Open Chat</Button>
              </Card>
              
              <Card className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h4 className="font-medium mb-1">Schedule Meeting</h4>
                <p className="text-xs text-gray-600">Video consultation</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">Schedule</Button>
              </Card>
              
              <Card className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <h4 className="font-medium mb-1">Track Progress</h4>
                <p className="text-xs text-gray-600">Real-time updates</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">View Status</Button>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-orange-500 border-orange-500 text-white' 
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-0.5 ml-4 ${
                  currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="text-center" style={{ width: '150px' }}>
              <h4 className={`text-sm font-medium ${
                currentStep >= step.id ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {step.title}
              </h4>
              <p className={`text-xs ${
                currentStep >= step.id ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-8 mb-6">
        {renderStepContent()}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        
        {currentStep < 4 ? (
          <Button
            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            className="flex items-center gap-2"
          >
            {currentStep === 3 ? 'Complete Payment' : 'Continue'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => setCurrentStep(1)}>
            Start New Order
          </Button>
        )}
      </div>
    </div>
  );
};
