
import React from 'react';

const products = [
  {
    name: 'Agricultural Commodities',
    description: 'We trade a wide range of high-quality agricultural products including grains, spices, fruits, and vegetables sourced directly from Indian farms.',
    image: 'https://picsum.photos/seed/agri/400/300',
    alt: 'Agricultural products like grains and spices'
  },
  {
    name: 'Industrial Raw Materials',
    description: 'Our portfolio includes essential industrial raw materials such as minerals, metals, and chemicals for various manufacturing sectors.',
    image: 'https://picsum.photos/seed/industrial/400/300',
    alt: 'Industrial raw materials'
  },
  {
    name: 'Textiles & Garments',
    description: 'Sourcing and exporting premium quality textiles, fabrics, and ready-made garments from India’s leading manufacturing hubs.',
    image: 'https://picsum.photos/seed/textile/400/300',
    alt: 'Colorful textiles and fabrics'
  },
  {
    name: 'Handicrafts & Decor',
    description: 'We export unique, handcrafted items that showcase the rich cultural heritage and artisanal skills of India.',
    image: 'https://picsum.photos/seed/handicraft/400/300',
    alt: 'Indian handicrafts'
  },
];

const Products: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Products & Commodities</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">We deal in a diverse range of products to meet the demands of the global market.</p>
           <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <img src={product.image} alt={product.alt} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
