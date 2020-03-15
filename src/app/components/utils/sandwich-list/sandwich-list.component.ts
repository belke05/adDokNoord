import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { ContentService } from "../../../services/content.service";
import { Sandwich } from "../../../models/Sandwich";

@Component({
  selector: "app-sandwich-list",
  templateUrl: "./sandwich-list.component.html",
  styleUrls: ["./sandwich-list.component.scss"]
})
export class SandwichListComponent implements OnInit {
  sandwiches: Sandwich[];

  constructor(private contentservice: ContentService) {}

  // get all the sandwiches that are in the database
  ngOnInit(): void {
    this.contentservice.getSandwiches().subscribe(actions => {
      this.sandwiches = actions.map(e => {
        const data = e.payload.doc.data() as Sandwich;
        const id = e.payload.doc.id;
        return {
          id,
          ...data
        };
      });
    });
  }
}
