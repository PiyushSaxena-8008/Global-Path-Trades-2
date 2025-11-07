
import React from 'react';

const testimonials = [
  {
    quote: "Global Path Trades has been an invaluable partner for our sourcing needs in India. Their professionalism and commitment to quality are second to none.",
    name: "John Doe",
    company: "CEO, International Imports"
  },
  {
    quote: "The logistics support we received was seamless. They handled everything from customs to delivery, allowing us to focus on our core business. Highly recommended.",
    name: "Jane Smith",
    company: "Supply Chain Manager, Global Exports LLC"
  },
  {
    quote: "Their team's expertise in the commodity market is exceptional. They provided us with valuable insights and secured a very competitive deal.",
    name: "Samuel Lee",
    company: "Procurement Director, APAC Group"
  }
];

const Clients: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Clients & Partners</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Building trust and lasting relationships across the globe.</p>
           <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md border-l-4 border-blue-500">
              <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
              <div className="text-right">
                <p className="font-bold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Global Reach</h3>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">We proudly serve a diverse clientele spanning across North America, Europe, Asia, and the Middle East, fostering strong trade links that transcend borders.</p>
            <img src="https://picsum.photos/seed/map/1200/400" alt="World map showing global reach" className="mx-auto rounded-lg shadow-lg"/>
        </div>
      </div>
    </section>
  );
};

export default Clients;
