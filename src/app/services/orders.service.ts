import { Injectable, EventEmitter } from "@angular/core";
import { Sandwich } from "../models/Sandwich";

@Injectable({
  providedIn: "root"
})
export class OrdersService {
  order_emission = new EventEmitter();
  plus_sandwich_emission = new EventEmitter();
  minus_sandwich_emission = new EventEmitter();

  order: Sandwich[] = [];
  price: number = 0;

  constructor() {}
  // 2) receive the sandiches added to order
  // and save them in temp  order
  public addToOrder(sandwich: Sandwich) {
    const id =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now();
    this.order.push({ ...sandwich, isWhite: true, id });
    // 3) emit to dialog that an extra sandwich was added
    this.calculatePrice();
    this.order_emission.emit({ order: this.order, price: this.price });
  }

  public get currentOrder(): Sandwich[] {
    return this.order;
  }

  public get currentPrice(): number {
    return this.price;
  }

  public clearOrder() {
    this.order = [];
    this.price = 0;
    this.order_emission.emit({ order: [], price: 0 });
  }

  public sandwich_removed(ID: string): void {
    // 4) emit to dialog sandwich was removed
    // add that it shows add another sandwich
    this.order = this.order.filter(({ id }) => id !== ID);
    this.order_emission.emit({ order: this.order, price: this.price });
  }

  public update_order(order: Sandwich[], price: number): void {
    this.order_emission.emit({ order: this.order, price: this.price });
  }

  public handleIngredientsChange(ingredients: string[], ID: string): void {
    const orderIndex = this.order.findIndex(({ id }) => id === ID);
    this.order[orderIndex].ingredients = ingredients;
  }

  public handleBreadChange(new_bread: string, ID: string): void {
    const orderIndex = this.order.findIndex(({ id }) => id === ID);
    if (new_bread === "wit" && !this.order[orderIndex].isWhite) {
      this.order[orderIndex].price -= 0.3;
      this.order[orderIndex].isWhite = true;
    }
    if (new_bread === "bruin" && this.order[orderIndex].isWhite) {
      this.order[orderIndex].price += 0.3;
      this.order[orderIndex].isWhite = false;
    }
    this.calculatePrice();
  }

  private calculatePrice(): number {
    return (this.price = Number(
      this.order.reduce((cur, acc) => (cur += acc.price), 0).toFixed(2)
    ));
  }
}
