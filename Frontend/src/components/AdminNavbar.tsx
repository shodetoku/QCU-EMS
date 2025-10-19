import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';

const AdminNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const getPortalType = () => {
    if (location.pathname.includes('/admin')) return 'Admission Office';
    if (location.pathname.includes('/registrar')) return 'Registrar';
    if (location.pathname.includes('/department')) return 'Department';
    return 'Admin';
  };

  const getUser = () => {
    const loggedInUserStr = localStorage.getItem('loggedInUser');
    if (loggedInUserStr) {
      const loggedInUser = JSON.parse(loggedInUserStr);
      const userDetails = localStorage.getItem(`user_${loggedInUser.userId}`);
      if (userDetails) {
        return JSON.parse(userDetails);
      }
    }
    return null;
  };

  const user = getUser();

  return (
    <nav className="bg-qcu-dark shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/qcu-logo2.png" 
                alt="QCU Logo" 
                className="h-8 w-8 object-contain"
              />
              <div>
                <span className="text-xl font-bold text-white">QCU</span>
                <span className="text-sm text-qcu-accent ml-2">{getPortalType()}</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-white text-sm">
                Welcome, <span className="font-semibold">{user.name}</span>
              </div>
            )}
            
            <button className="text-qcu-accent hover:text-white transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center text-qcu-accent hover:text-qcu-bronze transition-colors"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;