import React from 'react';

const HeroSection = ({ onBookClick }) => (
  <section className="relative min-h-[921px] flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10"></div>
      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/hero_clinic.png')" }}></div>
    </div>
    <div className="container mx-auto px-gutter relative z-20">
      <div className="max-w-2xl text-white">
        <h1 className="font-headline-lg text-headline-lg mb-6 leading-tight">Votre santé, notre priorité</h1>
        <p className="font-body-lg text-body-lg mb-10 opacity-90 leading-relaxed">
          Une expertise médicale de pointe alliée à une approche humaine et personnalisée pour vous offrir le meilleur des soins.
        </p>
        <div className="flex flex-wrap gap-4">
          <button onClick={onBookClick} className="bg-secondary-fixed text-on-secondary-fixed px-8 py-4 rounded-full font-label-sm text-label-sm font-bold hover:scale-105 transition-transform shadow-lg">Prendre rendez-vous</button>
          <a href="#services" className="border-2 border-white/30 backdrop-blur-md text-white px-8 py-4 rounded-full font-label-sm text-label-sm font-bold hover:bg-white/10 transition-colors flex items-center justify-center">Découvrir nos services</a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
