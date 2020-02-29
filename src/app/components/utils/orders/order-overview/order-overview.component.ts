import { Sandwich } from "src/app/models/Sandwich";
import { Order } from "src/app/models/Order";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { OrdersService } from "../../../../services/orders.service";

@Component({
  selector: "app-order-overview",
  templateUrl: "./order-overview.component.html",
  styleUrls: ["./order-overview.component.scss"]
})
export class OrderOverviewComponent implements OnInit {
  order: Sandwich[];
  price: number;

  constructor(private orderservice: OrdersService) {}

  ngOnInit(): void {
    this.orderservice.update_order_trigger_emission.subscribe(() => {
      this.update_order();
    });
    this.order = this.orderservice.order;
    this.calculatePrice();
  }

  handleBreadChange(event, change_id: string): void {
    const new_bread = event.value;
    const orderIndex = this.order.findIndex(({ id }) => id === change_id);
    const orderItem = this.order[orderIndex];
    if (new_bread === "wit" && !orderItem.isWhite) {
      orderItem.price -= 0.3;
      orderItem.isWhite = true;
    }
    if (new_bread === "bruin" && orderItem.isWhite) {
      orderItem.price += 0.3;
      orderItem.isWhite = false;
    }
    this.calculatePrice();
  }

  handleIngredientsChange(event, change_id: string): void {
    console.log("event and id", event, change_id);
    const new_ingredients = event.new_ingredients;
    const orderIndex = this.order.findIndex(({ id }) => id === change_id);
    const orderItem = this.order[orderIndex];
    orderItem.ingredients = new_ingredients;
  }

  handleSandwichRemove(remove_id): void {
    this.order = this.order.filter(({ id }) => id !== remove_id);
    this.calculatePrice();
    if (this.order.length < 5) {
      this.orderservice.update_order([], 0);
      this.price = 0;
      this.order = [];
    }
    this.orderservice.sandwich_removed(remove_id);
  }

  calculatePrice(): void {
    this.price = Number(
      this.order.reduce((cur, acc) => (cur += acc.price), 0).toFixed(2)
    );
  }

  update_order(): void {
    console.log("order getting updated");
    this.orderservice.update_order(this.order, this.price);
  }
}
