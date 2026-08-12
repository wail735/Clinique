import React, { useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import { AuthProvider } from '../../context/AuthContext';
import Navbar from './Navbar/Navbar';
import HeroSection from './HeroSection/HeroSection';
import ServicesSection from './ServicesSection/ServicesSection';
import AboutSection from './AboutSection/AboutSection';
import DoctorsSection from './DoctorsSection/DoctorsSection';
import FaqSection from './FaqSection/FaqSection';
import NewsletterSection from './NewsletterSection/NewsletterSection';
import Footer from './Footer/Footer';

export default function HomePage() {
  const [showAuth, setShowAuth] = useState(false);

  const handleBookClick = () => {
    setShowAuth(true);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">
      <Navbar onBookClick={handleBookClick} />
      
      {showAuth ? (
        <div className="pt-20 pb-20">
            <button 
                onClick={() => setShowAuth(false)}
                className="fixed top-24 left-8 z-50 bg-white shadow-md p-3 rounded-full hover:bg-gray-50 flex items-center gap-2 text-primary font-bold"
            >
                <span className="material-symbols-outlined">arrow_back</span>
                Retour à l'accueil
            </button>
            <AuthForm />
        </div>
      ) : (
        <main className="pt-16">
            <HeroSection onBookClick={handleBookClick} />
            <ServicesSection />
            <AboutSection />
            <DoctorsSection onBookClick={handleBookClick} />
            <FaqSection />
            <NewsletterSection />
        </main>
      )}

      <Footer />
    </div>
  );
}
