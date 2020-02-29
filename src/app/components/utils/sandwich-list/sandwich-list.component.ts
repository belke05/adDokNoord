import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { DatabaseService } from "../../../services/database.service";
import { OrdersService } from "../../../services/orders.service";
import { Sandwich } from "../../../models/Sandwich";

@Component({
  selector: "app-sandwich-list",
  templateUrl: "./sandwich-list.component.html",
  styleUrls: ["./sandwich-list.component.scss"]
})
export class SandwichListComponent implements OnInit {
  sandwiches: Sandwich[];
  displayedColumns: string[] = ["select", "name", "price", "ingredients"];

  constructor(
    private database: DatabaseService,
    private orders: OrdersService
  ) {}

  // get all the sandwiches that are in the database
  ngOnInit(): void {
    this.database.getSandwiches().subscribe(actions => {
      this.sandwiches = actions.map(e => {
        const data = e.payload.doc.data() as Sandwich;
        const id = e.payload.doc.id;
        return {
          id,
          ...data
        };
      });
    });
  }

  // 1) use communication service to send the sandwich info
  // to components that are handling the order
  addSandwich(sandwich: Sandwich) {
    this.orders.add_sandwich(sandwich);
  }
}
