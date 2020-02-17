import { Component, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";

/** @title Datepicker with filter validation */
@Component({
  selector: "app-datepicker",
  templateUrl: "datepicker.component.html",
  styleUrls: ["datepicker.component.scss"]
})
export class DatePickerComponent {
  @Output() datepicked = new EventEmitter();
  serializedDate = new FormControl(new Date().toISOString());
  constructor() {}
}
