import { Component, OnInit, Input, Inject } from "@angular/core";
import { CommunicateService } from "../../../../services/communicate.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: "app-order-dialog",
  templateUrl: "./order-dialog.component.html",
  styleUrls: ["./order-dialog.component.scss"]
})
export class OrderDialogComponent implements OnInit {
  @Input() sandwich_count: number;
  @Input() total_price: number;

  constructor(
    public dialog: MatDialog,
    private communicate: CommunicateService
  ) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogView, {
      data: { price: this.total_price, sandwich_count: this.sandwich_count }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  trigger_order(): void {
    console.log("trigger the sending of order data");
    this.communicate.trigger_orders();
  }
}

@Component({
  selector: "dialog-view",
  templateUrl: "dialog-view.html"
})
export class DialogView {
  constructor(
    public dialogRef: MatDialogRef<DialogView>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
