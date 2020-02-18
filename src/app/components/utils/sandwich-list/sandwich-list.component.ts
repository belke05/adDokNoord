import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { DatabaseService } from "../../../services/database.service";
import { CommunicateService } from "../../../services/communicate.service";
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
    private ordersservice: DatabaseService,
    private communicate: CommunicateService
  ) {}

  ngOnInit(): void {
    this.ordersservice.getSandwiches().subscribe(actions => {
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

  // use communication service to send the sandwich info
  // to the order-overview
  addSandwich(sandwich: any) {
    console.log("passing sandwich", sandwich);
    this.communicate.sandwich_to_overview(sandwich);
  }
}
