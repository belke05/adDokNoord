import { Component, OnInit, Input } from "@angular/core";
import { OrdersService } from "../../../services/orders.service";
import { Sandwich } from "../../../models/Sandwich";

@Component({
  selector: "app-sandwich-card",
  templateUrl: "./sandwich-card.component.html",
  styleUrls: ["./sandwich-card.component.scss"]
})
export class SandwichCardComponent implements OnInit {
  @Input() sandwich: Sandwich;

  constructor(private ordersservice: OrdersService) {}

  ngOnInit(): void {}

  // 1) use communication service to send the sandwich info
  // to components that are handling the order
  public addSandwich(sandwich: Sandwich) {
    this.ordersservice.add_sandwich(this.sandwich);
  }
}
