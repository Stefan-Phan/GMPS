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
    from: `"GMPS" <${process.env.EMAIL_USER}>`,
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

export const sendBookingCancellation = async ({
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
    from: `"GMPS" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Cancel Confirmation",
    html: `
      <p>Dear ${name},</p>
      <p>We regret to inform you that your appointment with <strong>Dr. ${doctorName}</strong> has been <span style="color:red;"><strong>cancelled</strong></span>.</p>
      <p><strong>Date:</strong> ${date}<br/>
         <strong>Time:</strong> ${slot}</p>
      <p>If this was a mistake or you would like to reschedule, please contact us or make a new booking.</p>
      <p>Thank you for choosing our hospital.</p><br/>
      <p>Best Regards,</p>
      <p>GMPS</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
