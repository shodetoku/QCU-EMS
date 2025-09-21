import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About QCU', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Apply Now', path: '/apply', isButton: true }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-qcu-secondary shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/qcu-logo.png" 
                alt="QCU Logo" 
                className="h-16 w-16 object-contain"
              />
              <span className="text-xl font-bold university-title">
                Quezon City University
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  item.isButton
                    ? 'bg-qcu-bronze text-qcu-dark px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-medium'
                    : isActive(item.path)
                    ? 'text-qcu-bronze font-semibold border-b-2 border-qcu-bronze pb-1'
                    : 'text-white hover:text-qcu-bronze hover:border-b-2 hover:border-qcu-bronze hover:pb-1'
                } transition-all duration-200`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/dashboard-login"
              className="text-white hover:text-qcu-bronze hover:border-b-2 hover:border-qcu-bronze hover:pb-1 transition-all duration-200"
            >
              Student Portal
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-qcu-bronze"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-qcu-secondary border-t border-qcu-primary">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    item.isButton
                      ? 'bg-qcu-bronze text-qcu-dark'
                      : isActive(item.path)
                      ? 'text-qcu-bronze font-semibold'
                      : 'text-white'
                  } block px-3 py-2 rounded-md text-base font-medium hover:bg-qcu-primary transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/dashboard-login"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-qcu-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Student Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;