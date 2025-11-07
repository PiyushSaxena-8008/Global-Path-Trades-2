
import React from 'react';

const services = [
  {
    icon: 'fas fa-globe-americas',
    title: 'Global Trading',
    description: 'We facilitate import and export of a wide array of commodities, ensuring competitive pricing and timely delivery.'
  },
  {
    icon: 'fas fa-truck-loading',
    title: 'Logistics Support',
    description: 'Our end-to-end logistics solutions cover freight, customs clearance, and warehousing for hassle-free shipments.'
  },
  {
    icon: 'fas fa-search-location',
    title: 'Strategic Sourcing',
    description: 'Leveraging our vast network, we identify and vet reliable suppliers to source high-quality products that meet your specifications.'
  },
  {
    icon: 'fas fa-clipboard-check',
    title: 'Quality Control',
    description: 'We implement rigorous quality checks at every stage to ensure all products adhere to international standards.'
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Services</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Comprehensive solutions to power your global trade operations.</p>
           <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-blue-600 text-5xl mb-6">
                <i className={service.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
