import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CommunicateService } from "../../../services/communicate.service";

@Component({
  selector: "app-ingredients",
  templateUrl: "./ingredients.component.html",
  styleUrls: ["./ingredients.component.scss"]
})
export class IngredientsComponent implements OnInit {
  constructor(private communicate: CommunicateService) {}
  @Input() id: string;
  ingredients: string[];
  @Output() ingredientsChange = new EventEmitter();
  ingredients_control = new FormControl();

  ngOnInit(): void {
    this.ingredients = this.communicate.sandwich["ingredients"];
    this.ingredients_control.setValue(this.ingredients);
    this.ingredients_control.valueChanges.subscribe(val => {
      this.ingredientsChange.emit({
        ingredients: val,
        ID: this.id
      });
    });
  }
}
