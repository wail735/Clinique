import React, { useState, useEffect } from 'react';

const Navbar = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter py-4 transition-all ${
      isScrolled ? 'bg-surface shadow-md' : 'bg-surface/95 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="font-headline-md text-headline-md font-bold text-primary tracking-tight">MedPrecision</div>
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <a className="text-on-surface-variant hover:text-secondary transition-colors duration-200 font-label-sm text-label-sm" href="#services">Services</a>
        <a className="text-on-surface-variant hover:text-secondary transition-colors duration-200 font-label-sm text-label-sm" href="#doctors">Médecins</a>
        <a className="text-on-surface-variant hover:text-secondary transition-colors duration-200 font-label-sm text-label-sm" href="#about">À propos</a>
        <a className="text-on-surface-variant hover:text-secondary transition-colors duration-200 font-label-sm text-label-sm" href="#contact">Contact</a>
        <button 
          onClick={onBookClick}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-sm text-label-sm font-bold hover:opacity-90 transition-all shadow-md active:scale-95"
        >
          Prendre rendez-vous
        </button>
      </div>
      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-primary">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </nav>
  );
};

export default Navbar;
