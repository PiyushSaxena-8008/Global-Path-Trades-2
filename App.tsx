
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Services from './components/Services';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    products: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    clients: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);


  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header activeSection={activeSection} />
      <main>
        <div id="home" ref={sectionRefs.home}>
          <Hero />
        </div>
        <div id="about" ref={sectionRefs.about}>
          <About />
        </div>
        <div id="products" ref={sectionRefs.products}>
          <Products />
        </div>
        <div id="services" ref={sectionRefs.services}>
          <Services />
        </div>
        <div id="clients" ref={sectionRefs.clients}>
          <Clients />
        </div>
        <div id="contact" ref={sectionRefs.contact}>
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
