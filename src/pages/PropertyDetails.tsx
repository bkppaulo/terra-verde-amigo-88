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
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar 
        userName={user.name} 
        userPhone={user.phone} 
        onLogout={onLogout} 
      />
      
      <main className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-muted/50 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
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

          {/* Property Details */}
          <div className="space-y-6">
            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {property.name}
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{property.city}</span>
                {property.cep && <span>• {property.cep}</span>}
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Square className="h-5 w-5 text-primary" />
                    Área
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-foreground">
                    {formatArea(property.area_m2)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {property.area_m2.toLocaleString()} m²
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Criada em
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-foreground">
                    {new Date(property.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(property.createdAt).toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            {property.description && (
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Descrição</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Map Placeholder */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Localização no Mapa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border border-border/50">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Mapa da propriedade
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {property.geojson.coordinates[0].length - 1} vértices desenhados
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;