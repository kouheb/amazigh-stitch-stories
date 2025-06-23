import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const regions = [
  // North Africa (Amazigh regions)
  "Morocco (Al-Maghrib)",
  "Algeria (Al-Jazāʾir)", 
  "Tunisia (Tūnis)",
  "Libya (Lībiyā)",
  "Egypt (Miṣr)",
  
  // West Africa
  "Mali (Mali)",
  "Niger (Niger)", 
  "Burkina Faso",
  "Mauritania (Mūrītānyā)",
  "Senegal (Sénégal)",
  "Chad (Tchad)",
  
  // Other African Countries
  "Nigeria",
  "Ghana",
  "Ivory Coast (Côte d'Ivoire)",
  "Cameroon (Cameroun)",
  "South Africa",
  "Kenya",
  "Ethiopia (ʾĪtyōṗṗyā)",
  "Tanzania",
  "Uganda",
  "Rwanda",
  "Democratic Republic of Congo",
  
  // Middle East
  "Saudi Arabia (Al-ʿArabiyyah as-Suʿūdiyyah)",
  "United Arab Emirates (UAE)",
  "Qatar (Qaṭar)",
  "Kuwait (Al-Kuwayt)",
  "Bahrain (Al-Baḥrayn)",
  "Oman (ʿUmān)",
  "Yemen (Al-Yaman)",
  "Jordan (Al-ʾUrdun)",
  "Lebanon (Lubnān)",
  "Syria (Sūriyā)",
  "Iraq (Al-ʿIrāq)",
  "Iran (Īrān)",
  "Turkey (Türkiye)",
  "Israel (Yisrāʾēl)",
  "Palestine (Filasṭīn)",
  
  // Europe
  "France (France)",
  "Spain (España)",
  "Italy (Italia)",
  "Germany (Deutschland)",
  "United Kingdom (UK)",
  "Netherlands (Nederland)",
  "Belgium (België/Belgique)",
  "Switzerland (Schweiz/Suisse)",
  "Sweden (Sverige)",
  "Norway (Norge)",
  "Denmark (Danmark)",
  "Portugal (Portugal)",
  "Greece (Elláda)",
  
  // North America
  "United States (USA)",
  "Canada",
  "Mexico (México)",
  
  // Diaspora Categories
  "Diaspora - Europe",
  "Diaspora - North America", 
  "Diaspora - Australia/Oceania",
  "Diaspora - Asia",
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
            <SelectValue placeholder="Select your region or country" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {regions.map((region) => (
              <SelectItem key={region} value={region.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
