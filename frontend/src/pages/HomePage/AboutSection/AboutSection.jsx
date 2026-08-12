import React from 'react';

const AboutSection = () => (
  <section id="about" className="py-section-gap px-gutter overflow-hidden">
    <div className="container mx-auto max-w-container-max">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-soft">
            <img className="w-full h-full object-cover" src="/hero_clinic.png" alt="Equipe" />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-primary text-on-primary p-8 rounded-xl hidden md:block max-w-[240px] shadow-2xl">
            <p className="font-headline-md text-headline-md mb-2">15+</p>
            <p className="font-label-sm text-label-sm opacity-80 uppercase tracking-wider">Années d'excellence médicale</p>
          </div>
        </div>
        <div>
          <span className="text-secondary font-label-sm text-label-sm font-bold tracking-widest uppercase mb-4 block">Pourquoi nous choisir</span>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Une approche moderne de la médecine</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-surface-container flex items-center justify-center rounded-full text-primary">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-primary mb-2">Technologie de pointe</h4>
                <p className="text-on-surface-variant font-body-md">Nous utilisons les derniers équipements de diagnostic pour garantir des résultats rapides et précis.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-surface-container flex items-center justify-center rounded-full text-primary">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-primary mb-2">Équipe experte</h4>
                <p className="text-on-surface-variant font-body-md">Nos spécialistes sont reconnus pour leur expertise et leur engagement envers l'excellence clinique.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-surface-container flex items-center justify-center rounded-full text-primary">
                <span className="material-symbols-outlined">volunteer_activism</span>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-primary mb-2">Suivi personnalisé</h4>
                <p className="text-on-surface-variant font-body-md">Chaque patient bénéficie d'un parcours de soins sur mesure, adapté à ses besoins spécifiques.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
