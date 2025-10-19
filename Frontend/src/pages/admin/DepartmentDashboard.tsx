import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, FileText, Calendar, Clock, CheckCircle, XCircle, AlertTriangle,
  Search, Filter, Eye, Download, Upload, Edit, Save, RotateCcw,
  Building, MapPin, BarChart3, Settings, Grid3X3, Plus
} from 'lucide-react';
import { 
  mockCOERequests, mockEnhancedSectioningStudents, mockRooms, 
  mockTimeSlots, mockSectionInfo, mockRoomAssignments 
} from '../../data/mockData';
import { 
  COERequest, EnhancedSectioningStudent, Room, TimeSlot, 
  SectionInfo, RoomAssignment, AutomationSummary
} from '../../data/mockData';

interface RoomScheduleCell {
  roomId: string;
  timeSlotId: string;
  day: string;
  status: 'vacant' | 'occupied' | 'suggested';
  assignment?: RoomAssignment;
}

interface NewAssignment {
  sectionId: string;
  subject: string;
  subjectType: 'Lecture' | 'Lab';
  day: string;
  timeSlotId: string;
  roomId?: string;
  instructor?: string;
}

interface SectionScheduleStatus {
  sectionId: string;
  sectionCode: string;
  totalRequiredHours: number;
  assignedHours: number;
  isComplete: boolean;
  missingSubjects: string[];
  assignments: RoomAssignment[];
}

const DepartmentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('dept_activeTab') || 'overview';
  });
  const [coeRequests, setCoeRequests] = useState<COERequest[]>(() => {
    const saved = localStorage.getItem('dept_coeRequests');
    return saved ? JSON.parse(saved) : mockCOERequests;
  });
  const [sectioningStudents, setSectioningStudents] = useState<EnhancedSectioningStudent[]>(() => {
    const saved = localStorage.getItem('dept_sectioningStudents');
    return saved ? JSON.parse(saved) : mockEnhancedSectioningStudents;
  });
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('dept_rooms');
    return saved ? JSON.parse(saved) : mockRooms;
  });
  const [timeSlots] = useState<TimeSlot[]>(mockTimeSlots);
  const [sectionInfo] = useState<SectionInfo[]>(mockSectionInfo);
  const [roomAssignments, setRoomAssignments] = useState<RoomAssignment[]>(() => {
    const saved = localStorage.getItem('dept_roomAssignments');
    return saved ? JSON.parse(saved) : mockRoomAssignments;
  });
  const [selectedCOE, setSelectedCOE] = useState<COERequest | null>(null);
  const [selectedSection, setSelectedSection] = useState<SectionInfo | null>(null);
  const [newAssignment, setNewAssignment] = useState<NewAssignment | null>(null);
  const [scheduleView, setScheduleView] = useState<'week' | 'room'>('week');
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [roomSchedule, setRoomSchedule] = useState<RoomScheduleCell[]>([]);
  const [automationSummary, setAutomationSummary] = useState<AutomationSummary | null>(null);
  const [showAutomationModal, setShowAutomationModal] = useState(false);
  const [automationSettings, setAutomationSettings] = useState({
    timeBlock: 'Any' as 'Morning' | 'Afternoon' | 'Any',
    respectPreferences: true
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const morningSlots = timeSlots.filter(slot => parseInt(slot.startTime.split(':')[0]) < 13);
  const afternoonSlots = timeSlots.filter(slot => parseInt(slot.startTime.split(':')[0]) >= 14);

  useEffect(() => {
    const loggedInUserStr = localStorage.getItem('loggedInUser');
    if (!loggedInUserStr) {
      navigate('/login');
      return;
    }

    const loggedInUser = JSON.parse(loggedInUserStr);
    if (loggedInUser.role !== 'department') {
      navigate('/login');
      return;
    }
    generateRoomSchedule();
  }, [navigate, roomAssignments]);

  useEffect(() => {
    localStorage.setItem('dept_activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('dept_coeRequests', JSON.stringify(coeRequests));
  }, [coeRequests]);

  useEffect(() => {
    localStorage.setItem('dept_sectioningStudents', JSON.stringify(sectioningStudents));
  }, [sectioningStudents]);

  useEffect(() => {
    localStorage.setItem('dept_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('dept_roomAssignments', JSON.stringify(roomAssignments));
  }, [roomAssignments]);

  useEffect(() => {
    localStorage.setItem('dept_activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('dept_coeRequests', JSON.stringify(coeRequests));
  }, [coeRequests]);

  useEffect(() => {
    localStorage.setItem('dept_sectioningStudents', JSON.stringify(sectioningStudents));
  }, [sectioningStudents]);

  useEffect(() => {
    localStorage.setItem('dept_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('dept_roomAssignments', JSON.stringify(roomAssignments));
  }, [roomAssignments]);

  const generateRoomSchedule = () => {
    const schedule: RoomScheduleCell[] = [];
    
    rooms.forEach(room => {
      days.forEach(day => {
        timeSlots.forEach(timeSlot => {
          const assignment = roomAssignments.find(
            a => a.roomId === room.id && a.day === day && a.timeSlotId === timeSlot.id
          );
          
          schedule.push({
            roomId: room.id,
            timeSlotId: timeSlot.id,
            day,
            status: assignment ? 'occupied' : 'vacant',
            assignment
          });
        });
      });
    });
    
    setRoomSchedule(schedule);
  };

  const getSectionScheduleStatus = (): SectionScheduleStatus[] => {
    return sectionInfo.map(section => {
      const assignments = roomAssignments.filter(a => a.sectionId === section.id);
      const totalRequiredHours = section.requiredSubjects.reduce((sum, subject) => sum + subject.hoursPerWeek, 0);
      const assignedHours = assignments.reduce((sum, assignment) => sum + (assignment.hoursPerWeek || 3), 0);
      
      const assignedSubjects = assignments.map(a => a.subject);
      const missingSubjects = section.requiredSubjects
        .filter(subject => !assignedSubjects.includes(subject.name))
        .map(subject => subject.name);
      
      return {
        sectionId: section.id,
        sectionCode: section.code,
        totalRequiredHours,
        assignedHours,
        isComplete: missingSubjects.length === 0,
        missingSubjects,
        assignments
      };
    });
  };

  const checkSectionConflict = (sectionId: string, day: string, timeSlotId: string): boolean => {
    return roomAssignments.some(assignment => 
      assignment.sectionId === sectionId && 
      assignment.day === day && 
      assignment.timeSlotId === timeSlotId
    );
  };

  const checkRoomConflict = (roomId: string, day: string, timeSlotId: string): boolean => {
    return roomAssignments.some(assignment => 
      assignment.roomId === roomId && 
      assignment.day === day && 
      assignment.timeSlotId === timeSlotId
    );
  };

  const getAvailableSections = (day: string, timeSlotId: string): SectionInfo[] => {
    return sectionInfo.filter(section => 
      !checkSectionConflict(section.id, day, timeSlotId)
    );
  };

  const getAvailableRooms = (day: string, timeSlotId: string, subjectType: 'Lecture' | 'Lab'): Room[] => {
    const requiredType = subjectType === 'Lecture' ? 'lecture' : 'laboratory';
    return rooms.filter(room => {
      if (room.type !== requiredType) return false;
      return !checkRoomConflict(room.id, day, timeSlotId);
    });
  };

  const autoScheduleSections = () => {
    const sectionStatuses = getSectionScheduleStatus();
    const incompleteSections = sectionStatuses.filter(status => !status.isComplete);
    const newAssignments: RoomAssignment[] = [];
    const conflicts: AutomationSummary['conflicts'] = [];
    const assignedSections: AutomationSummary['assignedSections'] = [];
    const stillIncomplete: AutomationSummary['incompleteSections'] = [];

    incompleteSections.forEach(sectionStatus => {
      const section = sectionInfo.find(s => s.id === sectionStatus.sectionId);
      if (!section) return;

      const sectionAssignments: RoomAssignment[] = [];
      const timeBlockSlots = automationSettings.respectPreferences && section.preferredTimeBlock !== 'Any'
        ? section.preferredTimeBlock === 'Morning' ? morningSlots : afternoonSlots
        : automationSettings.timeBlock === 'Morning' ? morningSlots 
        : automationSettings.timeBlock === 'Afternoon' ? afternoonSlots 
        : timeSlots;

      sectionStatus.missingSubjects.forEach(subjectName => {
        const subjectInfo = section.requiredSubjects.find(s => s.name === subjectName);
        if (!subjectInfo) return;

        let assigned = false;
        
        // Try to find available slot
        for (const day of days) {
          if (assigned) break;
          
          for (const timeSlot of timeBlockSlots) {
            if (assigned) break;
            
            // Check if section is already scheduled at this time
            if (checkSectionConflict(section.id, day, timeSlot.id)) continue;
            
            // Find available room
            const availableRooms = getAvailableRooms(day, timeSlot.id, subjectInfo.type);
            const suitableRoom = availableRooms.find(room => room.capacity >= section.studentCount);
            
            if (suitableRoom) {
              const assignment: RoomAssignment = {
                id: `auto-${Date.now()}-${Math.random()}`,
                roomId: suitableRoom.id,
                sectionId: section.id,
                subject: subjectName,
                subjectType: subjectInfo.type,
                day,
                timeSlotId: timeSlot.id,
                hoursPerWeek: subjectInfo.hoursPerWeek,
                status: 'suggested'
              };
              
              newAssignments.push(assignment);
              sectionAssignments.push(assignment);
              assigned = true;
            }
          }
        }
        
        if (!assigned) {
          conflicts.push({
            type: 'section',
            message: `Could not schedule ${subjectName} for ${section.code} - no available slots`
          });
        }
      });

      if (sectionAssignments.length > 0) {
        assignedSections.push({
          sectionId: section.id,
          sectionCode: section.code,
          assignments: sectionAssignments
        });
      }

      // Check if still incomplete
      const remainingMissing = sectionStatus.missingSubjects.filter(subject => 
        !sectionAssignments.some(a => a.subject === subject)
      );
      
      if (remainingMissing.length > 0) {
        stillIncomplete.push({
          sectionId: section.id,
          sectionCode: section.code,
          missingSubjects: remainingMissing
        });
      }
    });

    setAutomationSummary({
      assignedSections,
      incompleteSections: stillIncomplete,
      conflicts
    });
    
    setShowAutomationModal(true);
  };

  const confirmAutomation = () => {
    if (!automationSummary) return;
    
    const newAssignments = automationSummary.assignedSections.flatMap(section => 
      section.assignments.map(assignment => ({
        ...assignment,
        status: 'confirmed' as const
      }))
    );
    
    setRoomAssignments(prev => [...prev, ...newAssignments]);
    setAutomationSummary(null);
    setShowAutomationModal(false);
  };

  const updateCOEStatus = (id: string, status: 'approved' | 'rejected') => {
    setCoeRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status } : req
    ));
  };

  const suggestRooms = (assignment: NewAssignment): Room[] => {
    const requiredType = assignment.subjectType === 'Lecture' ? 'lecture' : 'laboratory';
    const availableRooms = getAvailableRooms(assignment.day, assignment.timeSlotId, assignment.subjectType);
    
    return availableRooms.sort((a, b) => b.capacity - a.capacity);
  };

  const assignRoom = (assignment: NewAssignment) => {
    if (!assignment.roomId) return;
    
    // Check for conflicts
    if (checkRoomConflict(assignment.roomId, assignment.day, assignment.timeSlotId)) {
      alert('Room is already occupied at this time!');
      return;
    }
    
    if (checkSectionConflict(assignment.sectionId, assignment.day, assignment.timeSlotId)) {
      alert('Section is already scheduled at this time!');
      return;
    }
    
    const newRoomAssignment: RoomAssignment = {
      id: `assign-${Date.now()}`,
      roomId: assignment.roomId,
      sectionId: assignment.sectionId,
      subject: assignment.subject,
      subjectType: assignment.subjectType,
      day: assignment.day,
      timeSlotId: assignment.timeSlotId,
      instructor: assignment.instructor,
      hoursPerWeek: 3,
      status: 'confirmed'
    };
    
    setRoomAssignments(prev => [...prev, newRoomAssignment]);
    setNewAssignment(null);
  };

  const removeAssignment = (assignmentId: string) => {
    setRoomAssignments(prev => prev.filter(a => a.id !== assignmentId));
  };

  const getScheduleCell = (roomId: string, day: string, timeSlotId: string) => {
    return roomSchedule.find(cell => 
      cell.roomId === roomId && cell.day === day && cell.timeSlotId === timeSlotId
    );
  };

  const getCellColor = (status: string) => {
    switch (status) {
      case 'vacant': return 'bg-green-100 hover:bg-green-200';
      case 'occupied': return 'bg-red-100';
      case 'suggested': return 'bg-yellow-100';
      default: return 'bg-gray-100';
    }
  };

  const stats = {
    totalCOE: coeRequests.length,
    pendingCOE: coeRequests.filter(r => r.status === 'pending').length,
    approvedCOE: coeRequests.filter(r => r.status === 'approved').length,
    totalRooms: rooms.length,
    occupiedSlots: roomSchedule.filter(c => c.status === 'occupied').length,
    utilizationRate: Math.round((roomSchedule.filter(c => c.status === 'occupied').length / roomSchedule.length) * 100)
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">COE Requests</p>
              <p className="text-4xl font-bold text-gray-900">{stats.totalCOE}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Pending COE</p>
              <p className="text-4xl font-bold text-gray-900">{stats.pendingCOE}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Total Rooms</p>
              <p className="text-4xl font-bold text-gray-900">{stats.totalRooms}</p>
            </div>
            <div className="bg-teal-100 p-3 rounded-lg">
              <Building className="h-8 w-8 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Room Utilization</p>
              <p className="text-4xl font-bold text-gray-900">{stats.utilizationRate} %</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => setActiveTab('coe')}
            className="group bg-white p-6 rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors">
              <FileText className="h-8 w-8 text-blue-600 group-hover:text-white" />
            </div>
            <p className="font-bold text-gray-900 text-lg mb-2">Review COE</p>
            <p className="text-sm text-gray-600">{stats.pendingCOE} pending</p>
          </button>

          <button
            onClick={() => setActiveTab('scheduling')}
            className="group bg-white p-6 rounded-xl border-2 border-green-200 hover:border-green-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors">
              <Calendar className="h-8 w-8 text-green-600 group-hover:text-white" />
            </div>
            <p className="font-bold text-gray-900 text-lg mb-2">Room Scheduling</p>
            <p className="text-sm text-gray-600">Manage assignments</p>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className="group bg-white p-6 rounded-xl border-2 border-teal-200 hover:border-teal-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="bg-teal-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-500 transition-colors">
              <BarChart3 className="h-8 w-8 text-teal-600 group-hover:text-white" />
            </div>
            <p className="font-bold text-gray-900 text-lg mb-2">View Reports</p>
            <p className="text-sm text-gray-600">Analytics & Monitoring</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCOETab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">COE Verification</h3>
          <div className="flex items-center space-x-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preferred Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coeRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{request.studentName}</div>
                      <div className="text-sm text-gray-500">{request.studentId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.yearLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.preferredSchedule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      request.status === 'approved' ? 'bg-green-100 text-green-700' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedCOE(request)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateCOEStatus(request.id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => updateCOEStatus(request.id, 'rejected')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircle className="h-4 w-4" />
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
    </div>
  );

  const renderSectionListTab = () => {
    const sectionStatuses = getSectionScheduleStatus();

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Section Schedule Status</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
                {sectionStatuses.filter(s => s.isComplete).length} of {sectionStatuses.length} sections complete
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            {sectionStatuses.map((status) => {
              const section = sectionInfo.find(s => s.id === status.sectionId);
              if (!section) return null;
              
              return (
                <div
                  key={status.sectionId}
                  className={`border-2 rounded-xl p-5 cursor-pointer hover:shadow-lg transition-all duration-200 ${
                    status.isComplete ? 'border-green-300 bg-green-50 hover:bg-green-100' : 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100'
                  }`}
                  onClick={() => setSelectedSection(section)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-gray-800">{status.sectionCode}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        status.isComplete
                          ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {status.isComplete ? 'Complete' : 'Incomplete'}
                      </span>
                      <span className="text-sm text-gray-600">
                        {section.preferredTimeBlock} Block
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-800">
                        {status.assignedHours}/{status.totalRequiredHours} hours
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            status.isComplete ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.min((status.assignedHours / status.totalRequiredHours) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div className="mb-1">
                      <span className="font-medium">Program:</span> {section.program}
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">Students:</span> {section.studentCount}
                    </div>
                    {!status.isComplete && (
                      <div>
                        <span className="font-medium text-yellow-700">Missing:</span>{' '}
                        {status.missingSubjects.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderSchedulingTab = () => (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Room & Section Scheduling</h3>
            <p className="text-gray-600 text-sm">Manage room assignments and schedules</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAutomationModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Settings className="h-4 w-4" />
              Auto Schedule
            </button>

            <button
              onClick={() => setNewAssignment({
                sectionId: '',
                subject: '',
                subjectType: 'Lecture',
                day: 'Monday',
                timeSlotId: timeSlots[0]?.id || '',
                instructor: ''
              })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="h-4 w-4" />
              New Assignment
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setScheduleView('week')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  scheduleView === 'week' ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Week View
              </button>
              <button
                onClick={() => setScheduleView('room')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  scheduleView === 'room' ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Room View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Rooms</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>{room.roomCode}</option>
            ))}
          </select>
          
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Days</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 bg-gray-50 text-left">Time</th>
                {days.map(day => (
                  <th key={day} className="border border-gray-300 p-2 bg-gray-50 text-center min-w-32">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(timeSlot => (
                <tr key={timeSlot.id}>
                  <td className="border border-gray-300 p-2 bg-gray-50 font-medium text-sm">
                    {timeSlot.time}
                  </td>
                  {days.map(day => {
                    const filteredRooms = selectedRoom === 'all' ? rooms : rooms.filter(r => r.id === selectedRoom);
                    
                    return (
                      <td key={day} className="border border-gray-300 p-1">
                        <div className="space-y-1">
                          {filteredRooms.map(room => {
                            const cell = getScheduleCell(room.id, day, timeSlot.id);
                            if (!cell) return null;
                            
                            const availableSections = getAvailableSections(day, timeSlot.id);
                            const isClickable = cell.status === 'vacant' && availableSections.length > 0;
                            
                            return (
                              <div
                                key={room.id}
                                className={`p-2 rounded text-xs ${
                                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                                } ${getCellColor(cell.status)}`}
                                title={`${room.roomCode} - ${cell.status}`}
                                onClick={() => {
                                  if (isClickable) {
                                    setNewAssignment({
                                      sectionId: '',
                                      subject: '',
                                      subjectType: room.type === 'lecture' ? 'Lecture' : 'Lab',
                                      day,
                                      timeSlotId: timeSlot.id,
                                      roomId: room.id,
                                      instructor: ''
                                    });
                                  }
                                }}
                              >
                                <div className="font-medium">{room.roomCode}</div>
                                {cell.assignment && (
                                  <div className="text-xs">
                                    <div>{cell.assignment.subject}</div>
                                    <div className="text-gray-600">
                                      {sectionInfo.find(s => s.id === cell.assignment?.sectionId)?.code}
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeAssignment(cell.assignment!.id);
                                      }}
                                      className="text-red-600 hover:text-red-800 mt-1"
                                      title="Remove assignment"
                                    >
                                      ×
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Legend</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border rounded mr-2"></div>
            <span className="text-sm">Vacant</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 border rounded mr-2"></div>
            <span className="text-sm">Occupied</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-100 border rounded mr-2"></div>
            <span className="text-sm">Suggested</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 border rounded mr-2"></div>
            <span className="text-sm">No Available Sections</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      {/* Room Utilization Report */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Room Utilization Report</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map(room => {
            const occupiedSlots = roomSchedule.filter(c => c.roomId === room.id && c.status === 'occupied').length;
            const totalSlots = roomSchedule.filter(c => c.roomId === room.id).length;
            const utilization = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;
            
            return (
              <div key={room.id} className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-900 text-lg">{room.roomCode}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    utilization >= 80 ? 'bg-red-100 text-red-700' :
                    utilization >= 60 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {utilization}%
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1 mb-3">
                  <p><span className="font-medium">Type:</span> {room.type}</p>
                  <p><span className="font-medium">Capacity:</span> {room.capacity}</p>
                  <p><span className="font-medium">Building:</span> {room.building}</p>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        utilization >= 80 ? 'bg-red-500' :
                        utilization >= 60 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${utilization}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section Schedule Report */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Section Schedule Report</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subjects Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completion</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sectionInfo.map(section => {
                const assignments = roomAssignments.filter(a => a.sectionId === section.id);
                const completion = Math.round((assignments.length / 8) * 100); // Assuming 8 subjects per section
                
                return (
                  <tr key={section.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {section.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {section.program}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {section.studentCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {assignments.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(completion, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{Math.min(completion, 100)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* QCU Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard Title */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Department Dashboard</h2>
          <p className="text-blue-700">COE Verification, Room Scheduling & Reports Management</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md p-2">
            <nav className="flex space-x-2">
              {[
                { id: 'overview', name: 'Overview', icon: Users },
                { id: 'coe', name: 'COE Verification', icon: FileText },
                { id: 'sections', name: 'Section List', icon: Grid3X3 },
                { id: 'scheduling', name: 'Room Scheduling', icon: Calendar },
                { id: 'reports', name: 'Reports', icon: BarChart3 }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'coe' && renderCOETab()}
          {activeTab === 'sections' && renderSectionListTab()}
          {activeTab === 'scheduling' && renderSchedulingTab()}
          {activeTab === 'reports' && renderReportsTab()}
        </div>

        {/* COE Detail Modal */}
        {selectedCOE && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">COE Details</h3>
                <button
                  onClick={() => setSelectedCOE(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Student Information</h4>
                  <p className="text-gray-600">{selectedCOE.studentName}</p>
                  <p className="text-sm text-gray-500">ID: {selectedCOE.studentId}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800">Request Details</h4>
                  <p className="text-gray-600">Program: {selectedCOE.program}</p>
                  <p className="text-gray-600">Year Level: {selectedCOE.yearLevel}</p>
                  <p className="text-gray-600">Purpose: {selectedCOE.purpose}</p>
                  <p className="text-gray-600">Preferred Schedule: {selectedCOE.preferredSchedule}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      updateCOEStatus(selectedCOE.id, 'approved');
                      setSelectedCOE(null);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      updateCOEStatus(selectedCOE.id, 'rejected');
                      setSelectedCOE(null);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => window.open(`/coe/${selectedCOE.coeFile}`, '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download COE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Detail Modal */}
        {selectedSection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedSection.code} - Weekly Schedule
                </h3>
                <button
                  onClick={() => setSelectedSection(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Program:</span> {selectedSection.program}
                  </div>
                  <div>
                    <span className="font-medium">Students:</span> {selectedSection.studentCount}
                  </div>
                  <div>
                    <span className="font-medium">Preferred Block:</span> {selectedSection.preferredTimeBlock}
                  </div>
                </div>
              </div>

              {/* Section's Weekly Timetable */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2 bg-gray-50">Time</th>
                      {days.map(day => (
                        <th key={day} className="border border-gray-300 p-2 bg-gray-50">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map(timeSlot => (
                      <tr key={timeSlot.id}>
                        <td className="border border-gray-300 p-2 bg-gray-50 font-medium text-sm">
                          {timeSlot.time}
                        </td>
                        {days.map(day => {
                          const assignment = roomAssignments.find(a => 
                            a.sectionId === selectedSection.id && 
                            a.day === day && 
                            a.timeSlotId === timeSlot.id
                          );
                          
                          return (
                            <td key={day} className="border border-gray-300 p-2">
                              {assignment && (
                                <div className="bg-blue-100 p-2 rounded text-xs">
                                  <div className="font-medium">{assignment.subject}</div>
                                  <div className="text-gray-600">
                                    {rooms.find(r => r.id === assignment.roomId)?.roomCode}
                                  </div>
                                  <div className="text-gray-600">
                                    {assignment.instructor || 'TBA'}
                                  </div>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Automation Modal */}
        {showAutomationModal && !automationSummary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Auto Schedule Settings</h3>
                <button
                  onClick={() => setShowAutomationModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Block Preference
                  </label>
                  <select
                    value={automationSettings.timeBlock}
                    onChange={(e) => setAutomationSettings({
                      ...automationSettings, 
                      timeBlock: e.target.value as 'Morning' | 'Afternoon' | 'Any'
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Any">Any Time</option>
                    <option value="Morning">Morning Block (7:00 AM - 1:00 PM)</option>
                    <option value="Afternoon">Afternoon Block (2:30 PM - 9:00 PM)</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={automationSettings.respectPreferences}
                      onChange={(e) => setAutomationSettings({
                        ...automationSettings,
                        respectPreferences: e.target.checked
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      Respect individual section time preferences
                    </span>
                  </label>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    This will automatically schedule all incomplete sections into available rooms and time slots.
                  </p>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={autoScheduleSections}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    Generate Schedule
                  </button>
                  <button
                    onClick={() => setShowAutomationModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Automation Summary Modal */}
        {showAutomationModal && automationSummary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Auto Schedule Results</h3>
                <button
                  onClick={() => setShowAutomationModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Assigned Sections */}
                {automationSummary.assignedSections.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">
                      Successfully Assigned ({automationSummary.assignedSections.length} sections)
                    </h4>
                    <div className="space-y-2">
                      {automationSummary.assignedSections.map((section) => (
                        <div key={section.sectionId} className="bg-green-50 p-3 rounded-lg">
                          <div className="font-medium text-green-800">{section.sectionCode}</div>
                          <div className="text-sm text-green-700">
                            {section.assignments.map((assignment, index) => (
                              <div key={index}>
                                {assignment.subject} - {assignment.day} {timeSlots.find(t => t.id === assignment.timeSlotId)?.time} 
                                ({rooms.find(r => r.id === assignment.roomId)?.roomCode})
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Conflicts */}
                {automationSummary.conflicts.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">
                      Conflicts ({automationSummary.conflicts.length})
                    </h4>
                    <div className="space-y-2">
                      {automationSummary.conflicts.map((conflict, index) => (
                        <div key={index} className="bg-red-50 p-3 rounded-lg">
                          <div className="text-red-800">{conflict.message}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Still Incomplete */}
                {automationSummary.incompleteSections.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Still Incomplete ({automationSummary.incompleteSections.length} sections)
                    </h4>
                    <div className="space-y-2">
                      {automationSummary.incompleteSections.map((section) => (
                        <div key={section.sectionId} className="bg-yellow-50 p-3 rounded-lg">
                          <div className="font-medium text-yellow-800">{section.sectionCode}</div>
                          <div className="text-sm text-yellow-700">
                            Missing: {section.missingSubjects.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2 pt-6">
                <button
                  onClick={confirmAutomation}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Confirm Assignments
                </button>
                <button
                  onClick={() => setShowAutomationModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Assignment Modal */}
        {newAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">New Room Assignment</h3>
                <button
                  onClick={() => setNewAssignment(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                  <select
                    value={newAssignment.sectionId}
                    onChange={(e) => setNewAssignment({...newAssignment, sectionId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Section</option>
                    {getAvailableSections(newAssignment.day, newAssignment.timeSlotId).map(section => (
                      <option key={section.id} value={section.id}>{section.code}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={newAssignment.subject}
                    onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter subject name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Type</label>
                  <select
                    value={newAssignment.subjectType}
                    onChange={(e) => setNewAssignment({...newAssignment, subjectType: e.target.value as 'Lecture' | 'Lab'})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Lecture">Lecture</option>
                    <option value="Lab">Lab</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                  <select
                    value={newAssignment.day}
                    onChange={(e) => setNewAssignment({...newAssignment, day: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                  <select
                    value={newAssignment.timeSlotId}
                    onChange={(e) => setNewAssignment({...newAssignment, timeSlotId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot.id} value={slot.id}>{slot.time}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                  <select
                    value={newAssignment.roomId || ''}
                    onChange={(e) => setNewAssignment({...newAssignment, roomId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Room</option>
                    {suggestRooms(newAssignment).map(room => (
                      <option key={room.id} value={room.id}>
                        {room.roomCode} (Cap: {room.capacity})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructor (Optional)</label>
                  <input
                    type="text"
                    value={newAssignment.instructor || ''}
                    onChange={(e) => setNewAssignment({...newAssignment, instructor: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter instructor name"
                  />
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={() => assignRoom(newAssignment)}
                    disabled={!newAssignment.sectionId || !newAssignment.subject || !newAssignment.roomId}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    Assign Room
                  </button>
                  <button
                    onClick={() => setNewAssignment(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentDashboard;