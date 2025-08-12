export interface User {
  id: number;
  firstName: string;
  lastName: string;
  documentId: string;
  documentType: string; 
  email: string;
  address: string;
  phoneNumber: number; 
  serviceStartSate: string;
  roles: [];
}