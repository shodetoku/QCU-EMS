import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, User, Building2, Upload, CheckCircle } from 'lucide-react';
import { generateAccountId } from '../../utils/accountIdGenerator';

const StaffAccountRequest: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    accountType: 'Admission',
    department: 'Admission Office',
    idFile: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedAccountId, setGeneratedAccountId] = useState('');

  const accountTypes = ['Admission', 'Registrar', 'Department'];
  const departments: Record<string, string[]> = {
    Admission: ['Admission Office'],
    Registrar: ['Registrar Office'],
    Department: ['College of Engineering', 'College of Computer Studies', 'College of Education', 'College of Business Administration']
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'accountType' ? { department: departments[value][0] } : {})
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        idFile: e.target.files![0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const accountId = generateAccountId(formData.accountType, formData.department);
      setGeneratedAccountId(accountId);

      const defaultPassword = 'QCU2025';

      // Store account credentials
      const accountKey = `${formData.accountType.toLowerCase()}_${accountId}`;
      localStorage.setItem(accountKey, JSON.stringify({
        accountId: accountId,
        username: accountId,
        password: defaultPassword,
        name: formData.name,
        accountType: formData.accountType,
        department: formData.department,
        createdAt: new Date().toISOString()
      }));

      localStorage.setItem('staffAccountCreated', 'true');
      localStorage.setItem('staffAccountData', JSON.stringify({
        accountId: accountId,
        name: formData.name,
        accountType: formData.accountType,
        department: formData.department,
        createdAt: new Date().toISOString()
      }));

      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Created Successfully</h2>
            <p className="text-gray-600 mb-6">
              Your staff account has been created. Please save your credentials.
            </p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Your Account Credentials</h3>
              <div className="bg-white rounded-lg p-4 mb-3">
                <p className="text-sm text-gray-600 mb-1">Account ID</p>
                <p className="text-xl font-bold text-gray-900">{generatedAccountId}</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Default Password</p>
                <p className="text-xl font-bold text-gray-900 font-mono">QCU2025</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Redirecting to login page...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
              Request Account
            </h1>
            <p className="text-gray-600">
              Create a staff account to access portal features
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Type of Account */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Account
              </label>
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {accountTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Department/Office */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department/Office
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {departments[formData.accountType].map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Upload Valid ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Valid ID
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="idFile"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf"
                  required
                />
                <label
                  htmlFor="idFile"
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <Upload className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    {formData.idFile ? formData.idFile.name : 'Choose file or drag here'}
                  </span>
                </label>
              </div>
              {formData.idFile && (
                <p className="mt-2 text-sm text-green-600">
                  File selected: {formData.idFile.name}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading || !formData.name || !formData.idFile}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  isLoading || !formData.name || !formData.idFile
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                }`}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffAccountRequest;
