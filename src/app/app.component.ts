import { Component, OnInit, isDevMode } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Photo, textblock } from "./interfaces/index";
import { ContentService } from "./services/content.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title: string = "Delhaize Dok Noord";
  photos: Photo[];
  textblocks: textblock[];
  constructor(
    private contentservice: ContentService,
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // so that a custom svg can be used as favicon
    this.iconRegistry.addSvgIcon(
      "delhaize",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/logo.svg")
    );
  }
  ngOnInit(): void {
    this.contentservice.pictureInfo.subscribe(photos => (this.photos = photos));
    this.contentservice.textInfo.subscribe(textblocks =>
      console.log(textblocks)
    );
    if (isDevMode()) {
      console.log("👋 Development!");
    } else {
      console.log("💪 Production!");
    }
  }
}
