import React from 'react';

interface EmergencyContactData {
  emergencyName: string;
  emergencyAddress: string;
  emergencyRelationship: string;
  emergencyContact: string;
}

interface EmergencyContactProps {
  data: EmergencyContactData;
  onChange: (field: keyof EmergencyContactData, value: string) => void;
  errors: Partial<Record<keyof EmergencyContactData, string>>;
}

const EmergencyContact: React.FC<EmergencyContactProps> = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Person to Be Notified in Case of Emergency</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          value={data.emergencyName}
          onChange={(e) => onChange('emergencyName', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.emergencyName && <p className="text-red-500 text-sm mt-1">{errors.emergencyName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <input
          type="text"
          value={data.emergencyAddress}
          onChange={(e) => onChange('emergencyAddress', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.emergencyAddress && <p className="text-red-500 text-sm mt-1">{errors.emergencyAddress}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Relationship
          </label>
          <input
            type="text"
            value={data.emergencyRelationship}
            onChange={(e) => onChange('emergencyRelationship', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.emergencyRelationship && <p className="text-red-500 text-sm mt-1">{errors.emergencyRelationship}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact No.
          </label>
          <input
            type="tel"
            value={data.emergencyContact}
            onChange={(e) => onChange('emergencyContact', e.target.value)}
            placeholder="+63 912 345 6789"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
