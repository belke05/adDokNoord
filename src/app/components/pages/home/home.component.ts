import { Component, OnInit } from "@angular/core";
import { ContentService } from "../../../services/content.service";
// import { HttpsService } from "../../../services/https.service";
import Utils from "../../../functions/utils";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  link: string = "/orders";
  folders_content: string;
  isOpen: boolean;
  picturesLoaded = false;
  PictureUrls = { broodjemaand: null, soepweek: null, promo: null };

  constructor(private contentservice: ContentService) {}

  ngOnInit(): void {
    // this.httpservice.getFolders("delhaize").then(folders => {
    //   console.log(folders);
    //   folders.forEach(folder => {
    //     this.folders_content += folder;
    //   });
    //   // this.folders_content = `<div id="folder_wrapper">${folders}</div>`;
    // });

    this.contentservice.pictureInfo.subscribe(pictureInfo => {
      pictureInfo.map(picture => {
        if (picture.id === "broodjemaand") {
          this.PictureUrls.broodjemaand = picture.url;
        } else if (picture.id === "soepweek") {
          this.PictureUrls.soepweek = picture.url;
        } else if (picture.id === "promo") {
          this.PictureUrls.promo = picture.url;
        }
      });
      this.picturesLoaded = true;
    });
    const opening_container = document.querySelector(
      ".home__header__content__opening"
    );
    const { dayNumber, isOpen } = Utils.getDayDetermineOpen();
    isOpen ? (this.isOpen = true) : (this.isOpen = false);
    if (dayNumber === 1) {
      opening_container.children[2].classList.add(
        "home__header__content__opening__item--open"
      );
    } else if (dayNumber === 7) {
      opening_container.children[1].classList.add(
        "home__header__content__opening__item--open"
      );
    } else {
      opening_container.children[0].classList.add(
        "home__header__content__opening__item--open"
      );
    }
  }
}
