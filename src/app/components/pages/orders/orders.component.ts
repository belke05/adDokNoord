import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../../../services/database.service";
import { CommunicateService } from "../../../services/communicate.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
  public count: number = 0;

  constructor(
    private ordersService: DatabaseService,
    private communicate: CommunicateService
  ) {}

  ngOnInit(): void {
    this.communicate.plus_sandwich_emission.subscribe(() => {
      this.count += 1;
    });
    this.communicate.minus_sandwich_emission.subscribe(() => {
      this.count -= 1;
    });
  }
}
