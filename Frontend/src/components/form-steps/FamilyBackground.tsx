import React from 'react';

interface FamilyBackgroundData {
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
}

interface FamilyBackgroundProps {
  data: FamilyBackgroundData;
  onChange: (field: keyof FamilyBackgroundData, value: string) => void;
  errors: Partial<Record<keyof FamilyBackgroundData, string>>;
}

const FamilyBackground: React.FC<FamilyBackgroundProps> = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Family Background</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Father's Name *
          </label>
          <input
            type="text"
            value={data.fatherName}
            onChange={(e) => onChange('fatherName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupation *
          </label>
          <input
            type="text"
            value={data.fatherOccupation}
            onChange={(e) => onChange('fatherOccupation', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.fatherOccupation && <p className="text-red-500 text-sm mt-1">{errors.fatherOccupation}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Educ'l Attainment *
          </label>
          <input
            type="text"
            value={data.fatherEducation}
            onChange={(e) => onChange('fatherEducation', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.fatherEducation && <p className="text-red-500 text-sm mt-1">{errors.fatherEducation}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact No. *
          </label>
          <input
            type="tel"
            value={data.fatherContact}
            onChange={(e) => onChange('fatherContact', e.target.value)}
            placeholder="+63 912 345 6789"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.fatherContact && <p className="text-red-500 text-sm mt-1">{errors.fatherContact}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mother's Name *
          </label>
          <input
            type="text"
            value={data.motherName}
            onChange={(e) => onChange('motherName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.motherName && <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupation *
          </label>
          <input
            type="text"
            value={data.motherOccupation}
            onChange={(e) => onChange('motherOccupation', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.motherOccupation && <p className="text-red-500 text-sm mt-1">{errors.motherOccupation}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Educ'l Attainment *
          </label>
          <input
            type="text"
            value={data.motherEducation}
            onChange={(e) => onChange('motherEducation', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.motherEducation && <p className="text-red-500 text-sm mt-1">{errors.motherEducation}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact No. *
          </label>
          <input
            type="tel"
            value={data.motherContact}
            onChange={(e) => onChange('motherContact', e.target.value)}
            placeholder="+63 912 345 6789"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.motherContact && <p className="text-red-500 text-sm mt-1">{errors.motherContact}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Parent's Address
        </label>
        <input
          type="text"
          value={data.parentsAddress}
          onChange={(e) => onChange('parentsAddress', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="border-t pt-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guardian
            </label>
            <input
              type="text"
              value={data.guardianName}
              onChange={(e) => onChange('guardianName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relationship
            </label>
            <input
              type="text"
              value={data.guardianRelationship}
              onChange={(e) => onChange('guardianRelationship', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guardian Name
            </label>
            <input
              type="text"
              value={data.guardianName}
              onChange={(e) => onChange('guardianName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact *
            </label>
            <input
              type="tel"
              value={data.guardianContact}
              onChange={(e) => onChange('guardianContact', e.target.value)}
              placeholder="+63 912 345 6789"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyBackground;
