import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PersonalInfo from '../components/form-steps/PersonalInfo';
import FamilyBackground from '../components/form-steps/FamilyBackground';
import ContactInfo from '../components/form-steps/ContactInfo';
import EmergencyContact from '../components/form-steps/EmergencyContact';
import AcademicInfo from '../components/form-steps/AcademicInfo';
import CourseSelection from '../components/form-steps/CourseSelection';
import EducationalBackground from '../components/form-steps/EducationalBackground';
import DocumentUpload from '../components/form-steps/DocumentUpload';
import ReviewStep from '../components/form-steps/ReviewStep';
import { generateStudentId } from '../utils/idGenerator';

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
  civilStatus: string;
  citizenship: string;
  fatherName: string;
  fatherOccupation: string;
  fatherEducation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherEducation: string;
  motherContact: string;
  parentsAddress: string;
  guardianName: string;
  guardianRelationship: string;
  guardianContact: string;
  gmail: string;
  contactNo: string;
  completeAddress: string;
  barangay: string;
  city: string;
  district: string;
  zipCode: string;
  emergencyName: string;
  emergencyAddress: string;
  emergencyRelationship: string;
  emergencyContact: string;
  lrn: string;
  dateOfApplication: string;
  applicationType: string;
  shsGraduateOrALS: string;
  transfereeOrSecondDegree: string;
  programOrCourse: string;
  firstChoice: string;
  secondChoice: string;
  thirdChoice: string;
  campus: string;
  shsName: string;
  section: string;
  shsAddress: string;
  shsStrand: string;
  location: string;
  schoolType: string;
  dateGraduated: string;
  honorsReceived: string;
  birthCertificate: string;
  goodMoral: string;
  residencyCertificate: string;
  reportCard: string;
  medicalClearance: string;
  idPicture: string;
  consentChecked: boolean;
}

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem('qcuApplicationData');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      firstName: '', middleName: '', lastName: '', dateOfBirth: '', placeOfBirth: '', gender: '',
      civilStatus: '', citizenship: 'Filipino', fatherName: '', fatherOccupation: '',
      fatherEducation: '', fatherContact: '', motherName: '', motherOccupation: '',
      motherEducation: '', motherContact: '', parentsAddress: '', guardianName: '',
      guardianRelationship: '', guardianContact: '', gmail: '', contactNo: '',
      completeAddress: '', barangay: '', city: '', district: '', zipCode: '',
      emergencyName: '', emergencyAddress: '', emergencyRelationship: '', emergencyContact: '',
      lrn: '', dateOfApplication: '', applicationType: '', shsGraduateOrALS: '',
      transfereeOrSecondDegree: '', programOrCourse: '', firstChoice: '', secondChoice: '',
      thirdChoice: '', campus: '', shsName: '', section: '', shsAddress: '', shsStrand: '',
      location: '', schoolType: '', dateGraduated: '', honorsReceived: '',
      birthCertificate: '', goodMoral: '', residencyCertificate: '', reportCard: '',
      medicalClearance: '', idPicture: '', consentChecked: false
    };
  });

  useEffect(() => {
    localStorage.setItem('qcuApplicationData', JSON.stringify(formData));
  }, [formData]);

  const handleFieldChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.civilStatus) newErrors.civilStatus = 'Civil status is required';
        if (!formData.citizenship) newErrors.citizenship = 'Citizenship is required';
        if (!formData.placeOfBirth) newErrors.placeOfBirth = 'Place of birth is required';
        break;

      case 2:
        if (!formData.fatherName) newErrors.fatherName = 'Father name is required';
        if (!formData.fatherOccupation) newErrors.fatherOccupation = 'Father occupation is required';
        if (!formData.fatherEducation) newErrors.fatherEducation = 'Father education is required';
        if (!formData.fatherContact) newErrors.fatherContact = 'Father contact is required';
        if (!formData.motherName) newErrors.motherName = 'Mother name is required';
        if (!formData.motherOccupation) newErrors.motherOccupation = 'Mother occupation is required';
        if (!formData.motherEducation) newErrors.motherEducation = 'Mother education is required';
        if (!formData.motherContact) newErrors.motherContact = 'Mother contact is required';
        break;

      case 3:
        if (!formData.gmail) {
          newErrors.gmail = 'Email is required';
        } else if (!formData.gmail.includes('@')) {
          newErrors.gmail = 'Must be a valid email address';
        }
        if (!formData.contactNo) newErrors.contactNo = 'Contact number is required';
        if (!formData.completeAddress) newErrors.completeAddress = 'Complete address is required';
        if (!formData.barangay) newErrors.barangay = 'Barangay is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.district) newErrors.district = 'District is required';
        if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
        break;

      case 4:
        break;

      case 5:
        break;

      case 6:
        break;

      case 7:
        break;

      case 8:
        if (!formData.birthCertificate) newErrors.birthCertificate = 'Birth certificate is required';
        if (!formData.goodMoral) newErrors.goodMoral = 'Good moral certificate is required';
        if (!formData.residencyCertificate) newErrors.residencyCertificate = 'Residency certificate is required';
        if (!formData.reportCard) newErrors.reportCard = 'Report card is required';
        if (!formData.medicalClearance) newErrors.medicalClearance = 'Medical clearance is required';
        if (!formData.idPicture) newErrors.idPicture = 'ID picture is required';
        if (!formData.consentChecked) newErrors.consentChecked = 'You must agree to the data privacy consent';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 9) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/apply');
    }
  };

  const handleSubmit = () => {
    const studentId = generateStudentId();
    const referenceNumber = `REF-2025-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    localStorage.setItem('currentReferenceNumber', referenceNumber);
    localStorage.setItem(`application_${referenceNumber}`, JSON.stringify({ ...formData, studentId }));
    navigate('/apply/confirmation', { state: { referenceNumber, studentId } });
  };

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Family Background' },
    { number: 3, title: 'Contact Information' },
    { number: 4, title: 'Emergency Contact' },
    { number: 5, title: 'Academic Information' },
    { number: 6, title: 'Course Selection' },
    { number: 7, title: 'Educational Background' },
    { number: 8, title: 'Document Upload' },
    { number: 9, title: 'Review & Submit' }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfo
            data={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <FamilyBackground
            data={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <ContactInfo
            data={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <EmergencyContact
            data={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        );
      case 5:
        return (
          <AcademicInfo
            data={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        );
      case 6:
        return (
          <CourseSelection
            data={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        );
      case 7:
        return (
          <EducationalBackground
            data={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        );
      case 8:
        return (
          <DocumentUpload
            data={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        );
      case 9:
        return <ReviewStep data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-700 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Online Application Form
          </h1>
          <p className="text-gray-600 text-lg">
            Step {currentStep} of {steps.length} - Complete all the required fields to proceed
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep === step.number
                        ? 'bg-blue-700 text-white'
                        : currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step.number}
                  </div>
                  <span className="text-xs mt-2 text-center hidden md:block max-w-24">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {renderStepContent()}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </button>
          {currentStep < 9 ? (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
