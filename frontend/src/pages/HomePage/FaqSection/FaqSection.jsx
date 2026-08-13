import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrement du plugin de scroll
gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "Quelles sont vos heures d'ouverture ?", a: "La clinique est ouverte du lundi au vendredi de 8h00 à 20h00, et le samedi de 9h00 à 14h00. Nous sommes fermés les dimanches et jours fériés." },
  { q: "Gérez-vous les urgences médicales ?", a: "Pour toute urgence vitale, composez immédiatement le 15. Pour des urgences mineures, nous disposons de créneaux dédiés chaque jour. Veuillez nous appeler dès l'ouverture à 8h00." },
  { q: "Quelles assurances acceptez-vous ?", a: "Nous acceptons la plupart des mutuelles et sommes conventionnés Secteur 1. Veuillez apporter votre carte vitale et votre attestation de mutuelle à jour lors de votre rendez-vous." },
  { q: "Comment annuler un rendez-vous ?", a: "Vous pouvez annuler votre rendez-vous via notre portail patient ou par téléphone au moins 24 heures à l'avance. Cela nous permet de proposer le créneau à un autre patient." }
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const contentRefs = useRef([]);

  // Animation d'entrée au scroll
  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isDesktop, isMobile } = context.conditions;

      gsap.fromTo(
        ".faq-header, .faq-item",
        { y: isMobile ? 25 : 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: isMobile ? 0.1 : 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: isMobile ? "top 85%" : "top 80%", // Démarre plus bas sur mobile
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  // Animation fluide de l'accordéon
  const animationCtx = useRef(null);

  useEffect(() => {
    // Initialise le context GSAP une seule fois
    animationCtx.current = gsap.context(() => {}, containerRef);
    return () => animationCtx.current.revert();
  }, []);

  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (!el) return;
      
      // Utilise le context existant sans le détruire pour préserver l'état (hauteur actuelle)
      animationCtx.current.add(() => {
        if (index === activeIndex) {
          gsap.to(el, {
            height: 'auto',
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        } else {
          gsap.to(el, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    });
  }, [activeIndex]);

  const toggleFaq = (idx) => {
    // Si on clique sur celui déjà ouvert, on le ferme, sinon on ouvre le nouveau
    setActiveIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section ref={containerRef} className="py-section-gap px-gutter bg-surface">
      <div className="container mx-auto max-w-3xl">
        
        {/* En-tête */}
        <div className="faq-header text-center mb-16">
          <span className="text-secondary font-label-sm text-label-sm font-bold tracking-widest uppercase block mb-4">
            FAQ
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">
            Questions Fréquentes
          </h2>
        </div>

        {/* Liste des FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx} 
                className="faq-item bg-surface-container-low rounded-xl overflow-hidden border border-tertiary/5"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-6 cursor-pointer text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-headline-md text-headline-md text-primary pr-4">
                    {faq.q}
                  </h3>
                  <span 
                    className={`material-symbols-outlined transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                
                {/* Conteneur du texte de réponse animé par GSAP */}
                <div
                  ref={(el) => (contentRefs.current[idx] = el)}
                  className="h-0 overflow-hidden opacity-0"
                >
                  <div className="px-6 pb-6 text-on-surface-variant font-body-md">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;