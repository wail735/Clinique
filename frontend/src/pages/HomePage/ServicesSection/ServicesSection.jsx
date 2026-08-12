import React from 'react';

const ServicesSection = () => (
  <section id="services" className="py-section-gap px-gutter bg-surface-container-lowest">
    <div className="container mx-auto max-w-container-max">
      <div className="text-center mb-16">
        <span className="text-secondary font-label-sm text-label-sm font-bold tracking-widest uppercase">Nos Spécialités</span>
        <h2 className="font-headline-lg text-headline-lg mt-4 text-primary">Services Médicaux</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-surface p-8 rounded-xl shadow-soft hover:shadow-lg transition-all border border-tertiary/5 group">
          <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center mb-6 text-on-secondary-container group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">medical_services</span>
          </div>
          <h3 className="font-headline-md text-headline-md mb-3 text-primary">Médecine Générale</h3>
          <p className="text-on-surface-variant font-body-md mb-6">Consultations complètes et suivi de santé pour toute la famille.</p>
          <a className="text-secondary font-label-sm text-label-sm font-bold flex items-center gap-2 hover:underline" href="#">En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
        </div>
        <div className="bg-surface p-8 rounded-xl shadow-soft hover:shadow-lg transition-all border border-tertiary/5 group">
          <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center mb-6 text-on-secondary-container group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">favorite</span>
          </div>
          <h3 className="font-headline-md text-headline-md mb-3 text-primary">Cardiologie</h3>
          <p className="text-on-surface-variant font-body-md mb-6">Dépistage, diagnostic et traitement des maladies cardiovasculaires.</p>
          <a className="text-secondary font-label-sm text-label-sm font-bold flex items-center gap-2 hover:underline" href="#">En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
        </div>
        <div className="bg-surface p-8 rounded-xl shadow-soft hover:shadow-lg transition-all border border-tertiary/5 group">
          <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center mb-6 text-on-secondary-container group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">child_care</span>
          </div>
          <h3 className="font-headline-md text-headline-md mb-3 text-primary">Pédiatrie</h3>
          <p className="text-on-surface-variant font-body-md mb-6">Soins spécialisés et bienveillants pour la santé de vos enfants.</p>
          <a className="text-secondary font-label-sm text-label-sm font-bold flex items-center gap-2 hover:underline" href="#">En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
        </div>
        <div className="bg-surface p-8 rounded-xl shadow-soft hover:shadow-lg transition-all border border-tertiary/5 group">
          <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center mb-6 text-on-secondary-container group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">biotech</span>
          </div>
          <h3 className="font-headline-md text-headline-md mb-3 text-primary">Radiologie</h3>
          <p className="text-on-surface-variant font-body-md mb-6">Imagerie médicale avancée pour des diagnostics d'une grande précision.</p>
          <a className="text-secondary font-label-sm text-label-sm font-bold flex items-center gap-2 hover:underline" href="#">En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
        </div>
      </div>
    </div>
  </section>
);

export default ServicesSection;
