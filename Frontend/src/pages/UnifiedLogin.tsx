import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';

const UnifiedLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem(`user_${formData.userId}`);

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === formData.password) {
        localStorage.setItem('loggedInUser', JSON.stringify({
          userId: formData.userId,
          role: user.role,
          name: user.name
        }));

        switch (user.role) {
          case 'student':
            navigate('/student-portal');
            break;
          case 'admission':
            navigate('/admin');
            break;
          case 'registrar':
            navigate('/registrar');
            break;
          case 'department':
            navigate('/department');
            break;
          default:
            setError('Invalid user role');
        }
      } else {
        setError('Invalid User ID or Password');
      }
    } else {
      setError('Invalid User ID or Password');
    }
  };

  const seedDemoCredentials = () => {
    const demoUsers = [
      {
        userId: 'STU-25-1822',
        password: 'Student2025',
        role: 'student',
        name: 'John Doe',
        email: 'john.doe@example.com',
        program: 'Bachelor of Science in Computer Science'
      },
      {
        userId: 'ADM-001',
        password: 'Admin2025',
        role: 'admission',
        name: 'Maria Santos',
        email: 'maria.santos@qcu.edu.ph',
        department: 'Admissions Office'
      },
      {
        userId: 'REG-001',
        password: 'Registrar2025',
        role: 'registrar',
        name: 'Robert Cruz',
        email: 'robert.cruz@qcu.edu.ph',
        department: 'Registrar Office'
      },
      {
        userId: 'DEPT-CS-001',
        password: 'Dept2025',
        role: 'department',
        name: 'Dr. Ana Reyes',
        email: 'ana.reyes@qcu.edu.ph',
        department: 'Computer Science Department'
      }
    ];

    demoUsers.forEach(user => {
      localStorage.setItem(`user_${user.userId}`, JSON.stringify(user));
    });

    alert(
      'Demo credentials created!\n\n' +
      'Student:\nUser ID: STU-25-1822\nPassword: Student2025\n\n' +
      'Admission Staff:\nUser ID: ADM-001\nPassword: Admin2025\n\n' +
      'Registrar Staff:\nUser ID: REG-001\nPassword: Registrar2025\n\n' +
      'Department Staff:\nUser ID: DEPT-CS-001\nPassword: Dept2025'
    );
  };

  const handleForgotPassword = () => {
    alert('Please contact your respective office to reset your password:\n\n' +
      '- Students: Contact the Admissions Office\n' +
      '- Staff: Contact the IT Department');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/qcu-logo.png" alt="QCU" className="h-12 w-12 mr-3" />
            <div>
              <span className="text-white font-bold text-xl">Quezon City University</span>
              <p className="text-blue-200 text-sm">Excellence in Education since 1994</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-colors"
            >
              Home
            </button>
            <button className="px-6 py-2 text-white hover:text-blue-200">About QCU</button>
            <button className="px-6 py-2 text-white hover:text-blue-200">Programs</button>
            <button
              onClick={() => navigate('/apply')}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <LogIn className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">LOGIN</h1>
            <p className="text-gray-600 text-sm">
              Login to access your corresponding portal
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="Enter your User ID"
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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Forgot your password?
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 mb-2 text-center">
              For testing purposes only
            </p>
            <button
              onClick={seedDemoCredentials}
              className="w-full py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Create Demo Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLogin;
