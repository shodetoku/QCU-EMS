import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Copy, Phone, Mail } from 'lucide-react';

const SubmissionConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [studentId, setStudentId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const refNum = location.state?.referenceNumber || localStorage.getItem('currentReferenceNumber');
    const studId = location.state?.studentId;
    if (refNum) {
      setReferenceNumber(refNum);
      if (studId) {
        setStudentId(studId);
      }
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const handleCopyReference = async () => {
    try {
      await navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy reference number');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h1>

          <p className="text-lg text-gray-600 mb-12">
            Thank you for applying to Quezon City University. Your application has been received and is now being processed.
          </p>

          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Application Details
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Reference Number</p>
                <p className="text-3xl font-bold text-blue-600">
                  {referenceNumber}
                </p>
              </div>
              {studentId && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Student ID</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {studentId}
                  </p>
                </div>
              )}
              <p className="text-sm text-gray-600 mt-4">
                Keep these details safe. You'll need them to access your dashboard.
              </p>
            </div>

            <button
              onClick={handleCopyReference}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                copied
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? 'Copied!' : 'Copy Reference Number'}
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              What Happens Next?
            </h3>

            <div className="space-y-6 text-left">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Application Review</h4>
                  <p className="text-gray-600 text-sm">
                    Our admissions team will review your application and documents within 3-5 business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Entrance Examination & Interview</h4>
                  <p className="text-gray-600 text-sm">
                    If approved, you'll received your exam and interview schedule and venue details through your dashboard.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Results & Enrollment</h4>
                  <p className="text-gray-600 text-sm">
                    Check your dashboard for exam results and enrollment instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h4 className="font-semibold text-yellow-900 mb-4">Important Reminders</h4>
            <ul className="space-y-2 text-sm text-yellow-800 text-left">
              <li className="flex items-start">
                <span className="mr-2">📄</span>
                <span>Save your reference number - you'll need it to access your dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📋</span>
                <span>Check your dashboard regularly for updates and important announcements</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Contact our admission office if you have any questions</span>
              </li>
            </ul>
          </div>

          <div className="text-center pt-4">
            <p className="text-gray-600 text-sm mb-3">Need assistance? Contact our admission office:</p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <a href="tel:028806-3000" className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <Phone className="h-4 w-4 mr-2" />
                (02) 8806-3000
              </a>
              <a href="mailto:admissions@qcu.edu.ph" className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
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

export default SubmissionConfirmation;
