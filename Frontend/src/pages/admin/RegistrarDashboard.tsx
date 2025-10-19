import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, RefreshCw, FileText, TrendingUp, UserPlus, Edit2 } from 'lucide-react';

interface Activity {
  id: string;
  type: 'enrollment' | 'status_update';
  title: string;
  details: string;
  timestamp: string;
}

interface Student {
  id: string;
  studentId: string;
  name: string;
  program: string;
  section: string;
  enrollmentStatus: 'Enrolled' | 'Dropped' | 'On Leave' | 'For Compliance';
  yearLevel: string;
}

const RegistrarDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'student'>('overview');
  const [students, setStudents] = useState<Student[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editRemarks, setEditRemarks] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [yearLevelFilter, setYearLevelFilter] = useState('All');
  const [programFilter, setProgramFilter] = useState('All');

  useEffect(() => {
    const savedStudents = localStorage.getItem('registrar_students');
    const savedActivities = localStorage.getItem('registrar_activities');

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      const initialStudents: Student[] = [
        { id: '1', studentId: '25-1822', name: 'John Doe', program: 'BS in Computer Science', section: 'SBCS-1C', enrollmentStatus: 'Enrolled', yearLevel: 'All' },
        { id: '2', studentId: '25-1823', name: 'Jane Smith', program: 'BS in Engineering', section: 'SBIE-1B', enrollmentStatus: 'Enrolled', yearLevel: 'All' },
        { id: '3', studentId: '25-1824', name: 'Sarah Wilson', program: 'BS in Administration', section: 'SBBA-1M', enrollmentStatus: 'On Leave', yearLevel: 'All' },
        { id: '4', studentId: '25-1825', name: 'Jashmine Larosa', program: 'BS in Information Technology', section: 'SBIT-3G', enrollmentStatus: 'Enrolled', yearLevel: 'All' },
        { id: '5', studentId: '25-1826', name: 'Carlo Castillano', program: 'BS in Information Technology', section: 'SBIT-3G', enrollmentStatus: 'Dropped', yearLevel: 'All' },
        { id: '6', studentId: '25-1827', name: 'Jessner Montero', program: 'BS in Information Technology', section: 'SBIT-3G', enrollmentStatus: 'For Compliance', yearLevel: 'All' },
        { id: '7', studentId: '25-1828', name: 'Shane Villar', program: 'BS in Information Technology', section: 'SBIT-3G', enrollmentStatus: 'Enrolled', yearLevel: 'All' },
        { id: '8', studentId: '25-1829', name: 'Fatima Briones', program: 'BS in Information Technology', section: 'SBIT-3G', enrollmentStatus: 'Enrolled', yearLevel: 'All' },
        { id: '9', studentId: '25-1830', name: 'Jen Olivas', program: 'BS in Information Technology', section: 'SBIT-3G', enrollmentStatus: 'Enrolled', yearLevel: 'All' },
      ];
      setStudents(initialStudents);
      localStorage.setItem('registrar_students', JSON.stringify(initialStudents));
    }

    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
      const initialActivities: Activity[] = [
        {
          id: '1',
          type: 'enrollment',
          title: 'New Student Enrollment Completed',
          details: 'Carlo Castillano - BSIT Program',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          type: 'status_update',
          title: 'Academic Status Updated',
          details: 'Pedro Garcia - Changed to On Leave',
          timestamp: new Date().toISOString()
        },
        {
          id: '3',
          type: 'enrollment',
          title: 'New Student Enrollment Completed',
          details: 'George Santos - BSCS Program',
          timestamp: new Date().toISOString()
        }
      ];
      setActivities(initialActivities);
      localStorage.setItem('registrar_activities', JSON.stringify(initialActivities));
    }
  }, []);

  const totalStudents = students.length;
  const enrolledCount = students.filter(s => s.enrollmentStatus === 'Enrolled').length;
  const onLeaveCount = students.filter(s => s.enrollmentStatus === 'On Leave').length;
  const graduatedCount = 0;

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYearLevel = yearLevelFilter === 'All' || student.yearLevel === yearLevelFilter;
    const matchesProgram = programFilter === 'All' || student.program.includes(programFilter);

    return matchesSearch && matchesYearLevel && matchesProgram;
  });

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setEditStatus(student.enrollmentStatus);
    setEditRemarks('');
  };

  const handleSaveStatus = () => {
    if (selectedStudent) {
      const updatedStudents = students.map(s =>
        s.id === selectedStudent.id
          ? { ...s, enrollmentStatus: editStatus as Student['enrollmentStatus'] }
          : s
      );
      setStudents(updatedStudents);
      localStorage.setItem('registrar_students', JSON.stringify(updatedStudents));

      const newActivity: Activity = {
        id: Date.now().toString(),
        type: 'status_update',
        title: 'Academic Status Updated',
        details: `${selectedStudent.name} - Changed to ${editStatus}`,
        timestamp: new Date().toISOString()
      };
      const updatedActivities = [newActivity, ...activities];
      setActivities(updatedActivities);
      localStorage.setItem('registrar_activities', JSON.stringify(updatedActivities));

      setSelectedStudent(null);
      setEditMode(false);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
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

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700">Registrar Dashboard</h2>
          <p className="text-sm text-gray-600">Manage Student records, enrollment, and academic information</p>
        </div>

        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <Users className="h-4 w-4 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('student')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm ${
              activeTab === 'student'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <Users className="h-4 w-4 mr-2" />
            Student
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Students</p>
                    <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Currently Enrolled</p>
                    <p className="text-3xl font-bold text-green-600">{enrolledCount}</p>
                  </div>
                  <RefreshCw className="h-8 w-8 text-green-400" />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">On Leave</p>
                    <p className="text-3xl font-bold text-orange-600">{onLeaveCount}</p>
                  </div>
                  <FileText className="h-8 w-8 text-orange-400" />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Graduated</p>
                    <p className="text-3xl font-bold text-purple-600">{graduatedCount}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {activities.map(activity => (
                  <div
                    key={activity.id}
                    className={`flex items-start space-x-3 p-4 rounded-lg border-l-4 ${
                      activity.type === 'enrollment'
                        ? 'bg-green-50 border-green-500'
                        : 'bg-yellow-50 border-yellow-500'
                    }`}
                  >
                    {activity.type === 'enrollment' ? (
                      <UserPlus className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <FileText className="h-5 w-5 text-yellow-600 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'student' && !selectedStudent && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year Level</label>
                  <select
                    value={yearLevelFilter}
                    onChange={(e) => setYearLevelFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                  <select
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All</option>
                    <option>Computer Science</option>
                    <option>Information Technology</option>
                    <option>Engineering</option>
                    <option>Administration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Student ID or Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Section
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollment Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.program}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.section}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          student.enrollmentStatus === 'Enrolled' ? 'bg-green-100 text-green-800' :
                          student.enrollmentStatus === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                          student.enrollmentStatus === 'For Compliance' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.enrollmentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedStudent && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
              <Edit2 className="h-5 w-5 text-gray-700 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Update Enrollment Status</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name: {selectedStudent.name}</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID: {selectedStudent.studentId}</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section: {selectedStudent.section}</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Enrolled">Enrolled</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Dropped">Dropped</option>
                  <option value="For Compliance">For Compliance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                <textarea
                  value={editRemarks}
                  onChange={(e) => setEditRemarks(e.target.value)}
                  placeholder="Missing copy of Form 137"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Back to Student List
                </button>
                <button
                  onClick={handleSaveStatus}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrarDashboard;
