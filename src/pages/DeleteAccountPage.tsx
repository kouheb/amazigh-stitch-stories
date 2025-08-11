
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Mail } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const DeleteAccountPage = () => {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      // In a real app, this would send to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, we'll open the email client as fallback
      const subject = encodeURIComponent("Account Deletion Request");
      const body = encodeURIComponent(
        `Hello,\n\nI would like to request the deletion of my account and all associated data from Fil et Toile Studio.\n\nEmail: ${email}\nReason: ${reason}\n\nPlease confirm when this has been completed.\n\nThank you.`
      );
      window.open(`mailto:support@filettoilestudio.com?subject=${subject}&body=${body}`, '_blank');
      
      toast.success("Deletion request sent successfully");
      setEmail("");
      setReason("");
    } catch (error) {
      toast.error("Failed to send deletion request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-gray-800">
            Fil et Toile Studio
          </a>
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-900">
            Back
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <CardTitle className="text-2xl font-bold">Delete Account</CardTitle>
            </div>
            <p className="text-gray-600">
              Request permanent deletion of your account and all associated data.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• This action cannot be undone</li>
                <li>• All your data will be permanently deleted</li>
                <li>• Your profile, posts, and messages will be removed</li>
                <li>• Processing may take up to 30 days</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <Label htmlFor="reason">Reason for Deletion (Optional)</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Help us improve by sharing why you're leaving..."
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? "Sending Request..." : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Deletion Request
                  </>
                )}
              </Button>
            </form>

            <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p><strong>What happens next?</strong></p>
              <p>
                Your deletion request will be sent to our support team. We'll process your request 
                and send you a confirmation email once your account has been deleted.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
