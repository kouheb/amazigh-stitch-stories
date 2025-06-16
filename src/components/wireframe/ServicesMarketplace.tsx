
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Plus, Star } from "lucide-react";

export const ServicesMarketplace = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Services Marketplace</h2>
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button size="sm"><Search className="h-4 w-4 mr-2" />Search Services</Button>
            <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />List Service</Button>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">Zardozi Embroidery</Badge>
            <Badge variant="outline">Beading Services</Badge>
            <Badge variant="outline">Pattern Design</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { craft: "Zardozi", price: "$80-300", specialty: "Traditional Wedding Designs" },
            { craft: "Beading", price: "$50-200", specialty: "Modern Fashion Accents" },
            { craft: "Dabka", price: "$60-250", specialty: "Cultural Ceremonial Pieces" }
          ].map((item, index) => (
            <Card key={index} className="p-4 border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="font-medium">Master Artisan</div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    4.8 (24 reviews)
                  </div>
                </div>
              </div>
              <div className="h-24 bg-gray-200 rounded mb-3"></div>
              <h4 className="font-medium mb-1">{item.craft} Specialist</h4>
              <p className="text-sm text-gray-600 mb-2">{item.specialty}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{item.price}</span>
                <Button size="sm">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
};
