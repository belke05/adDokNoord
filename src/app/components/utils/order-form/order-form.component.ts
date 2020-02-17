import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CommunicateService } from "../../../services/communicate.service";
import { OrdersService } from "../../../services/orders.service";
import { Order } from "../../../models/Order";

@Component({
  selector: "app-order-form",
  templateUrl: "./order-form.component.html",
  styleUrls: ["./order-form.component.scss"]
})
export class OrderFormComponent implements OnInit {
  @Output() datepicked = new EventEmitter();

  public orderForm: FormGroup;
  total_price: number = 0;

  constructor(
    private communicate: CommunicateService,
    private orderservice: OrdersService
  ) {}

  ngOnInit(): void {
    // get the orders that where passed to the
    const current_orders = this.communicate.orders;
    this.orderForm = new FormGroup({
      timeOrder: new FormControl(new Date().toISOString()),
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      timePickUp: new FormControl(null),
      remarks: new FormControl(""),
      orders: new FormControl([])
    });
    this.orderForm.patchValue({ orders: current_orders });
    this.total_price = current_orders
      .reduce((cur, acc) => {
        console.log("acc", acc, cur, "curr");
        const { price } = acc;
        return (cur += price);
      }, 0)
      .toFixed(2);
  }

  public timeChanged(time: string): void {
    this.orderForm.patchValue({ timePickUp: time });
  }

  public getPickUpTime(): boolean {
    return this.orderForm.get("timePickUp").value ? true : false;
  }

  public sendOrder(orderFormValue) {
    console.log("submit");
    this.orderservice.createOrder(orderFormValue, this.total_price);
  }
}
