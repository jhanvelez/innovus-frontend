import { Route } from '@/types/Route';

export interface Cycle {
  id: string;
  name: string;
  isActive: boolean;
  routes: Route[];
  createdAt: string;
}