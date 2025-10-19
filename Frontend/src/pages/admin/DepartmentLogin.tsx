import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';
import { adminUsers } from '../../data/mockData';

const DepartmentLogin: React.FC = () => {
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
      const user = adminUsers.department.find(
        u => u.username === credentials.username && u.password === credentials.password
      );

      if (user) {
        sessionStorage.setItem('departmentUser', JSON.stringify(user));
        navigate('/department');
        setIsLoading(false);
        return;
      }

      const accountKey = `department_${credentials.username}`;
      const storedAccount = localStorage.getItem(accountKey);

      if (storedAccount) {
        const account = JSON.parse(storedAccount);
        if (account.password === credentials.password) {
          sessionStorage.setItem('departmentUser', JSON.stringify({
            id: account.accountId,
            username: account.accountId,
            name: account.name,
            role: 'department',
            department: account.department
          }));
          navigate('/department');
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
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <LogIn className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Department Portal
            </h1>
            <p className="text-gray-600">
              Login to access COE validation, sectioning, and classroom management
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Demo Credentials</h4>
            <div className="space-y-1 text-purple-700 text-sm">
              <p><strong>Username:</strong> dept | <strong>Password:</strong> dept123</p>
              <p><strong>Username:</strong> faculty | <strong>Password:</strong> fac123</p>
            </div>
            <div className="mt-3 text-xs text-purple-600">
              <p>Access: COE Validation • Student Sectioning • Classroom Management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentLogin;