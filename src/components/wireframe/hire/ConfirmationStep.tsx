
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, MessageSquare, Calendar, Clock } from "lucide-react";

export const ConfirmationStep = () => {
  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="h-10 w-10 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600">Your project has been successfully submitted</p>
      </div>

      <Card className="p-6 max-w-md mx-auto text-left">
        <h3 className="font-semibold mb-4">Order Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Order ID:</span>
            <span className="font-mono">#AZ-2024-001</span>
          </div>
          <div className="flex justify-between">
            <span>Service:</span>
            <span>Custom Zardozi Design</span>
          </div>
          <div className="flex justify-between">
            <span>Artisan:</span>
            <span>Fatima Al-Zahra</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Delivery:</span>
            <span>2-3 weeks</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total Paid:</span>
            <span>$390</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <Card className="p-4 text-center">
          <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <h4 className="font-medium mb-1">Direct Chat</h4>
          <p className="text-xs text-gray-600">Message Fatima directly</p>
          <Button size="sm" className="mt-2 w-full">Open Chat</Button>
        </Card>
        
        <Card className="p-4 text-center">
          <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <h4 className="font-medium mb-1">Schedule Meeting</h4>
          <p className="text-xs text-gray-600">Video consultation</p>
          <Button size="sm" variant="outline" className="mt-2 w-full">Schedule</Button>
        </Card>
        
        <Card className="p-4 text-center">
          <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
          <h4 className="font-medium mb-1">Track Progress</h4>
          <p className="text-xs text-gray-600">Real-time updates</p>
          <Button size="sm" variant="outline" className="mt-2 w-full">View Status</Button>
        </Card>
      </div>
    </div>
  );
};
