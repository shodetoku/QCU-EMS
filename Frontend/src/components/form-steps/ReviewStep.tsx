import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ReviewStepProps {
  data: any;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle className="h-8 w-8 text-green-500" />
        <h3 className="text-2xl font-semibold text-gray-800">Review Your Application</h3>
      </div>

      <p className="text-gray-600 mb-6">
        Please review all information carefully before submitting. You can go back to edit any section if needed.
      </p>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">Name:</span> {data.firstName} {data.middleName} {data.lastName}</div>
            <div><span className="font-medium">Gmail:</span> {data.gmail}</div>
            <div><span className="font-medium">Date of Birth:</span> {data.dateOfBirth}</div>
            <div><span className="font-medium">Gender:</span> {data.gender}</div>
            <div><span className="font-medium">Civil Status:</span> {data.civilStatus}</div>
            <div><span className="font-medium">Religion:</span> {data.religion}</div>
            <div><span className="font-medium">Citizenship:</span> {data.citizenship}</div>
            <div><span className="font-medium">Place of Birth:</span> {data.placeOfBirth}</div>
            <div><span className="font-medium">Contact:</span> {data.contactNo}</div>
            <div><span className="font-medium">Address:</span> {data.barangay}, {data.city}, {data.district}, {data.zipCode}</div>
            <div><span className="font-medium">LRN:</span> {data.lrn}</div>
            <div><span className="font-medium">Strand:</span> {data.strand}</div>
            <div><span className="font-medium">Track:</span> {data.track}</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Educational Background</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">School:</span> {data.shsName}</div>
            <div><span className="font-medium">School Address:</span> {data.shsAddress}</div>
            <div><span className="font-medium">Strand:</span> {data.shsStrand}</div>
            <div><span className="font-medium">Track:</span> {data.shsTrack}</div>
            <div><span className="font-medium">Date Graduated:</span> {data.dateGraduated}</div>
            <div><span className="font-medium">School Type:</span> {data.schoolType}</div>
          </div>

          <div className="mt-4">
            <p className="font-medium text-gray-700 mb-2">Course Choices:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>{data.firstChoice}</li>
              <li>{data.secondChoice}</li>
              <li>{data.thirdChoice}</li>
            </ol>
          </div>

          <div className="mt-4">
            <p className="font-medium text-gray-700 mb-2">Campus Preferences:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>{data.firstCampus}</li>
              <li>{data.secondCampus}</li>
              <li>{data.thirdCampus}</li>
            </ol>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Family Background</h4>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-gray-700 mb-1">Father:</p>
              <p className="text-gray-600">
                {data.fatherFirstName} {data.fatherMiddleName} {data.fatherLastName} - {data.fatherOccupation}
              </p>
              <p className="text-gray-600">Education: {data.fatherEducation} | Contact: {data.fatherContact}</p>
            </div>

            <div>
              <p className="font-medium text-gray-700 mb-1">Mother:</p>
              <p className="text-gray-600">
                {data.motherFirstName} {data.motherMiddleName} {data.motherLastName} - {data.motherOccupation}
              </p>
              <p className="text-gray-600">Education: {data.motherEducation} | Contact: {data.motherContact}</p>
            </div>

            {data.guardianName && (
              <div>
                <p className="font-medium text-gray-700 mb-1">Guardian:</p>
                <p className="text-gray-600">
                  {data.guardianName} ({data.guardianRelationship}) - {data.guardianContact}
                </p>
              </div>
            )}

            <div>
              <p className="font-medium text-gray-700 mb-1">Emergency Contact:</p>
              <p className="text-gray-600">
                {data.emergencyName} ({data.emergencyRelationship}) - {data.emergencyContact}
              </p>
              <p className="text-gray-600">{data.emergencyAddress}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Documents</h4>
          <div className="space-y-2 text-sm">
            {data.birthCertificate && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>PSA Birth Certificate: {data.birthCertificate}</span>
              </div>
            )}
            {data.goodMoral && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Good Moral: {data.goodMoral}</span>
              </div>
            )}
            {data.residencyCertificate && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Residency Certificate: {data.residencyCertificate}</span>
              </div>
            )}
            {data.reportCard && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Report Card: {data.reportCard}</span>
              </div>
            )}
            {data.medicalClearance && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Medical Clearance: {data.medicalClearance}</span>
              </div>
            )}
            {data.idPicture && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>ID Picture: {data.idPicture}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center text-green-700">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Data Privacy Consent acknowledged</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
        <p className="text-yellow-800 text-sm">
          <strong>Note:</strong> Once submitted, your application will be processed and you will
          receive a reference number to track your application status.
        </p>
      </div>
    </div>
  );
};

export default ReviewStep;
