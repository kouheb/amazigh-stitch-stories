
import { Card } from "@/components/ui/card";

export const MobileAppFeatures = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mobile App Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="w-16 h-28 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <div className="w-12 h-20 bg-gray-200 rounded"></div>
          </div>
          <h3 className="font-semibold mb-2">Quick Booking</h3>
          <p className="text-sm text-gray-600">Book studios and classes instantly</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-16 h-28 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <div className="w-12 h-20 bg-gray-200 rounded"></div>
          </div>
          <h3 className="font-semibold mb-2">Portfolio Upload</h3>
          <p className="text-sm text-gray-600">Upload work photos on-the-go</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-16 h-28 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <div className="w-12 h-20 bg-gray-200 rounded"></div>
          </div>
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600">Real-time messaging with artisans</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-16 h-28 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <div className="w-12 h-20 bg-gray-200 rounded"></div>
          </div>
          <h3 className="font-semibold mb-2">AR Try-On</h3>
          <p className="text-sm text-gray-600">Visualize embroidery on garments</p>
        </Card>
      </div>
    </section>
  );
};
