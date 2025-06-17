
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const experienceLevels = [
  "Beginner (0-2 years)",
  "Intermediate (3-5 years)", 
  "Advanced (6-10 years)",
  "Expert (10+ years)",
  "Master/Elder (Generational knowledge)"
];

const goals = [
  "Showcase my work",
  "Find collaborators", 
  "Learn new techniques",
  "Sell my designs",
  "Attend fashion shows",
  "Organize events",
  "Network with artists",
  "Cultural fashion research",
  "Mentorship opportunities",
  "Brand partnerships"
];

export const ExperienceAndGoals = () => {
  return (
    <div className="space-y-8">
      {/* Experience Level */}
      <div>
        <Label htmlFor="experience">Experience Level *</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select your experience level" />
          </SelectTrigger>
          <SelectContent>
            {experienceLevels.map((level) => (
              <SelectItem key={level} value={level.toLowerCase().replace(/\s+/g, '-')}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bio/Description */}
      <div>
        <Label htmlFor="bio">About You *</Label>
        <Textarea 
          id="bio"
          placeholder="Tell us about your creative journey, your work in fashion/arts, and what you hope to contribute to the Amazigh Nations community..."
          className="mt-1 min-h-[120px]"
        />
        <p className="text-xs text-gray-500 mt-1">Minimum 50 characters</p>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input id="website" placeholder="https://yourportfolio.com" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="social">Social Media Handle</Label>
          <Input id="social" placeholder="@yourusername" className="mt-1" />
        </div>
      </div>

      {/* Goals and Interests */}
      <div>
        <Label className="text-base font-medium mb-4 block">What are you looking for? *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {goals.map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox id={goal} />
              <Label htmlFor={goal} className="text-sm">{goal}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
