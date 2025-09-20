import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Loader2, ArrowLeft } from "lucide-react";
import { validateOTP, verifyOTP } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/lib/auth";

interface OTPVerificationProps {
  phone: string;
  onVerified: (user: User) => void;
  onBack: () => void;
}

export const OTPVerification = ({ phone, onVerified, onBack }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateOTP(otp)) {
      toast({
        title: "Código inválido",
        description: "O código deve ter exatamente 6 dígitos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await verifyOTP(phone, otp);
      
      if (result.success && result.user) {
        toast({
          title: "Login realizado!",
          description: "Bem-vindo ao AssistenteZé Agro",
        });
        onVerified(result.user);
      } else {
        toast({
          title: "Código incorreto",
          description: "Verifique o código e tente novamente",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro de verificação",
        description: "Tente novamente em alguns instantes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Verificar código</CardTitle>
          <CardDescription>
            Digite o código de 6 dígitos enviado para<br />
            <strong>{phone}</strong>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Código de verificação</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={handleOTPChange}
                maxLength={6}
                className="text-center text-lg tracking-widest"
                required
              />
              <p className="text-xs text-muted-foreground text-center">
                Para demonstração, use o código: <strong>123456</strong>
              </p>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                'Verificar código'
              )}
            </Button>
            
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onBack}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};