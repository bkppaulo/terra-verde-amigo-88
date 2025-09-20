import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { PropertyList } from "./PropertyList";
import { getUserProperties } from "@/lib/properties";
import type { Property } from "@/lib/properties";
import type { User } from "@/lib/auth";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = () => {
    const userProperties = getUserProperties();
    setProperties(userProperties);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar 
        userName={user.name} 
        userPhone={user.phone} 
        onLogout={onLogout} 
      />
      
      <main className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <PropertyList properties={properties} />
        </div>
      </main>
      
      {/* Modern Floating Button */}
      <Button
        onClick={() => navigate('/add-property')}
        className="fixed bottom-32 right-6 h-12 w-12 rounded-xl bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-110 shadow-elegant z-40"
        size="icon"
      >
        <Plus className="h-8 w-8 text-white" />
      </Button>
    </div>
  );
};