import React from 'react';

const FaqSection = () => (
  <section className="py-section-gap px-gutter bg-surface">
    <div className="container mx-auto max-w-3xl">
      <div className="text-center mb-16">
        <span className="text-secondary font-label-sm text-label-sm font-bold tracking-widest uppercase block mb-4">FAQ</span>
        <h2 className="font-headline-lg text-headline-lg text-primary">Questions Fréquentes</h2>
      </div>
      <div className="space-y-4">
        {[
          { q: "Quelles sont vos heures d'ouverture ?", a: "La clinique est ouverte du lundi au vendredi de 8h00 à 20h00, et le samedi de 9h00 à 14h00. Nous sommes fermés les dimanches et jours fériés." },
          { q: "Gérez-vous les urgences médicales ?", a: "Pour toute urgence vitale, composez immédiatement le 15. Pour des urgences mineures, nous disposons de créneaux dédiés chaque jour. Veuillez nous appeler dès l'ouverture à 8h00." },
          { q: "Quelles assurances acceptez-vous ?", a: "Nous acceptons la plupart des mutuelles et sommes conventionnés Secteur 1. Veuillez apporter votre carte vitale et votre attestation de mutuelle à jour lors de votre rendez-vous." },
          { q: "Comment annuler un rendez-vous ?", a: "Vous pouvez annuler votre rendez-vous via notre portail patient ou par téléphone au moins 24 heures à l'avance. Cela nous permet de proposer le créneau à un autre patient." }
        ].map((faq, idx) => (
          <details key={idx} className="group bg-surface-container-low rounded-xl overflow-hidden border border-tertiary/5" open={idx === 0}>
            <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
              <h3 className="font-headline-md text-headline-md text-primary pr-4">{faq.q}</h3>
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <div className="px-6 pb-6 text-on-surface-variant font-body-md">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
