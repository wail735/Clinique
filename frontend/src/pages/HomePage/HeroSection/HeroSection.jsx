import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = ({ onBookClick }) => {
  const sectionRef = useRef(null);
  const bgImageRef = useRef(null);
  const bgOverlayRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      // 1. Initial background subtle zoom & unblur effect
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.15, filter: "blur(8px)" },
        { scale: 1, filter: "blur(0px)", duration: 2.5, ease: "power3.out" }
      );

      // 2. Overlay fade in
      gsap.fromTo(
        bgOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.inOut" }
      );

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Title reveal with a slight 3D rotation for a premium feel
      tl.fromTo(
        titleRef.current,
        { 
          y: isMobile ? 30 : 60, 
          opacity: 0,
          rotationX: isMobile ? 0 : 15 // Pas de rotation 3D sur mobile pour de meilleures perfs
        },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 1.2, 
          delay: 0.3 
        }
      )
      // Description stagger
      .fromTo(
        descRef.current,
        { y: isMobile ? 20 : 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.9"
      )
      // Buttons staggered entrance with a subtle bounce back
      .fromTo(
        buttonsRef.current.children,
        { y: isMobile ? 15 : 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)" },
        "-=0.7"
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[921px] flex items-center overflow-hidden" style={{ perspective: '1000px' }}>
      <div className="absolute inset-0 z-0 bg-surface overflow-hidden">
        <div 
          ref={bgImageRef}
          className="w-full h-full bg-cover bg-center origin-center" 
          style={{ backgroundImage: "url('/hero_clinic.png')" }}
        ></div>
        <div 
          ref={bgOverlayRef}
          className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent z-10"
        ></div>
      </div>
      
      <div className="container mx-auto px-gutter relative z-20">
        <div className="max-w-2xl text-white">
          <h1 
            ref={titleRef} 
            className="font-headline-lg text-headline-lg mb-6 leading-tight drop-shadow-md"
            style={{ transformStyle: 'preserve-3d' }}
          >
            Votre santé, notre priorité
          </h1>
          <p 
            ref={descRef} 
            className="font-body-lg text-body-lg mb-10 opacity-90 leading-relaxed text-white/90"
          >
            Une expertise médicale de pointe alliée à une approche humaine et personnalisée pour vous offrir le meilleur des soins.
          </p>
          <div ref={buttonsRef} className="flex flex-wrap gap-4">
            <button 
              onClick={onBookClick} 
              className="bg-secondary-fixed text-on-secondary-fixed px-8 py-4 rounded-full font-label-sm text-label-sm font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-secondary-fixed/30"
            >
              Prendre rendez-vous
            </button>
            <a 
              href="#services" 
              className="border-2 border-white/30 backdrop-blur-md text-white px-8 py-4 rounded-full font-label-sm text-label-sm font-bold hover:bg-white/10 active:scale-95 transition-all duration-300 flex items-center justify-center"
            >
              Découvrir nos services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
