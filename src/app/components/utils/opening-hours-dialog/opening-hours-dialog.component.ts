import { Component, OnInit, Inject, EventEmitter } from "@angular/core";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: "app-opening-hours-dialog",
  templateUrl: "./opening-hours-dialog.component.html",
  styleUrls: ["./opening-hours-dialog.component.scss"]
})
export class OpeningHoursDialogComponent implements OnInit {
  count = 0;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogView, {
      data: { count: this.count }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}

@Component({
  selector: "opening-hours-view",
  templateUrl: "opening-hours-view.html"
})
export class DialogView implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogView>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    console.log(this.data.count, " sandwich on the order");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
