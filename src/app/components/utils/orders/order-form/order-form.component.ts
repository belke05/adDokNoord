import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { OrdersService } from "../../../../services/orders.service";
import { DatabaseService } from "../../../../services/database.service";

@Component({
  selector: "app-order-form",
  templateUrl: "./order-form.component.html",
  styleUrls: ["./order-form.component.scss"]
})
export class OrderFormComponent implements OnInit {
  @Output() datepicked = new EventEmitter();

  public orderForm: FormGroup;
  order_sent = false;
  current_date = new Date();
  price: number;

  constructor(
    private orderservice: OrdersService,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      orders: new FormControl([]),
      PickUpTime: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      PickUpDate: new FormControl(this.current_date),
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      remarks: new FormControl("")
    });
    this.orderservice.order_price_emission.subscribe(({ order, price }) => {
      console.log(order, price, "emission");
      this.price = price;
      this.orderForm.patchValue({ orders: order });
    });
  }

  public timeChanged(time: string): void {
    console.log("time", time);
    this.orderForm.patchValue({ PickUpTime: time });
  }

  public getPickUpTime(): boolean {
    return this.orderForm.get("PickUpTime").value ? true : false;
  }

  public async sendOrder(orderFormValue) {
    orderFormValue.price = this.price;
    console.log(orderFormValue.PickUpDate);
    orderFormValue.PickUpDate =
      orderFormValue.PickUpDate.getFullYear() +
      "/" +
      orderFormValue.PickUpDate.getMonth() +
      "/" +
      orderFormValue.PickUpDate.getDate();
    orderFormValue.timeOrder = this.current_date.toISOString();
    console.log("submit", orderFormValue);
    const docRef = await this.database.createOrder(orderFormValue);
    console.log(docRef.id, "order with id created");
    this.order_sent = true;
    this.orderservice.cleanup_order();
  }
}
