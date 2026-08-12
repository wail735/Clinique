import nodemailer from "nodemailer";

// Créer le transporter à la demande (lazy) pour s'assurer que les variables .env sont chargées
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,       // STARTTLS (plus fiable sur Render)
    family: 4,           // Force IPv4
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendSingleEmail = async (options) => {
  const transporter = createTransporter();
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
  const transporter = createTransporter();
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
