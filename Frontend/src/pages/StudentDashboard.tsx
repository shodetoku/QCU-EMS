import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  Calendar,
  Bell,
  FileText,
  LogOut,
  CheckCircle2,
  Clock,
  Upload,
  Download,
  AlertCircle
} from 'lucide-react';

// 1. IMPORT THE MODAL COMPONENT
import LogoutConfirmationModal from '../components/LogoutConfirmationModal';
type TabType = 'overview' | 'examination' | 'notifications' | 'enrollment';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [studentName, setStudentName] = useState('Juan');
  // 2. ADD STATE FOR MODAL VISIBILITY
  const [showLogoutModal, setShowLogoutModal] = useState(false); 


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
      setStudentName(data.firstName || 'Juan');
    }
  }, [navigate]);

  // 3. NEW HANDLER: Function to be called when user clicks "Sign Out" inside the modal
  const handleConfirmLogout = () => {
    localStorage.removeItem('loggedInReference'); // Clear the session
    setShowLogoutModal(false); // Close the modal
    navigate('/dashboard-login'); // Redirect to login
  };

  // 4. NEW HANDLER: Function to be called when user clicks the Log Out button in the header
  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Open the modal
  };

  // 5. NEW HANDLER: Function to be called when user clicks "Cancel" inside the modal
  const handleCancelLogout = () => {
    setShowLogoutModal(false); // Close the modal
  };

  const handleEnrollNow = () => {
    navigate('/enrollment-form');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{referenceNumber}</span>
            {/* 6. UPDATE THE BUTTON'S onClick TO SHOW THE MODAL */}
            <button
              onClick={handleLogoutClick}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ... (Dashboard content JSX remains the same) ... */}
        
        {/* WELCOME BANNER */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Welcome, {studentName}!</h2>
          <p className="text-blue-100">
            Track your application progress and manage your enrollment process.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Eye className="h-4 w-4 mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('examination')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'examination'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Examination/ Interview
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'notifications'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('enrollment')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'enrollment'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-4 w-4 mr-2" />
                Enrollment
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <FileText className="h-10 w-10 text-blue-600" />
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Application Status</h3>
                    <p className="text-2xl font-bold text-green-600">Approved</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Calendar className="h-10 w-10 text-blue-600" />
                      <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Exam Status</h3>
                    <p className="text-2xl font-bold text-yellow-600">Scheduled</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Upload className="h-10 w-10 text-blue-600" />
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Documents</h3>
                    <p className="text-2xl font-bold text-green-600">Complete</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start pb-4 border-b border-gray-100">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Application Approved</h4>
                        <p className="text-sm text-gray-600">Your application has been reviewed and approved</p>
                        <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                      </div>
                    </div>

                    <div className="flex items-start pb-4 border-b border-gray-100">
                      <Calendar className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Exam Scheduled</h4>
                        <p className="text-sm text-gray-600">Entrance examination has been scheduled</p>
                        <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Upload className="h-5 w-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Documents Verified</h4>
                        <p className="text-sm text-gray-600">All submitted documents have been verified</p>
                        <p className="text-xs text-gray-400 mt-1">5 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'examination' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-1">Exam Schedule Pending</h3>
                      <p className="text-sm text-yellow-800">
                        Your examination schedule be available once your application is approved.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 text-gray-900 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Exam Schedule</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Date:</p>
                        <p className="font-medium text-gray-900">June 15, 2025</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Time:</p>
                        <p className="font-medium text-gray-900">9:00 AM – 11:00 AM</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span className="h-5 w-5 text-red-600 mr-3">📍</span>
                      <div>
                        <p className="text-sm text-gray-500">Venue:</p>
                        <p className="font-medium text-gray-900">Acad building, Room IL606a</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-6 w-6 text-gray-900 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Exam Permit</h3>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">Status: Approve</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Note: Please bring a printed copy of your permit together with a valid ID
                  </p>

                  <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Download Exam Permit (PDF)
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 text-gray-900 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Interview Schedule</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Date:</p>
                        <p className="font-medium text-gray-900">July 15, 2025</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Time:</p>
                        <p className="font-medium text-gray-900">9:00 AM – 11:00 AM</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span className="h-5 w-5 text-red-600 mr-3">📍</span>
                      <div>
                        <p className="text-sm text-gray-500">Venue:</p>
                        <p className="font-medium text-gray-900">Acad building, Room IL606a</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <div className="bg-white border-l-4 border-blue-500 p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Bell className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="font-semibold text-gray-900">
                          Entrance Exam Scheduled <span className="text-red-500">•</span>
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Your entrance examination has been scheduled for February 15, 2025.
                      </p>
                      <p className="text-xs text-gray-400">1/20/2025</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-blue-500 p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Bell className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="font-semibold text-gray-900">
                          Document Verification Complete <span className="text-red-500">•</span>
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        All your submitted documents have been verified and approved.
                      </p>
                      <p className="text-xs text-gray-400">1/18/2025</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-blue-500 p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Bell className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="font-semibold text-gray-900">
                          Application Status Update <span className="text-red-500">•</span>
                 
       </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Your application has been approved and processed successfully.
                      </p>
                      <p className="text-xs text-gray-400">1/15/2025</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'enrollment' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-1">Enrollment Not Available</h3>
                      <p className="text-sm text-yellow-800">
                        Complete your entrance examination and wait for approval to proceed with enrollment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <Bell className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Enrollment Open!</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Enroll now to proceed with your enrollment
                      </p>
                      <button
                        onClick={handleEnrollNow}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Enroll Now !
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
    {/* 7. CONDITIONAL MODAL RENDERING */}
    {showLogoutModal && (
        <LogoutConfirmationModal
            onConfirm={handleConfirmLogout}
            onCancel={handleCancelLogout}
        />
    )}
  </div>
  );
};

export default StudentDashboard;