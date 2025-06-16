
import { Card } from "@/components/ui/card";
import { Users, Briefcase, GraduationCap, Calendar, Building } from "lucide-react";

export const MainNavigation = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
      <Card className="p-6 border-2 border-blue-200 bg-blue-50">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-bold">Network</h3>
        </div>
        <ul className="space-y-2 text-sm">
          <li>• Discover artisans nearby</li>
          <li>• Connect with peers</li>
          <li>• Follow favorite creators</li>
          <li>• Join communities</li>
          <li>• Messaging system</li>
        </ul>
      </Card>

      <Card className="p-6 border-2 border-green-200 bg-green-50">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="h-6 w-6 text-green-600" />
          <h3 className="text-xl font-bold">Services</h3>
        </div>
        <ul className="space-y-2 text-sm">
          <li>• List your services</li>
          <li>• Browse available work</li>
          <li>• Hire specialists</li>
          <li>• Project collaboration</li>
          <li>• Payment integration</li>
        </ul>
      </Card>

      <Card className="p-6 border-2 border-purple-200 bg-purple-50">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-bold">Learn</h3>
        </div>
        <ul className="space-y-2 text-sm">
          <li>• Take online classes</li>
          <li>• Teach your skills</li>
          <li>• Workshop scheduling</li>
          <li>• Skill certifications</li>
          <li>• Resource library</li>
        </ul>
      </Card>

      <Card className="p-6 border-2 border-orange-200 bg-orange-50">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="h-6 w-6 text-orange-600" />
          <h3 className="text-xl font-bold">Events</h3>
        </div>
        <ul className="space-y-2 text-sm">
          <li>• Local craft fairs</li>
          <li>• Networking events</li>
          <li>• Fashion shows</li>
          <li>• Cultural celebrations</li>
          <li>• Pop-up markets</li>
        </ul>
      </Card>

      <Card className="p-6 border-2 border-pink-200 bg-pink-50">
        <div className="flex items-center gap-3 mb-4">
          <Building className="h-6 w-6 text-pink-600" />
          <h3 className="text-xl font-bold">Studios</h3>
        </div>
        <ul className="space-y-2 text-sm">
          <li>• Rent art studios</li>
          <li>• Book workshop spaces</li>
          <li>• Shared workspaces</li>
          <li>• Equipment rental</li>
          <li>• Creative retreats</li>
        </ul>
      </Card>
    </div>
  );
};
