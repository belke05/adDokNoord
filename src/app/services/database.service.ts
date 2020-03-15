import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Order } from "../models/Order";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  getOrders() {
    return this.firestore.collection("orders").snapshotChanges();
  }

  createOrder(orderFormValue) {
    const {
      firstName,
      lastName,
      PickUpTime,
      PickUpDate,
      timeOrder,
      orders,
      price,
      remarks
    } = orderFormValue;
    const order: Order = {
      firstName,
      lastName,
      pickupTime: PickUpTime,
      pickupDate: PickUpDate,
      timeOrder,
      orders,
      price,
      remarks
    };
    return this.firestore.collection("orders").add(order);
  }
}
