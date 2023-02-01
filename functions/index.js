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
      bodyPhotos = [],
      referencePhotos = [],
      size = ""
    } = data;

    const imageList = selectedPhotos.map((photo) => {
        return {
            path: photo,
        }
    });
    const bodyImageList = bodyPhotos.map((photo) => {
      return {
          path: photo,
      }
  });
  const referenceImageList = referencePhotos.map((photo) => {
    return {
        path: photo,
    }
});

    const mailOptions = {
      from: `"Booking Inquiry" <jamesford128@gmail.com>`,
      to: "booking.maxbtattin@gmail.com",
      replyTo: email,
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
        bodyImageList,
        referenceImageList,
        imageList
      },
    };

    return sendEmail(mailOptions);
  });
