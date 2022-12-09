const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "jamesford128@gmail.com",
    pass: "mhkyzjhpvszmyvoh",
  },
  from: `"Booking Inquiry" <jamesford128@gmail.com>`,
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./emailTemplates/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./emailTemplates/"),
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

const sendEmail = async (mailOptions) => {
  return transporter.sendMail(mailOptions).catch((err) => {
    console.log(err);
  });
};

exports.sendEmail = sendEmail;

// function test() {

//   const email = 'jamesford128@gmail.com'
//   const mailOptions = {
//     from: `"Booking Inquiry" <jamesford128@gmail.com>`,
//     to: email,
//     subject: `A new booking inquiry was made`,
//     template: "generic",
//     context: {
//       description: 'description',
//       email: 'jamesford128@gmail.com',
//       length: 'length',
//       location: 'location',
//       month: 'December',
//       name: 'James Ford',
//       phone: 'phone',
//       pronouns: 'pronouns',
//       size: 'size',
//       imageList: [
//         {
//           path: "https://scontent-den4-1.cdninstagram.com/v/t51.29350-15/318775744_450885093907527_4191140110349351812_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=XzPBT7xyrY4AX-wYJuW&_nc_ht=scontent-den4-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfC-TZavvIDyEDsgVEQ48pioTnKzza1_V1UWJXToVaTXTA&oe=639880CD",
//         },
//       ]
//     },

//   };

//   sendEmail(mailOptions)
// }
// test();
