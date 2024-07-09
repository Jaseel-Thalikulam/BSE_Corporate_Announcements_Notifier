import { secrets } from "../constants.js";
import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    user: secrets.gmail,
    pass: secrets.nodemailerAppPassword,
  },
});


export const sendMail = async (newAnnouncements, to) => {
  try {
    const mailOptions = {
      from: '"BSE Announcement Notifier" <' + secrets.gmail + ">",
      to: to,
      subject: "BSE Announcement Update",
      html: ` <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Announcements</title>
    </head>
    <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
      ${newAnnouncements
        .map(
          (announcement) => `
        <div style="border: 1px solid #ddd; border-radius: 5px; padding: 20px; margin: 20px 0; background-color: #f9f9f9;">
          <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">${
            announcement.NEWSSUB
          }</div>
          ${
            announcement.ATTACHMENTNAME
              ? `<a href="https://www.bseindia.com/xml-data/corpfiling/AttachLive/${announcement.ATTACHMENTNAME}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">View PDF</a>`
              : ""
          }
        </div>
      `
        )
        .join("")}
    </body>
    </html>`,
      replyTo: "no-reply@chefhut.com",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
