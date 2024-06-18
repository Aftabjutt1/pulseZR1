import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = (to, verificationCode) => {
  console.log("host: ", process.env.EMAIL_HOST);
  console.log("port: ", process.env.EMAIL_PORT);
  console.log("user: ", process.env.EMAIL_USER);
  console.log("pass: ", process.env.EMAIL_PASS);
  const mailOptions = {
    from: `"pulseZR" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Email Verification",
    text: `Your verification code is: ${verificationCode}`,
    html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
  };

  return transporter.sendMail(mailOptions);
};

export { sendVerificationEmail };
