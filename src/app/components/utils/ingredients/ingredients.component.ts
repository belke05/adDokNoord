import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-ingredients",
  templateUrl: "./ingredients.component.html",
  styleUrls: ["./ingredients.component.scss"]
})
export class IngredientsComponent implements OnInit {
  constructor() {}
  @Input() id: string;
  @Input() ingredients: string[];
  @Output() ingredientsChange = new EventEmitter();
  ingredients_control = new FormControl();
  ingredients_checked: string[];

  ngOnInit(): void {
    this.ingredients_checked = this.ingredients;
    this.ingredients_control.setValue(this.ingredients_checked);
    this.ingredients_control.valueChanges.subscribe(val => {
      this.ingredientsChange.emit(val);
    });
  }
}
