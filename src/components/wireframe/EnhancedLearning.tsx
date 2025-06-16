
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Building, Users, Palette, Clock } from "lucide-react";

export const EnhancedLearning = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Platform & Workshops</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Available Classes & Workshops</h3>
          <div className="space-y-4">
            {[
              { title: 'Zardozi Embroidery Masterclass', duration: '6 weeks', level: 'Advanced', price: '$199', type: 'Online' },
              { title: 'Beading Techniques Workshop', duration: '2 days', level: 'Beginner', price: '$149', type: 'In-Person' },
              { title: 'Dabka Traditional Methods', duration: '4 weeks', level: 'Intermediate', price: '$159', type: 'Hybrid' }
            ].map((course, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded">
                <div className="w-16 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded flex items-center justify-center">
                  <Palette className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{course.title}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{course.duration}</span>
                    <Badge variant="outline" className="text-xs">{course.level}</Badge>
                    <Badge variant="secondary" className="text-xs">{course.type}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{course.price}</div>
                  <Button size="sm">Enroll</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Teaching & Workshop Hosting</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Create New Course
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Workshop
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Building className="h-4 w-4 mr-2" />
              Book Studio Space
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Manage Students
            </Button>
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Your Teaching Stats</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• 23 active students</div>
                <div>• $1,240 monthly earnings</div>
                <div>• 4.9 average rating</div>
                <div>• 3 upcoming workshops</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
