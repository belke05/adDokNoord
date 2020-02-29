import { Component, OnInit, Inject, Input } from "@angular/core";
import { DatabaseService } from "../../../services/database.service";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: "app-opening-dialog",
  templateUrl: "./opening-dialog.component.html",
  styleUrls: ["./opening-dialog.component.scss"]
})
export class OpeningDialogComponent implements OnInit {
  @Input() search_term: string;
  count = 0;
  photo_url: string;
  dialog_text: string;

  constructor(
    public dialog: MatDialog,
    private databaseservice: DatabaseService
  ) {}

  ngOnInit(): void {
    console.log(this.search_term);
    const info = this.databaseservice
      .getHomePictureUrl(this.search_term)
      .subscribe(photo => {
        console.log(photo);
        this.photo_url = photo[0]["url"];
      });
    if (this.search_term == "broodjemaand") {
      this.dialog_text = "broodje van deze maand";
    } else if (this.search_term == "soepweek") {
      this.dialog_text = "soep van deze week";
    } else if (this.search_term == "promo") {
      this.dialog_text = "huidige promo";
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogView, {
      data: {
        count: this.count,
        photo_url: this.photo_url,
        text: this.dialog_text
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}

@Component({
  selector: "dialog-view",
  templateUrl: "dialog-view.html"
})
export class DialogView implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogView>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    console.log(this.data.photo_url, " photo url");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
