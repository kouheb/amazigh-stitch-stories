
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProgressSteps } from "./hire/ProgressSteps";
import { ServiceSelection } from "./hire/ServiceSelection";
import { RequirementsForm } from "./hire/RequirementsForm";
import { PaymentForm } from "./hire/PaymentForm";
import { ConfirmationStep } from "./hire/ConfirmationStep";

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
          <ServiceSelection
            services={services}
            packages={packages}
            selectedService={selectedService}
            selectedPackage={selectedPackage}
            onServiceSelect={setSelectedService}
            onPackageSelect={setSelectedPackage}
          />
        );
      case 2:
        return <RequirementsForm />;
      case 3:
        return (
          <PaymentForm
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
        );
      case 4:
        return <ConfirmationStep />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProgressSteps steps={steps} currentStep={currentStep} />

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
