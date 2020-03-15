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
  @Input() picture_url: string;
  count = 0;
  dialog_text: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogView, {
      data: {
        count: this.count,
        photo_url: this.picture_url,
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
  templateUrl: "dialog-view.html",
  styleUrls: ["./opening-dialog.component.scss"]
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
