import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, FileText, Calendar, CheckCircle, XCircle, Clock, 
  Search, Filter, Eye, Download, Upload, UserCheck 
} from 'lucide-react';
import { extendedMockApplicants, mockExamSchedules as examSchedules } from '../../data/mockData';
import { Applicant } from '../../types';

const AdmissionDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState<Applicant[]>(extendedMockApplicants);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const adminUser = sessionStorage.getItem('adminUser');
    if (!adminUser) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = 
      applicant.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${applicant.personalInfo.firstName} ${applicant.personalInfo.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.academicInfo.program.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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

  const updateApplicantStatus = (id: string, status: Applicant['status']) => {
    setApplicants(prev => prev.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const updateExamStatus = (id: string, examStatus: Applicant['examStatus']) => {
    setApplicants(prev => prev.map(app => 
      app.id === id ? { ...app, examStatus } : app
    ));
  };

  const generateStudentId = (applicantId: string) => {
    const year = new Date().getFullYear();
    const number = Math.floor(Math.random() * 9000) + 1000;
    const studentId = `${year}-${number}`;
    
    setApplicants(prev => prev.map(app => 
      app.id === applicantId ? { ...app, studentId, status: 'enrolled' } : app
    ));
  };

  const stats = {
    total: applicants.length,
    pending: applicants.filter(a => a.status === 'pending').length,
    approved: applicants.filter(a => a.status === 'approved').length,
    denied: applicants.filter(a => a.status === 'denied').length
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Applications</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Denied</p>
              <p className="text-3xl font-bold text-red-600">{stats.denied}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Applications</h3>
        <div className="space-y-4">
          {applicants.slice(0, 5).map((applicant) => (
            <div key={applicant.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {applicant.personalInfo.firstName} {applicant.personalInfo.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {applicant.referenceNumber} • {applicant.academicInfo.program}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                  {applicant.status}
                </span>
                <button
                  onClick={() => setSelectedApplicant(applicant)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderApplicantsTab = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by reference number, name, or program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
              <option value="enrolled">Enrolled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applicants Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {applicant.personalInfo.firstName} {applicant.personalInfo.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{applicant.referenceNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {applicant.academicInfo.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExamStatusColor(applicant.examStatus)}`}>
                      {applicant.examStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedApplicant(applicant)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    {applicant.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateApplicantStatus(applicant.id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateApplicantStatus(applicant.id, 'denied')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Deny
                        </button>
                      </>
                    )}
                    {applicant.status === 'approved' && !applicant.studentId && (
                      <button
                        onClick={() => generateStudentId(applicant.id)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Generate ID
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderExamTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Exam Management</h3>
        
        {/* Exam Schedules */}
        <div className="space-y-4">
          {examSchedules.map((exam) => (
            <div key={exam.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{exam.program} Entrance Exam</h4>
                <span className="text-sm text-gray-500">{exam.date}</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Time:</span> {exam.time}
                </div>
                <div>
                  <span className="font-medium">Venue:</span> {exam.venue}
                </div>
                <div>
                  <span className="font-medium">Applicants:</span> {
                    applicants.filter(a => a.academicInfo.program === exam.program && a.examStatus === 'scheduled').length
                  }
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Exam Results Management */}
        <div className="mt-8">
          <h4 className="font-semibold text-gray-800 mb-4">Record Exam Results</h4>
          <div className="space-y-2">
            {applicants.filter(a => a.examStatus === 'scheduled').map((applicant) => (
              <div key={applicant.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <span className="font-medium">
                    {applicant.personalInfo.firstName} {applicant.personalInfo.lastName}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">({applicant.referenceNumber})</span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => updateExamStatus(applicant.id, 'passed')}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => updateExamStatus(applicant.id, 'failed')}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                  >
                    Fail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-qcu-deep mb-4">Admission Office Dashboard</h1>
          <p className="text-qcu-gray-600 text-lg">Manage applications, exams, and enrollment processes</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Users },
              { id: 'applicants', name: 'Applicants', icon: FileText },
              { id: 'exams', name: 'Exams', icon: Calendar }
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
          {activeTab === 'applicants' && renderApplicantsTab()}
          {activeTab === 'exams' && renderExamTab()}
        </div>

        {/* Applicant Detail Modal */}
        {selectedApplicant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Applicant Details</h3>
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Personal Information</h4>
                  <p className="text-gray-600">
                    {selectedApplicant.personalInfo.firstName} {selectedApplicant.personalInfo.middleName} {selectedApplicant.personalInfo.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedApplicant.personalInfo.dateOfBirth} • {selectedApplicant.personalInfo.gender}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800">Contact Information</h4>
                  <p className="text-gray-600">{selectedApplicant.contactInfo.email}</p>
                  <p className="text-gray-600">{selectedApplicant.contactInfo.phone}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800">Academic Information</h4>
                  <p className="text-gray-600">Program: {selectedApplicant.academicInfo.program}</p>
                  <p className="text-gray-600">Last School: {selectedApplicant.academicInfo.lastSchoolAttended}</p>
                  <p className="text-gray-600">Year Graduated: {selectedApplicant.academicInfo.yearGraduated}</p>
                </div>
                
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApplicant.status)}`}>
                    {selectedApplicant.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExamStatusColor(selectedApplicant.examStatus)}`}>
                    Exam: {selectedApplicant.examStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionDashboard;