import { Component, OnInit } from "@angular/core";
import { HttpsService } from "../../../services/https.service";
import { DatabaseService } from "../../../services/database.service";
import Utils from "../../../utils";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  link: string = "/orders";
  folders_content: string;
  broodje_maand_url: string;
  isOpen: boolean;

  constructor(
    private httpservice: HttpsService,
    private databaseservice: DatabaseService
  ) {}

  ngOnInit(): void {
    const info = this.databaseservice
      .getHomePictureUrl("broodjemaand")
      .subscribe(photo => {
        console.log(photo);
        this.broodje_maand_url = photo[0]["url"];
      });
    console.log(info);
    this.httpservice.getFolders("delhaize").then(folders => {
      console.log(folders);
      folders.forEach(folder => {
        this.folders_content += folder;
      });
      // this.folders_content = `<div id="folder_wrapper">${folders}</div>`;
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
