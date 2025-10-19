import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, FileText, Check, Edit } from 'lucide-react';

const EnrollmentDocumentsReview: React.FC = () => {
  const navigate = useNavigate();
  const [referenceNumber, setReferenceNumber] = useState('');

  useEffect(() => {
    const refNum = localStorage.getItem('loggedInReference');
    if (!refNum) {
      navigate('/dashboard-login');
      return;
    }
    setReferenceNumber(refNum);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInReference');
    navigate('/dashboard-login');
  };

  const handleBackToEdit = () => {
    navigate('/enrollment-documents');
  };

  const handleSubmit = () => {
    localStorage.setItem('enrollmentSubmitted', 'true');
    navigate('/enrollment-confirmation');
  };

  const documents = [
    'Birth Certificate (PSA Copy)',
    'Medical Certificate',
    'Original - Recent Brgy. Certificate of Residency',
    'Senior High School / High School / ALS Diploma',
    'Original SF9 (Certified True Copy of Grade 11 & Original Grade 12)'
  ];

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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              Documents Submitted
            </h3>
            <button
              onClick={handleBackToEdit}
              className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </button>
          </div>

          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Check className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Uploaded</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBackToEdit}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Back to Edit
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentDocumentsReview;
