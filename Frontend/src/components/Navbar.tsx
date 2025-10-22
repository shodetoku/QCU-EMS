import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogIn, Monitor } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-gradient-to-r from-qcu-dark via-qcu-secondary to-qcu-deep shadow-2xl backdrop-blur-lg' 
        : 'bg-gradient-to-r from-qcu-secondary via-qcu-deep to-qcu-dark shadow-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center space-x-4 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <img 
                src="/qcu-logo.png" 
                alt="QCU Logo" 
                className="h-16 w-16 object-contain transition-all duration-300 group-hover:rotate-6 drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300" style={{ fontFamily: 'Cinzel, serif' }}>
                Quezon City University
              </div>
              <div className="text-sm text-yellow-300 opacity-90 font-medium tracking-wide">
                Excellence in Education Since 1994
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  item.isButton
                    ? 'bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-white text-qcu-primary px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-white'
                    : isActive(item.path)
                    ? 'text-white font-bold px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/50 shadow-lg'
                    : 'text-white hover:text-blue-100 px-6 py-3 rounded-full hover:bg-white/10 hover:backdrop-blur-sm transition-all duration-300 font-medium'
                } relative group text-lg`}
              >
                {item.name}
                {!item.isButton && (
                  <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-300 ${
                    isActive(item.path) ? 'w-8' : 'group-hover:w-8'
                  }`}></span>
                )}
              </Link>
            ))}
            
            {/* Login Dropdown */}
            <div className="relative group ml-4">
              <button className="flex items-center text-white hover:text-blue-100 px-6 py-3 rounded-full hover:bg-white/10 hover:backdrop-blur-sm transition-all duration-300 font-medium text-lg">
                <User className="h-5 w-5 mr-2" />
                Login
                <ChevronDown className="h-5 w-5 ml-2 transform group-hover:rotate-180 transition-transform duration-300" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-qcu-primary to-qcu-secondary p-4">
                  <div className="flex items-center text-white">
                    <LogIn className="h-6 w-6 mr-2" />
                    <span className="font-bold text-lg">Account Access</span>
                  </div>
                </div>
                <div className="p-3">
                  <Link
                    to="/login"
                    className="flex items-start px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-qcu-primary/10 hover:to-qcu-secondary/10 hover:text-qcu-primary transition-all duration-200 rounded-xl font-medium group/item"
                  >
                    <span className="text-xl mr-3 mt-0.5">🔐</span>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover/item:text-qcu-primary">Login to QCU Portal</div>
                      <div className="text-xs text-gray-500 mt-0.5">For students and staff</div>
                    </div>
                  </Link>
                  <Link
                    to="/dashboard-login"
                    className="flex items-start px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-qcu-primary/10 hover:to-qcu-secondary/10 hover:text-qcu-primary transition-all duration-200 rounded-xl font-medium group/item"
                  >
                    <Monitor className="h-5 w-5 mr-3 mt-0.5 text-gray-700 group-hover/item:text-qcu-primary" />
                    <div>
                      <div className="font-semibold text-gray-900 group-hover/item:text-qcu-primary">Login to Dashboard</div>
                      <div className="text-xs text-gray-500 mt-0.5">For Applicants</div>
                    </div>
                  </Link>
                  <div className="border-t border-gray-100 my-2"></div>
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <p className="text-xs text-gray-600 mb-2 font-medium">Need assistance?</p>
                    <div className="space-y-1">
                      <p className="text-sm text-qcu-primary font-bold flex items-center">
                        <span className="mr-2">📞</span>
                        <span>(02) 8806-3000</span>
                      </p>
                      <p className="text-sm text-qcu-primary font-bold flex items-center">
                        <span className="mr-2">📧</span>
                        <span>info@qcu.edu.ph</span>
                      </p>
                    </div>
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
              className="text-white hover:text-yellow-300 p-3 rounded-full hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute inset-0 transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`} />
                <X className={`absolute inset-0 transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-4 space-y-3 bg-gradient-to-b from-transparent to-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  item.isButton
                    ? 'bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-white text-qcu-primary font-bold shadow-lg text-center'
                    : isActive(item.path)
                    ? 'text-white font-bold bg-white/10 backdrop-blur-sm border-l-4 border-white'
                    : 'text-white hover:text-blue-100 hover:bg-white/10 hover:backdrop-blur-sm'
                } block px-6 py-4 rounded-xl text-lg transition-all duration-300 transform hover:translate-x-2`}
                onClick={() => setIsMenuOpen(false)}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: isMenuOpen ? 'slideInLeft 0.4s ease-out forwards' : 'none'
                }}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Login Section */}
            <div className="border-t border-white/20 pt-4 mt-4">
              <div className="px-4 mb-3">
                <p className="text-blue-200 text-sm font-semibold mb-2">Account Access</p>
              </div>
              <Link
                to="/login"
                className="flex items-start text-white hover:text-blue-100 hover:bg-white/10 hover:backdrop-blur-sm px-6 py-4 rounded-xl transition-all duration-300 transform hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xl mr-3 mt-0.5">🔐</span>
                <div>
                  <div className="font-semibold text-base">Login to QCU Portal</div>
                  <div className="text-xs text-blue-200 mt-0.5">For students and staff</div>
                </div>
              </Link>
              <Link
                to="/dashboard-login"
                className="flex items-start text-white hover:text-blue-100 hover:bg-white/10 hover:backdrop-blur-sm px-6 py-4 rounded-xl transition-all duration-300 transform hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Monitor className="h-5 w-5 mr-3 mt-0.5" />
                <div>
                  <div className="font-semibold text-base">Login to Dashboard</div>
                  <div className="text-xs text-blue-200 mt-0.5">For Applicants</div>
                </div>
              </Link>
            </div>
            
            {/* Mobile Contact Info */}
            <div className="border-t border-white/20 pt-4 mt-4 px-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-white text-sm mb-3 font-bold">Need assistance?</p>
              <div className="space-y-2">
                <p className="text-blue-100 text-sm font-medium">📞 (02) 8806-3000</p>
                <p className="text-blue-100 text-sm font-medium">📧 info@qcu.edu.ph</p>
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
            transform: translateX(-30px);
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