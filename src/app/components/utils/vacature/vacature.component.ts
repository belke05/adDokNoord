import { Component, OnInit } from "@angular/core";
import { ContentService } from "../../../services/content.service";
import { Vacature } from "../../../interfaces/index";

@Component({
  selector: "app-vacature",
  templateUrl: "./vacature.component.html",
  styleUrls: ["./vacature.component.scss"]
})
export class VacatureComponent implements OnInit {
  vacatures: Vacature[];
  constructor(private contentservice: ContentService) {}

  ngOnInit(): void {
    this.contentservice.vacatures.subscribe(vacatures => {
      this.vacatures = vacatures;
      console.log(this.vacatures);
    });
  }
}
