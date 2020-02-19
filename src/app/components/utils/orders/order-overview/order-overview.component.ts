import { Sandwich } from "src/app/models/Sandwich";
import { Order } from "src/app/models/Order";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CommunicateService } from "../../../../services/communicate.service";

@Component({
  selector: "app-order-overview",
  templateUrl: "./order-overview.component.html",
  styleUrls: ["./order-overview.component.scss"]
})
export class OrderOverviewComponent implements OnInit {
  @Input() temp_order: any[] = [];
  @Output() SandwichChange = new EventEmitter();
  @Output() SandwichRemove = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  changeSandwich(ID: string, isKindChange: boolean, change: boolean | object) {
    this.SandwichChange.emit({
      ID,
      isKindChange,
      change
    });
  }

  removeSandwich(id): void {
    this.temp_order = this.temp_order.filter(sandwich => sandwich.id !== id);
    this.communicate.sandwich_removed();
  }
}
