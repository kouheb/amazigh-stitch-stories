
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  CreditCard,
  Shield,
  MessageSquare
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    title: string;
    artisan: {
      name: string;
      avatar: string;
      verified: boolean;
    };
    price: { min: number; max: number };
    duration: string;
  };
}

export const BookingModal = ({ isOpen, onClose, service }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectTitle: "",
    description: "",
    deadline: "",
    budget: "",
    contactMethod: "message"
  });

  const handleSubmit = () => {
    console.log("Booking submitted:", formData);
    setStep(3); // Go to confirmation
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="project-title">Project Title *</Label>
              <Input
                id="project-title"
                value={formData.projectTitle}
                onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                placeholder="e.g., Wedding dress embroidery"
              />
            </div>

            <div>
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your project requirements in detail..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deadline">Preferred Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Input
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder={`$${service.price.min} - $${service.price.max}`}
                />
              </div>
            </div>

            <Card className="p-4 bg-blue-50">
              <h4 className="font-medium mb-2">How would you like to proceed?</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="contact"
                    value="message"
                    checked={formData.contactMethod === "message"}
                    onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                  />
                  <span className="text-sm">Send message to discuss details first</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="contact"
                    value="book"
                    checked={formData.contactMethod === "book"}
                    onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                  />
                  <span className="text-sm">Book consultation ($25 deposit)</span>
                </label>
              </div>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Consultation Booking</h3>
              <p className="text-gray-600">Secure your consultation slot</p>
            </div>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="font-medium">Video Consultation</div>
                  <div className="text-sm text-gray-600">30 minutes • $25 deposit</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                This deposit will be deducted from your final project cost if you proceed.
              </div>
            </Card>

            <div>
              <Label>Payment Method</Label>
              <Card className="p-4 mt-2 border-2 border-orange-200">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5" />
                  <div className="flex-1">
                    <div className="font-medium">Credit Card</div>
                    <div className="text-sm text-gray-600">Secure payment via Stripe</div>
                  </div>
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
              </Card>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Request Sent!</h3>
              <p className="text-gray-600">
                Your project request has been sent to {service.artisan.name}
              </p>
            </div>

            <Card className="p-4 text-left">
              <h4 className="font-medium mb-2">What happens next?</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• The artisan will review your request</li>
                <li>• You'll receive a response within 24 hours</li>
                <li>• You can chat directly to discuss details</li>
                <li>• Schedule a consultation if needed</li>
              </ul>
            </Card>

            <Button 
              onClick={onClose}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Continue Browsing
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={service.artisan.avatar} />
              <AvatarFallback>
                {service.artisan.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-left">{service.title}</DialogTitle>
              <DialogDescription className="text-left">
                with {service.artisan.name}
                {service.artisan.verified && (
                  <Shield className="inline h-3 w-3 text-blue-600 ml-1" />
                )}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {renderStep()}

        {step < 3 && (
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={step === 1 ? onClose : () => setStep(step - 1)}
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            
            <Button
              onClick={step === 1 ? 
                (formData.contactMethod === "book" ? () => setStep(2) : handleSubmit) : 
                handleSubmit
              }
              disabled={!formData.projectTitle || !formData.description}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {step === 1 
                ? (formData.contactMethod === "book" ? "Continue" : "Send Request")
                : "Confirm Booking"
              }
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
