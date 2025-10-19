import React from 'react';

interface ContactInfoData {
  gmail: string;
  contactNo: string;
  completeAddress: string;
  barangay: string;
  city: string;
  district: string;
  zipCode: string;
}

interface ContactInfoProps {
  data: ContactInfoData;
  onChange: (field: keyof ContactInfoData, value: string) => void;
  errors: Partial<Record<keyof ContactInfoData, string>>;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ data, onChange, errors }) => {
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
            value={data.gmail}
            onChange={(e) => onChange('gmail', e.target.value)}
            placeholder="example@gmail.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.gmail && <p className="text-red-500 text-sm mt-1">{errors.gmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={data.contactNo}
            onChange={(e) => onChange('contactNo', e.target.value)}
            placeholder="+63 912 345 6789"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.contactNo && <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Complete Address *
        </label>
        <input
          type="text"
          value={data.completeAddress}
          onChange={(e) => onChange('completeAddress', e.target.value)}
          placeholder="House/Unit Number, Street, Barangay"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.completeAddress && <p className="text-red-500 text-sm mt-1">{errors.completeAddress}</p>}
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Barangay *
          </label>
          <input
            type="text"
            value={data.barangay}
            onChange={(e) => onChange('barangay', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.barangay && <p className="text-red-500 text-sm mt-1">{errors.barangay}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City/ Municipality *
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange('city', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            District No. *
          </label>
          <input
            type="text"
            value={data.district}
            onChange={(e) => onChange('district', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            value={data.zipCode}
            onChange={(e) => onChange('zipCode', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
