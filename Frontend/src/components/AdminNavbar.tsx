import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';

const AdminNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // ===== Handle Logout =====
  const confirmLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const cancelLogout = () => {
    // Trigger fade-out animation before hiding
    setIsClosing(true);
    setTimeout(() => {
      setShowLogoutModal(false);
      setIsClosing(false);
    }, 250);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // ===== Portal Type =====
  const getPortalType = () => {
    if (location.pathname.includes('/admin')) return 'Admission Office';
    if (location.pathname.includes('/registrar')) return 'Registrar';
    if (location.pathname.includes('/department')) return 'Department';
    return 'Admin';
  };

  // ===== Get User Info =====
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
    <>
      {/* Inline animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes scaleOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.9); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }

        .animate-fadeOut {
          animation: fadeOut 0.25s ease-in forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out forwards;
        }

        .animate-scaleOut {
          animation: scaleOut 0.25s ease-in forwards;
        }
      `}</style>

      {/* ===== Navbar ===== */}
      <nav className="bg-qcu-dark shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/qcu-logo2.png"
                  alt="QCU Logo"
                  className="h-8 w-8 object-contain"
                />
                <div>
                  <span className="text-xl font-bold text-white">QCU</span>
                  <span className="text-sm text-qcu-accent ml-2">
                    {getPortalType()}
                  </span>
                </div>
              </Link>
            </div>

            {/* User Info + Buttons */}
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
                onClick={handleLogoutClick}
                className="flex items-center text-qcu-accent hover:text-qcu-bronze transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Logout Confirmation Modal ===== */}
      {showLogoutModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] ${
            isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
          }`}
        >
          <div
            className={`bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center ${
              isClosing ? 'animate-scaleOut' : 'animate-scaleIn'
            }`}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Log Out
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
