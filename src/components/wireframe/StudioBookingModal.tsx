
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Users, AlertTriangle, FileText, CreditCard } from "lucide-react";

interface StudioBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  studio: {
    name: string;
    type: string;
    price: string;
  };
}

export const StudioBookingModal = ({ isOpen, onClose, studio }: StudioBookingModalProps) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    participants: "",
    purpose: "",
  });
  const [agreements, setAgreements] = useState({
    terms: false,
    liability: false,
    damage: false,
    cancellation: false,
    equipment: false,
  });

  const businessRules = [
    {
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      title: "Booking Requirements",
      rules: [
        "Minimum 2-hour booking duration",
        "48-hour advance booking required",
        "Maximum 30-day advance booking",
        "Same-day bookings subject to availability"
      ]
    },
    {
      icon: <CreditCard className="h-5 w-5 text-green-500" />,
      title: "Payment Terms",
      rules: [
        "50% deposit required to secure booking",
        "Balance due 24 hours before session",
        "$100 security deposit for equipment use",
        "No refunds for cancellations under 24 hours"
      ]
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      title: "Studio Policies",
      rules: [
        "Maximum capacity: 8 people",
        "No food or drinks near equipment",
        "Clean workspace before departure",
        "Operating hours: 8 AM - 10 PM daily"
      ]
    }
  ];

  const agreementItems = [
    {
      key: "terms" as keyof typeof agreements,
      title: "Terms & Conditions",
      description: "I agree to the studio terms and conditions, including operating hours and usage guidelines."
    },
    {
      key: "liability" as keyof typeof agreements,
      title: "Liability Waiver",
      description: "I understand and accept responsibility for any injuries or accidents during my session."
    },
    {
      key: "damage" as keyof typeof agreements,
      title: "Equipment Responsibility",
      description: "I agree to pay for any damage to studio equipment or property during my booking."
    },
    {
      key: "cancellation" as keyof typeof agreements,
      title: "Cancellation Policy",
      description: "I understand the 48-hour cancellation policy and associated fees."
    },
    {
      key: "equipment" as keyof typeof agreements,
      title: "Equipment Usage",
      description: "I certify that I am qualified to use the studio equipment or will receive proper instruction."
    }
  ];

  const allAgreementsChecked = Object.values(agreements).every(Boolean);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleBooking = () => {
    // Handle booking submission
    console.log("Booking submitted:", { bookingData, agreements });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Book {studio.name}</DialogTitle>
          <p className="text-gray-600">{studio.type} • {studio.price}</p>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              <span className={`ml-2 text-sm ${step >= stepNum ? 'text-blue-500' : 'text-gray-500'}`}>
                {stepNum === 1 ? 'Details' : stepNum === 2 ? 'Rules & Terms' : 'Confirmation'}
              </span>
              {stepNum < 3 && <div className="w-12 h-px bg-gray-300 ml-4" />}
            </div>
          ))}
        </div>

        {/* Step 1: Booking Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="participants">Number of Participants</Label>
                <Input
                  id="participants"
                  type="number"
                  placeholder="Max 8 people"
                  value={bookingData.participants}
                  onChange={(e) => setBookingData({ ...bookingData, participants: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={bookingData.startTime}
                  onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={bookingData.endTime}
                  onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="purpose">Purpose of Booking</Label>
              <Input
                id="purpose"
                placeholder="e.g., Embroidery workshop, Photography session..."
                value={bookingData.purpose}
                onChange={(e) => setBookingData({ ...bookingData, purpose: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Step 2: Business Rules & Agreements */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Business Rules */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Studio Policies & Requirements
              </h3>
              <div className="grid gap-4">
                {businessRules.map((section, index) => (
                  <Card key={index} className="p-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      {section.icon}
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.rules.map((rule, ruleIndex) => (
                        <li key={ruleIndex} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>

            {/* Agreement Checkboxes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Required Agreements</h3>
              <div className="space-y-3">
                {agreementItems.map((item) => (
                  <div key={item.key} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={item.key}
                      checked={agreements[item.key]}
                      onCheckedChange={(checked) =>
                        setAgreements({ ...agreements, [item.key]: !!checked })
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor={item.key} className="font-medium cursor-pointer">
                        {item.title}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Booking Summary</h3>
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Studio:</span>
                  <span>{studio.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{bookingData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Time:</span>
                  <span>{bookingData.startTime} - {bookingData.endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Participants:</span>
                  <span>{bookingData.participants} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Purpose:</span>
                  <span>{bookingData.purpose}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total Cost:</span>
                  <span className="text-green-600">{studio.price}</span>
                </div>
              </div>
            </Card>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Next Steps:</strong> After confirmation, you'll receive a booking confirmation email with payment instructions. 
                A 50% deposit is required within 24 hours to secure your booking.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={step === 1 ? onClose : handlePrevious}
          >
            {step === 1 ? 'Cancel' : 'Previous'}
          </Button>
          
          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={step === 2 && !allAgreementsChecked}
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleBooking}>
              Confirm Booking
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
