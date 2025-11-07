
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">About Global Path Trades</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Your premier partner in navigating the complexities of international trade.</p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Company Profile</h3>
            <p className="text-gray-600 mb-4">
              Based in the logistical heart of India, Nagpur, Global Path Trades is a dynamic import-export company dedicated to facilitating seamless global trade. We specialize in a diverse range of commodities, connecting Indian suppliers with international markets and vice-versa. Our core values of trust, efficiency, and transparency guide every transaction.
            </p>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-blue-700 mb-2">Our Mission</h4>
                <p className="text-gray-600">To be a reliable and efficient bridge for global trade, empowering businesses by providing superior sourcing, logistics, and trading services, while upholding the highest standards of integrity.</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-700 mb-2">Our Vision</h4>
                <p className="text-gray-600">To become a globally recognized leader in the import-export sector, known for our innovative solutions, unwavering commitment to quality, and our role in fostering sustainable international business relationships.</p>
              </div>
            </div>
          </div>
          <div>
            <img src="https://picsum.photos/seed/team/600/400" alt="Global Path Trades office" className="rounded-lg shadow-xl w-full" />
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Leadership</h3>
          <div className="grid sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <img src="https://picsum.photos/seed/ishan/200" alt="Ishan Shrivastava" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-200" />
              <h4 className="text-xl font-bold text-gray-800">Ishan Shrivastava</h4>
              <p className="text-gray-500 mb-2">Co-Founder</p>
              <p className="text-gray-600">With extensive experience in international market analysis and logistics, Ishan drives our strategic vision and operational excellence.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <img src="https://picsum.photos/seed/piyush/200" alt="Piyush Saxena" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-200" />
              <h4 className="text-xl font-bold text-gray-800">Piyush Saxena</h4>
              <p className="text-gray-500 mb-2">Co-Founder</p>
              <p className="text-gray-600">Piyush's expertise in supplier relations and quality assurance ensures we consistently deliver the best products to our clients worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
