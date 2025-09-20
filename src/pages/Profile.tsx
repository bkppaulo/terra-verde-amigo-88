import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, LogOut, ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { getUserProperties } from "@/lib/properties";

interface ProfileProps {
  userName: string;
  userPhone: string;
  onLogout: () => void;
}

export const Profile = ({ userName, userPhone, onLogout }: ProfileProps) => {
  const navigate = useNavigate();
  const [propertyCount, setPropertyCount] = useState(0);

  useEffect(() => {
    const properties = getUserProperties();
    setPropertyCount(properties.length);
  }, []);
  
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

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
            Meu Perfil
          </h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-4 sm:px-6 py-6 pb-20">
        <div className="max-w-full mx-auto space-y-6 animate-fade-in">
          
          {/* Profile Header Card */}
          <Card className="border-2 border-border/50 shadow-elegant bg-gradient-card overflow-hidden">
            <CardContent className="p-0">
              {/* Background Pattern */}
              <div className="h-20 bg-gradient-primary relative">
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              
              {/* Avatar and Info */}
              <div className="px-4 sm:px-6 pb-6">
                <div className="flex flex-col items-center -mt-10">
                  <Avatar className="h-20 w-20 border-4 border-background shadow-glow mb-3">
                    <AvatarFallback className="bg-gradient-primary text-white text-xl font-bold">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-bold text-foreground mb-2">{userName}</h2>
                  <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                    Usuário
                  </Badge>
                  
                  <div className="flex items-center space-x-6 text-center">
                    <div>
                      <div className="text-xl font-bold text-primary">
                        {propertyCount === 0 ? 'Nenhuma' : propertyCount}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {propertyCount === 1 ? 'Propriedade' : 'Propriedades'}
                      </div>
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
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Telefone</p>
                    <p className="text-sm font-semibold text-foreground">{userPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 shadow-subtle bg-gradient-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Cidade</p>
                    <p className="text-sm font-semibold text-foreground">São Paulo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Logout Button */}
          <div className="pt-2">
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="w-full h-10 text-sm font-medium text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 border border-destructive/20 hover:border-destructive/40 rounded-xl"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair da Conta
            </Button>
          </div>
        </div>
      </div>
      
      {/* Navbar de navegação */}
      <Navbar 
        userName={userName} 
        userPhone={userPhone} 
        onLogout={onLogout}
        hideProfileAvatar={true}
      />
    </div>
  );
};

export default Profile;