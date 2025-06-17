
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Check } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
}

interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
}

interface ServiceSelectionProps {
  services: Service[];
  packages: Package[];
  selectedService: string;
  selectedPackage: string;
  onServiceSelect: (serviceId: string) => void;
  onPackageSelect: (packageId: string) => void;
}

export const ServiceSelection = ({
  services,
  packages,
  selectedService,
  selectedPackage,
  onServiceSelect,
  onPackageSelect
}: ServiceSelectionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Service</h2>
        <p className="text-gray-600">Select the service you'd like to hire Fatima for</p>
      </div>

      {/* Artisan Info */}
      <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-lg font-medium">F</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Fatima Al-Zahra</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.9 (127 reviews)</span>
              <MapPin className="h-4 w-4 ml-2" />
              <span>Fez, Morocco</span>
            </div>
            <Badge className="bg-orange-100 text-orange-800">Master Zardozi Artisan</Badge>
          </div>
        </div>
      </Card>

      {/* Service Selection */}
      <div className="space-y-3">
        {services.map((service) => (
          <Card 
            key={service.id}
            className={`p-4 cursor-pointer transition-all border-2 ${
              selectedService === service.id 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onServiceSelect(service.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{service.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {service.duration}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">${service.price}</span>
                <p className="text-sm text-gray-500">Starting price</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Package Selection */}
      <div>
        <h3 className="font-semibold mb-4">Choose Package</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                selectedPackage === pkg.id 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onPackageSelect(pkg.id)}
            >
              <div className="text-center mb-4">
                <h4 className="font-semibold text-lg">{pkg.name}</h4>
                <span className="text-3xl font-bold">${pkg.price}</span>
              </div>
              <ul className="space-y-2 text-sm">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
