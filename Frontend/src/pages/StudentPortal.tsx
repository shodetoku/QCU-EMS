import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, User, FileText, Calendar } from 'lucide-react';
type TabType = 'profile' | 'pre-enlistment' | 'schedule';

const StudentPortal: React.FC = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isClosing, setIsClosing] = useState(false);

  const [preEnlistmentStep, setPreEnlistmentStep] = useState<'form' | 'review' | 'submitted'>('form');
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    section: '',
    email: '',
    yearLevel: '',
    program: '',
    campus: '',
    preferredSchedule: '',
    coeFile: null as File | null
  });

  useEffect(() => {
    const loggedInUserStr = localStorage.getItem('loggedInUser');
    if (!loggedInUserStr) {
      navigate('/login');
      return;
    }

    const loggedInUser = JSON.parse(loggedInUserStr);
    if (loggedInUser?.role !== 'student') {
      navigate('/login');
      return;
    }

    const studentData = localStorage.getItem(`user_${loggedInUser.userId}`);
    if (studentData) {
      const data = JSON.parse(studentData);
      setFormData(prev => ({
        ...prev,
        name: data.name || 'John Doe',
        email: data.email || '',
        studentId: loggedInUser.userId || '',
        program: data.program || 'Bachelor of Science in Computer Science'
      }));
    }

    const preEnlistmentStatus = localStorage.getItem('preEnlistmentSubmitted');
    if (preEnlistmentStatus === 'true') {
      setPreEnlistmentStep('submitted');
    }
  }, [navigate]);



 // eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleLogout = () => setShowLogoutModal(true);

  const cancelLogout = () => {
  setIsClosing(true);
  setTimeout(() => {
    setShowLogoutModal(false);
    setIsClosing(false);
  }, 200); 
};

