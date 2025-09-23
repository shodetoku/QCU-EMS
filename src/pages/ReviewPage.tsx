import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, User, MapPin, GraduationCap, FileText } from 'lucide-react';
import { mockPrograms as programs } from '../data/mockData';

const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Get form data from session storage
  const formDataString = sessionStorage.getItem('applicationData');
  const formData = formDataString ? JSON.parse(formDataString) : null;

  if (!formData) {
    navigate('/apply/form');
    return null;
  }

  const selectedProgram = programs.find(p => p.code === formData.program);

  const handleSubmit = () => {
    navigate('/apply/confirmation');
  };

  const handleEdit = (step: number) => {
    // You could navigate back to specific step
    navigate('/apply/form');
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/apply/form')}
            className="flex items-center text-blue-700 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Form
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Review Your Application
          </h1>
          <p className="text-gray-600">
            Please review all information before submitting your application.
          </p>
        </div>

        {/* Review Sections */}
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <User className="h-5 w-5 text-blue-600 mr-2" />
                Personal Information
              </h3>
              <button
                onClick={() => handleEdit(1)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                <p className="text-gray-800">
                  {formData.firstName} {formData.middleName} {formData.lastName}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                <p className="text-gray-800">{formData.dateOfBirth}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
                <p className="text-gray-800">{formData.gender}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Civil Status</label>
                <p className="text-gray-800">{formData.civilStatus}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Nationality</label>
                <p className="text-gray-800">{formData.nationality}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                Contact Information
              </h3>
              <button
                onClick={() => handleEdit(2)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <p className="text-gray-800">{formData.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                <p className="text-gray-800">{formData.phone}</p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                <p className="text-gray-800">
                  {formData.address}, {formData.city}, {formData.province}
                  {formData.zipCode && ` ${formData.zipCode}`}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
                Academic Information
              </h3>
              <button
                onClick={() => handleEdit(3)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">Preferred Program</label>
                <p className="text-gray-800 font-semibold">
                  {formData.program} - {selectedProgram?.name}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Last School Attended</label>
                <p className="text-gray-800">{formData.lastSchoolAttended}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Year Graduated</label>
                <p className="text-gray-800">{formData.yearGraduated}</p>
              </div>
              
              {formData.gwa && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">GWA</label>
                  <p className="text-gray-800">{formData.gwa}</p>
                </div>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                Documents Submitted
              </h3>
              <button
                onClick={() => handleEdit(4)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>
            
            <div className="space-y-3">
              {[
                { key: 'birthCertificate', label: 'Birth Certificate (PSA Copy)' },
                { key: 'transcript', label: 'Transcript of Records' },
                { key: 'goodMoral', label: 'Certificate of Good Moral Character' },
                { key: 'medicalCert', label: 'Medical Certificate' },
                { key: 'idPictures', label: '2x2 ID Pictures (4 copies)' }
              ].map((doc) => (
                <div key={doc.key} className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-3 ${
                    formData.documents[doc.key] ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-700">{doc.label}</span>
                  <span className={`ml-2 text-sm ${
                    formData.documents[doc.key] ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formData.documents[doc.key] ? '✓ Uploaded' : '✗ Missing'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-blue-50 rounded-lg p-6 my-8">
          <h4 className="font-semibold text-blue-800 mb-3">Declaration</h4>
          <p className="text-blue-700 text-sm mb-4">
            I hereby declare that all the information provided in this application is true and correct. 
            I understand that any false information may result in the rejection of my application or 
            cancellation of admission if discovered later.
          </p>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <span className="text-blue-800 text-sm">
              I agree to the terms and conditions and confirm the accuracy of the information provided.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/apply/form')}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Edit
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;