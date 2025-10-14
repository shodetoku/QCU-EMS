import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Key, AlertCircle } from 'lucide-react';

const DashboardLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [referenceNumber, setReferenceNumber] = useState(
    location.state?.referenceNumber || sessionStorage.getItem('currentReferenceNumber') || ''
  );
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock reference numbers for demo
  const validReferences = ['REF-123456', 'REF-789012', 'REF-345678'];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (validReferences.includes(referenceNumber) || referenceNumber.startsWith('REF-')) {
        // Store reference for dashboard access
        sessionStorage.setItem('loggedInReference', referenceNumber);
        navigate('/dashboard');
      } else {
        setError('Invalid reference number. Please check your reference number and try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <LogIn className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Student Dashboard Login
            </h1>
            <p className="text-gray-600">
              Enter your reference number to access your application status and information.
            </p>
          </div>

          {/* Login Form */}
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
                  placeholder="REF-123456"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Format: REF-XXXXXX (e.g., REF-123456)
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !referenceNumber}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isLoading || !referenceNumber
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Access Dashboard'}
            </button>
          </form>

          {/* Demo Information */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Demo Access</h4>
            <p className="text-blue-700 text-sm mb-2">
              For demonstration purposes, you can use these reference numbers:
            </p>
            <div className="space-y-1">
              {validReferences.map((ref) => (
                <button
                  key={ref}
                  onClick={() => setReferenceNumber(ref)}
                  className="block text-blue-600 hover:text-blue-800 text-sm font-mono"
                >
                  {ref}
                </button>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm mb-2">Can't find your reference number?</p>
            <div className="space-y-1">
              <p className="text-blue-600 text-sm">📞 (02) 8806-3000</p>
              <p className="text-blue-600 text-sm">📧 admissions@qcu.edu.ph</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLogin;