import { Sandwich } from "./Sandwich";

export class Order {
  orders: Sandwich[];
  price: number;
  timeOrder: Date | string;
  pickupTime: string | Date;
  pickupDate: string | Date;
  firstName: string;
  lastName: string;
  remarks: string;
}
