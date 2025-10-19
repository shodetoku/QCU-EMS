import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const EnrollmentForm: React.FC = () => {
  const navigate = useNavigate();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [formData, setFormData] = useState({
    referenceNo: '',
    name: '',
    program: '',
    campus: '',
    yearLevel: '',
    preferredSchedule: ''
  });

  useEffect(() => {
    const refNum = localStorage.getItem('loggedInReference');
    if (!refNum) {
      navigate('/dashboard-login');
      return;
    }
    setReferenceNumber(refNum);

    const applicationData = localStorage.getItem(`application_${refNum}`);
    if (applicationData) {
      const data = JSON.parse(applicationData);
      setFormData({
        referenceNo: refNum,
        name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        program: data.selectedProgram || '',
        campus: data.selectedCampus || '',
        yearLevel: '',
        preferredSchedule: ''
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInReference');
    navigate('/dashboard-login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    localStorage.setItem('enrollmentFormData', JSON.stringify(formData));
    navigate('/enrollment-documents');
  };

  const handleCancel = () => {
    navigate('/student-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{referenceNumber}</span>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">ENROLLMENT FORM</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reference No.
              </label>
              <input
                type="text"
                name="referenceNo"
                value={formData.referenceNo}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program/Course:
                </label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white"
                >
                  <option value="">Select program</option>
                  <option value="BS Information Technology">BS Information Technology</option>
                  <option value="BS Computer Science">BS Computer Science</option>
                  <option value="BS Business Administration">BS Business Administration</option>
                  <option value="BS Education">BS Education</option>
                  <option value="BS Engineering">BS Engineering</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campus
                </label>
                <select
                  name="campus"
                  value={formData.campus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white"
                >
                  <option value="">Select campus</option>
                  <option value="San Bartolome Campus">San Bartolome Campus</option>
                  <option value="San Francisco Campus">San Francisco Campus</option>
                  <option value="Batasan Campus">Batasan Campus</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upcoming Year Level
                </label>
                <select
                  name="yearLevel"
                  value={formData.yearLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white"
                >
                  <option value="">Select year level</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Schedule
              </label>
              <select
                name="preferredSchedule"
                value={formData.preferredSchedule}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white"
              >
                <option value="">Select schedule</option>
                <option value="Morning Classes">Morning Classes</option>
                <option value="Afternoon Classes">Afternoon Classes</option>
                <option value="Evening Classes">Evening Classes</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleCancel}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;
