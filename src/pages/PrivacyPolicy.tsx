
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-gray-600 hover:text-black hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card className="p-8">
          <h1 className="text-3xl font-bold text-black mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">1. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-black mb-2">Personal Information</h3>
                  <p>We collect information you provide directly to us, such as when you create an account, update your profile, or contact us. This may include:</p>
                  <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                    <li>Name and email address</li>
                    <li>Profile information (location, skills, bio)</li>
                    <li>Portfolio and work samples</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-black mb-2">Usage Information</h3>
                  <p>We automatically collect certain information about your use of our services, including:</p>
                  <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                    <li>Device information and browser type</li>
                    <li>IP address and location data</li>
                    <li>Pages visited and features used</li>
                    <li>Date and time of access</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Connect artisans and facilitate collaborations</li>
                <li>Personalize your experience and content</li>
                <li>Send you updates, notifications, and marketing communications</li>
                <li>Respond to your comments and questions</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-4">3. Information Sharing</h2>
              <p className="mb-4">We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>With other users:</strong> Your profile information and portfolio may be visible to other users</li>
                <li><strong>Service providers:</strong> We may share information with third-party service providers who help us operate our platform</li>
                <li><strong>Legal requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                <li><strong>Business transfers:</strong> Information may be transferred in connection with a merger or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-4">4. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-4">5. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Access and update your personal information</li>
                <li>Delete your account and personal data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Object to certain processing of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-4">6. Cookies and Tracking</h2>
              <p>We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookies through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-4">7. Third-Party Services</h2>
              <p>Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-4">8. Children's Privacy</h2>
              <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-4">9. International Users</h2>
              <p>If you are accessing our services from outside your country, please note that your information may be transferred to and processed in countries with different privacy laws.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-4">10. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on our platform.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black mb-4">11. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our practices, please contact us at:</p>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p><strong>Email:</strong> privacy@amazighnations.com</p>
                <p><strong>Address:</strong> [Your Company Address]</p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};
