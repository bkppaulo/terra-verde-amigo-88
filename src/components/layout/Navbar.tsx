import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
  userName: string;
  userPhone: string;
  onLogout: () => void;
  hideProfileAvatar?: boolean;
}

export const Navbar = ({ userName, userPhone, onLogout, hideProfileAvatar = false }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-gradient-card backdrop-blur-sm border-b border-border/50 px-4 py-4 fixed top-0 left-0 right-0 z-50 shadow-elegant">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-sm">ZÉ</span>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                Assistente Zé Agro
              </h1>
              <p className="text-xs text-muted-foreground">Seu assistente virtual do campo</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-foreground">{userName}</span>
              <span className="text-xs text-muted-foreground">{userPhone}</span>
            </div>
            {!hideProfileAvatar && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/profile')}
                className="p-1 h-auto hover:bg-muted/50 transition-all duration-300 hover:scale-105"
              >
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation - Mobile optimized */}
      <nav className="bg-gradient-card backdrop-blur-sm border-t border-border/50 px-4 py-2 fixed bottom-0 left-0 right-0 z-50 shadow-elegant">
        <div className="flex items-center justify-around max-w-7xl mx-auto">
          <Button
            variant={location.pathname === '/' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigate('/')}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-300 min-h-[60px] ${
              location.pathname === '/' 
                ? 'bg-gradient-primary text-white shadow-glow' 
                : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Início</span>
          </Button>
          
          <Button
            variant={location.pathname === '/profile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-300 min-h-[60px] ${
              location.pathname === '/profile' 
                ? 'bg-gradient-primary text-white shadow-glow' 
                : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Perfil</span>
          </Button>
        </div>
      </nav>

      {/* Spacers for fixed navbars */}
      <div className="h-20"></div> {/* Top navbar spacer */}
      <div className="fixed bottom-0 left-0 right-0 h-20 pointer-events-none"></div> {/* Bottom navbar spacer */}
    </>
  );
};