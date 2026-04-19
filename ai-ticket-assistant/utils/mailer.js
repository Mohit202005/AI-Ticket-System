import nodemailer from "nodemailer";

export const sendMail = async ({ to, subject, text, html }) => {
  try {
    // 1. Configure the email service
    const transporter = nodemailer.createTransport({
      service: "gmail", // Using Gmail as a default, but you can change this
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_APP_PASSWORD, 
      },
    });

    // 2. Set up the email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text, // Plain text version
      html: html, // HTML version (optional)
    };

    // 3. Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: " + info.response);
    return info;

  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error so your Inngest function knows it failed
  }
};
