import { Stratum } from '@/types/Stratum';

export interface Rate {
  id: number;
  subsidyPercent: number;
  contributionPercent: number;
  fixedCharge: number;
  basic: number;
  complementary: number;
  sanctuary: number;
  year: number;
  month: number;
  active: boolean;
  createdAt: number;
  stratum: Stratum;
}