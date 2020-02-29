import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../../../services/database.service";
import photomapping from "../../../data/photomapping.json";

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.scss"]
})
export class StoreComponent implements OnInit {
  photo_store_names: string[] = Object.values(photomapping);
  picture_urls = {
    store_1: null,
    store_2: null,
    store_3: null
  };
  carousel_urls = {
    storecarousel_1: null,
    storecarousel_2: null,
    storecarousel_3: null
  };
  carousel_texts = {
    storecarousel_1: null,
    storecarousel_2: null,
    storecarousel_3: null
  };
  text_blocks = {};
  constructor(private databaseservice: DatabaseService) {}

  ngOnInit(): void {
    console.log(photomapping);
    this.photo_store_names = this.photo_store_names.filter(val => {
      return val.includes("store");
    });
    this.databaseservice
      .getStorePicturesUrl(this.photo_store_names)
      .subscribe(photos => {
        photos.forEach(({ name, url }) => {
          if (name.includes("carousel")) {
            this.carousel_urls[name] = url;
          } else {
            this.picture_urls[name] = url;
          }
        });
        console.log(this.carousel_urls, "carousel urls");
        console.log(this.picture_urls, "picture urls");
      });
  }
}
