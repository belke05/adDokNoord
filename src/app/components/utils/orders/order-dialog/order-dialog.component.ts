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
}

@Component({
  selector: "dialog-view",
  templateUrl: "dialog-view.html"
})
export class DialogView implements OnInit {
  public temp_order: any[] = [];

  constructor(
    private communicate: CommunicateService,
    public dialogRef: MatDialogRef<DialogView>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.temp_order = this.communicate.temp_order;
    console.log(this.temp_order, "temp orders are");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleSandwichChange({ ID, isKindChange, change }): void {
    const orderIndex = this.temp_order.findIndex(({ id }) => id === ID);
    const order_item = this.temp_order[orderIndex];
    if (isKindChange) {
      const whiteOrBrown = change;
      if (whiteOrBrown === "wit" && !order_item.isWhite) {
        order_item.price -= 0.3;
      }
      if (whiteOrBrown === "bruin" && order_item.isWhite) {
        order_item.price += 0.3;
      }
      if (whiteOrBrown === "wit") {
        order_item.isWhite = true;
      } else {
        order_item.isWhite = false;
      }
    } else {
      order_item.ingredients = change;
    }
  }

  handleSandwichRemove() {}
}
