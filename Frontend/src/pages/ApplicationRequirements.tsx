import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, Clock, AlertCircle, ArrowLeft } from 'lucide-react';

const ApplicationRequirements: React.FC = () => {
  const navigate = useNavigate();

  const requirements = [
    {
      category: "Personal Documents",
      items: [
        "Birth Certificate (PSA-issued original copy)",
        "High School Diploma or equivalent",
        "Transcript of Records (Original)",
        "Certificate of Good Moral Character",
        "2x2 ID Pictures (4 copies, colored, white background)"
      ]
    },
    {
      category: "Health Requirements", 
      items: [
        "Medical Certificate from licensed physician",
        "Chest X-ray result (not older than 6 months)",
        "Drug Test result (not older than 6 months)"
      ]
    },
    {
      category: "Additional Requirements (Program-specific)",
      items: [
        "Letter of Intent/Personal Statement",
        "Certificate of Extracurricular Activities (if any)",
        "Awards or Recognition Certificates (if any)",
        "Parent/Guardian Consent Form (for minors)"
      ]
    }
  ];

  const importantNotes = [
    "All documents must be original copies or certified true copies",
    "Documents in foreign languages must be translated and authenticated",
    "Submit complete requirements to avoid delays in processing",
    "Incomplete applications will not be processed"
  ];

  const handleContinue = () => {
    navigate('/apply/form');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-700 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Application Requirements
          </h1>
          <p className="text-gray-600 text-lg">
            Please prepare the following documents before starting your application.
          </p>
        </div>

        {/* Requirements Sections */}
        <div className="space-y-8 mb-8">
          {requirements.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="h-5 w-5 text-blue-700 mr-2" />
                {section.category}
              </h2>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-yellow-800">Important Notes</h3>
          </div>
          <ul className="space-y-2">
            {importantNotes.map((note, index) => (
              <li key={index} className="text-yellow-800 flex items-start gap-2">
                <span className="font-bold text-yellow-600 mt-1">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Application Timeline
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="text-blue-700">
              <div className="font-semibold">Step 1</div>
              <div className="text-sm">Submit Application</div>
            </div>
            <div className="text-blue-700">
              <div className="font-semibold">Step 2</div>
              <div className="text-sm">Take Entrance Exam</div>
            </div>
            <div className="text-blue-700">
              <div className="font-semibold">Step 3</div>
              <div className="text-sm">Wait for Results</div>
            </div>
            <div className="text-blue-700">
              <div className="font-semibold">Step 4</div>
              <div className="text-sm">Complete Enrollment</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleCancel}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel Application
          </button>
          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors"
          >
            Continue to Application Form
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-2">Need help with your application?</p>
          <div className="space-x-4">
            <span className="text-blue-700 font-semibold">📞 (02) 8806-3000</span>
            <span className="text-blue-700 font-semibold">📧 admissions@qcu.edu.ph</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationRequirements;