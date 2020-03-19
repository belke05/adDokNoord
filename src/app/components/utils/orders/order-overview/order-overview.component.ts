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
    this.order = this.orderservice.currentOrder;
    this.price = this.orderservice.currentPrice;
    console.log(this.price, "the new price is");
  }

  handleBreadChange(event, change_id: string): void {
    const new_bread = event.value;
    this.orderservice.handleBreadChange(new_bread, change_id);
    this.order = this.orderservice.currentOrder;
    this.price = this.orderservice.currentPrice;
  }

  handleIngredientsChange(event, change_id: string): void {
    this.orderservice.handleIngredientsChange(event.new_ingredients, change_id);
    this.order = this.orderservice.currentOrder;
    this.price = this.orderservice.currentPrice;
  }

  handleSandwichRemove(remove_id): void {
    this.orderservice.sandwich_removed(remove_id);
    this.order = this.orderservice.currentOrder;
    this.price = this.orderservice.currentPrice;
  }
}
