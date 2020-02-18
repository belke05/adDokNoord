import { Component, OnInit } from "@angular/core";
import { HttpsService } from "../../../services/https.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})

// define  all contact page functionalities in here
// a form getting name / mail / message and tel of person contacting
// use HTTP service which calls cloud function triggering a nodemailer
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  message: string;
  tel: string;

  constructor(private httpservice: HttpsService) {}

  ngOnInit(): void {}

  sendMail() {
    this.httpservice.postMail({
      name: this.name,
      email: this.email,
      message: this.message,
      tel: this.tel
    });
  }
}
