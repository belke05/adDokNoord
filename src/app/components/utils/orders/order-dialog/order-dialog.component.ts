import { Component, OnInit, Inject, EventEmitter } from "@angular/core";
import { OrdersService } from "../../../../services/orders.service";
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
  count = 0;

  constructor(public dialog: MatDialog, private ordersservice: OrdersService) {}

  ngOnInit(): void {
    this.ordersservice.order_emission.subscribe(({ order }) => {
      this.count = order.length;
    });
  }

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
  selector: "dialog-view",
  templateUrl: "dialog-view.html"
})
export class DialogView implements OnInit {
  constructor(
    private ordersservice: OrdersService,
    public dialogRef: MatDialogRef<DialogView>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    console.log(this.data.count, " sandwich on the order");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectionChange(event): void {
    if (event.selectedIndex === 1) console.log("selection changed", event);
  }
}
