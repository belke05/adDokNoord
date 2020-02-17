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
  public temp_order: any[] = [];

  constructor(private communicate: CommunicateService) {}

  ngOnInit(): void {
    // listen for when a new sandwich is added from list
    this.communicate.sandwich_emission.subscribe(data => {
      this.temp_order.push({
        ...data,
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
    let order_item = this.temp_order[orderIndex];
    console.log(orderIndex);
    if (whiteOrBrown === "wit" && !order_item.isWhite) {
      order_item.price -= 0.3;
    }
    if (whiteOrBrown === "bruin" && order_item.isWhite) {
      order_item.price += 0.3;
    }
    if (whiteOrBrown === "wit") {
      order_item.isWhite = true;
    } else {
      order_item.isWhite = false;
    }
  }

  changeIngredients({ ID, ingredients }): void {
    const indexToEdit = this.temp_order.findIndex(({ id }) => id !== ID);
    console.log(indexToEdit, ingredients);
    this.temp_order[indexToEdit]["ingredients"] = ingredients;
  }
}
