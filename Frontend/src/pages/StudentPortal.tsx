import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Settings, User, FileText, Calendar } from 'lucide-react';

type TabType = 'profile' | 'pre-enlistment' | 'schedule';

const StudentPortal: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
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
    if (loggedInUser.role !== 'student') {
      navigate('/login');
      return;
    }

    const studentData = localStorage.getItem(`user_${loggedInUser.userId}`);
    if (studentData) {
      const data = JSON.parse(studentData);
      setFormData({
        ...formData,
        name: data.name || 'John Doe',
        email: data.email || '',
        studentId: loggedInUser.userId || '',
        program: data.program || 'Bachelor of Science in Computer Science'
      });
    }

    const preEnlistmentStatus = localStorage.getItem('preEnlistmentSubmitted');
    if (preEnlistmentStatus === 'true') {
      setPreEnlistmentStep('submitted');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleNotifications = () => {
    navigate('/notifications');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        coeFile: e.target.files[0]
      });
    }
  };

  const handlePreEnlistmentNext = () => {
    setPreEnlistmentStep('review');
  };

  const handlePreEnlistmentBack = () => {
    setPreEnlistmentStep('form');
  };

  const handlePreEnlistmentSubmit = () => {
    localStorage.setItem('preEnlistmentSubmitted', 'true');
    setPreEnlistmentStep('submitted');
  };

  const scheduleData = [
    { code: 'CC101', subject: 'SBCSIC-Introduction to Computing', unit: '0', room: 'IC305a', days: 'T', time: '11:00AM-1:00PM' },
    { code: 'CC101', subject: 'SBCSIC-Introduction to Computing', unit: '3', room: 'IK603', days: 'T', time: '7:00AM-10:00AM' },
    { code: 'CC102', subject: 'SBCSIC-Fundamentals of Programming', unit: '3', room: 'IK503', days: 'W', time: '2:00PM-5:00PM' },
    { code: 'CC102', subject: 'SBCSIC-Fundamentals of Programming', unit: '0', room: 'IC206a', days: 'W', time: '6:00Pm-8:00PM' },
    { code: 'GEE1', subject: 'SBCSIC-Gender and Society', unit: '3', room: 'IC406a', days: 'M', time: '1:00PM-4:00PM' },
    { code: 'GEE2', subject: 'SBCSIC-People and the Earth\'s Ecosystem', unit: '3', room: 'IC205a', days: 'M', time: '9:00AM-12:00PM' },
    { code: 'MATH1', subject: 'SBCSIC-Mathematics in the Modern World', unit: '3', room: 'IC406a', days: 'W', time: '10:00AM-1:00PM' },
    { code: 'NSTP1', subject: 'SBCSIC-National Service Training Program 1', unit: '3', room: 'SB OC', days: 'F', time: '11:00AM-2:00PM' },
    { code: 'PE1', subject: 'SBCSIC-Physical Fitness and Wellness', unit: '2', room: 'SB OC', days: 'F', time: '8:00AM-10:00AM' },
    { code: 'WS101', subject: 'SBCSIC-Web Systems and Technologies 1', unit: '3', room: 'IK503', days: 'TH', time: '10:00AM-1:00PM' },
    { code: 'WS101', subject: 'SBCSIC-Web Systems and Technologies 1', unit: '2', room: 'IC305', days: 'TH', time: '2:00PM-4:00PM' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm">Welcome</span>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </div>

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
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="h-4 w-4 mr-2" />
                Student Profile
              </button>
              <button
                onClick={() => setActiveTab('pre-enlistment')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'pre-enlistment'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-4 w-4 mr-2" />
                Pre-Enlistment Form
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'schedule'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Class Schedule
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Student Information</h2>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Name: John Doe</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Student ID: 25-1822</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-blue-600 mr-3">🎓</span>
                      <div>
                        <p className="text-sm text-gray-600">Program: Bachelor of Science in Computer Science</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-blue-600 mr-3">📚</span>
                      <div>
                        <p className="text-sm text-gray-600">Year Level: 1</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Enrollment Status</h3>
                    <p className="text-green-600 font-medium flex items-center">
                      <span className="mr-2">📋</span>
                      Enrolled
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Academic Status</h3>
                    <p className="text-green-600 font-medium flex items-center">
                      <span className="mr-2">✓</span>
                      Regular
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pre-enlistment' && (
              <div>
                {preEnlistmentStep === 'form' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Pre-Enlistment Form</h2>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                          <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                          <input
                            type="text"
                            name="section"
                            value={formData.section}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Incoming Year Level</label>
                          <input
                            type="text"
                            name="yearLevel"
                            value={formData.yearLevel}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                          <select
                            name="program"
                            value={formData.program}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="">Select program</option>
                            <option value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</option>
                            <option value="Bachelor of Science in Information Technology">Bachelor of Science in Information Technology</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Schedule (if working student)
                          </label>
                          <select
                            name="preferredSchedule"
                            value={formData.preferredSchedule}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="">Select schedule</option>
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Evening">Evening</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Campus</label>
                          <select
                            name="campus"
                            value={formData.campus}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="">Select campus</option>
                            <option value="San Bartolome">San Bartolome</option>
                            <option value="San Francisco">San Francisco</option>
                            <option value="Batasan">Batasan</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload COE (if currently employed)
                          </label>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <button
                        onClick={handlePreEnlistmentNext}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {preEnlistmentStep === 'review' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Review Your Information Before Submitting</h2>

                    <div className="bg-gray-50 rounded-lg p-6 mt-6">
                      <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                        <div>
                          <p className="text-sm text-gray-600">Name</p>
                          <p className="font-medium text-gray-900">John Doe</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Student ID</p>
                          <p className="font-medium text-gray-900">25-1822</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Section</p>
                          <p className="font-medium text-gray-900">SBCS-1C</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email Address</p>
                          <p className="font-medium text-gray-900">john.doe@gmail.com</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Incoming Year Level</p>
                          <p className="font-medium text-gray-900">2nd Year</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Program</p>
                          <p className="font-medium text-gray-900">Bachelor of Science in Computer Science</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Preferred Schedule</p>
                          <p className="font-medium text-gray-900">Morning Classes</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Campus</p>
                          <p className="font-medium text-gray-900">San Bartolome</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Upload COE (if currently employed)</p>
                          <p className="font-medium text-gray-900">IMG_20251002_102.jpg</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={handlePreEnlistmentBack}
                        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                      >
                        Back to Edit
                      </button>
                      <button
                        onClick={handlePreEnlistmentSubmit}
                        className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}

                {preEnlistmentStep === 'submitted' && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-blue-600 mb-3">Pre-Enlistment Form Submitted !</h2>
                    <p className="text-gray-600 mb-2">
                      You will be notified when the schedule for release of registration form is available.
                    </p>
                    <p className="text-gray-600">
                      Please check your notifications regularly for more updates.
                    </p>
                  </div>
                )}
              </div>
            )}

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
                      {scheduleData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
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
    </div>
  );
};

export default StudentPortal;
