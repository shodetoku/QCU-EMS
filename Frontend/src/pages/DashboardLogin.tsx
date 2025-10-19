import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Key, Phone, Mail } from 'lucide-react';

const DashboardLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [referenceNumber, setReferenceNumber] = useState(
    location.state?.referenceNumber || localStorage.getItem('currentReferenceNumber') || ''
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const storedApplication = localStorage.getItem(`application_${referenceNumber}`);

    if (storedApplication || referenceNumber.startsWith('REF-')) {
      localStorage.setItem('loggedInReference', referenceNumber);
      navigate('/student-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <LogIn className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Student Dashboard Login
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your reference number to access your application status and information.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reference Number
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
                  placeholder="REF-847378-011"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Format: REF-XXXXXX (e.g. REF-123456)
              </p>
            </div>

            <button
              type="submit"
              disabled={!referenceNumber}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                !referenceNumber
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm mb-3">Can't find your reference number?</p>
            <div className="space-y-2">
              <a href="tel:028806-3000" className="flex items-center justify-center text-blue-600 hover:text-blue-700 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                (02) 8806-3000
              </a>
              <a href="mailto:admissions@qcu.edu.ph" className="flex items-center justify-center text-blue-600 hover:text-blue-700 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                admissions@qcu.edu.ph
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLogin;
