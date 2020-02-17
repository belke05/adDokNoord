const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(
  cors({
    origin: true
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/mail", async (req: any, res: any, next: any) => {
  console.log(req.body);
  await main(req.body.mail, req.body.name, req.body.message, req.body.tel);
  res.status(200).send({ msg: "mail send" });
});

// async..await is not allowed in global scope, must use a wrapper
async function main(mail: string, name: string, msg: string, tel: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: mail, // sender address
    to: "belke05@gmail.com", // list of receivers
    subject: name, // Subject line
    text: msg, // plain text body
    html: "" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = app;
