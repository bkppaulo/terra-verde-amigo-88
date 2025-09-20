import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { OTPVerification } from "@/components/auth/OTPVerification";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Profile as ProfileComponent } from "../pages/Profile";
import { AddProperty as AddPropertyComponent } from "../pages/AddProperty";
import { PropertyDetails as PropertyDetailsComponent } from "../pages/PropertyDetails";
import { getAuthState, saveAuthState, clearAuthState } from "@/lib/auth";
import type { User } from "@/lib/auth";

type AuthStep = 'login' | 'otp' | 'dashboard';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on page load
    const authState = getAuthState();
    if (authState && authState.isAuthenticated && authState.user) {
      setUser(authState.user);
      setCurrentStep('dashboard');
    }
    setIsLoading(false);
  }, []);

  const handleOTPSent = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentStep('otp');
  };

  const handleOTPVerified = (verifiedUser: User) => {
    setUser(verifiedUser);
    saveAuthState(verifiedUser);
    setCurrentStep('dashboard');
  };

  const handleLogout = () => {
    clearAuthState();
    setUser(null);
    setPhoneNumber('');
    setCurrentStep('login');
  };

  const handleBackToLogin = () => {
    setPhoneNumber('');
    setCurrentStep('login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  switch (currentStep) {
    case 'login':
      return <LoginForm onOTPSent={handleOTPSent} />;
    
    case 'otp':
      return (
        <OTPVerification
          phone={phoneNumber}
          onVerified={handleOTPVerified}
          onBack={handleBackToLogin}
        />
      );
    
    case 'dashboard':
      return user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : null;
    
    default:
      return null;
  }
};

// Wrapper components for routing
const ProfileWrapper = () => {
  const authState = getAuthState();
  if (!authState?.user) {
    window.location.href = '/';
    return null;
  }
  return (
    <ProfileComponent 
      userName={authState.user.name} 
      userPhone={authState.user.phone} 
      onLogout={() => {
        clearAuthState();
        window.location.href = '/';
      }} 
    />
  );
};

const AddPropertyWrapper = () => {
  const authState = getAuthState();
  if (!authState?.user) {
    window.location.href = '/';
    return null;
  }
  return <AddPropertyComponent userId={authState.user.id} />;
};

const PropertyDetailsWrapper = () => {
  const authState = getAuthState();
  if (!authState?.user) {
    window.location.href = '/';
    return null;
  }
  return (
    <PropertyDetailsComponent 
      user={authState.user} 
      onLogout={() => {
        clearAuthState();
        window.location.href = '/';
      }} 
    />
  );
};

export { ProfileWrapper as Profile, AddPropertyWrapper as AddProperty, PropertyDetailsWrapper as PropertyDetails };

export default Index;
