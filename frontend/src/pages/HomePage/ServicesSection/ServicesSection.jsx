import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".service-card");

    // Nouvelle méthode : Pop-in avec effet élastique (Bounce)
    gsap.fromTo(
      cards,
      { 
        scale: 0.8,   // Commence un peu plus petit
        y: 50,        // Démarre plus bas
        opacity: 0,
      },
      {
        scale: 1,     // Reprend sa taille normale
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)", // C'est ICI le secret : un léger rebond à la fin de l'animation
        stagger: 0.15,         // Apparition en cascade
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-section-gap px-gutter bg-surface-container-lowest"
    >
      <div
        className="container mx-auto max-w-container-max"
        style={{ perspective: "1000px" }}
      >
        <div className="text-center mb-16">
          <span className="text-secondary font-label-sm text-label-sm font-bold tracking-widest uppercase">
            Nos Spécialités
          </span>
          <h2 className="font-headline-lg text-headline-lg mt-4 text-primary">
            Services Médicaux
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="service-card bg-surface p-8 rounded-xl shadow-soft hover:shadow-lg transition-all border border-tertiary/5 group">
            <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center mb-6 text-on-secondary-container group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">medical_services</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-3 text-primary">Médecine Générale</h3>
            <p className="text-on-surface-variant font-body-md mb-6">
              Consultations complètes et suivi de santé pour toute la famille.
            </p>
            <a className="text-secondary font-label-sm text-label-sm font-bold flex items-center gap-2 hover:underline" href="#">
              En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>

          <div className="service-card bg-surface p-8 rounded-xl shadow-soft hover:shadow-lg transition-all border border-tertiary/5 group">
            <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center mb-6 text-on-secondary-container group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">favorite</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-3 text-primary">Cardiologie</h3>
            <p className="text-on-surface-variant font-body-md mb-6">
              Dépistage, diagnostic et traitement des maladies cardiovasculaires.
            </p>
            <a className="text-secondary font-label-sm text-label-sm font-bold flex items-center gap-2 hover:underline" href="#">
              En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>

          <div className="service-card bg-surface p-8 rounded-xl shadow-soft hover:shadow-lg transition-all border border-tertiary/5 group">
            <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center mb-6 text-on-secondary-container group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">child_care</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-3 text-primary">Pédiatrie</h3>
            <p className="text-on-surface-variant font-body-md mb-6">
              Soins spécialisés et bienveillants pour la santé de vos enfants.
            </p>
            <a className="text-secondary font-label-sm text-label-sm font-bold flex items-center gap-2 hover:underline" href="#">
              En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>

          <div className="service-card bg-surface p-8 rounded-xl shadow-soft hover:shadow-lg transition-all border border-tertiary/5 group">
            <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center mb-6 text-on-secondary-container group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">biotech</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-3 text-primary">Radiologie</h3>
            <p className="text-on-surface-variant font-body-md mb-6">
              Imagerie médicale avancée pour des diagnostics d'une grande précision.
            </p>
            <a className="text-secondary font-label-sm text-label-sm font-bold flex items-center gap-2 hover:underline" href="#">
              En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;