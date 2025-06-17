
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface RoleSelectionProps {
  selectedRoles: string[];
  onRoleToggle: (role: string) => void;
}

const roleCategories = [
  {
    category: "Fashion Design",
    roles: [
      "Fashion Designer",
      "Textile Designer", 
      "Pattern Maker",
      "Fashion Stylist",
      "Costume Designer",
      "Accessories Designer",
      "Sustainable Fashion Designer",
      "Haute Couture Designer"
    ]
  },
  {
    category: "Artisan & Crafts",
    roles: [
      "Artisan",
      "Traditional Craftsperson",
      "Seamstress/Tailor",
      "Embroidery Artist",
      "Weaver",
      "Leather Worker",
      "Jewelry Maker",
      "Beadwork Artist"
    ]
  },
  {
    category: "Visual Arts", 
    roles: [
      "Artist",
      "Textile Artist",
      "Fashion Illustrator",
      "Digital Artist",
      "Print Designer",
      "Surface Pattern Designer",
      "Color Specialist",
      "Art Director"
    ]
  },
  {
    category: "Fashion Photography & Media",
    roles: [
      "Fashion Photographer",
      "Fashion Videographer",
      "Content Creator",
      "Fashion Blogger",
      "Social Media Manager",
      "Fashion Journalist",
      "Brand Photographer",
      "Editorial Photographer"
    ]
  },
  {
    category: "Modeling & Performance",
    roles: [
      "Fashion Model",
      "Runway Model",
      "Plus Size Model",
      "Cultural Model",
      "Brand Ambassador",
      "Fit Model",
      "Fashion Show Coordinator",
      "Performance Artist"
    ]
  },
  {
    category: "Business & Education",
    roles: [
      "Fashion Entrepreneur",
      "Fashion Educator",
      "Fashion Consultant",
      "Brand Manager",
      "Fashion Buyer",
      "Fashion Merchandiser",
      "Workshop Instructor",
      "Cultural Fashion Consultant"
    ]
  }
];

export const RoleSelection = ({ selectedRoles, onRoleToggle }: RoleSelectionProps) => {
  return (
    <div>
      <Label className="text-base font-medium mb-4 block">Your Fashion & Arts Expertise *</Label>
      <p className="text-sm text-gray-600 mb-4">Select all that apply to you</p>
      
      <div className="space-y-6">
        {roleCategories.map((category) => (
          <div key={category.category}>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              {category.category}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-4">
              {category.roles.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox 
                    id={role} 
                    checked={selectedRoles.includes(role)}
                    onCheckedChange={() => onRoleToggle(role)}
                  />
                  <Label htmlFor={role} className="text-sm cursor-pointer">{role}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
