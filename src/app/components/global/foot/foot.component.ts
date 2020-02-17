import { Component, OnInit } from "@angular/core";

export interface day {
  name: string;
  open: string;
  gesloten: string;
}

@Component({
  selector: "app-foot",
  templateUrl: "./foot.component.html",
  styleUrls: ["./foot.component.scss"]
})
export class FootComponent implements OnInit {
  opening_hours: day[] = [
    { name: "maandag", open: "13:00", gesloten: "20:00" },
    { name: "dinsdag tot en met zaterdag", open: "8:00", gesloten: "20:00" },
    { name: "zondag", open: "8:00", gesloten: "13:00" }
  ];

  constructor() {}

  ngOnInit(): void {}
}
