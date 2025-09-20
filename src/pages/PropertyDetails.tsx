import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, MapPin, Square, Calendar, Trash2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { getUserProperties, formatArea } from "@/lib/properties";
import { useToast } from "@/hooks/use-toast";
import type { Property } from "@/lib/properties";
import type { User } from "@/lib/auth";

interface PropertyDetailsProps {
  user: User;
  onLogout: () => void;
}

export const PropertyDetails = ({ user, onLogout }: PropertyDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (id) {
      const properties = getUserProperties();
      const foundProperty = properties.find(p => p.id === id);
      setProperty(foundProperty || null);
    }
  }, [id]);

  const handleDelete = () => {
    if (!property) return;

    const properties = getUserProperties();
    const updatedProperties = properties.filter(p => p.id !== property.id);
    localStorage.setItem('userProperties', JSON.stringify(updatedProperties));

    toast({
      title: "Propriedade excluída",
      description: `${property.name} foi removida com sucesso.`,
    });

    navigate('/');
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Propriedade não encontrada</h2>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <div className="bg-gradient-card backdrop-blur-sm border-b border-border/50 px-4 sm:px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-full mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="hover:bg-muted/50 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
            Detalhes da Propriedade
          </h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir propriedade</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir "{property.name}"? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Property Content */}
      <div className="px-4 sm:px-6 py-6 pb-20">
        <div className="max-w-full mx-auto space-y-6 animate-fade-in">
          
          {/* Property Header Card */}
          <Card className="border-2 border-border/50 shadow-elegant bg-gradient-card overflow-hidden">
            <CardContent className="p-0">
              {/* Background Pattern */}
              <div className="h-20 bg-gradient-primary relative">
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              
              {/* Property Info */}
              <div className="px-4 sm:px-6 pb-6">
                <div className="flex flex-col items-center -mt-10">
                  <div className="h-20 w-20 bg-gradient-primary rounded-2xl flex items-center justify-center border-4 border-background shadow-glow mb-3">
                    <Square className="h-8 w-8 text-white" />
                  </div>
                  
                  <h2 className="text-xl font-bold text-foreground mb-2">{property.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{property.city}</span>
                    {property.cep && <span>• {property.cep}</span>}
                  </div>
                  
                  <div className="flex items-center space-x-6 text-center">
                    <div>
                      <div className="text-xl font-bold text-primary">{formatArea(property.area_m2)}</div>
                      <div className="text-xs text-muted-foreground">Área</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Cards - Grid 2 colunas compacto */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Card className="border border-border/50 shadow-subtle bg-gradient-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Square className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Área Total</p>
                    <p className="text-sm font-semibold text-foreground">{property.area_m2.toLocaleString()} m²</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 shadow-subtle bg-gradient-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Cadastrada</p>
                    <p className="text-sm font-semibold text-foreground">{new Date(property.createdAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          {property.description && (
            <Card className="border border-border/50 shadow-subtle bg-gradient-card">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-foreground">Descrição</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Map Info */}
          <Card className="border border-border/50 shadow-subtle bg-gradient-card">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Localização no Mapa</h3>
                  <p className="text-sm text-muted-foreground">
                    {property.geojson.coordinates[0].length - 1} vértices desenhados
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;