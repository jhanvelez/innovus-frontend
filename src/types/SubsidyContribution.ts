import { Stratum } from '@/types/Stratum';

export interface SubsidyContribution {
  id: number;
  type: string;
  value: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  stratum: Stratum;
}