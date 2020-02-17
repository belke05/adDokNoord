import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Order } from "../models/Order";

@Injectable({
  providedIn: "root"
})
export class OrdersService {
  constructor(private firestore: AngularFirestore) {}

  form = new FormGroup({
    customerName: new FormControl(""),
    order: new FormControl(""),
    date: new FormControl(""),
    completed: new FormControl("")
  });

  getSandwiches() {
    return this.firestore.collection("broodjes").snapshotChanges();
  }

  getOrders() {
    return this.firestore.collection("orders").snapshotChanges();
  }

  createOrder(orderFormValue, totalprice) {
    const order: Order = {
      firstName: orderFormValue.firstName,
      lastName: orderFormValue.lastName,
      timeOrder: orderFormValue.timeOrder,
      timePickUp: orderFormValue.timePickUp,
      orders: orderFormValue.orders,
      totalPrice: totalprice
    };
    return this.firestore.collection("orders").add(order);
  }
}
