import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fbe140f53c5e77",
      pass: "9611bfb33669b9"
    }
  });

export const sendOTP = async (email) => {
  const otp = generateOTP();
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`
  });
};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}