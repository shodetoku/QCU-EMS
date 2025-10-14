import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-qcu-secondary text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/qcu-logo.png"
                alt="QCU Logo" 
                className="h-8 w-8 object-contain"
              />
              <h3 className="text-lg font-semibold university-title">Quezon City University</h3>
            </div>
            <p className="text-qcu-accent text-sm body-text">
              Excellence in Education Since 1994
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white readable-text">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-qcu-accent hover:text-qcu-bronze transition-colors readable-text">About QCU</Link></li>
              <li><Link to="/programs" className="text-qcu-accent hover:text-qcu-bronze transition-colors readable-text">Programs</Link></li>
              <li><Link to="/apply" className="text-qcu-accent hover:text-qcu-bronze transition-colors readable-text">Apply Now</Link></li>
              <li><Link to="/dashboard-login" className="text-qcu-accent hover:text-qcu-bronze transition-colors readable-text">Student Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white readable-text">Contact</h4>
            <div className="text-sm text-qcu-accent space-y-2 readable-text">
              <p>673 Quirino Highway</p>
              <p>San Bartolome, Novaliches</p>
              <p>Quezon City, Philippines</p>
              <p className="text-qcu-bronze font-medium">(02) 8806-3000</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white readable-text">Staff Portals</h4>
            <div className="text-xs text-qcu-accent space-y-2">
              <p className="mb-3 text-qcu-accent readable-text">For Staff Use Only:</p>
              <Link to="/admin-login" className="block text-qcu-accent hover:text-qcu-bronze transition-colors readable-text">Admission Office</Link>
              <Link to="/registrar-login" className="block text-qcu-accent hover:text-qcu-bronze transition-colors readable-text">Registrar</Link>
              <Link to="/department-login" className="block text-qcu-accent hover:text-qcu-bronze transition-colors readable-text">Department</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-qcu-primary mt-8 pt-8 text-center text-sm text-qcu-accent readable-text">
          <p>&copy; 2025 Quezon City University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;