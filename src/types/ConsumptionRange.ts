import { Stratum } from '@/types/Stratum';

export interface ConsumptionRange {
  id: number;
  stratum: Stratum;
  min: number;
  max: number;
  type: string;
  rate: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}