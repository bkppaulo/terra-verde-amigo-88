import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Loader2 } from "lucide-react";
import { validatePhone, sendOTP } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onOTPSent: (phone: string) => void;
}

export const LoginForm = ({ onOTPSent }: LoginFormProps) => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(phone)) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, insira um número de celular válido com DDD",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await sendOTP(phone);
      
      if (result.success) {
        toast({
          title: "Código enviado!",
          description: result.message,
        });
        onOTPSent(phone);
      } else {
        toast({
          title: "Erro ao enviar código",
          description: "Tente novamente em alguns instantes",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Verifique sua conexão e tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneInput = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Apply formatting
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 3) {
      return `(${digits.substring(0, 2)}) ${digits.substring(2)}`;
    } else if (digits.length <= 7) {
      return `(${digits.substring(0, 2)}) ${digits.substring(2, 3)} ${digits.substring(3)}`;
    } else if (digits.length <= 11) {
      return `(${digits.substring(0, 2)}) ${digits.substring(2, 3)} ${digits.substring(3, 7)}-${digits.substring(7)}`;
    }
    
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setPhone(formatted);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <Smartphone className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Bem-vindo ao AssistenteZé</CardTitle>
          <CardDescription>
            Informe seu celular com DDD para acessar o sistema
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Número do celular</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 9 9999-9999"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={16}
                required
              />
              <p className="text-xs text-muted-foreground">
                Formato: (XX) 9 XXXX-XXXX
              </p>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando código...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Um código de verificação será enviado via SMS
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};