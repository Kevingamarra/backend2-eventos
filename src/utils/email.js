import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendTicketEmail = async (
  to,
  event,
  reservationCode
) => {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Inscripción confirmada",
    html: `
      <h2>Inscripción confirmada</h2>

      <p>Tu inscripción fue registrada correctamente.</p>

      <p><strong>Evento:</strong> ${event.title}</p>

      <p><strong>Fecha:</strong> ${event.date}</p>

      <p><strong>Lugar:</strong> ${event.location}</p>

      <p><strong>Código de reserva:</strong> ${reservationCode}</p>
    `
  });
};
