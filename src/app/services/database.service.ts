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
  getSandwiches() {
    return this.firestore.collection("broodjes").snapshotChanges();
  }

  getVacatures() {
    return this.firestore.collection("vacatures").snapshotChanges();
  }

  getOrders() {
    return this.firestore.collection("orders").snapshotChanges();
  }

  getHomePictureUrl(pictureName: string) {
    return this.firestore
      .collection("photos", ref => ref.where("name", "==", pictureName))
      .valueChanges();
  }

  getStorePicturesUrl(pictureNames: string[]) {
    return this.firestore
      .collection("photos", ref => ref.where("name", "in", pictureNames))
      .valueChanges();
  }

  getTexts() {
    return this.firestore.collection("texts").snapshotChanges();
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
