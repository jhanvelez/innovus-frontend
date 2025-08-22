import { Subscriber } from '@/types/Subscriber';
import { Tenant } from '@/types/Tenant';

export interface Property {
  id: string;
  cadastralRecord: string;
  address: string;
  cycle: string;
  route: string;
  subscriber: Subscriber;
  tenant: Tenant;
}