// Service d'envoi d'emails via Brevo (Sendinblue) - API HTTP
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// Email de l'expéditeur (doit être vérifié sur Brevo)
const SENDER_EMAIL = process.env.SENDER_EMAIL || "chennoufwail@gmail.com";
const SENDER_NAME = "MedPrecision Clinique";

const sendBrevoEmail = async ({ to, subject, html }) => {
  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de l'envoi de l'email");
  }

  return await response.json();
};

export const sendSingleEmail = async (options) => {
  return await sendBrevoEmail({
    to: options.to,
    subject: options.subject,
    html: options.html || `<p>${options.text}</p>`,
  });
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
        await sendBrevoEmail({
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
