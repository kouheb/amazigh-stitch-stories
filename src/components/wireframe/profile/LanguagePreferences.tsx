
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const languages = ["Tamazight", "Arabic", "French", "English", "Spanish", "Other"];

export const LanguagePreferences = () => {
  return (
    <div>
      <Label className="text-base font-medium mb-4 block">Language Preferences</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {languages.map((language) => (
          <div key={language} className="flex items-center space-x-2">
            <Checkbox id={language} />
            <Label htmlFor={language} className="text-sm">{language}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};
