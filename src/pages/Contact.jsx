import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PremiumButton from '../components/ui/PremiumButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your inquiry. Our executive team will contact you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        inquiryType: 'general'
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      title: 'Executive Headquarters',
      details: [
        '1250 Executive Plaza, Suite 4000',
        'New York, NY 10001',
        'United States'
      ],
      icon: '🏢'
    },
    {
      title: 'Executive Hotline',
      details: [
        '+1 (555) 123-4567',
        'Available 24/7 for urgent placements',
        'executives@hiresphere.com'
      ],
      icon: '📞'
    },
    {
      title: 'Business Hours',
      details: [
        'Monday - Friday: 8:00 AM - 8:00 PM EST',
        'Saturday: 9:00 AM - 5:00 PM EST',
        'Sunday: Emergency placements only'
      ],
      icon: '🕐'
    }
  ];

  const offices = [
    { city: 'New York', address: '1250 Executive Plaza', phone: '+1 (555) 123-4567' },
    { city: 'San Francisco', address: '500 Market Street', phone: '+1 (555) 234-5678' },
    { city: 'Chicago', address: '200 West Madison', phone: '+1 (555) 345-6789' },
    { city: 'London', address: '25 Bank Street', phone: '+44 20 7123 4567' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-masculine-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Contact Our 
              <span className="text-gray-300"> Executive Team</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Ready to discuss your executive search needs or advance your career? Our senior consultants are standing by.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-in-left">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Inquiry Type
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="general">General Inquiry</option>
                  <option value="executive-search">Executive Search</option>
                  <option value="career-services">Career Services</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="media">Media Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                  placeholder="Please describe your executive search needs or career objectives..."
                />
              </div>

              <PremiumButton
                type="submit"
                loading={isSubmitting}
                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4"
                size="lg"
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </PremiumButton>
            </form>
          </div>

          {/* Contact Information */}
          <div className="animate-slide-in-right">
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{info.icon}</div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-3">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 mb-1">{detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Global Offices */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-black text-gray-900 mb-4">Global Offices</h3>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <div key={index} className="border-l-4 border-gray-900 pl-4">
                    <h4 className="font-bold text-gray-900">{office.city}</h4>
                    <p className="text-gray-600 text-sm">{office.address}</p>
                    <p className="text-gray-600 text-sm">{office.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
