import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogIn } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About QCU', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Apply Now', path: '/apply', isButton: true }
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-qcu-secondary/95 backdrop-blur-md shadow-lg' 
        : 'bg-qcu-secondary shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-105"
          >
            <div className="relative">
              <img 
                src="/qcu-logo.png" 
                alt="QCU Logo" 
                className="h-14 w-14 object-contain transition-transform duration-200 group-hover:rotate-3"
              />
              <div className="absolute inset-0 bg-qcu-bronze/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold university-title text-white group-hover:text-qcu-bronze transition-colors duration-200">
                Quezon City University
              </span>
              <div className="text-xs text-qcu-accent opacity-90">
                Excellence in Education Since 1994
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  item.isButton
                    ? 'bg-qcu-bronze hover:bg-qcu-bronze/90 text-qcu-dark px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200'
                    : isActive(item.path)
                    ? 'text-qcu-bronze font-semibold px-4 py-2 rounded-lg bg-qcu-bronze/10 border-b-2 border-qcu-bronze'
                    : 'text-white hover:text-qcu-bronze px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200'
                } relative group`}
              >
                {item.name}
                {!item.isButton && (
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-qcu-bronze transition-all duration-200 ${
                    isActive(item.path) ? 'w-full' : 'group-hover:w-full'
                  }`}></span>
                )}
              </Link>
            ))}
            
            {/* Student Portal Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-white hover:text-qcu-bronze px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200">
                <User className="h-4 w-4 mr-2" />
                Student Portal
                <ChevronDown className="h-4 w-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 border border-gray-100">
                <div className="py-2">
                  <Link
                    to="/dashboard-login"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-qcu-primary/5 hover:text-qcu-primary transition-colors duration-150"
                  >
                    <LogIn className="h-4 w-4 mr-3" />
                    Login to Dashboard
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <div className="px-4 py-2">
                    <p className="text-xs text-gray-500 mb-2">Need help?</p>
                    <p className="text-xs text-qcu-primary font-medium">📞 (02) 8806-3000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-white hover:text-qcu-bronze p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute inset-0 transform transition-all duration-200 ${
                  isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`} />
                <X className={`absolute inset-0 transform transition-all duration-200 ${
                  isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-6 space-y-2 bg-qcu-secondary/95 backdrop-blur-md border-t border-qcu-primary/20">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  item.isButton
                    ? 'bg-qcu-bronze hover:bg-qcu-bronze/90 text-qcu-dark font-semibold shadow-lg'
                    : isActive(item.path)
                    ? 'text-qcu-bronze font-semibold bg-qcu-bronze/10 border-l-4 border-qcu-bronze'
                    : 'text-white hover:text-qcu-bronze hover:bg-white/10'
                } block px-4 py-3 rounded-lg text-base transition-all duration-200 transform hover:translate-x-1`}
                onClick={() => setIsMenuOpen(false)}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: isMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                }}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Student Portal */}
            <div className="border-t border-qcu-primary/20 pt-4 mt-4">
              <Link
                to="/dashboard-login"
                className="flex items-center text-white hover:text-qcu-bronze hover:bg-white/10 px-4 py-3 rounded-lg text-base transition-all duration-200 transform hover:translate-x-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-3" />
                Student Portal
              </Link>
            </div>
            
            {/* Mobile Contact Info */}
            <div className="border-t border-qcu-primary/20 pt-4 mt-4 px-4">
              <p className="text-qcu-accent text-sm mb-2">Need assistance?</p>
              <div className="space-y-1">
                <p className="text-qcu-bronze text-sm font-medium">📞 (02) 8806-3000</p>
                <p className="text-qcu-bronze text-sm font-medium">📧 info@qcu.edu.ph</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;