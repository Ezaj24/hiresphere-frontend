import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="pt-20 pb-16 bg-masculine-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-300">Last updated: July 24, 2025</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 prose prose-lg max-w-none">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700 mb-6">By accessing and using HireSphere, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2 className="text-2xl font-black text-gray-900 mb-4">Use License</h2>
          <p className="text-gray-700 mb-6">Permission is granted to temporarily access HireSphere for personal, non-commercial transitory viewing only.</p>
          
          <h2 className="text-2xl font-black text-gray-900 mb-4">User Accounts</h2>
          <p className="text-gray-700 mb-6">You are responsible for safeguarding the password and for all activities that occur under your account.</p>
          
          <h2 className="text-2xl font-black text-gray-900 mb-4">Prohibited Uses</h2>
          <p className="text-gray-700 mb-6">You may not use our service for any illegal or unauthorized purpose or to violate any international, federal, provincial, or state laws.</p>
          
          <h2 className="text-2xl font-black text-gray-900 mb-4">Contact Information</h2>
          <p className="text-gray-700">Questions about the Terms of Service should be sent to us at legal@hiresphere.com</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
