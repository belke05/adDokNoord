import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/Order";
import { CommunicateService } from "../../../services/communicate.service";
import { Sandwich } from "src/app/models/Sandwich";

@Component({
  selector: "app-order-overview",
  templateUrl: "./order-overview.component.html",
  styleUrls: ["./order-overview.component.scss"]
})
export class OrderOverviewComponent implements OnInit {
  public orders: Order[];
  public temp_order: any[] = [];

  constructor(private communicate: CommunicateService) {}

  ngOnInit(): void {
    // listen for when a new sandwich is added from list
    this.communicate.sandwich_emission.subscribe(data => {
      this.temp_order.push({
        ...data,
        isVegetable: true,
        isSauce: true,
        isWhite: true
      });
      console.log("value of temp orders", this.temp_order);
    });

    this.communicate.order_emit_to_overview.subscribe(() => {
      this.communicate.set_orders_global(this.temp_order);
    });
  }

  removeSandwich(id): void {
    this.temp_order = this.temp_order.filter(sandwich => sandwich.id !== id);
    this.communicate.sandwich_removed();
  }

  onKindChange(e): void {
    const whiteOrBrown = e.value;
    const ID = e.source.name.replace("kind_", "");
    console.log("id", ID);
    const orderIndex = this.temp_order.findIndex(({ id }) => id === ID);
    console.log(orderIndex);
    whiteOrBrown === "wit"
      ? (this.temp_order[orderIndex].isWhite = true)
      : (this.temp_order[orderIndex].isWhite = false);
  }

  vegetableChange(e, ID): void {
    const orderIndex = this.temp_order.findIndex(({ id }) => id === ID);
    this.temp_order[orderIndex].isVegetable = !this.temp_order[orderIndex]
      .isVegetable;
  }

  sauceChange(e, ID): void {
    const orderIndex = this.temp_order.findIndex(({ id }) => id === ID);
    this.temp_order[orderIndex].isSauce = !this.temp_order[orderIndex].isSauce;
  }
}
