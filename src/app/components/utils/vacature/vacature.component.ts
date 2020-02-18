import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../../../services/database.service";

@Component({
  selector: "app-vacature",
  templateUrl: "./vacature.component.html",
  styleUrls: ["./vacature.component.scss"]
})
export class VacatureComponent implements OnInit {
  vacatures: any[];
  constructor(private vacaturesservice: DatabaseService) {}

  ngOnInit(): void {
    this.vacaturesservice.getVacatures().subscribe(actions => {
      this.vacatures = actions.map(e => {
        const data = e.payload.doc.data() as [];
        const id = e.payload.doc.id;
        return {
          id,
          ...data
        };
      });
      console.log(this.vacatures);
    });
  }
}
