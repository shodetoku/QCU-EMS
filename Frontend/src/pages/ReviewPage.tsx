import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, User, Phone, GraduationCap, FileText, CheckCircle2 } from 'lucide-react';

const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [consentChecked, setConsentChecked] = useState(false);

  const formDataString = localStorage.getItem('qcuApplicationData');
  const formData = formDataString ? JSON.parse(formDataString) : null;

  if (!formData) {
    navigate('/apply/form');
    return null;
  }

  const handleSubmit = () => {
    if (!consentChecked) {
      alert('Please agree to the declaration before submitting');
      return;
    }

    const referenceNumber = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
    localStorage.setItem('currentReferenceNumber', referenceNumber);
    localStorage.setItem(`application_${referenceNumber}`, JSON.stringify(formData));
    navigate('/apply/confirmation', { state: { referenceNumber } });
  };

  const handleEdit = () => {
    navigate('/apply/form');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/apply/form')}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Form
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Review Your Application
        </h1>
        <p className="text-gray-600 mb-8">
          Please review all information before submitting your application.
        </p>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="h-5 w-5 text-blue-600 mr-2" />
                Personal Information
              </h3>
              <button
                onClick={handleEdit}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                <p className="text-gray-900">{formData.firstName} {formData.middleName} {formData.lastName}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
                <p className="text-gray-900">{formData.dateOfBirth}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Gender</label>
                <p className="text-gray-900">{formData.gender}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Civil Status</label>
                <p className="text-gray-900">{formData.civilStatus}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Nationality</label>
                <p className="text-gray-900">{formData.citizenship}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Phone className="h-5 w-5 text-blue-600 mr-2" />
                Contact Information
              </h3>
              <button
                onClick={handleEdit}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Email</label>
                <p className="text-gray-900">{formData.gmail}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Phone</label>
                <p className="text-gray-900">{formData.contactNo}</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-500 mb-1">Address</label>
                <p className="text-gray-900">
                  {formData.completeAddress}, Brgy. {formData.barangay}, {formData.city}, {formData.district}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
                Academic Information
              </h3>
              <button
                onClick={handleEdit}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-500 mb-1">Preferred Program</label>
                <p className="text-gray-900 font-medium">{formData.firstChoice}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Last School Attended</label>
                <p className="text-gray-900">{formData.shsName}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Year Graduated</label>
                <p className="text-gray-900">{formData.dateGraduated}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">General Weighted Average</label>
                <p className="text-gray-900">{formData.honorsReceived || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                Documents Submitted
              </h3>
              <button
                onClick={handleEdit}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>

            <div className="space-y-3">
              {[
                { key: 'birthCertificate', label: 'Transcript of Records' },
                { key: 'goodMoral', label: 'Certificate of Good Moral Character' },
                { key: 'idPicture', label: '2x2 ID Pictures (4 copies, colored, white background)' }
              ].map((doc) => (
                <div key={doc.key} className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{doc.label}</span>
                  <span className="ml-auto text-sm text-green-600 font-medium">
                    Uploaded
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 my-8">
          <h4 className="font-semibold text-blue-900 mb-3">Declaration</h4>
          <p className="text-blue-800 text-sm mb-4 leading-relaxed">
            I hereby declare that all the information provided in this application is true and correct.
            I understand that any false information may result in the rejection of my application or
            cancellation of admission if discovered later.
          </p>

          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-blue-900 text-sm">
              I agree to the terms and conditions and confirm the accuracy of the information provided.
            </span>
          </label>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate('/apply/form')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Edit
          </button>
          <button
            onClick={handleSubmit}
            disabled={!consentChecked}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              consentChecked
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
