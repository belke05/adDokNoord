import { Component, OnInit } from "@angular/core";
import { HttpsService } from "../../../services/https.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  message: string;
  tel: string;

  constructor(private http: HttpsService) {}

  ngOnInit(): void {}

  sendMail() {
    this.http.postMail({
      name: this.name,
      email: this.email,
      message: this.message,
      tel: this.tel
    });
  }

  processForm() {
    this.sendMail();
  }
}
