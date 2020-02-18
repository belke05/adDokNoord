const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use((req: any, res: any, next: any) => {
  res.set("Access-Control-Allow-Origin", "*");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/mail", async (req: any, res: any, next: any) => {
  console.log(req.body);
  const msg_sent = await mailing(
    req.body.mail,
    req.body.name,
    req.body.message,
    req.body.tel
  );
  console.log(msg_sent, "msg sent");
  res.status(200).send({ msg: "mail send" });
});

// async..await is not allowed in global scope, must use a wrapper
async function mailing(mail: string, name: string, msg: string, tel: string) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "henri160797@gmail.com", // generated ethereal user
      pass: "77N47123" // generated ethereal password
    }
  });
  const mailOptions = {
    from: "henri160797@gmail.com", // sender address
    to: "belke05@gmail.com", // list of receivers
    subject: `${name} heeft opmerking ${mail}`, // Subject line
    html: `<div><p>${msg}<p></div>` // html body
  };

  const msg_sent = await transporter.sendMail(mailOptions);

  return msg_sent;
}

module.exports = app;
