
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FormTermsAndActionsProps {
  onSubmit?: () => void;
}

export const FormTermsAndActions = ({ onSubmit }: FormTermsAndActionsProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile form submitted");
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6 pt-6 border-t">
      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm leading-5">
            I agree to the{" "}
            <a href="#" className="text-orange-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-orange-600 hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox id="marketing" />
          <Label htmlFor="marketing" className="text-sm leading-5">
            I would like to receive updates about new features, events, and opportunities from Amazigh Nations
          </Label>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox id="community" />
          <Label htmlFor="community" className="text-sm leading-5">
            I'm interested in participating in community events and collaborations
          </Label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button variant="outline" className="flex-1">
          Save as Draft
        </Button>
        <Button 
          onClick={handleSubmit}
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          Create Profile & Continue
        </Button>
      </div>
    </div>
  );
};
