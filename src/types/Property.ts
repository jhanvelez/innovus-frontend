import { Subscriber } from '@/types/Subscriber';
import { Stratum } from '@/types/Stratum';
import { Tenant } from '@/types/Tenant';
import { Cycle } from '@/types/Cycle';

export interface Property {
  id: string;
  cadastralRecord: string;
  address: string;
  stratum: Stratum;
  cycle: Cycle;
  route: string;
  subscriber: Subscriber;
  tenant: Tenant;
  active: boolean;
}