
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const regions = [
  "Morocco (Tamazgha)",
  "Algeria (Dzayer)",
  "Tunisia (Tunis)",
  "Libya (Libya)",
  "Mali (Mali)",
  "Niger (Niger)",
  "Burkina Faso",
  "Diaspora - Europe",
  "Diaspora - North America",
  "Diaspora - Other"
];

export const BasicInfoForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="fullName">Full Name *</Label>
        <Input id="fullName" placeholder="Enter your full name" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="displayName">Display Name</Label>
        <Input id="displayName" placeholder="How others will see you" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="region">Region/Location *</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select your region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region.toLowerCase().replace(/\s+/g, '-')}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
