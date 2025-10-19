import React from 'react';
import { mockPrograms } from '../../data/mockData';

interface CourseSelectionData {
  firstChoice: string;
  secondChoice: string;
  thirdChoice: string;
  campus: string;
}

interface CourseSelectionProps {
  data: CourseSelectionData;
  onChange: (field: keyof CourseSelectionData, value: string) => void;
  errors: Partial<Record<keyof CourseSelectionData, string>>;
}

const CourseSelection: React.FC<CourseSelectionProps> = ({ data, onChange, errors }) => {
  const campuses = [
    'San Bartolome Campus',
    'San Francisco Campus',
    'Batasan Campus'
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Information</h3>
      <p className="text-sm text-gray-600 mb-4">
        Course applied for: (Please choose 3 preferred courses)
      </p>

      <div className="space-y-4">
        <div>
          <select
            value={data.firstChoice}
            onChange={(e) => onChange('firstChoice', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select First Choice</option>
            {mockPrograms.map((program) => (
              <option key={program.id} value={program.code}>
                {program.code} - {program.name}
              </option>
            ))}
          </select>
          {errors.firstChoice && <p className="text-red-500 text-sm mt-1">{errors.firstChoice}</p>}
        </div>

        <div>
          <select
            value={data.secondChoice}
            onChange={(e) => onChange('secondChoice', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Second Choice</option>
            {mockPrograms.map((program) => (
              <option key={program.id} value={program.code}>
                {program.code} - {program.name}
              </option>
            ))}
          </select>
          {errors.secondChoice && <p className="text-red-500 text-sm mt-1">{errors.secondChoice}</p>}
        </div>

        <div>
          <select
            value={data.thirdChoice}
            onChange={(e) => onChange('thirdChoice', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Third Choice</option>
            {mockPrograms.map((program) => (
              <option key={program.id} value={program.code}>
                {program.code} - {program.name}
              </option>
            ))}
          </select>
          {errors.thirdChoice && <p className="text-red-500 text-sm mt-1">{errors.thirdChoice}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Campus
        </label>
        <select
          value={data.campus}
          onChange={(e) => onChange('campus', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Campus</option>
          {campuses.map((campus) => (
            <option key={campus} value={campus}>
              {campus}
            </option>
          ))}
        </select>
        {errors.campus && <p className="text-red-500 text-sm mt-1">{errors.campus}</p>}
      </div>
    </div>
  );
};

export default CourseSelection;
