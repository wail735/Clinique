import React from 'react';

const DoctorsSection = ({ onBookClick }) => (
  <section id="doctors" className="py-section-gap px-gutter bg-surface-dim/30">
    <div className="container mx-auto max-w-container-max">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="text-secondary font-label-sm text-label-sm font-bold tracking-widest uppercase block mb-4">Notre Équipe</span>
          <h2 className="font-headline-lg text-headline-lg text-primary">Rencontrez nos spécialistes</h2>
        </div>
        <div className="hidden md:flex gap-4">
          <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined">chevron_left</span></button>
          <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined">chevron_right</span></button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <div key={idx} className="group cursor-pointer">
            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 relative">
              <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={doctor.image} alt={doctor.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <button onClick={onBookClick} className="w-full py-3 bg-white text-primary rounded-full font-bold text-label-sm shadow-md hover:bg-gray-50 transition-colors">Prendre RDV</button>
              </div>
            </div>
            <h4 className="font-headline-md text-headline-md text-primary mb-1">{doctor.name}</h4>
            <p className="text-secondary font-label-sm text-label-sm font-bold uppercase tracking-wide">{doctor.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DoctorsSection;
