
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const FormTermsAndActions = () => {
  return (
    <div className="space-y-6">
      {/* Terms and Privacy */}
      <div className="border-t pt-6">
        <div className="flex items-start space-x-2 mb-4">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm leading-relaxed">
            I agree to the <span className="text-orange-600 underline cursor-pointer">Terms of Service</span> and <span className="text-orange-600 underline cursor-pointer">Privacy Policy</span>
          </Label>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox id="newsletter" />
          <Label htmlFor="newsletter" className="text-sm">
            I would like to receive updates about fashion events, exhibitions, and community news
          </Label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6">
        <Button variant="outline" className="flex-1">
          Save as Draft
        </Button>
        <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
          Create Profile
        </Button>
      </div>
    </div>
  );
};
