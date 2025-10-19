import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, CheckSquare } from 'lucide-react';

interface DocumentStatus {
  [key: string]: boolean;
}

const EnrollmentDocuments: React.FC = () => {
  const navigate = useNavigate();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [documents, setDocuments] = useState<DocumentStatus>({
    birthCert: true,
    medicalCert: true,
    barangayCert: true,
    highSchoolDiploma: true,
    sf9Grade: true,
    idPictures: true,
    transferCert1: true,
    transferCert2: true
  });

  useEffect(() => {
    const refNum = localStorage.getItem('loggedInReference');
    if (!refNum) {
      navigate('/dashboard-login');
      return;
    }
    setReferenceNumber(refNum);

    const savedDocs = localStorage.getItem('enrollmentDocuments');
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInReference');
    navigate('/dashboard-login');
  };

  const handlePrevious = () => {
    navigate('/enrollment-form');
  };

  const handleReview = () => {
    localStorage.setItem('enrollmentDocuments', JSON.stringify(documents));
    navigate('/enrollment-review');
  };

  const documentList = [
    { id: 'birthCert', label: 'Birth Certificate (PSA Copy)' },
    { id: 'medicalCert', label: 'Medical Certificate' },
    { id: 'barangayCert', label: 'Original - Recent Brgy. Certificate of Residency' },
    { id: 'highSchoolDiploma', label: 'Senior High School / High School / ALS Diploma' },
    { id: 'sf9Grade', label: 'Original SF9 (Certified True Copy of Grade 11 & Original Grade 12)' },
    { id: 'idPictures', label: '2x2 ID Pictures (4 copies)' }
  ];

  const transferDocuments = [
    { id: 'transferCert1', label: 'Original Certificate of transfer Credentials TCC' },
    { id: 'transferCert2', label: 'Original Certificate of transfer Credentials TCC' }
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <p className="text-sm text-gray-600 mb-6">
            Please upload or confirm that you have the following required documents.
          </p>

          <div className="space-y-3">
            {documentList.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center">
                  <CheckSquare className="h-5 w-5 text-pink-600 mr-3" />
                  <span className="text-sm text-gray-700">{doc.label}</span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Upload File
                </button>
              </div>
            ))}

            <div className="mt-6 mb-3">
              <p className="text-sm text-gray-600 italic">
                This document is for transferee applicants only
              </p>
            </div>

            {transferDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center">
                  <CheckSquare className="h-5 w-5 text-pink-600 mr-3" />
                  <span className="text-sm text-gray-700">{doc.label}</span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Upload File
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Previous
            </button>
            <button
              onClick={handleReview}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentDocuments;
