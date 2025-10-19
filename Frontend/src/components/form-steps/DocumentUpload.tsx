import React from 'react';
import { Upload, CheckCircle } from 'lucide-react';

interface DocumentUploadData {
  birthCertificate: string;
  goodMoral: string;
  residencyCertificate: string;
  reportCard: string;
  medicalClearance: string;
  idPicture: string;
  consentChecked: boolean;
}

interface DocumentUploadProps {
  data: DocumentUploadData;
  onChange: (field: keyof DocumentUploadData, value: string | boolean) => void;
  errors: Partial<Record<keyof DocumentUploadData, string>>;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ data, onChange, errors }) => {
  const documents = [
    { key: 'birthCertificate', label: 'PSA Birth Certificate', required: true },
    { key: 'goodMoral', label: 'Certificate of Good Moral Character', required: true },
    { key: 'residencyCertificate', label: 'Certificate of Residency', required: true },
    { key: 'reportCard', label: 'Form 138 / Report Card (Grade 12)', required: true },
    { key: 'medicalClearance', label: 'Medical Clearance', required: true },
    { key: 'idPicture', label: '2x2 ID Picture (4 copies, white background)', required: true }
  ];

  const handleFileChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(key as keyof DocumentUploadData, file.name);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Document Upload</h3>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <p className="text-blue-800 text-sm">
          <strong>Important:</strong> All documents must be clear, readable, and in PDF, JPG, or PNG format.
          Maximum file size: 5MB per document.
        </p>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => {
          const value = data[doc.key as keyof DocumentUploadData] as string;
          const isUploaded = value && value.length > 0;

          return (
            <div
              key={doc.key}
              className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {doc.label} {doc.required && <span className="text-red-500">*</span>}
                  </label>
                  {isUploaded && (
                    <div className="flex items-center text-green-600 text-sm mb-2">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>{value}</span>
                    </div>
                  )}
                  {errors[doc.key as keyof DocumentUploadData] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[doc.key as keyof DocumentUploadData]}
                    </p>
                  )}
                </div>
                <div className="ml-4">
                  <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploaded ? 'Replace' : 'Upload'}
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(doc.key, e)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
        <p className="text-yellow-800 text-sm">
          <strong>Note:</strong> For this demo version, file upload is simulated. In the actual system,
          files will be securely uploaded and stored.
        </p>
      </div>

      <div className="border-t pt-6 mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Data Privacy Consent</h4>

        <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-4">
          <p className="text-gray-700 text-sm mb-4">
            In compliance with the Data Privacy Act of 2012 (Republic Act No. 10173),
            Quezon City University collects and processes personal information for the
            purpose of admission, enrollment, and academic records management.
          </p>
          <p className="text-gray-700 text-sm mb-4">
            By submitting this application, you consent to the collection, use, and
            processing of your personal data as described in our Privacy Policy.
            Your information will be kept confidential and will only be used for
            legitimate academic and administrative purposes.
          </p>
          <p className="text-gray-700 text-sm">
            You have the right to access, correct, and request deletion of your personal
            data in accordance with applicable laws and university policies.
          </p>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="consent"
            checked={data.consentChecked}
            onChange={(e) => onChange('consentChecked', e.target.checked)}
            className="mt-1 mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="consent" className="text-gray-700 text-sm">
            I have read and understood the Data Privacy Consent statement above.
            I hereby give my consent to Quezon City University to collect, use, and
            process my personal information for admission and enrollment purposes. *
          </label>
        </div>
        {errors.consentChecked && (
          <p className="text-red-500 text-sm mt-2">{errors.consentChecked}</p>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
