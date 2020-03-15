import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-sandwich-card",
  templateUrl: "./sandwich-card.component.html",
  styleUrls: ["./sandwich-card.component.scss"]
})
export class SandwichCardComponent implements OnInit {
  @Input() sandwich;

  constructor() {}

  ngOnInit(): void {}
}
