import React from 'react';
import { mockPrograms } from '../../data/mockData';

interface EducationalBackgroundData {
  shsName: string;
  section: string;
  shsAddress: string;
  shsStrand: string;
  location: string;
  schoolType: string;
  dateGraduated: string;
  honorsReceived: string;
}

interface EducationalBackgroundProps {
  data: EducationalBackgroundData;
  onChange: (field: keyof EducationalBackgroundData, value: string) => void;
  errors: Partial<Record<keyof EducationalBackgroundData, string>>;
}

const EducationalBackground: React.FC<EducationalBackgroundProps> = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Educational Background</h3>
      <p className="text-sm text-gray-600 mb-4">
        Senior High School Name or High School Name for HS Graduate
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            value={data.shsAddress}
            onChange={(e) => onChange('shsAddress', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.shsAddress && <p className="text-red-500 text-sm mt-1">{errors.shsAddress}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Track / Strand
          </label>
          <input
            type="text"
            value={data.shsStrand}
            onChange={(e) => onChange('shsStrand', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.shsStrand && <p className="text-red-500 text-sm mt-1">{errors.shsStrand}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <select
            value={data.location}
            onChange={(e) => onChange('location', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Quezon city</option>
            <option value="Quezon City">Quezon City</option>
            <option value="Manila">Manila</option>
            <option value="Other">Other</option>
          </select>
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of School *
          </label>
          <select
            value={data.schoolType}
            onChange={(e) => onChange('schoolType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Public</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          {errors.schoolType && <p className="text-red-500 text-sm mt-1">{errors.schoolType}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Graduated *
          </label>
          <input
            type="date"
            value={data.dateGraduated}
            onChange={(e) => onChange('dateGraduated', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.dateGraduated && <p className="text-red-500 text-sm mt-1">{errors.dateGraduated}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Honors Received with Certification
          </label>
          <input
            type="text"
            value={data.honorsReceived}
            onChange={(e) => onChange('honorsReceived', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default EducationalBackground;
