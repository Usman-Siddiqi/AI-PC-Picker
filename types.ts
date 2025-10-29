export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

export interface UserPreferences {
  budget: number;
  currency: Currency;
  useCase: 'Gaming' | 'Workstation' | 'General Use' | 'Video Editing';
  cpuPreference: 'No Preference' | 'Intel' | 'AMD';
  gpuPreference: 'No Preference' | 'NVIDIA' | 'AMD';
}

export interface Part {
  category: string;
  name: string;
  price: number;
  justification: string;
  imageUrl: string;
}

export interface PartListResponse {
  parts: Part[];
  totalCost: number;
  summary: string;
}