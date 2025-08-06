import nodemailer from "nodemailer";
export const sendEmail = async (
  to: string,
  name: string,
  password: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const info = await transporter.sendMail({
    from: '"TodoBuddy" <noreply@todobody.com>',
    to,
    subject: "You're Invited to TodoBuddy!",
    html: `
      <p>Hello ${name},</p>
      <p>You have been invited to use TodoBuddy.</p>
      <p><strong>Login Email:</strong> ${to}</p>
      <p><strong>Temporary Password:</strong> ${password}</p>
      <p><a href="http://dummy.com/login">Click here to login</a></p>
    `,
  });
  console.log("Email sent:", info.messageId);
};