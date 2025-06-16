
import { useState } from "react";
import { Header } from "@/components/Header";
import { ProfileForm } from "@/components/ProfileForm";
import { MembershipPlans } from "@/components/MembershipPlans";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Membership = () => {
  const [step, setStep] = useState<'profile' | 'membership'>('profile');
  const [profileData, setProfileData] = useState(null);

  const handleProfileComplete = (data: any) => {
    setProfileData(data);
    setStep('membership');
  };

  const handleBack = () => {
    setStep('profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Designer
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Join Amazigh Nations</h1>
              <p className="text-gray-600">Connect with the global Amazigh community</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                step === 'profile' ? 'bg-orange-500 text-white' : 'bg-orange-200 text-orange-700'
              }`}>
                1
              </div>
              <div className="w-12 h-1 bg-orange-200"></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                step === 'membership' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
            </div>
          </div>

          {/* Content */}
          {step === 'profile' ? (
            <ProfileForm onComplete={handleProfileComplete} />
          ) : (
            <MembershipPlans profileData={profileData} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Membership;
