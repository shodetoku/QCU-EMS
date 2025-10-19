import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ArrowLeft, Edit } from 'lucide-react';

const EnrollmentReview: React.FC = () => {
  const navigate = useNavigate();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [formData, setFormData] = useState({
    referenceNo: '',
    name: '',
    program: '',
    campus: '',
    yearLevel: '',
    preferredSchedule: ''
  });

  useEffect(() => {
    const refNum = localStorage.getItem('loggedInReference');
    if (!refNum) {
      navigate('/dashboard-login');
      return;
    }
    setReferenceNumber(refNum);

    const savedFormData = localStorage.getItem('enrollmentFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInReference');
    navigate('/dashboard-login');
  };

  const handleBackToForm = () => {
    navigate('/enrollment-form');
  };

  const handleEdit = () => {
    navigate('/enrollment-form');
  };

  const handleContinue = () => {
    navigate('/enrollment-documents-review');
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
        <button
          onClick={handleBackToForm}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Form
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Enrollment</h2>
        <p className="text-gray-600 mb-8">
          Please review all information before submitting your enrollment
        </p>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="text-blue-600 mr-2">👤</span>
              Personal Information
            </h3>
            <button
              onClick={handleEdit}
              className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Reference no.</p>
              <p className="font-medium text-gray-900">{formData.referenceNo}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Program/Course:</p>
              <p className="font-medium text-gray-900">
                {formData.program || 'Bachelor of Science in Information Technology (BSIT)'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Name:</p>
              <p className="font-medium text-gray-900">{formData.name || 'Juan Doe'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Campus:</p>
              <p className="font-medium text-gray-900">
                {formData.campus || 'San Bartolome Campus'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Upcoming Year Level:</p>
              <p className="font-medium text-gray-900">{formData.yearLevel || '1st Year'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Preferred Schedule</p>
              <p className="font-medium text-gray-900">
                {formData.preferredSchedule || 'Morning Classes'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentReview;
