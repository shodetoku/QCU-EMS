import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Copy, QrCode, ArrowRight, Calendar, FileText } from 'lucide-react';
import { generateReferenceNumber } from '../data/mockData';

const SubmissionConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate reference number when component mounts
    const refNum = generateReferenceNumber();
    setReferenceNumber(refNum);
    
    // Store reference number for dashboard access
    sessionStorage.setItem('currentReferenceNumber', refNum);
  }, []);

  const handleCopyReference = async () => {
    try {
      await navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy reference number');
    }
  };

  const handleContinueToDashboard = () => {
    navigate('/dashboard-login', { state: { referenceNumber } });
  };

  const handleDownloadQR = () => {
    // In a real application, this would generate and download a QR code
    alert('QR Code download functionality would be implemented here');
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Success Icon */}
          <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Main Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for applying to Quezon City University. Your application has been received and is now being processed.
          </p>

          {/* Reference Number Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Reference Number
            </h2>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-3xl font-bold text-blue-700 mb-2">
                {referenceNumber}
              </p>
              <p className="text-gray-600 text-sm">
                Keep this reference number safe. You'll need it to access your student dashboard.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCopyReference}
                className={`flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  copied
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                }`}
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy Reference Number'}
              </button>
              
              <button
                onClick={handleDownloadQR}
                className="flex items-center justify-center px-6 py-3 bg-blue-100 text-blue-700 border-2 border-blue-300 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Download QR Code
              </button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">What Happens Next?</h3>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Application Review</h4>
                  <p className="text-gray-600">
                    Our admissions team will review your application and documents within 3-5 business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Entrance Examination</h4>
                  <p className="text-gray-600">
                    If approved, you'll receive your exam schedule and venue details through your dashboard.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Results & Enrollment</h4>
                  <p className="text-gray-600">
                    Check your dashboard for exam results and enrollment instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Access */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-4">Access Your Student Dashboard</h3>
            <p className="text-blue-100 mb-6">
              Monitor your application status, view exam schedules, and manage your enrollment process.
            </p>
            
            <button
              onClick={handleContinueToDashboard}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Continue to Dashboard <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Important Reminders */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 text-left">
            <h4 className="font-semibold text-yellow-800 mb-3">Important Reminders</h4>
            <ul className="space-y-2 text-yellow-700">
              <li className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Save your reference number - you'll need it to access your dashboard
              </li>
              <li className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Check your dashboard regularly for updates and important announcements
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Contact our admissions office if you have any questions
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">Need assistance? Contact our admissions office:</p>
            <div className="space-x-6">
              <span className="text-blue-700 font-semibold">📞 (02) 8806-3000</span>
              <span className="text-blue-700 font-semibold">📧 admissions@qcu.edu.ph</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionConfirmation;