import nodemailer from "nodemailer";

export const sendBookingConfirmation = async ({
  to,
  name,
  doctorName,
  date,
  slot,
}) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Your Hospital" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Booking Confirmation",
    html: `
      <p>Dear ${name},</p>
      <p>Your appointment with <strong>Dr. ${doctorName}</strong> has been confirmed.</p>
      <p><strong>Date:</strong> ${date}<br/>
         <strong>Time:</strong> ${slot}</p>
      <p>Thank you for choosing our hospital.</p><br/>
      <p>Best Regards,</p>
      <p>GMPS</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
