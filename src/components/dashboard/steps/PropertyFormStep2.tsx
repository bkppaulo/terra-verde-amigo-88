import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { validateCEP, formatCEP } from "@/lib/properties";
import { useToast } from "@/hooks/use-toast";
import type { PropertyFormState } from "@/types/property";

interface PropertyFormStep2Props {
  formData: PropertyFormState;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (data: Partial<PropertyFormState>) => void;
}

export const PropertyFormStep2 = ({ formData, onNext, onBack, onUpdate }: PropertyFormStep2Props) => {
  const [cep, setCep] = useState(formData.cep);
  const [city, setCity] = useState(formData.city);
  const { toast } = useToast();

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.length === 8 ? formatCEP(value) : value;
    setCep(formatted);
    
    // Auto-fetch city when CEP is complete
    if (value.length === 8 && validateCEP(formatted)) {
      // In a real app, this would call ViaCEP API
      // For demo, we'll set a placeholder city
      setCity("Cidade (pelo CEP)");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cep && !validateCEP(cep)) {
      toast({
        title: "CEP inválido",
        description: "Digite um CEP válido no formato 00000-000",
        variant: "destructive",
      });
      return;
    }

    if (!cep && !city) {
      toast({
        title: "Localização obrigatória",
        description: "Informe o CEP ou o nome da cidade",
        variant: "destructive",
      });
      return;
    }

    onUpdate({ cep, city: city || "Cidade não informada" });
    onNext();
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-white">2</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">Localização</h3>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Informe o CEP ou nome da cidade onde fica a propriedade
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="cep" className="text-sm font-semibold text-foreground">CEP</Label>
          <div className="relative">
            <Input
              id="cep"
              type="text"
              placeholder="00000-000"
              value={cep}
              onChange={handleCepChange}
              maxLength={9}
              className="h-14 text-base border-2 border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
            />
            {cep && validateCEP(cep) && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gradient-card px-4 py-2 text-muted-foreground font-medium rounded-full border border-border/50">
              ou
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <Label htmlFor="city" className="text-sm font-semibold text-foreground">Nome da cidade</Label>
          <div className="relative">
            <Input
              id="city"
              type="text"
              placeholder="Ex: São Paulo"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-14 text-base border-2 border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
            />
            {city.length > 0 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
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