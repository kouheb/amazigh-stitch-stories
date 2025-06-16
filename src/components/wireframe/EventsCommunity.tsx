
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Heart, MessageSquare, Users, Share, Building, Bell } from "lucide-react";

export const EventsCommunity = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Events & Cultural Activities</h2>
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {[
                { title: 'Amazigh Cultural Festival', date: 'March 15-17', location: 'Marrakech', type: 'Cultural' },
                { title: 'Zardozi Workshop Series', date: 'March 22', location: 'Online', type: 'Workshop' },
                { title: 'Artisan Market Pop-up', date: 'April 5', location: 'Casablanca', type: 'Market' },
                { title: 'Traditional Beading Exhibition', date: 'April 12', location: 'Fez', type: 'Exhibition' }
              ].map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded">
                  <div className="w-12 h-12 bg-orange-200 rounded flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <span>{event.date}</span>
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                      <Badge variant="outline" className="text-xs">{event.type}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm">Join</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Community Features</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Discussion Forums
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Craft-Specific Groups
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share className="h-4 w-4 mr-2" />
                Share Projects
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Building className="h-4 w-4 mr-2" />
                Studio Partnerships
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Event Notifications
              </Button>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <h4 className="font-medium mb-2">Community Highlights</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• 500+ active artisans</div>
                <div>• 50+ workshops monthly</div>
                <div>• 25+ studio partnerships</div>
                <div>• 12 cultural events this quarter</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
