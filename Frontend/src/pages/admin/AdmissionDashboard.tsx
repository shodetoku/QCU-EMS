import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Calendar, CheckCircle, XCircle, Clock, Search, Filter, Eye, X } from 'lucide-react';

interface Applicant {
  id: string;
  name: string;
  referenceNumber: string;
  program: string;
  status: 'pending' | 'approved' | 'denied' | 'enrolled';
  examStatus: 'pending' | 'scheduled' | 'passed';
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  lastSchool: string;
  yearGraduated: string;
  documents: {
    birthCertificate: boolean;
    transcript: boolean;
    medicalCert: boolean;
    idPhoto: boolean;
  };
}

interface ExamSchedule {
  id: string;
  program: string;
  date: string;
  time: string;
  venue: string;
  applicantCount: number;
}

interface ExamResult {
  applicantId: string;
  name: string;
  referenceNumber: string;
}

const AdmissionDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'applicants' | 'exam'>('overview');
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [examSchedules, setExamSchedules] = useState<ExamSchedule[]>([]);
  const [examView, setExamView] = useState<'list' | 'schedule' | 'interview'>('list');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [scheduleForm, setScheduleForm] = useState({
    date: '',
    time: '09:00 AM',
    venue: '',
    numberOfStudents: 30
  });

  useEffect(() => {
    const loggedInUserStr = localStorage.getItem('loggedInUser');
    if (!loggedInUserStr) {
      navigate('/admission-login');
      return;
    }

    const loggedInUser = JSON.parse(loggedInUserStr);
    if (loggedInUser.role !== 'admission') {
      navigate('/admission-login');
      return;
    }

    loadApplicants();
    loadExamSchedules();
  }, [navigate]);

  const loadApplicants = () => {
    const stored = localStorage.getItem('admissionApplicants');
    if (stored) {
      setApplicants(JSON.parse(stored));
    } else {
      const initialApplicants: Applicant[] = [
        {
          id: '1',
          name: 'John Doe',
          referenceNumber: 'REF-2024-001',
          program: 'Bachelor of Science in Computer Science',
          status: 'pending',
          examStatus: 'scheduled',
          dateOfBirth: '2000-05-15',
          gender: 'Male',
          email: 'john.doe@email.com',
          phone: '+1-555-0123',
          lastSchool: 'QCU High School',
          yearGraduated: '2018',
          documents: {
            birthCertificate: true,
            transcript: true,
            medicalCert: true,
            idPhoto: true
          }
        },
        {
          id: '2',
          name: 'Jane Smith',
          referenceNumber: 'REF-2024-002',
          program: 'Bachelor of Science in Engineering',
          status: 'approved',
          examStatus: 'passed',
          dateOfBirth: '2001-08-22',
          gender: 'Female',
          email: 'jane.smith@email.com',
          phone: '+1-555-0124',
          lastSchool: 'Central High School',
          yearGraduated: '2019',
          documents: {
            birthCertificate: true,
            transcript: true,
            medicalCert: true,
            idPhoto: true
          }
        },
        {
          id: '3',
          name: 'Mike Johnson',
          referenceNumber: 'REF-2024-003',
          program: 'Bachelor of Science in Business Administration',
          status: 'pending',
          examStatus: 'pending',
          dateOfBirth: '2000-03-10',
          gender: 'Male',
          email: 'mike.johnson@email.com',
          phone: '+1-555-0125',
          lastSchool: 'North High School',
          yearGraduated: '2018',
          documents: {
            birthCertificate: true,
            transcript: true,
            medicalCert: true,
            idPhoto: true
          }
        }
      ];
      localStorage.setItem('admissionApplicants', JSON.stringify(initialApplicants));
      setApplicants(initialApplicants);
    }
  };

  const loadExamSchedules = () => {
    const stored = localStorage.getItem('examSchedules');
    if (stored) {
      setExamSchedules(JSON.parse(stored));
    } else {
      const initialSchedules: ExamSchedule[] = [
        {
          id: '1',
          program: 'Bachelor of Science in Computer Science',
          date: '2024-03-15',
          time: '09:00 AM',
          venue: 'Computer Lab A',
          applicantCount: 30
        },
        {
          id: '2',
          program: 'Bachelor of Science in Engineering',
          date: '2024-03-18',
          time: '10:00 AM',
          venue: 'Engineering Hall',
          applicantCount: 0
        },
        {
          id: '3',
          program: 'Bachelor of Science in Computer Science',
          date: '2024-03-20',
          time: '02:00 PM',
          venue: 'Business Center',
          applicantCount: 0
        }
      ];
      localStorage.setItem('examSchedules', JSON.stringify(initialSchedules));
      setExamSchedules(initialSchedules);
    }
  };

  const saveApplicants = (updated: Applicant[]) => {
    localStorage.setItem('admissionApplicants', JSON.stringify(updated));
    setApplicants(updated);
  };

  const saveExamSchedules = (updated: ExamSchedule[]) => {
    localStorage.setItem('examSchedules', JSON.stringify(updated));
    setExamSchedules(updated);
  };

  const updateApplicantStatus = (id: string, status: 'approved' | 'denied') => {
    const updated = applicants.map(app =>
      app.id === id ? { ...app, status } : app
    );
    saveApplicants(updated);
  };

  const updateExamResult = (id: string, result: 'passed' | 'failed') => {
    const updated = applicants.map(app =>
      app.id === id ? { ...app, examStatus: result as any } : app
    );
    saveApplicants(updated);
  };

  const handleScheduleExam = () => {
    const newSchedule: ExamSchedule = {
      id: Date.now().toString(),
      program: 'Bachelor of Science in Computer Science',
      date: scheduleForm.date,
      time: scheduleForm.time,
      venue: scheduleForm.venue,
      applicantCount: selectedStudents.length
    };
    const updated = [...examSchedules, newSchedule];
    saveExamSchedules(updated);

    const updatedApplicants = applicants.map(app =>
      selectedStudents.includes(app.id) ? { ...app, examStatus: 'scheduled' as any } : app
    );
    saveApplicants(updatedApplicants);

    setSelectedStudents([]);
    setScheduleForm({ date: '', time: '09:00 AM', venue: '', numberOfStudents: 30 });
    setExamView('list');
  };

  const stats = {
    total: applicants.length,
    pending: applicants.filter(a => a.status === 'pending').length,
    approved: applicants.filter(a => a.status === 'approved').length,
    denied: applicants.filter(a => a.status === 'denied').length
  };

  const filteredApplicants = applicants.filter(app => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.program.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = statusFilter === 'All Status' || app.status === statusFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'denied': return 'bg-red-100 text-red-700';
      case 'enrolled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getExamStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'passed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const eligibleStudents = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson',
    'Jashmine Larosa', 'Jessner Montero', 'Fatima Armoganda',
    'Carlo Castillano', 'Jen Olivas', 'Shane Villar'
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Application</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Denied</p>
              <p className="text-3xl font-bold text-red-600">{stats.denied}</p>
            </div>
            <div className="bg-red-50 p-2 rounded">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Applications</h3>
        <div className="space-y-3">
          {applicants.slice(0, 3).map((app) => (
            <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{app.name}</p>
                  <p className="text-sm text-gray-500">{app.referenceNumber} - {app.program}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
                <button
                  onClick={() => setSelectedApplicant(app)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Eye className="h-4 w-4 text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderApplicants = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by reference, number, or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{statusFilter}</span>
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {['All Status', 'Pending', 'Approved', 'Denied', 'Enrolled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setShowFilterDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Applicant</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Program</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Exam Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredApplicants.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{app.name}</div>
                  <div className="text-sm text-gray-500">{app.referenceNumber}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{app.program}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getExamStatusColor(app.examStatus)}`}>
                    {app.examStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => setSelectedApplicant(app)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View
                  </button>
                  {app.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateApplicantStatus(app.id, 'approved')}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateApplicantStatus(app.id, 'denied')}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Deny
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderExamManagement = () => {
    if (examView === 'schedule') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Schedule Exam Slot</h2>
            <button
              onClick={() => setExamView('interview')}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
            >
              Schedule Interview Slot →
            </button>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800">List of Applicants With Complete Requirements</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-600">30 Students Selected</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded p-4">
                {eligibleStudents.map((student, index) => (
                  <label key={index} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(index.toString())}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStudents([...selectedStudents, index.toString()]);
                        } else {
                          setSelectedStudents(selectedStudents.filter(id => id !== index.toString()));
                        }
                      }}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-gray-700">{student}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Date</label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                <input
                  type="text"
                  placeholder="Academic Bldg. IL505"
                  value={scheduleForm.venue}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, venue: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="text"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Students</label>
                <input
                  type="number"
                  value={scheduleForm.numberOfStudents}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, numberOfStudents: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setExamView('list')}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium"
              >
                Back
              </button>
              <button
                onClick={handleScheduleExam}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (examView === 'interview') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Schedule Interview Slot</h2>
            <button
              onClick={() => setExamView('list')}
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
            >
              <span>← Back to Exam Slot</span>
            </button>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800">List of Applicants Eligible for Interview</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-600">30 Students Selected</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded p-4">
                {eligibleStudents.map((student, index) => (
                  <label key={index} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(index.toString())}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStudents([...selectedStudents, index.toString()]);
                        } else {
                          setSelectedStudents(selectedStudents.filter(id => id !== index.toString()));
                        }
                      }}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-gray-700">{student}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interview Date</label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                <input
                  type="text"
                  placeholder="Academic Bldg. IL505"
                  value={scheduleForm.venue}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, venue: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="text"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Students</label>
                <input
                  type="number"
                  value={scheduleForm.numberOfStudents}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, numberOfStudents: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setExamView('list')}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium"
              >
                Back
              </button>
              <button
                onClick={handleScheduleExam}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Exam Management</h2>
          <button
            onClick={() => setExamView('schedule')}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
          >
            Schedule Exam Slot →
          </button>
        </div>

        <div className="space-y-4">
          {examSchedules.map((exam) => (
            <div key={exam.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{exam.program} Entrance Exam</h3>
                <span className="text-sm text-gray-500">{exam.date}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Time:</span> {exam.time}
                </div>
                <div>
                  <span className="font-medium">Venue:</span> {exam.venue}
                </div>
                <div>
                  <span className="font-medium">Applicants:</span> {exam.applicantCount}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Record Exam Results</h3>
          <div className="space-y-2">
            {applicants.filter(a => a.examStatus === 'scheduled').map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                <div>
                  <span className="font-medium text-gray-800">{app.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({app.referenceNumber})</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateExamResult(app.id, 'passed')}
                    className="px-4 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm font-medium"
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => updateExamResult(app.id, 'failed')}
                    className="px-4 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium"
                  >
                    Fail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/qcu-logo.png" alt="QCU Logo" className="h-16 w-16" />
              <div className="text-center">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'Quattrocento, serif', color: '#B28509' }}>
                  QUEZON CITY UNIVERSITY
                </h1>
                <p className="text-sm" style={{ fontFamily: 'Montserrat, sans-serif', color: '#666' }}>
                  SAN BARTOLOME | SAN FRANCISCO | BATASAN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-1">Admission Office Dashboard</h2>
          <p className="text-sm text-gray-600">Manage applications, exams, and enrollment processes.</p>
        </div>

        <div className="flex space-x-1 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('applicants')}
            className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm ${
              activeTab === 'applicants'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Applicants</span>
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm ${
              activeTab === 'exam'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>Exam & Interview</span>
          </button>
        </div>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'applicants' && renderApplicants()}
        {activeTab === 'exam' && renderExamManagement()}
      </div>

      {selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-blue-50 p-4 rounded">
                <p className="font-medium text-gray-800">{selectedApplicant.name}</p>
                <p className="text-sm text-gray-600">{selectedApplicant.dateOfBirth} • {selectedApplicant.gender}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-semibold text-blue-600 mb-2">Contact Information</h4>
                <p className="text-sm text-gray-700">{selectedApplicant.email}</p>
                <p className="text-sm text-gray-700">{selectedApplicant.phone}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-semibold text-blue-600 mb-2">Academic Information</h4>
                <p className="text-sm text-gray-700">Program: {selectedApplicant.program}</p>
                <p className="text-sm text-gray-700">Last School: {selectedApplicant.lastSchool}</p>
                <p className="text-sm text-gray-700">Year Graduate: {selectedApplicant.yearGraduated}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-semibold text-blue-600 mb-3">Documents Uploaded</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="bg-gray-200 rounded p-3 mb-1">
                      <FileText className="h-8 w-8 mx-auto text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600">BirthCertificate</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-200 rounded p-3 mb-1">
                      <FileText className="h-8 w-8 mx-auto text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600">Transcript</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-200 rounded p-3 mb-1">
                      <FileText className="h-8 w-8 mx-auto text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600">medicalCert</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-200 rounded p-3 mb-1">
                      <FileText className="h-8 w-8 mx-auto text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600">2x2Picture</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApplicant.status)}`}>
                  {selectedApplicant.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getExamStatusColor(selectedApplicant.examStatus)}`}>
                  exam: {selectedApplicant.examStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionDashboard;
