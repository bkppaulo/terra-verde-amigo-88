import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Crop, FileText, Check } from "lucide-react";
import { saveProperty, formatArea } from "@/lib/properties";
import { useToast } from "@/hooks/use-toast";
import type { PropertyFormState } from "@/types/property";
import type { Property } from "@/lib/properties";

interface PropertyConfirmationProps {
  formData: PropertyFormState;
  userId: string;
  onBack: () => void;
  onConfirm: () => void;
}

export const PropertyConfirmation = ({ formData, userId, onBack, onConfirm }: PropertyConfirmationProps) => {
  const { toast } = useToast();

  const handleConfirm = () => {
    if (!formData.geometry || !formData.area_m2) {
      toast({
        title: "Erro",
        description: "Dados incompletos da propriedade",
        variant: "destructive",
      });
      return;
    }

    const property: Property = {
      id: `property_${Date.now()}`,
      ownerId: userId,
      name: formData.name,
      cep: formData.cep || undefined,
      city: formData.city,
      description: formData.description || undefined,
      geojson: formData.geometry,
      area_m2: formData.area_m2,
      createdAt: new Date().toISOString(),
    };

    try {
      saveProperty(property);
      
      toast({
        title: "Propriedade salva!",
        description: `${property.name} foi adicionada com sucesso`,
      });
      
      onConfirm();
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a propriedade",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Check className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">Confirmar Propriedade</h3>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Revise as informações antes de salvar sua propriedade
        </p>
      </div>
      
      <Card className="border-2 border-border/50 shadow-elegant bg-gradient-card">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-glow">
              <Check className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-1">{formData.name}</h4>
              <p className="text-sm text-muted-foreground">Nome da propriedade</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-1">
                {formData.city}
              </h4>
              {formData.cep && (
                <p className="text-sm text-muted-foreground mb-1">
                  CEP: {formData.cep}
                </p>
              )}
              <p className="text-sm text-muted-foreground">Localização</p>
            </div>
          </div>
          
          {formData.description && (
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-2">Descrição</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {formData.description}
                </p>
              </div>
            </div>
          )}
          
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <Crop className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-1">
                {formData.area_m2 && formatArea(formData.area_m2)}
              </h4>
              <p className="text-sm text-muted-foreground">Área total definida</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack} 
          className="flex-1 h-14 text-base font-semibold border-2 hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] rounded-xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Button 
          onClick={handleConfirm} 
          className="flex-1 h-14 text-base font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-[1.02] rounded-xl"
        >
          <Check className="h-5 w-5 mr-2" />
          Salvar Propriedade
        </Button>
      </div>
    </div>
  );
};