import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Calendar, FileText, Bell, Download, Upload, CheckCircle, 
  Clock, AlertTriangle, LogOut, Eye, MapPin, BookOpen 
} from 'lucide-react';
import { mockApplicants, mockExamSchedules as examSchedules, generateStudentId } from '../data/mockData';
import { Applicant } from '../types';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [applicantData, setApplicantData] = useState<Applicant | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications] = useState([
    {
      id: 1,
      type: 'exam',
      title: 'Entrance Exam Scheduled',
      message: 'Your entrance examination has been scheduled for February 15, 2025.',
      date: '2025-01-20',
      isRead: false
    },
    {
      id: 2,
      type: 'document',
      title: 'Document Verification Complete',
      message: 'All your submitted documents have been verified and approved.',
      date: '2025-01-18',
      isRead: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Application Status Update',
      message: 'Your application has been approved and processed successfully.',
      date: '2025-01-15',
      isRead: true
    }
  ]);

  useEffect(() => {
    const loggedInReference = sessionStorage.getItem('loggedInReference');
    if (!loggedInReference) {
      navigate('/dashboard-login');
      return;
    }

    // Find applicant data or create mock data
    let applicant = mockApplicants.find(a => a.referenceNumber === loggedInReference);
    
    if (!applicant) {
      // Create mock applicant for demo purposes
      applicant = {
        id: '1',
        referenceNumber: loggedInReference,
        personalInfo: {
          firstName: 'Juan',
          lastName: 'Dela Cruz',
          middleName: 'Santos',
          dateOfBirth: '2000-05-15',
          gender: 'Male',
          civilStatus: 'Single',
          nationality: 'Filipino'
        },
        contactInfo: {
          email: 'juan.delacruz@email.com',
          phone: '+63 912 345 6789',
          address: '123 Main St.',
          city: 'Quezon City',
          province: 'Metro Manila',
          zipCode: '1100'
        },
        academicInfo: {
          program: 'BSCS',
          lastSchoolAttended: 'QC High School',
          yearGraduated: '2023',
          gwa: '85.5'
        },
        status: 'approved',
        examStatus: 'scheduled',
        documentsUploaded: true,
        submissionDate: new Date().toISOString()
      };
    }

    setApplicantData(applicant);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInReference');
    navigate('/dashboard-login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'denied': return 'bg-red-100 text-red-800';
      case 'enrolled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExamStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
      case 'scheduled':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'denied':
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const exam = examSchedules.find(e => e.program === applicantData?.academicInfo.program);

  if (!applicantData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            {getStatusIcon(applicantData.status)}
          </div>
          <h3 className="text-sm font-medium text-gray-500">Application Status</h3>
          <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusColor(applicantData.status)}`}>
            {applicantData.status.charAt(0).toUpperCase() + applicantData.status.slice(1)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            {getStatusIcon(applicantData.examStatus)}
          </div>
          <h3 className="text-sm font-medium text-gray-500">Exam Status</h3>
          <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${getExamStatusColor(applicantData.examStatus)}`}>
            {applicantData.examStatus.charAt(0).toUpperCase() + applicantData.examStatus.slice(1)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center">
              <Upload className="h-6 w-6 text-purple-600" />
            </div>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-500">Documents</h3>
          <p className="text-lg font-semibold text-gray-800">Complete</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center">
              <User className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Student ID</h3>
          <p className="text-lg font-semibold text-gray-800">
            {applicantData.studentId || 'Pending'}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-gray-800 font-medium">Application Approved</p>
              <p className="text-gray-500 text-sm">Your application has been reviewed and approved</p>
              <p className="text-gray-400 text-xs">2 days ago</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-800 font-medium">Exam Scheduled</p>
              <p className="text-gray-500 text-sm">Entrance examination has been scheduled</p>
              <p className="text-gray-400 text-xs">3 days ago</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
              <FileText className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-800 font-medium">Documents Verified</p>
              <p className="text-gray-500 text-sm">All submitted documents have been verified</p>
              <p className="text-gray-400 text-xs">5 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExamTab = () => (
    <div className="space-y-6">
      {exam && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Entrance Examination Details</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getExamStatusColor(applicantData.examStatus)}`}>
              {applicantData.examStatus.charAt(0).toUpperCase() + applicantData.examStatus.slice(1)}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Exam Information</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(exam.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{exam.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{exam.venue}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Program: {exam.program}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Important Instructions</h4>
              <ul className="space-y-1 text-gray-600">
                {exam.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-sm">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {applicantData.examStatus === 'scheduled' && (
            <div className="border-t pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors">
                <Download className="h-4 w-4" />
                Download Exam Permit
              </button>
            </div>
          )}
        </div>
      )}

      {!exam && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">Exam Schedule Pending</h3>
              <p className="text-yellow-700">
                Your examination schedule will be available once your application is approved.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`bg-white rounded-lg shadow-md p-6 ${
            !notification.isRead ? 'border-l-4 border-blue-600' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Bell className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                  {notification.title}
                </h3>
                {!notification.isRead && (
                  <span className="bg-blue-600 w-2 h-2 rounded-full ml-2"></span>
                )}
              </div>
              <p className="text-gray-600 mb-2">{notification.message}</p>
              <p className="text-gray-400 text-sm">
                {new Date(notification.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEnrollmentTab = () => (
    <div className="space-y-6">
      {applicantData.status === 'approved' && applicantData.examStatus === 'passed' ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Enrollment Process</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Final Requirements</h4>
              <div className="space-y-3">
                {[
                  { name: 'Enrollment Form', status: 'pending' },
                  { name: 'Payment of Fees', status: 'pending' },
                  { name: 'Medical Records', status: 'completed' },
                  { name: 'ID Photo (1x1)', status: 'completed' }
                ].map((req, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <span className="text-gray-700">{req.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      req.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Student Information</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-600 text-sm">Student ID:</span>
                    <p className="font-semibold text-blue-800">
                      {applicantData.studentId || generateStudentId()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Program:</span>
                    <p className="font-semibold">{applicantData.academicInfo.program}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Academic Year:</span>
                    <p className="font-semibold">2025-2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Complete Enrollment
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-gray-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Enrollment Not Available</h3>
              <p className="text-gray-600">
                Complete your entrance examination and wait for approval to proceed with enrollment.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">Student Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Ref: {applicantData.referenceNumber}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-qcu-primary to-qcu-deep rounded-2xl p-8 text-white mb-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Welcome, {applicantData.personalInfo.firstName}!
          </h2>
          <p className="text-qcu-accent text-lg">
            Track your application progress and manage your enrollment process.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Eye },
              { id: 'exam', name: 'Examination', icon: Calendar },
              { id: 'notifications', name: 'Notifications', icon: Bell },
              { id: 'enrollment', name: 'Enrollment', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-qcu-primary/10 text-qcu-primary border-b-2 border-qcu-primary'
                      : 'text-qcu-gray-600 hover:text-qcu-primary hover:border-b-2 hover:border-qcu-secondary'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'exam' && renderExamTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'enrollment' && renderEnrollmentTab()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;