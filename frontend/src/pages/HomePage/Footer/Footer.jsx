import React from 'react';

const Footer = () => (
  <footer className="w-full py-section-gap px-gutter flex flex-col md:flex-row justify-between items-start gap-8 bg-on-background dark:bg-inverse-surface">
    <div className="flex flex-col gap-6">
      <div className="font-headline-md text-headline-md font-bold text-surface-bright">MedPrecision</div>
      <p className="font-body-md text-body-md text-surface-variant max-w-sm">Excellence médicale et soin bienveillant au cœur de Paris. Notre mission est d'assurer votre santé avec précision.</p>
    </div>
    <div className="grid grid-cols-2 gap-16 md:gap-24">
      <div className="flex flex-col gap-4">
        <h6 className="text-surface-bright font-bold uppercase text-label-sm">Navigation</h6>
        <a className="text-surface-variant hover:text-white transition-colors font-body-md" href="#services">Services</a>
        <a className="text-surface-variant hover:text-white transition-colors font-body-md" href="#doctors">Équipe</a>
        <a className="text-surface-variant hover:text-white transition-colors font-body-md" href="#">Carrières</a>
      </div>
      <div className="flex flex-col gap-4">
        <h6 className="text-surface-bright font-bold uppercase text-label-sm">Légal</h6>
        <a className="text-surface-variant hover:text-white transition-colors font-body-md" href="#">Mentions Légales</a>
        <a className="text-surface-variant hover:text-white transition-colors font-body-md" href="#">Politique de Confidentialité</a>
        <a className="text-surface-variant hover:text-white transition-colors font-body-md" href="#">Patient Portal</a>
      </div>
    </div>
    <div className="w-full md:w-auto pt-8 border-t border-white/10 md:border-0">
      <p className="font-label-sm text-label-sm text-surface-variant">© 2024 MedPrecision Medical Clinic. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
