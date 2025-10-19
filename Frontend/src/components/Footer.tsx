import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const [hasStaffAccount, setHasStaffAccount] = useState(false);

  useEffect(() => {
    const staffAccountCreated = localStorage.getItem('staffAccountCreated');
    setHasStaffAccount(staffAccountCreated === 'true');
  }, []);

  return (
    <footer className="bg-gradient-to-br from-qcu-dark via-qcu-secondary to-qcu-deep text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-yellow-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* University Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="/qcu-logo.png"
                  alt="QCU Logo" 
                  className="h-16 w-16 object-contain drop-shadow-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
                    Quezon City University
                  </h3>
                  <p className="text-yellow-300 text-sm font-medium tracking-wide">
                    Excellence in Education Since 1994
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Committed to providing quality education that develops competent professionals and responsible citizens for nation-building and global citizenship.
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Youtube, href: '#', label: 'YouTube' }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="bg-white/10 hover:bg-gradient-to-br hover:from-qcu-primary hover:to-qcu-secondary text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-6 text-white text-xl" style={{ fontFamily: 'Cinzel, serif' }}>
                Quick Links
              </h4>
              <ul className="space-y-4">
                {[
                  { name: 'About QCU', path: '/about' },
                  { name: 'Academic Programs', path: '/programs' },
                  { name: 'Apply Now', path: '/apply' },
                  { name: 'Student Portal', path: '/dashboard-login' },
                  { name: 'Admissions', path: '/apply' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 flex items-center group text-lg"
                    >
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {link.name}
                      </span>
                      <ExternalLink className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Information */}
            <div>
              <h4 className="font-bold mb-6 text-white text-xl" style={{ fontFamily: 'Cinzel, serif' }}>
                Contact Information
              </h4>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Main Campus</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      673 Quirino Highway<br />
                      San Bartolome, Novaliches<br />
                      Quezon City, Philippines
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Phone Numbers</p>
                    <div className="space-y-1">
                      <p className="text-white font-bold text-lg">(02) 8806-3000</p>
                      <p className="text-gray-300 text-sm">(02) 8951-4916</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Email Addresses</p>
                    <div className="space-y-1">
                      <p className="text-white font-bold">info@qcu.edu.ph</p>
                      <p className="text-gray-300 text-sm">admissions@qcu.edu.ph</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Staff Portals Section */}
        <div className="border-t border-white/20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="font-bold text-white text-xl mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                  Staff Portals
                </h4>
                <p className="text-gray-300 text-sm">For authorized personnel only.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/staff-account-request"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:shadow-xl"
                >
                  Create Staff Account
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-white/20 bg-gradient-to-r from-black/30 to-black/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; 2025 Quezon City University. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors duration-300">
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;