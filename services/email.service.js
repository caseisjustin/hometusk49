import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
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