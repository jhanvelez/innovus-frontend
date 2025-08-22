export interface Tenant {
  id: string;
  identification: number;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  serviceStartDate: string;
  createdAt: string;
  updatedAt: string;
}