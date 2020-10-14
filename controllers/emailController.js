const nodemailer = require("nodemailer");

var methods = {
  userNotification: function (receiver, message) {
    const output = `<p>${message}</p>`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "exportfolio.notify@gmail.com",
        pass: "bountyprogrammers",
      },
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: "exportfolio.notify@gmail.com", // sender address
      to: receiver, // list of receivers
      subject: "Exportfolio: A user has enquired for your information!", // Subject line
      html: output, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  },
};

exports.data = methods;
