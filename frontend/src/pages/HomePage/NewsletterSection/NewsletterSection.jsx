import React from 'react';
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/ui/map';
import { MapPin } from 'lucide-react';

const NewsletterSection = () => (
  <section id="contact" className="py-section-gap px-gutter bg-on-background text-white">
    <div className="container mx-auto max-w-container-max">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-headline-lg text-headline-lg mb-6">Restez informé</h2>
          <p className="font-body-lg text-body-lg mb-10 opacity-80">Inscrivez-vous à notre newsletter pour recevoir des conseils santé et les actualités de la clinique.</p>
          <form className="flex gap-4 max-w-md">
            <input className="flex-grow bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" placeholder="Votre adresse email" type="email" />
            <button className="bg-secondary-fixed text-on-secondary-fixed px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform" type="submit">S'abonner</button>
          </form>
          <div className="mt-12 grid grid-cols-2 gap-8">
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
        <div className="h-[400px] rounded-2xl overflow-hidden shadow-2xl relative">
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
              center: [3.0588, 36.7538], // Coordonnées pour Alger, Algérie (Longitude, Latitude)
              zoom: 14,
            }}
          >
            <MapMarker longitude={3.0588} latitude={36.7538}>
              <MarkerContent>
                <div className="bg-secondary text-on-secondary p-2 rounded-full shadow-lg">
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

export default NewsletterSection;
