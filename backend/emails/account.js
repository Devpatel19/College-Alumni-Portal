// const sgMail = require('@sendgrid/mail')
// //Drpatel19@9727915673

// const sendgridAPIKey = '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'

// sgMail.setApiKey(sendgridAPIKey)

// const sendWelcomeEmail = (email, name) => {
//     sgMail.send({
//         to: email,
//         from: 'dsolution430@gmail.com',
//         subject: 'Thanks for joining in!',
//         text: `Welcome to the Alumni Portal, ${name}. Now you can login on portal`
//     })
// }

// const ResetPassword = (email, name) => {
//     sgMail.send({
//         to: email,
//         from: 'dsolution430@gmail.com',
//         subject: 'Thanks for joining in!',
//         text: `Welcome to the Alumni Portal, ${name}. Now you can login on portal`
//     })
// }

// module.exports = {
//     sendWelcomeEmail
// }

const nodemailer = require("nodemailer");
const emailsend = (email, otp) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "devlanet19@gmail.com",
      pass: "dszvqimsietyqdld",
    },
  });

  var mailOptions = {
    from: "devlanet19@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    html: `<h1>your otp is : ${otp}</h1>
      <h3>otp is valid only 5 minute</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  emailsend,
};
