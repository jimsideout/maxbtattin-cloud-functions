const functions = require("firebase-functions");
const { sendEmail } = require("./emails");

exports.inquiryCreated = functions.firestore
  .document("users/{userId}/inquiries/{inquiryId}")
  .onCreate((snap) => {
    const data = snap.data();
    const inquiryId = snap.id;

    const {
      description,
      email,
      length = "",
      location,
      month,
      name,
      over18,
      phone,
      pronouns = "",
      selectedPhotos,
      size = ""
    } = data;

    const imageList = selectedPhotos.map((photo) => {
        return {
            path: photo,
        }
    });

    const mailOptions = {
      from: `"Booking Inquiry" <jamesford128@gmail.com>`,
      to: "maxbtattin@gmail.com",
      subject: `A new booking inquiry was made`,
      template: "generic",
      context: {
        description,
        email,
        length: length+" day",
        location,
        month,
        name,
        over18,
        phone,
        pronouns,
        size,
        imageList
      },
    };

    return sendEmail(mailOptions);
  });
