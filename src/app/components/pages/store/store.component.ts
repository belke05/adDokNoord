import { Component, OnInit } from "@angular/core";
import { ContentService } from "../../../services/content.service";

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.scss"]
})
export class StoreComponent implements OnInit {
  // public content: { pictureUrls: Photo[]; textInfo: textblock[] };
  public contentJSON: { pictureUrls: any; textInfo: any } = {
    pictureUrls: {},
    textInfo: {}
  };
  public loaded = { pictures: false, texts: false };
  constructor(private contentservice: ContentService) {}

  ngOnInit(): void {
    this.contentservice.pictureInfo.subscribe(pictureInfo => {
      // this.content.pictureUrls = pictureInfo;
      pictureInfo.map(picture => {
        this.contentJSON.pictureUrls[picture.id] = picture.url;
      });
      this.loaded.texts = true;
    });
    this.contentservice.textInfo.subscribe(textInfo => {
      // this.content.textInfo = textInfo;
      textInfo.map(text => {
        this.contentJSON.textInfo[text.id] = text.text;
      });
      this.loaded.pictures = true;
      console.log(this.contentJSON, "content");
    });
  }
}
