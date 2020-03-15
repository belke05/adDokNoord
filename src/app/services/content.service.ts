import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Photo, textblock } from "../interfaces/index";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContentService {
  public pictureInfo: Observable<Photo[]>;
  public textInfo: Observable<textblock[]>;
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
    const texts_collection = this.firestore.collection<textblock>("texts");
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
  }
}