const confirmLogout = () => {
  setIsClosing(true);
  setTimeout(() => {
    setShowLogoutModal(false);
    setIsClosing(false);
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  }, 200);
};


  const handleNotifications = () => {
    // This is where you would typically show a notification modal or navigate
    navigate('/notifications');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, coeFile: files[0] }));
    }
  };

  const handlePreEnlistmentNext = () => setPreEnlistmentStep('review');
  const handlePreEnlistmentBack = () => setPreEnlistmentStep('form');
  const handlePreEnlistmentSubmit = () => {
    // In a real app, you'd perform form validation and an API submission here.
    console.log('Submitting Pre-Enlistment Form:', formData); 
    localStorage.setItem('preEnlistmentSubmitted', 'true');
    setPreEnlistmentStep('submitted');
  };

  const scheduleData = [
    { code: 'CC101', subject: 'SBCSIC-Introduction to Computing', unit: '0', room: 'IC305a', days: 'T', time: '11:00AM-1:00PM' },
    { code: 'CC101', subject: 'SBCSIC-Introduction to Computing', unit: '3', room: 'IK603', days: 'T', time: '7:00AM-10:00AM' },
    { code: 'CC102', subject: 'SBCSIC-Fundamentals of Programming', unit: '3', room: 'IK503', days: 'W', time: '2:00PM-5:00PM' },
    { code: 'CC102', subject: 'SBCSIC-Fundamentals of Programming', unit: '0', room: 'IC206a', days: 'W', time: '6:00PM-8:00PM' },
    { code: 'GEE1', subject: 'SBCSIC-Gender and Society', unit: '3', room: 'IC406a', days: 'M', time: '1:00PM-4:00PM' },
    { code: 'GEE2', subject: 'SBCSIC-People and the Earth\'s Ecosystem', unit: '3', room: 'IC205a', days: 'M', time: '9:00AM-12:00PM' },
    { code: 'MATH1', subject: 'SBCSIC-Mathematics in the Modern World', unit: '3', room: 'IC406a', days: 'W', time: '10:00AM-1:00PM' },
    { code: 'NSTP1', subject: 'SBCSIC-National Service Training Program 1', unit: '3', room: 'SB OC', days: 'F', time: '11:00AM-2:00PM' },
    { code: 'PE1', subject: 'SBCSIC-Physical Fitness and Wellness', unit: '2', room: 'SB OC', days: 'F', time: '8:00AM-10:00AM' },
    { code: 'WS101', subject: 'SBCSIC-Web Systems and Technologies 1', unit: '3', room: 'IK503', days: 'TH', time: '10:00AM-1:00PM' },
    { code: 'WS101', subject: 'SBCSIC-Web Systems and Technologies 1', unit: '2', room: 'IC305', days: 'TH', time: '2:00PM-4:00PM' }
  ];

  const renderPreEnlistmentForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Input */}
        <label className="block">
          <span className="text-gray-700">Full Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </label>
        {/* Student ID Input */}
        <label className="block">
          <span className="text-gray-700">Student ID</span>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleFormChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            disabled
          />
        </label>
        {/* Program Input */}
        <label className="block">
          <span className="text-gray-700">Program</span>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleFormChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </label>
        {/* Campus Input */}
        <label className="block">
          <span className="text-gray-700">Campus</span>
          <select
            name="campus"
            value={formData.campus}
            onChange={handleFormChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          >
            <option value="">Select Campus</option>
            <option value="San Bartolome">San Bartolome</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Batasan">Batasan</option>
          </select>
        </label>
        {/* COE File Input */}
        <label className="block">
          <span className="text-gray-700">Certificate of Enlistment (COE)</span>
          <input
            type="file"
            name="coeFile"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {formData.coeFile && <p className="text-xs text-green-600 mt-1">File uploaded: {formData.coeFile.name}</p>}
        </label>
      </div>
      <div className="flex justify-end pt-4">
        <button
          onClick={handlePreEnlistmentNext}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Next to Review
        </button>
      </div>
    </div>
  );

  const renderPreEnlistmentReview = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Review Your Details</h3>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 p-4 bg-gray-50 rounded-md">
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Full Name</dt>
          <dd className="mt-1 text-sm text-gray-900">{formData.name || 'N/A'}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Student ID</dt>
          <dd className="mt-1 text-sm text-gray-900">{formData.studentId || 'N/A'}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Program</dt>
          <dd className="mt-1 text-sm text-gray-900">{formData.program || 'N/A'}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Campus</dt>
          <dd className="mt-1 text-sm text-gray-900">{formData.campus || 'N/A'}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">Attached File</dt>
          <dd className="mt-1 text-sm text-gray-900">{formData.coeFile ? formData.coeFile.name : 'No file attached'}</dd>
        </div>
      </dl>
      <div className="flex justify-between pt-4">
        <button
          onClick={handlePreEnlistmentBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-100 transition-colors"
        >
          Back to Form
        </button>
        <button
          onClick={handlePreEnlistmentSubmit}
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
        >
          Confirm & Submit
        </button>
      </div>
    </div>
  );

  const renderPreEnlistmentSubmitted = () => (
    <div className="text-center py-12">
      <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">Pre-Enlistment Submitted!</h3>
      <p className="mt-1 text-sm text-gray-500">
        Your form has been successfully submitted and is now pending review by the Registrar's Office. You will be notified of its status.
      </p>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Student Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <InfoField label="Student Name" value={formData.name || 'N/A'} />
        <InfoField label="Student ID" value={formData.studentId || 'N/A'} />
        <InfoField label="Program" value={formData.program || 'N/A'} />
        <InfoField label="Year Level" value={formData.yearLevel || '1st Year'} />
        <InfoField label="Section" value={formData.section || 'N/A'} />
        <InfoField label="Email Address" value={formData.email || 'N/A'} />
      </div>
    </div>
  );

  const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 font-semibold">{value}</dd>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/qcu-logo.png" alt="QCU" className="h-16 w-16" />
            <div className="text-center">
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Quattrocento, serif', color: '#B28509' }}>
                QUEZON CITY UNIVERSITY
              </h1>
              <p className="text-sm" style={{ fontFamily: 'Montserrat, sans-serif', color: '#666' }}>
                SAN BARTOLOME | SAN FRANCISCO | BATASAN
              </p>
            </div>
          </div>
            {/* ===== Log Out Button ===== */}
  <div className="flex items-center gap-4">
      <span className="text-sm">Welcome!</span>
    <button
      onClick={handleLogout}
        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      <LogOut className="h-5 w-5 mr-1" />
      <span className="text-sm">Log Out</span>
    </button>
  </div>

         {/* ===== Logout Confirmation Modal ===== */}
{showLogoutModal && (
  <div
    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
      isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
    }`}
  >
    <div
      className={`bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center ${
        isClosing ? 'animate-scaleOut' : 'animate-scaleIn'
      }`}
    >

      <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
      <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={confirmLogout}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-8q00 transition"
        >
          Log Out
        </button>
        <button
          onClick={cancelLogout}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        
      </div>
    </div>
  </div>
)} 



        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Portal</h1>
            <p className="text-gray-600 mt-1">View your information, schedules, and enlistment form.</p>
          </div>
          <button
            onClick={handleNotifications}
            className="relative p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <Bell className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {['profile', 'pre-enlistment', 'schedule'].map(tab => {
                const isActive = activeTab === tab;
                const icons: Record<string, JSX.Element> = {
                  profile: <User className="h-4 w-4 mr-2" />,
                  'pre-enlistment': <FileText className="h-4 w-4 mr-2" />,
                  schedule: <Calendar className="h-4 w-4 mr-2" />
                };
                const labels: Record<string, string> = {
                  profile: 'Student Profile',
                  'pre-enlistment': 'Pre-Enlistment Form',
                  schedule: 'Class Schedule'
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as TabType)}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      isActive
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {icons[tab]} {labels[tab]}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                {renderProfileTab()}
              </div>
            )}

            {/* Pre-Enlistment Tab */}
            {activeTab === 'pre-enlistment' && (
              <div>
                {/* Dynamically render content based on the current step */}
                {preEnlistmentStep === 'form' && renderPreEnlistmentForm()}
                {preEnlistmentStep === 'review' && renderPreEnlistmentReview()}
                {preEnlistmentStep === 'submitted' && renderPreEnlistmentSubmitted()}
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Class Schedule</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Code</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Section-Subject</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Unit</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Room</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Days</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleData.map(item => (
                        <tr key={item.code + item.time} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{item.code}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.subject}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.unit}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.room}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.days}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    
  
  

      {/* ===== Animations ===== */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
      `}</style>
    </div>

  );
};
export default StudentPortal;