import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const badgeRef = useRef(null);
  const textContentRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isDesktop, isMobile } = context.conditions;

      // 1. Image Animation
      gsap.fromTo(
        imageContainerRef.current,
        { 
          x: isDesktop ? -60 : 0, 
          y: isMobile ? 40 : 0,
          opacity: 0, 
          scale: 0.95 
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? 'top 85%' : 'top 80%',
          },
        }
      );

      // 2. Badge Animation (pop in)
      gsap.fromTo(
        badgeRef.current,
        { scale: 0, opacity: 0, rotation: -15 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          delay: isMobile ? 0.2 : 0.4,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? 'top 85%' : 'top 80%',
          },
        }
      );

      // 3. Text and Features Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 85%' : 'top 80%',
        },
      });

      tl.fromTo(
        textContentRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      )
      .fromTo(
        featuresRef.current.children,
        { x: isDesktop ? 40 : 0, y: isMobile ? 30 : 0, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out' },
        "-=0.4"
      );
    }, sectionRef);

    return () => mm.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-section-gap px-gutter overflow-hidden relative">
      {/* Subtle Premium Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10 rounded-l-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto max-w-container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* =========================================
              IMAGE SIDE 
          ========================================= */}
          <div className="relative" ref={imageContainerRef}>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
              <img 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" 
                src="/hero_clinic.png" 
                alt="Equipe Médicale" 
              />
            </div>
            <div 
              ref={badgeRef}
              className="absolute -bottom-8 -right-8 bg-primary text-on-primary p-8 rounded-2xl hidden md:flex flex-col justify-center items-center max-w-[240px] shadow-2xl z-20 border-4 border-surface"
            >
              <p className="font-headline-lg text-headline-lg mb-1 font-extrabold text-white">15+</p>
              <p className="font-label-sm text-label-sm opacity-90 uppercase tracking-wider text-center font-bold">
                Années d'excellence médicale
              </p>
            </div>
          </div>
          
          {/* =========================================
              TEXT SIDE 
          ========================================= */}
          <div>
            <div ref={textContentRef}>
              <span className="text-secondary font-label-sm text-label-sm font-bold tracking-widest uppercase mb-4 block">
                Pourquoi nous choisir
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-10 leading-tight">
                Une approche moderne de la médecine
              </h2>
            </div>

            <div className="space-y-10" ref={featuresRef}>
              {/* Feature 1 */}
              <div className="flex gap-6 group hover:-translate-y-1 transition-transform duration-300 cursor-default">
                <div className="flex-shrink-0 w-14 h-14 bg-surface-container group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-lg transition-all duration-300 flex items-center justify-center rounded-2xl text-primary">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                    Technologie de pointe
                  </h4>
                  <p className="text-on-surface-variant font-body-md leading-relaxed opacity-90">
                    Nous utilisons les derniers équipements de diagnostic pour garantir des résultats rapides et précis.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="flex gap-6 group hover:-translate-y-1 transition-transform duration-300 cursor-default">
                <div className="flex-shrink-0 w-14 h-14 bg-surface-container group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-lg transition-all duration-300 flex items-center justify-center rounded-2xl text-primary">
                  <span className="material-symbols-outlined text-3xl">groups</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                    Équipe experte
                  </h4>
                  <p className="text-on-surface-variant font-body-md leading-relaxed opacity-90">
                    Nos spécialistes sont reconnus pour leur expertise et leur engagement envers l'excellence clinique.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-6 group hover:-translate-y-1 transition-transform duration-300 cursor-default">
                <div className="flex-shrink-0 w-14 h-14 bg-surface-container group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-lg transition-all duration-300 flex items-center justify-center rounded-2xl text-primary">
                  <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                    Suivi personnalisé
                  </h4>
                  <p className="text-on-surface-variant font-body-md leading-relaxed opacity-90">
                    Chaque patient bénéficie d'un parcours de soins sur mesure, adapté à ses besoins spécifiques.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
