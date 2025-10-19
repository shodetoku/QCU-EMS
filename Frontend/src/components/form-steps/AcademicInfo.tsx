import React from 'react';

interface AcademicInfoData {
  lrn: string;
  dateOfApplication: string;
  applicationType: string;
  shsGraduateOrALS: string;
  transfereeOrSecondDegree: string;
  programOrCourse: string;
}

interface AcademicInfoProps {
  data: AcademicInfoData;
  onChange: (field: keyof AcademicInfoData, value: string) => void;
  errors: Partial<Record<keyof AcademicInfoData, string>>;
}

const AcademicInfo: React.FC<AcademicInfoProps> = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Information</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LRN
          </label>
          <input
            type="text"
            value={data.lrn}
            onChange={(e) => onChange('lrn', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.lrn && <p className="text-red-500 text-sm mt-1">{errors.lrn}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Application
          </label>
          <input
            type="date"
            value={data.dateOfApplication}
            onChange={(e) => onChange('dateOfApplication', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.dateOfApplication && <p className="text-red-500 text-sm mt-1">{errors.dateOfApplication}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Are you applying as: (Please check the appropriate answer)
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="SHS Graduate"
                checked={data.applicationType === 'SHS Graduate'}
                onChange={(e) => onChange('applicationType', e.target.value)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">SHS Graduate</span>
            </label>
            <label className="flex items-center ml-6">
              <input
                type="radio"
                value="Track"
                checked={data.shsGraduateOrALS === 'Track'}
                onChange={(e) => onChange('shsGraduateOrALS', e.target.value)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">Track</span>
              <input
                type="text"
                placeholder="Strand"
                className="ml-4 px-4 py-1 border border-gray-300 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="radio"
              value="High School Graduate (Year 2016 and below Graduate/ALS HS)"
              checked={data.applicationType === 'High School Graduate (Year 2016 and below Graduate/ALS HS)'}
              onChange={(e) => onChange('applicationType', e.target.value)}
              className="mr-2 h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">High School Graduate (Year 2016 and below Graduate/ALS HS)</span>
          </label>
          <div className="ml-6 mt-2 flex items-center">
            <label className="flex items-center">
              <input
                type="radio"
                value="ALS Graduate"
                checked={data.shsGraduateOrALS === 'ALS Graduate'}
                onChange={(e) => onChange('shsGraduateOrALS', e.target.value)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">ALS Graduate</span>
            </label>
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="radio"
              value="Transferee"
              checked={data.applicationType === 'Transferee'}
              onChange={(e) => onChange('applicationType', e.target.value)}
              className="mr-2 h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">Transferee, are you applying for Accreditation of Subject?</span>
          </label>
          <div className="ml-6 mt-2 flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={data.transfereeOrSecondDegree === 'Yes'}
                onChange={(e) => onChange('transfereeOrSecondDegree', e.target.value)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={data.transfereeOrSecondDegree === 'No'}
                onChange={(e) => onChange('transfereeOrSecondDegree', e.target.value)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">No</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            2nd Degree Course Taker (already a graduate of a Bachelor's Degree before)
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 mt-2">
              Program/Course
            </label>
            <input
              type="text"
              value={data.programOrCourse}
              onChange={(e) => onChange('programOrCourse', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicInfo;
