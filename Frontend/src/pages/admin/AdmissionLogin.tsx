import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';
import { adminUsers } from '../../data/mockData';

const AdmissionLogin: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = adminUsers.admission.find(
        u => u.username === credentials.username && u.password === credentials.password
      );

      if (user) {
        sessionStorage.setItem('adminUser', JSON.stringify(user));
        navigate('/admin');
        setIsLoading(false);
        return;
      }

      const accountKey = `admission_${credentials.username}`;
      const storedAccount = localStorage.getItem(accountKey);

      if (storedAccount) {
        const account = JSON.parse(storedAccount);
        if (account.password === credentials.password) {
          sessionStorage.setItem('adminUser', JSON.stringify({
            id: account.accountId,
            username: account.accountId,
            name: account.name,
            role: 'admission',
            department: account.department
          }));
          navigate('/admin');
          setIsLoading(false);
          return;
        }
      }

      setError('Invalid username or password');
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
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
              Admission Office Portal
            </h1>
            <p className="text-gray-600">
              Login to access the admission management system
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
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
              disabled={isLoading || !credentials.username || !credentials.password}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isLoading || !credentials.username || !credentials.password
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Demo Credentials</h4>
            <div className="space-y-1 text-blue-700 text-sm">
              <p><strong>Username:</strong> admin | <strong>Password:</strong> admin123</p>
              <p><strong>Username:</strong> admission | <strong>Password:</strong> pass123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionLogin;