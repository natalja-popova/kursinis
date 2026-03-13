import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendCourseRegistrationEmail = async ({ name, email, course }) => {
  await transporter.sendMail({
    from: '"Akvanautas" <scam.email.nat@gmail.com>',
    to: "scam.email.nat@gmail.com",
    replyTo: email,
    subject: `Nauja registracija į kursus: ${course}`,
    html: `
      <p>Vardas: ${name}</p>
      <p>El. paštas: ${email}</p>
      <p>Kursas: ${course}</p>
    `,
  });
};
