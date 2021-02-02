require("dotenv").config();
const express = require("express")
const app = express()

const nodemailer = require("nodemailer")

async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      //host: process.env.SERVIDOR,
      port: 587,
      secure: false, // true for 465, false for other ports
      service:"Gmail",
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"CDG-Gcashless " <e.ventura@caribbeandigitalgroup.com>', // sender address
      to: "j.gomez@caribbeandigitalgroup.com,edson55_@hotmail.com", // list of receivers
      subject: "Hello with nodemailer", // Subject line
      text: "Hello world", // plain text body
      html: "<b>Hello world?, Test</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

app.get("/",function(request,response){
    console.log("Start demo-nodemailer...")

    main().catch(console.error);
})

app.listen(3000)