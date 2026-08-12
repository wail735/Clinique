import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Adresse expéditeur - utilise l'email vérifié ou onboarding@resend.dev par défaut
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

export const sendSingleEmail = async (options) => {
  const { data, error } = await resend.emails.send({
    from: `Clinique <${FROM_EMAIL}>`,
    to: [options.to],
    subject: options.subject,
    html: options.html || `<p>${options.text}</p>`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendBulkEmails = async ({ emails, title, message }) => {
  let successCount = 0;
  let failureCount = 0;
  const chunkSize = 50;
  const delayBetweenBatches = 2000;

  console.log(
    `[Email massif] Début du traitement pour ${emails.length} destinataires...`
  );

  for (let i = 0; i < emails.length; i += chunkSize) {
    const batch = emails.slice(i, i + chunkSize);
    const promises = batch.map(async (email) => {
      try {
        await resend.emails.send({
          from: `Service Notifications <${FROM_EMAIL}>`,
          to: [email],
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
