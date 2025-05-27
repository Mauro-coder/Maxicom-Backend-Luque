import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASS,
  },
});

const sendEmail = async ({ email }) =>
  await transport.sendMail({
    from: `CODER EMAIL DE PRUEBA <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "Email de prueba",
    html: `<h1>Email de prueba</h1>`,
  });

export default sendEmail;
