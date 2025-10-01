import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, User, MapPin, GraduationCap, Phone } from 'lucide-react';
import { mockPrograms as programs } from '../data/mockData';

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  gender: string;
  civilStatus: string;
  nationality: string;
  
  // Contact Information
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
  
  // Academic Information
  program: string;
  lastSchoolAttended: string;
  yearGraduated: string;
  gwa: string;
  
  // Documents
  documents: {
    birthCertificate: boolean;
    transcript: boolean;
    goodMoral: boolean;
    medicalCert: boolean;
    idPictures: boolean;
  };
}

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: '',
    gender: '',
    civilStatus: '',
    nationality: 'Filipino',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
    program: '',
    lastSchoolAttended: '',
    yearGraduated: '',
    gwa: '',
    documents: {
      birthCertificate: false,
      transcript: false,
      goodMoral: false,
      medicalCert: false,
      idPictures: false
    }
  });

  const steps = [
    { number: 1, title: 'Personal Information', icon: User },
    { number: 2, title: 'Contact Information', icon: MapPin },
    { number: 3, title: 'Academic Information', icon: GraduationCap },
    { number: 4, title: 'Document Upload', icon: Upload }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDocumentChange = (docName: keyof FormData['documents']) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docName]: !prev.documents[docName]
      }
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth && 
               formData.gender && formData.civilStatus ? true : false;
      case 2:
        return formData.email && formData.phone && formData.address && 
               formData.city && formData.province ? true : false;
      case 3:
        return formData.program && formData.lastSchoolAttended && formData.yearGraduated ? true : false;
      case 4:
        return Object.values(formData.documents).every(doc => doc);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        // Store form data and navigate to review
        sessionStorage.setItem('applicationData', JSON.stringify(formData));
        navigate('/apply/review');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/apply');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Civil Status *
                </label>
                <select
                  name="civilStatus"
                  value={formData.civilStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality *
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+63 912 345 6789"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complete Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="House/Unit Number, Street, Barangay"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Province *
                </label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Program *
              </label>
              <select
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a Program</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.code}>
                    {program.code} - {program.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last School Attended *
              </label>
              <input
                type="text"
                name="lastSchoolAttended"
                value={formData.lastSchoolAttended}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Graduated *
                </label>
                <input
                  type="text"
                  name="yearGraduated"
                  value={formData.yearGraduated}
                  onChange={handleInputChange}
                  placeholder="2023"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  General Weighted Average (Optional)
                </label>
                <input
                  type="text"
                  name="gwa"
                  value={formData.gwa}
                  onChange={handleInputChange}
                  placeholder="85.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Document Upload</h3>
            <p className="text-gray-600 mb-6">
              Please upload or confirm that you have the following required documents:
            </p>
            
            <div className="space-y-4">
              {[
                { key: 'birthCertificate', label: 'Birth Certificate (PSA Copy)' },
                { key: 'transcript', label: 'Transcript of Records' },
                { key: 'goodMoral', label: 'Certificate of Good Moral Character' },
                { key: 'medicalCert', label: 'Medical Certificate' },
                { key: 'idPictures', label: '2x2 ID Pictures (4 copies)' }
              ].map((doc) => (
                <div
                  key={doc.key}
                  className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.documents[doc.key as keyof FormData['documents']]}
                      onChange={() => handleDocumentChange(doc.key as keyof FormData['documents'])}
                      className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">{doc.label}</span>
                  </div>
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Upload File
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> For this demo, checking the boxes simulates document upload. 
                In the actual system, you would upload actual files.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-qcu-primary hover:text-qcu-secondary mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-qcu-deep mb-6">
            Online Application Form
          </h1>
          <p className="text-qcu-gray-600 text-lg">
            Step {currentStep} of 4 - Complete all required fields to proceed.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      isCompleted
                        ? 'bg-qcu-bronze text-qcu-dark'
                        : isActive
                        ? 'bg-qcu-primary text-white'
                        : 'bg-qcu-gray-200 text-qcu-gray-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="ml-2 hidden md:block">
                    <div
                      className={`text-sm font-medium ${
                        isActive ? 'text-qcu-primary' : 'text-qcu-gray-600'
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                  {step.number < steps.length && (
                    <div className="flex-1 h-0.5 bg-qcu-gray-200 mx-4 md:mx-8"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-qcu-gray-200">
          {renderStepContent()}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-8 py-3 border-2 border-qcu-gray-400 text-qcu-gray-800 rounded-2xl font-semibold hover:bg-qcu-gray-50 transition-colors"
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </button>
          <button
            onClick={handleNext}
            disabled={!validateStep(currentStep)}
            className={`font-semibold transition-colors ${
              validateStep(currentStep)
                ? 'bg-qcu-primary hover:bg-qcu-secondary text-white px-8 py-3 rounded-2xl'
                : 'bg-qcu-gray-400 text-qcu-gray-600 cursor-not-allowed px-8 py-3 rounded-2xl'
            }`}
          >
            {currentStep === 4 ? 'Review Application' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;