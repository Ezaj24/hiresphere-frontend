import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PremiumButton from '../ui/PremiumButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-sm shadow-lg border-b border-gray-200' 
        : 'bg-white shadow-md border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Clean Logo Design */}
          <Link to="/" className="flex items-center group">
            <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center shadow-md transform group-hover:scale-105 transition-all duration-300">
              <span className="text-white font-black text-lg">H</span>
            </div>
            <span className="ml-3 text-2xl font-black text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
              HireSphere
            </span>
          </Link>

          {/* Clean Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { path: '/jobs', label: 'Jobs' },
              { path: '/companies', label: 'Companies' },
              { path: '/about', label: 'About' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-semibold transition-colors duration-300 ${
                  isActive(item.path)
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Clean Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {user.name?.split(' ')[0] || 'User'}
                  </span>
                </div>
                
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                    isActive('/dashboard')
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-300"
                >
                  Sign In
                </Link>
                
                <PremiumButton
                  as={Link}
                  to="/register"
                  size="sm"
                  className="bg-gray-900 hover:bg-black text-white font-semibold"
                >
                  Sign Up
                </PremiumButton>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 focus:outline-none transition-colors"
            >
              <svg className={`h-6 w-6 transform transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="space-y-1 border-t border-gray-200 bg-white pt-4">
            {[
              { path: '/jobs', label: 'Jobs' },
              { path: '/companies', label: 'Companies' },
              { path: '/about', label: 'About' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2 mb-2">
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">{user.name || 'User'}</span>
                  </div>
                  
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-semibold transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-semibold transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-semibold transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  
                  <Link
                    to="/register"
                    className="block px-4 py-3 bg-gray-900 text-white hover:bg-black rounded-lg font-semibold transition-colors mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
