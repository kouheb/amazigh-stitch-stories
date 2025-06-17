
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

export const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.id 
                ? 'bg-orange-500 border-orange-500 text-white' 
                : 'bg-white border-gray-300 text-gray-400'
            }`}>
              {currentStep > step.id ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-24 h-0.5 ml-4 ${
                currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.id} className="text-center" style={{ width: '150px' }}>
            <h4 className={`text-sm font-medium ${
              currentStep >= step.id ? 'text-gray-800' : 'text-gray-400'
            }`}>
              {step.title}
            </h4>
            <p className={`text-xs ${
              currentStep >= step.id ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
