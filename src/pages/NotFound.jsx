import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PremiumButton from '../components/ui/PremiumButton';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-9xl font-black text-gray-300 mb-4">404</div>
          <h1 className="text-3xl font-black text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PremiumButton as={Link} to="/" className="bg-gray-900 hover:bg-black">
              Go Home
            </PremiumButton>
            <PremiumButton as={Link} to="/jobs" variant="outline">
              Browse Jobs
            </PremiumButton>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
