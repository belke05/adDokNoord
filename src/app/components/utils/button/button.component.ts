import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "link-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit {
  @Input() link: string;

  constructor() {}

  ngOnInit(): void {}
}
