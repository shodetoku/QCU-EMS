import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, GraduationCap, FileText, Search, Filter, 
  Edit, Upload, Download, TrendingUp 
} from 'lucide-react';
import { mockStudentRecords, mockGrades } from '../../data/mockData';
import { StudentRecord, GradeRecord } from '../../data/mockData';

const RegistrarDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentRecord[]>(mockStudentRecords);
  const [grades, setGrades] = useState<GradeRecord[]>(mockGrades);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');

  useEffect(() => {
    const registrarUser = sessionStorage.getItem('registrarUser');
    if (!registrarUser) {
      navigate('/registrar-login');
    }
  }, [navigate]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${student.personalInfo.firstName} ${student.personalInfo.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = yearFilter === 'all' || student.year.toString() === yearFilter;
    const matchesProgram = programFilter === 'all' || student.program === programFilter;
    
    return matchesSearch && matchesYear && matchesProgram;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Enrolled': return 'bg-green-100 text-green-800';
      case 'Dropped': return 'bg-red-100 text-red-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      case 'Graduated': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAcademicStatusColor = (status: string) => {
    switch (status) {
      case 'Regular': return 'bg-green-100 text-green-800';
      case 'Irregular': return 'bg-yellow-100 text-yellow-800';
      case 'Probation': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateEnrollmentStatus = (studentId: string, status: StudentRecord['enrollmentStatus']) => {
    setStudents(prev => prev.map(student => 
      student.studentId === studentId ? { ...student, enrollmentStatus: status } : student
    ));
  };

  const updateAcademicStatus = (studentId: string, status: StudentRecord['academicStatus']) => {
    setStudents(prev => prev.map(student => 
      student.studentId === studentId ? { ...student, academicStatus: status } : student
    ));
  };

  const stats = {
    totalStudents: students.length,
    enrolled: students.filter(s => s.enrollmentStatus === 'Enrolled').length,
    onLeave: students.filter(s => s.enrollmentStatus === 'On Leave').length,
    graduated: students.filter(s => s.enrollmentStatus === 'Graduated').length
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalStudents}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Currently Enrolled</p>
              <p className="text-3xl font-bold text-green-600">{stats.enrolled}</p>
            </div>
            <GraduationCap className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">On Leave</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.onLeave}</p>
            </div>
            <FileText className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Graduated</p>
              <p className="text-3xl font-bold text-purple-600">{stats.graduated}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 border-l-4 border-blue-500 bg-blue-50">
            <Upload className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-800">Grades uploaded for BSCS 1st Year</p>
              <p className="text-sm text-gray-600">Programming Fundamentals - 35 students</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 border-l-4 border-green-500 bg-green-50">
            <Users className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-800">New student enrollment completed</p>
              <p className="text-sm text-gray-600">Juan Dela Cruz - BSCS Program</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 border-l-4 border-yellow-500 bg-yellow-50">
            <FileText className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-gray-800">Academic status updated</p>
              <p className="text-sm text-gray-600">Pedro Garcia - Changed to On Leave</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentsTab = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by student ID, name, or program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Years</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Programs</option>
              <option value="BSCS">BSCS</option>
              <option value="BSIT">BSIT</option>
              <option value="BSBA">BSBA</option>
              <option value="BSN">BSN</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year & Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Academic Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {student.personalInfo.firstName} {student.personalInfo.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{student.studentId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.year}{student.year === 1 ? 'st' : student.year === 2 ? 'nd' : student.year === 3 ? 'rd' : 'th'} Year - Section {student.section}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.enrollmentStatus)}`}>
                      {student.enrollmentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAcademicStatusColor(student.academicStatus)}`}>
                      {student.academicStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.gpa.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="text-green-600 hover:text-green-900"
                    >
                      View
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGradesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Grade Management</h3>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold inline-flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Grades
          </button>
        </div>
        
        {/* Grades Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Academic Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {grade.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {grade.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      grade.grade <= 1.75 ? 'bg-green-100 text-green-800' :
                      grade.grade <= 2.5 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {grade.grade.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {grade.semester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {grade.academicYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {grade.instructor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Registrar Dashboard</h1>
          <p className="text-gray-600">Manage student records, enrollment, and academic information</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Users },
              { id: 'students', name: 'Students', icon: GraduationCap },
              { id: 'grades', name: 'Grades', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-500 hover:text-gray-700'
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
          {activeTab === 'students' && renderStudentsTab()}
          {activeTab === 'grades' && renderGradesTab()}
        </div>

        {/* Student Detail Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Student Details</h3>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Personal Information</h4>
                  <p className="text-gray-600">
                    {selectedStudent.personalInfo.firstName} {selectedStudent.personalInfo.middleName} {selectedStudent.personalInfo.lastName}
                  </p>
                  <p className="text-sm text-gray-500">Student ID: {selectedStudent.studentId}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800">Academic Information</h4>
                  <p className="text-gray-600">Program: {selectedStudent.program}</p>
                  <p className="text-gray-600">Year: {selectedStudent.year} | Section: {selectedStudent.section}</p>
                  <p className="text-gray-600">GPA: {selectedStudent.gpa.toFixed(2)}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800">Status Management</h4>
                  <div className="flex space-x-2 mt-2">
                    <select
                      value={selectedStudent.enrollmentStatus}
                      onChange={(e) => updateEnrollmentStatus(selectedStudent.studentId, e.target.value as StudentRecord['enrollmentStatus'])}
                      className="px-3 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="Enrolled">Enrolled</option>
                      <option value="Dropped">Dropped</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Graduated">Graduated</option>
                    </select>
                    
                    <select
                      value={selectedStudent.academicStatus}
                      onChange={(e) => updateAcademicStatus(selectedStudent.studentId, e.target.value as StudentRecord['academicStatus'])}
                      className="px-3 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="Regular">Regular</option>
                      <option value="Irregular">Irregular</option>
                      <option value="Probation">Probation</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrarDashboard;