import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Crop, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatArea } from "@/lib/properties";
import type { Property } from "@/lib/properties";

interface PropertyListProps {
  properties: Property[];
}

export const PropertyList = ({ properties }: PropertyListProps) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
          <Home className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">
          Nenhuma propriedade cadastrada
        </h3>
        <p className="text-muted-foreground mb-4">
          Adicione sua primeira propriedade
        </p>
        <p className="text-sm text-muted-foreground">
          Use o botão + no canto inferior direito
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <Card 
      className="bg-card border border-border shadow-subtle hover:shadow-elegant transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:border-primary/20" 
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h3 className="font-semibold text-foreground text-lg mb-2">
              {property.name}
            </h3>
            {property.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {property.description}
              </p>
            )}
          </div>
          
          {/* Simple Info List */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Localização</p>
                <p className="font-medium text-foreground">{property.city}{property.cep && ` • ${property.cep}`}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Crop className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Área</p>
                <p className="font-medium text-foreground">{formatArea(property.area_m2)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Cadastrada</p>
                <p className="font-medium text-foreground">{formatDate(property.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};