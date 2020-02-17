import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CommunicateService {
  sandwich_emission = new EventEmitter();
  plus_sandwich_emission = new EventEmitter();
  minus_sandwich_emission = new EventEmitter();

  order_emit_to_overview = new EventEmitter();

  sandwich: any;
  orders: any[];

  constructor() {}
  sandwich_to_overview(sandwich: any) {
    const { name, price, ingredients } = sandwich;
    const rand_letter = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    );
    const id = rand_letter + Date.now();
    this.sandwich = { name, price, id, ingredients };
    this.sandwich_emission.emit(this.sandwich);
    this.plus_sandwich_emission.emit();
  }
  sandwich_removed() {
    this.minus_sandwich_emission.emit();
  }

  trigger_orders() {
    this.order_emit_to_overview.emit();
  }

  set_orders_global(_orders) {
    this.orders = _orders;
  }
}
