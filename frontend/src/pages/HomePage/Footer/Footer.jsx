import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrement du plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear(); // Année dynamique

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      // On cible tous les éléments qui ont la classe "footer-block"
      gsap.fromTo(
        ".footer-block",
        { 
          y: isMobile ? 20 : 30, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: isMobile ? 0.1 : 0.15, // Plus rapide sur mobile
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: isMobile ? "top 98%" : "top 95%", // Démarre plus bas sur mobile
            toggleActions: "play none none none" 
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="w-full py-section-gap px-gutter flex flex-col md:flex-row justify-between items-start gap-8 bg-on-background dark:bg-inverse-surface"
    >
      {/* Bloc 1 : Marque et description */}
      <div className="footer-block flex flex-col gap-6">
        <div className="font-headline-md text-headline-md font-bold text-surface-bright">
          MedPrecision
        </div>
        <p className="font-body-md text-body-md text-surface-variant max-w-sm">
          Excellence médicale et soin bienveillant au cœur de Paris. Notre mission est d'assurer votre santé avec précision.
        </p>
      </div>

      {/* Conteneur des colonnes de liens */}
      <div className="grid grid-cols-2 gap-16 md:gap-24">
        
        {/* Bloc 2 : Navigation */}
        <div className="footer-block flex flex-col gap-4">
          <h6 className="text-surface-bright font-bold uppercase text-label-sm">Navigation</h6>
          <a className="text-surface-variant hover:text-white transition-colors font-body-md" href="#services">Services</a>
          <a className="text-surface-variant hover:text-white transition-colors font-body-md" href="#doctors">Équipe</a>
          <a className="text-surface-variant hover:text-white transition-colors font-body-md" href="#careers">Carrières</a>
        </div>

        {/* Bloc 3 : Légal */}
        <div className="footer-block flex flex-col gap-4">
          <h6 className="text-surface-bright font-bold uppercase text-label-sm">Légal</h6>
          <a className="text-surface-variant hover:text-white transition-colors font-body-md" href="#legal">Mentions Légales</a>
          <a className="text-surface-variant hover:text-white transition-colors font-body-md" href="#privacy">Politique de Confidentialité</a>
          <a className="text-surface-variant hover:text-white transition-colors font-body-md" href="#portal">Portail Patient</a>
        </div>
      </div>

      {/* Bloc 4 : Copyright */}
      <div className="footer-block w-full md:w-auto pt-8 border-t border-white/10 md:border-0">
        <p className="font-label-sm text-label-sm text-surface-variant">
          © {currentYear} MedPrecision Medical Clinic. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;