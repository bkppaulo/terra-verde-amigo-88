// Property management utilities
export interface PropertyGeometry {
  type: 'Polygon';
  coordinates: number[][][];
}

export interface Property {
  id: string;
  ownerId: string;
  name: string;
  cep?: string;
  city: string;
  description?: string;
  geojson: PropertyGeometry;
  area_m2: number;
  createdAt: string;
}

export interface PropertyFormData {
  name: string;
  cep: string;
  city: string;
  description: string;
}

export const validateCEP = (cep: string): boolean => {
  const cepRegex = /^\d{5}-?\d{3}$/;
  return cepRegex.test(cep);
};

export const formatCEP = (cep: string): string => {
  const cleaned = cep.replace(/\D/g, '');
  if (cleaned.length === 8) {
    return `${cleaned.substring(0, 5)}-${cleaned.substring(5)}`;
  }
  return cep;
};

export const saveProperty = (property: Property): void => {
  const properties = getUserProperties();
  properties.push(property);
  localStorage.setItem('userProperties', JSON.stringify(properties));
};

export const getUserProperties = (): Property[] => {
  try {
    const stored = localStorage.getItem('userProperties');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const calculateArea = (coordinates: number[][][]): number => {
  // Simplified area calculation for polygon
  // In a real app, use Google Maps geometry library or turf.js
  if (!coordinates[0] || coordinates[0].length < 3) return 0;
  
  let area = 0;
  const ring = coordinates[0];
  
  for (let i = 0; i < ring.length - 1; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[i + 1];
    area += (x1 * y2 - x2 * y1);
  }
  
  // Convert to approximate square meters (very rough approximation)
  // Real implementation would use proper geodesic calculations
  return Math.abs(area) * 111000 * 111000 / 2;
};

export const formatArea = (areaM2: number): string => {
  if (areaM2 < 10000) {
    return `${areaM2.toFixed(0)} m²`;
  } else {
    const hectares = areaM2 / 10000;
    return `${hectares.toFixed(2)} ha`;
  }
};