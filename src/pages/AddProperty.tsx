import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PropertyFormStep1 } from "@/components/dashboard/steps/PropertyFormStep1";
import { PropertyFormStep2 } from "@/components/dashboard/steps/PropertyFormStep2";
import { PropertyFormStep3 } from "@/components/dashboard/steps/PropertyFormStep3";
import { PropertyFormStep4 } from "@/components/dashboard/steps/PropertyFormStep4";
import { PropertyConfirmation } from "@/components/dashboard/steps/PropertyConfirmation";
import type { PropertyFormData, PropertyGeometry } from "@/lib/properties";
import type { PropertyFormState } from "@/types/property";

interface AddPropertyProps {
  userId: string;
}

export const AddProperty = ({ userId }: AddPropertyProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormState>({
    name: "",
    cep: "",
    city: "",
    description: "",
  });

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/');
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateFormData = (data: Partial<PropertyFormState>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handlePropertyAdded = () => {
    navigate('/');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PropertyFormStep1
            formData={formData}
            onNext={handleNext}
            onUpdate={updateFormData}
          />
        );
      case 2:
        return (
          <PropertyFormStep2
            formData={formData}
            onNext={handleNext}
            onBack={handleBack}
            onUpdate={updateFormData}
          />
        );
      case 3:
        return (
          <PropertyFormStep3
            formData={formData}
            onNext={handleNext}
            onBack={handleBack}
            onUpdate={updateFormData}
          />
        );
      case 4:
        return (
          <PropertyFormStep4
            formData={formData}
            onNext={handleNext}
            onBack={handleBack}
            onUpdate={updateFormData}
          />
        );
      case 5:
        return (
          <PropertyConfirmation
            formData={formData}
            userId={userId}
            onBack={handleBack}
            onConfirm={handlePropertyAdded}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-24">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex-shrink-0 w-12">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="hover:bg-muted/50 transition-all duration-300 hover:scale-105 p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 text-center">
              <h1 className="text-base sm:text-lg font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight whitespace-nowrap">
                Nova Propriedade
              </h1>
              <div className="flex items-center justify-center mt-1">
                <span className="text-xs text-muted-foreground">
                  Passo {currentStep} de 5
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-2 max-w-sm mx-auto">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-12 flex justify-end">
              <div className="text-right text-xs text-muted-foreground">
                {currentStep}/5
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-card backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6 md:p-8 shadow-elegant animate-fade-in">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;