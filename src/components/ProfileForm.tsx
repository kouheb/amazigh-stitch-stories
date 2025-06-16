
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { User, Building, Briefcase, PenTool } from "lucide-react";

interface ProfileFormProps {
  onComplete: (data: any) => void;
}

export const ProfileForm = ({ onComplete }: ProfileFormProps) => {
  const [profileType, setProfileType] = useState<'individual' | 'organization' | 'business' | null>(null);
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      location: "",
      bio: "",
      website: "",
      specialties: [] as string[],
      experience: "",
      portfolio: "",
    }
  });

  const profileTypes = [
    {
      id: 'individual',
      title: 'Individual Creator',
      description: 'Artists, designers, researchers, journalists',
      icon: User,
    },
    {
      id: 'organization',
      title: 'Organization',
      description: 'Cultural organizations, NGOs, institutions',
      icon: Building,
    },
    {
      id: 'business',
      title: 'Business',
      description: 'Fashion brands, design studios, media companies',
      icon: Briefcase,
    },
  ];

  const specialtyOptions = [
    'Fashion Design',
    'Textile Arts',
    'Jewelry Design',
    'Cultural Research',
    'Journalism',
    'Photography',
    'Traditional Crafts',
    'Digital Art',
    'Cultural Preservation',
    'Community Organizing',
  ];

  const onSubmit = (data: any) => {
    if (!profileType) {
      toast.error("Please select a profile type");
      return;
    }

    const completeData = {
      ...data,
      profileType,
    };

    toast.success("Profile information saved!");
    onComplete(completeData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Profile</h2>
        <p className="text-gray-600">Tell us about yourself and your work with Amazigh culture</p>
      </div>

      {/* Profile Type Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">What best describes you?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profileTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setProfileType(type.id as any)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  profileType === type.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <Icon className="h-6 w-6 text-orange-500 mb-2" />
                <h4 className="font-semibold text-gray-800">{type.title}</h4>
                <p className="text-sm text-gray-600">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name / Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourwebsite.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio / Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about yourself, your work, and your connection to Amazigh culture..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Specialties */}
          <div>
            <Label className="text-base font-medium">Areas of Expertise</Label>
            <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {specialtyOptions.map((specialty) => (
                <div key={specialty} className="flex items-center space-x-2">
                  <Checkbox
                    id={specialty}
                    onCheckedChange={(checked) => {
                      const current = form.getValues('specialties');
                      if (checked) {
                        form.setValue('specialties', [...current, specialty]);
                      } else {
                        form.setValue('specialties', current.filter(s => s !== specialty));
                      }
                    }}
                  />
                  <Label htmlFor={specialty} className="text-sm">{specialty}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            size="lg"
          >
            Continue to Membership
          </Button>
        </form>
      </Form>
    </div>
  );
};
