import type { PropertyFormData, PropertyGeometry } from "@/lib/properties";

export interface PropertyFormState extends PropertyFormData {
  geometry?: PropertyGeometry;
  area_m2?: number;
}