import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DoctorsSection = ({ onBookClick }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isDesktop, isMobile } = context.conditions;

      // 1. Animation propre et fluide de l'en-tête
      gsap.from('.doctor-header > *', {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 85%' : 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // 2. Animation de révélation par carte avec un effet de redimensionnement de masque (Overflow Reveal)
      const cardElements = gsap.utils.toArray('.doctor-card-box');

      cardElements.forEach((card, index) => {
        const innerImg = card.querySelector('.doctor-img-container');

        // Animation globale de la carte
        gsap.fromTo(
          card,
          {
            y: isMobile ? 30 : 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: isMobile ? card : '.doctors-grid',
              start: isMobile ? 'top 85%' : 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Animation d'expansion de l'image (effet de cadre qui s'ouvre)
        gsap.fromTo(
          innerImg,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            scale: 1.15,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.3,
            ease: 'power4.out',
            delay: isMobile ? 0 : index * 0.15, // Pas de délai sur mobile car déclenchement individuel
            scrollTrigger: {
              trigger: isMobile ? card : '.doctors-grid',
              start: isMobile ? 'top 85%' : 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="doctors" className="py-24 px-6 md:px-12 bg-surface-dim/30 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        
        {/* En-tête */}
        <div className="doctor-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-secondary font-label-sm font-bold tracking-widest uppercase block mb-3">
              Notre Équipe Médicale
            </span>
            <h2 className="font-headline-lg text-4xl md:text-5xl text-primary font-bold tracking-tight">
              Rencontrez nos spécialistes
            </h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        
        {/* Grille */}
        <div className="doctors-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Marc Lefebvre",
              specialty: "Cardiologie",
              image: "/doctor_cardio.png"
            },
            {
              name: "Dr. Sarah Cohen",
              specialty: "Pédiatrie",
              image: "/doctor_pediatrie.png"
            },
            {
              name: "Dr. Alain Durand",
              specialty: "Radiologie",
              image: "/doctor_radio.png"
            }
          ].map((doctor, idx) => (
            <div key={idx} className="doctor-card-box group cursor-pointer will-change-transform">
              <div className="doctor-img-container aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative shadow-lg bg-gray-100 will-change-transform">
                <img 
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                  src={doctor.image} 
                  alt={doctor.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <button 
                    onClick={onBookClick} 
                    className="w-full py-3.5 bg-white text-primary rounded-full font-bold text-sm tracking-wide shadow-xl hover:bg-primary hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                  >
                    Prendre RDV
                  </button>
                </div>
              </div>
              <h4 className="font-headline-md text-2xl text-primary font-semibold mb-1">{doctor.name}</h4>
              <p className="text-secondary font-label-sm text-xs font-bold uppercase tracking-wider">{doctor.specialty}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DoctorsSection;