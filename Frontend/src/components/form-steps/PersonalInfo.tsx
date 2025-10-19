import React from 'react';

interface PersonalInfoData {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
  civilStatus: string;
  citizenship: string;
}

interface PersonalInfoProps {
  data: PersonalInfoData;
  onChange: (field: keyof PersonalInfoData, value: string) => void;
  errors: Partial<Record<keyof PersonalInfoData, string>>;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ data, onChange, errors }) => {
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
            value={data.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Middle Name
          </label>
          <input
            type="text"
            value={data.middleName}
            onChange={(e) => onChange('middleName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            value={data.gender}
            onChange={(e) => onChange('gender', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange('dateOfBirth', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Place of Birth *
          </label>
          <input
            type="text"
            value={data.placeOfBirth}
            onChange={(e) => onChange('placeOfBirth', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.placeOfBirth && <p className="text-red-500 text-sm mt-1">{errors.placeOfBirth}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Civil Status *
          </label>
          <select
            value={data.civilStatus}
            onChange={(e) => onChange('civilStatus', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Widowed">Widowed</option>
            <option value="Separated">Separated</option>
          </select>
          {errors.civilStatus && <p className="text-red-500 text-sm mt-1">{errors.civilStatus}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nationality *
          </label>
          <input
            type="text"
            value={data.citizenship}
            onChange={(e) => onChange('citizenship', e.target.value)}
            placeholder="Filipino"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.citizenship && <p className="text-red-500 text-sm mt-1">{errors.citizenship}</p>}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
