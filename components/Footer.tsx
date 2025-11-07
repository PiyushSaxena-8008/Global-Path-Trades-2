
import React from 'react';

const Footer: React.FC = () => {
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#products', label: 'Products' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Global Path Trades</h3>
            <p className="text-gray-400">Connecting India to the world with trust and efficiency. Your partner in global import-export trade.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li><i className="fas fa-map-marker-alt w-6"></i> Katol Road, Nagpur, India</li>
              <li><i className="fas fa-envelope w-6"></i> globalpathtrades@gmail.com</li>
              <li><i className="fas fa-phone w-6"></i> +91 9699085715</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Global Path Trades. All Rights Reserved. | Website designed by AI.</p>
      </div>
    </footer>
  );
};

export default Footer;
