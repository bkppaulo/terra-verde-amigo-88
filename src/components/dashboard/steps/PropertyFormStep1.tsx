import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { PropertyFormState } from "@/types/property";

interface PropertyFormStep1Props {
  formData: PropertyFormState;
  onNext: () => void;
  onUpdate: (data: Partial<PropertyFormState>) => void;
}

export const PropertyFormStep1 = ({ formData, onNext, onUpdate }: PropertyFormStep1Props) => {
  const [name, setName] = useState(formData.name);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.length < 3) {
      toast({
        title: "Nome muito curto",
        description: "O nome da propriedade deve ter pelo menos 3 caracteres",
        variant: "destructive",
      });
      return;
    }

    onUpdate({ name });
    onNext();
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-white">1</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">Nome da Propriedade</h3>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Escolha um nome que seja fácil de identificar sua propriedade
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="propertyName" className="text-sm font-semibold text-foreground">
            Nome da propriedade *
          </Label>
          <div className="relative">
            <Input
              id="propertyName"
              type="text"
              placeholder="Ex: Fazenda Boa Vista"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={3}
              className="h-14 text-base border-2 border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
            />
            {name.length > 0 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {name.length >= 3 ? (
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    {3 - name.length} mais
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            Mínimo de 3 caracteres
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