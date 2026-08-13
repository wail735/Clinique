"use client"; // Indispensable pour Next.js avec les hooks !

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Composants de la carte (assurez-vous que vos imports sont corrects)
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/ui/map';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NewsletterSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)", // lg:grid-cols-2 breakpoint
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      let { isDesktop, isMobile } = context.conditions;

      // Création d'une timeline pour synchroniser les deux éléments
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 85%" : "top 75%",
          toggleActions: "play none none none",
        }
      });

      // 1. Animation de la section texte/formulaire en cascade
      tl.fromTo(
        ".gsap-left-item",
        { 
          x: isDesktop ? -40 : 0, 
          y: isMobile ? 30 : 0, 
          opacity: 0 
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        }
      )
      // 2. Animation de la carte
      .fromTo(
        ".gsap-map-container",
        { 
          x: isDesktop ? 40 : 0, 
          y: isMobile ? 30 : 0,
          opacity: 0, 
          scale: 0.95 
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out"
        },
        "-=0.6" // Commence un peu avant la fin
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-section-gap px-gutter bg-on-background text-white overflow-hidden">
      <div className="container mx-auto max-w-container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Colonne de gauche (Textes et Formulaire) */}
          <div>
            <h2 className="gsap-left-item font-headline-lg text-headline-lg mb-6">
              Restez informé
            </h2>
            <p className="gsap-left-item font-body-lg text-body-lg mb-10 opacity-80">
              Inscrivez-vous à notre newsletter pour recevoir des conseils santé et les actualités de la clinique.
            </p>
            
            <form className="gsap-left-item flex gap-4 max-w-md">
              <input 
                className="flex-grow bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" 
                placeholder="Votre adresse email" 
                type="email" 
              />
              <button 
                className="bg-secondary-fixed text-on-secondary-fixed px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform" 
                type="submit"
              >
                S'abonner
              </button>
            </form>
            
            <div className="gsap-left-item mt-12 grid grid-cols-2 gap-8">
              <div>
                <h5 className="text-secondary font-bold mb-2">Adresse</h5>
                <p className="opacity-80">123 Rue de la Santé<br/>16000 Alger, Algérie</p>
              </div>
              <div>
                <h5 className="text-secondary font-bold mb-2">Téléphone</h5>
                <p className="opacity-80">+213 21 23 45 67<br/>contact@clinique.dz</p>
              </div>
            </div>
          </div>

          {/* Colonne de droite (Carte interactive) */}
          <div className="gsap-map-container h-[400px] rounded-2xl overflow-hidden shadow-2xl relative">
            <Map 
              styles={{
                light: {
                  version: 8,
                  sources: {
                    osm: {
                      type: "raster",
                      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
                      tileSize: 256,
                      attribution: "&copy; OpenStreetMap Contributors",
                    },
                  },
                  layers: [
                    {
                      id: "osm",
                      type: "raster",
                      source: "osm",
                    },
                  ],
                },
                dark: {
                  version: 8,
                  sources: {
                    osm: {
                      type: "raster",
                      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
                      tileSize: 256,
                      attribution: "&copy; OpenStreetMap Contributors",
                    },
                  },
                  layers: [
                    {
                      id: "osm",
                      type: "raster",
                      source: "osm",
                    },
                  ],
                }
              }}
              viewport={{
                center: [3.0588, 36.7538], // Alger
                zoom: 14,
              }}
            >
              <MapMarker longitude={3.0588} latitude={36.7538}>
                <MarkerContent>
                  {/* Animation CSS simple pour le marqueur de la carte (pulsation) */}
                  <div className="bg-secondary text-on-secondary p-2 rounded-full shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                </MarkerContent>
              </MapMarker>
              <MapControls position="bottom-right" showZoom />
            </Map>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;