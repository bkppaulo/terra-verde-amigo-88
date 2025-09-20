import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Map, Square } from "lucide-react";
import { calculateArea, formatArea } from "@/lib/properties";
import { useToast } from "@/hooks/use-toast";
import type { PropertyFormState } from "@/types/property";
import type { PropertyGeometry } from "@/lib/properties";

interface PropertyFormStep4Props {
  formData: PropertyFormState;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (data: Partial<PropertyFormState>) => void;
}

export const PropertyFormStep4 = ({ formData, onNext, onBack, onUpdate }: PropertyFormStep4Props) => {
  const [hasDrawing, setHasDrawing] = useState(false);
  const [geometry, setGeometry] = useState<PropertyGeometry | null>(null);
  const { toast } = useToast();

  // Simulate drawing on map - in real app this would integrate with Google Maps Drawing
  const simulateDrawing = () => {
    // Create a sample polygon for demonstration
    const sampleGeometry: PropertyGeometry = {
      type: 'Polygon',
      coordinates: [[
        [-46.6333, -23.5505], // São Paulo coordinates as example
        [-46.6300, -23.5505],
        [-46.6300, -23.5470],
        [-46.6333, -23.5470],
        [-46.6333, -23.5505]
      ]]
    };
    
    setGeometry(sampleGeometry);
    setHasDrawing(true);
    
    toast({
      title: "Área desenhada!",
      description: "Polígono criado com sucesso",
    });
  };

  const clearDrawing = () => {
    setGeometry(null);
    setHasDrawing(false);
  };

  const handleSubmit = () => {
    if (!geometry) {
      toast({
        title: "Desenhe a área",
        description: "É necessário desenhar a área da propriedade no mapa",
        variant: "destructive",
      });
      return;
    }

    const area_m2 = calculateArea(geometry.coordinates);
    onUpdate({ geometry, area_m2 });
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Desenhar no Mapa</h3>
        <p className="text-muted-foreground">
          Desenhe os limites da sua propriedade no mapa
        </p>
      </div>
      
      {/* Map simulation area */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="h-80 bg-neutral-50 flex flex-col items-center justify-center relative">
          <Map className="h-16 w-16 text-muted-foreground mb-4" />
          {formData.city && (
            <p className="text-sm text-muted-foreground mb-6">
              Mapa centrado em: {formData.city}
            </p>
          )}
          
          {!hasDrawing ? (
            <Button onClick={simulateDrawing} size="lg">
              <Square className="h-4 w-4 mr-2" />
              Desenhar área
            </Button>
          ) : (
            <div className="text-center space-y-4">
              <div className="inline-block bg-primary/10 border border-primary/20 rounded-lg p-4">
                <Square className="h-10 w-10 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-primary">
                  Área desenhada
                </p>
                <p className="text-xs text-muted-foreground">
                  {geometry && formatArea(calculateArea(geometry.coordinates))}
                </p>
              </div>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline" onClick={clearDrawing}>
                  Limpar
                </Button>
                <Button size="sm" onClick={simulateDrawing}>
                  Redesenhar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {hasDrawing && geometry && (
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium">Informações da área:</h4>
          <div className="text-sm space-y-1">
            <p>Área: <span className="font-medium">{formatArea(calculateArea(geometry.coordinates))}</span></p>
            <p>Vértices: <span className="font-medium">{geometry.coordinates[0].length - 1}</span></p>
          </div>
        </div>
      )}
      
      <Button onClick={handleSubmit} className="w-full h-12 text-sm font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-[1.02] rounded-xl" disabled={!hasDrawing}>
        Próximo
        <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
      </Button>
      
      <p className="text-xs text-center text-muted-foreground mt-4">
        Em produção: Integração com Google Maps Drawing API
      </p>
    </div>
  );
};