import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="pt-20 pb-16 bg-masculine-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-300">Last updated: July 24, 2025</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 prose prose-lg max-w-none">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-6">We collect information you provide directly to us, such as when you create an account, apply for jobs, or contact us.</p>
          
          <h2 className="text-2xl font-black text-gray-900 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-6">We use the information we collect to provide, maintain, and improve our services, process applications, and communicate with you.</p>
          
          <h2 className="text-2xl font-black text-gray-900 mb-4">Information Sharing</h2>
          <p className="text-gray-700 mb-6">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
          
          <h2 className="text-2xl font-black text-gray-900 mb-4">Data Security</h2>
          <p className="text-gray-700 mb-6">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          
          <h2 className="text-2xl font-black text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700">If you have questions about this Privacy Policy, please contact us at privacy@hiresphere.com</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
