import { OrderSandwich } from "./OrderSandwich";

export class Order {
  firstName: string;
  lastName: string;
  timeOrder: Date;
  timePickUp: Date;
  orders: OrderSandwich[];
  totalPrice: number;
}
