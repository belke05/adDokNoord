import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Photo, Textblock, Vacature } from "../interfaces/index";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Sandwich } from "../models/Sandwich";

@Injectable({
  providedIn: "root"
})
export class ContentService {
  public pictureInfo: Observable<Photo[]>;
  public textInfo: Observable<Textblock[]>;
  public vacatures: Observable<Vacature[]>;
  constructor(private firestore: AngularFirestore) {
    const photo_collection = this.firestore.collection<Photo>("photos");
    this.pictureInfo = photo_collection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, url: data.url };
        })
      )
    );
    const texts_collection = this.firestore.collection<Textblock>("texts");
    this.textInfo = texts_collection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          console.log("hehehehe");
          return { id, text: data.text };
        })
      )
    );
    const vacature_collection = this.firestore.collection<Vacature>(
      "vacatures"
    );
    this.vacatures = vacature_collection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  public getSandwiches(): Observable<any[]> {
    return this.firestore.collection("broodjes").snapshotChanges();
  }
}
