
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <img src="https://picsum.photos/seed/trade/1920/1080" alt="Global trade and logistics" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Connecting India to the World</h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">Global Path Trades is your trusted partner in import-export, bridging markets and creating opportunities with efficiency and transparency.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out text-lg">
            Request a Quote
          </a>
          <a href="#services" className="bg-white hover:bg-gray-200 text-blue-600 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out text-lg">
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
