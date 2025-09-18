import { Property } from "./Property";

export interface Billing {
  id: string;
  property: Property;
  amount: number;
  dueDate: string;
  status: string;
}