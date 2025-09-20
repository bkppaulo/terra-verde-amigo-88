import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import type { PropertyFormState } from "@/types/property";

interface PropertyFormStep3Props {
  formData: PropertyFormState;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (data: Partial<PropertyFormState>) => void;
}

export const PropertyFormStep3 = ({ formData, onNext, onBack, onUpdate }: PropertyFormStep3Props) => {
  const [description, setDescription] = useState(formData.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ description });
    onNext();
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-white">3</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">Descrição</h3>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Adicione informações adicionais sobre sua propriedade
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full">
          <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
          <span className="text-xs text-muted-foreground font-medium">Etapa opcional</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="description" className="text-sm font-semibold text-foreground">
            Descrição da propriedade
          </Label>
          <div className="relative">
            <Textarea
              id="description"
              placeholder="Ex: Propriedade com cultivo de soja e milho, área irrigada, boa estrutura, casa sede renovada..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="resize-none text-base border-2 border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
              {description.length > 0 && `${description.length} caracteres`}
            </div>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            Descreva características importantes como culturas, infraestrutura, localização
          </p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-12 text-sm font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-[1.02] rounded-xl"
        >
          Próximo
          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
        </Button>
      </form>
    </div>
  );
};