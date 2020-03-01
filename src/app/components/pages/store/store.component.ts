import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../../../services/database.service";
import photomapping from "../../../data/photomapping.json";
import textmapping from "../../../data/textmapping.json";

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.scss"]
})
export class StoreComponent implements OnInit {
  photo_store_names: string[] = Object.values(photomapping);
  content = {
    store_pic_url_1: "null",
    store_pic_url_2: "null",
    store_pic_url_3: "null",
    store_text_1: "null",
    store_text_2: "null",
    store_text_3: "null",
    store_title_1: "null",
    store_title_2: "null",
    store_title_3: "null",
    carousel_url_1: "null",
    carousel_url_2: "null",
    carousel_url_3: "null",
    carousel_text_1: "null",
    carousel_text_2: "null",
    carousel_text_3: "null",
    storetop_text_1: "null",
    storetop_text_2: "null",
    storetop_text_3: "null",
    storetop_title_1: "null",
    storetop_title_2: "null",
    storetop_title_3: "null"
  };

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
            if (name.includes("1")) this.content.carousel_url_1 = url;
            if (name.includes("2")) this.content.carousel_url_2 = url;
            if (name.includes("3")) this.content.carousel_url_3 = url;
          } else {
            if (name.includes("1")) this.content.store_pic_url_1 = url;
            if (name.includes("2")) this.content.store_pic_url_2 = url;
            if (name.includes("3")) this.content.store_pic_url_3 = url;
          }
          console.log(this.content, "content after adding picture urls");
        });
      });

    this.databaseservice.getTexts().subscribe(actions => {
      const all_text_blocks = actions.map(e => {
        const text = e.payload.doc.data() as object;
        const id = e.payload.doc.id;
        return {
          id,
          ...text
        };
      });
      all_text_blocks.forEach(block_of_text => {
        this.content[block_of_text.id] = block_of_text["text"];
      });
      console.log(this.content, "content after adding text blocks");
    });
  }
}
