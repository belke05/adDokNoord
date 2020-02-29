import { Injectable, EventEmitter } from "@angular/core";
import { Sandwich } from "../models/Sandwich";

@Injectable({
  providedIn: "root"
})
export class OrdersService {
  order_emission = new EventEmitter();
  order_price_emission = new EventEmitter();
  update_order_trigger_emission = new EventEmitter();
  plus_sandwich_emission = new EventEmitter();
  minus_sandwich_emission = new EventEmitter();

  sandwich: Sandwich;
  order: Sandwich[] = [];

  constructor() {}
  // 2) receive the sandiches added to order
  // and save them in temp  order
  add_sandwich(sandwich: Sandwich) {
    const { name, price, ingredients, isMonth } = sandwich;
    const id =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now();
    this.sandwich = { name, price, id, ingredients, isWhite: true, isMonth };
    this.order.push(this.sandwich);
    // 3) emit to dialog that an extra sandwich was added
    this.order_emission.emit(this.order);
  }

  sandwich_removed(ID: string): void {
    // 4) emit to dialog sandwich was removed
    // add that it shows add another sandwich
    console.log(ID, "id to remove");
    this.order = this.order.filter(({ id }) => id !== ID);
    this.order_emission.emit(this.order);
  }

  update_order(order: Sandwich[], price: number): void {
    this.order_price_emission.emit({ order, price });
  }

  cleanup_order(): void {
    this.order = [];
    this.order_emission.emit([]);
    this.order_price_emission.emit({ order: [], price: 0 });
  }
}
