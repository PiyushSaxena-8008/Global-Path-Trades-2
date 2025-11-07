
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Mock form submission
    console.log('Form data submitted:', formData);
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Get In Touch</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">We're here to help. Contact us for quotes, inquiries, or partnership opportunities.</p>
           <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-300" disabled={formStatus === 'submitting'}>
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus === 'success' && <p className="text-green-600 mt-4 text-center">Thank you! Your message has been sent.</p>}
              {formStatus === 'error' && <p className="text-red-600 mt-4 text-center">Something went wrong. Please try again.</p>}
            </form>
          </div>
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>
              <div className="space-y-4 text-gray-600">
                <p><i className="fas fa-map-marker-alt text-blue-600 w-6"></i> 47/C, Narmada Colony, Katol Road, Nagpur, MH-440013, India</p>
                <p><i className="fas fa-envelope text-blue-600 w-6"></i> <a href="mailto:globalpathtrades@gmail.com" className="hover:text-blue-700">globalpathtrades@gmail.com</a></p>
                <p><i className="fas fa-globe text-blue-600 w-6"></i> <a href="https://globalpathtrades.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">globalpathtrades.in</a></p>
                <h4 className="font-semibold pt-4 text-gray-700">Representatives:</h4>
                <p><i className="fas fa-user-tie text-blue-600 w-6"></i> Ishan Shrivastava: +91 9699085715</p>
                <p><i className="fas fa-user-tie text-blue-600 w-6"></i> Piyush Saxena: +91 9422829604</p>
              </div>
            </div>
            <div className="rounded-lg shadow-lg overflow-hidden">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.893874313271!2d79.05318181539207!3d21.15664118592965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0f2b38f8b89%3A0x6b043f4c6e6406f!2sNarmada%20Colony%2C%20Nagpur%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1678886400000"
                    width="100%" 
                    height="300" 
                    style={{border:0}} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map of Global Path Trades Location"
                ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
