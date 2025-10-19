import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, User, Lock, LogOut } from 'lucide-react';
import { generateStudentId } from '../utils/accountIdGenerator';

const EnrollmentConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [credentials, setCredentials] = useState({
    userId: '',
    password: '',
    name: ''
  });

  useEffect(() => {
    const refNum = localStorage.getItem('loggedInReference');
    if (!refNum) {
      navigate('/dashboard-login');
      return;
    }
    setReferenceNumber(refNum);

    const enrollmentData = localStorage.getItem('enrollmentFormData');
    if (enrollmentData) {
      const data = JSON.parse(enrollmentData);

      const userId = generateStudentId();
      const password = generatePassword();

      const studentCredentials = {
        userId: userId,
        password: password,
        name: data.name || 'Student',
        email: data.email || '',
        studentId: userId,
        program: data.program || '',
        enrollmentComplete: true
      };

      localStorage.setItem(`student_${userId}`, JSON.stringify(studentCredentials));

      setCredentials({
        userId: userId,
        password: password,
        name: data.name || 'Student'
      });
    }
  }, [navigate]);

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInReference');
    navigate('/dashboard-login');
  };

  const handleProceedToLogin = () => {
    navigate('/student-login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{referenceNumber}</span>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Enrollment Completed Successfully!
            </h2>
            <p className="text-gray-600 mb-2">
              Congratulations, {credentials.name}! Your enrollment has been processed.
            </p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
              Your Student Portal Credentials
            </h3>
            <p className="text-sm text-blue-800 mb-6 text-center">
              Please save these credentials. You will need them to access the Student Portal.
            </p>

            <div className="bg-white rounded-lg p-6 mb-4">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-blue-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">User ID</p>
                  <p className="text-xl font-bold text-gray-900">{credentials.userId}</p>
                </div>
              </div>

              <div className="flex items-center border-t border-gray-200 pt-4">
                <Lock className="h-5 w-5 text-blue-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Password</p>
                  <p className="text-xl font-bold text-gray-900 font-mono">{credentials.password}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800 font-medium">
                Important: Please write down or save these credentials in a secure place.
                You will need them to log in to your Student Portal.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Next Steps:</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Save your User ID and Password</li>
              <li>Click the button below to proceed to the Student Login Portal</li>
              <li>Use your credentials to access your Student Portal</li>
              <li>Complete your Pre-Enlistment Form in the Student Portal</li>
              <li>Check your class schedule and student information</li>
            </ol>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleProceedToLogin}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors"
            >
              Proceed to Student Login Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentConfirmation;
