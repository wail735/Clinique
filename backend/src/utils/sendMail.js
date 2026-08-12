import nodemailer from "nodemailer";
import { promises as dns } from "dns";

// Résoudre smtp.gmail.com en IPv4 pour contourner le problème IPv6 de Render
const getSmtpIpv4 = async () => {
  try {
    const addresses = await dns.resolve4("smtp.gmail.com");
    return addresses[0]; // Première adresse IPv4 disponible
  } catch {
    return "smtp.gmail.com"; // Fallback si résolution échoue
  }
};

// Créer le transporter en forçant une connexion IPv4
const createTransporter = async () => {
  const smtpHost = await getSmtpIpv4();
  return nodemailer.createTransport({
    host: smtpHost,
    port: 587,
    secure: false,
    tls: {
      servername: "smtp.gmail.com", // Validation SSL sur le bon nom de domaine
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendSingleEmail = async (options) => {
  const transporter = await createTransporter();
  const mailOptions = {
    from: `Clinique <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html || `<p>${options.text}</p>`,
  };
  return await transporter.sendMail(mailOptions);
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendBulkEmails = async ({ emails, title, message }) => {
  const transporter = await createTransporter();
  const chunkSize = 50;
  const delayBetweenBatches = 2000;
  let successCount = 0;
  let failureCount = 0;

  console.log(
    `[Email massif] Debut du traitement pour ${emails.length} destinataires...`
  );

  for (let i = 0; i < emails.length; i += chunkSize) {
    const batch = emails.slice(i, i + chunkSize);
    const promises = batch.map(async (email) => {
      try {
        await transporter.sendMail({
          from: `Service Notifications <${process.env.EMAIL_USER}>`,
          to: email,
          subject: title,
          html: `<p>${message}</p>`,
        });
        successCount++;
      } catch (err) {
        console.error(`Echec d'envoi vers ${email} : ${err.message}`);
        failureCount++;
      }
    });
    await Promise.all(promises);
    console.log(
      `[Email massif] Avancée : ${Math.min(i + chunkSize, emails.length)}/${emails.length} emails traités`
    );

    if (i + chunkSize < emails.length) {
      await sleep(delayBetweenBatches);
    }
  }

  return { successCount, failureCount };
};
