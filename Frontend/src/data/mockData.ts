// Mock data for the admissions system
import { Program, Applicant, ExamSchedule } from '../types';

// Additional interfaces for dashboard components
export interface COERequest {
  id: string;
  studentId: string;
  studentName: string;
  program: string;
  yearLevel: number;
  requestType: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  documents: string[];
  purpose: string;
  requestDate: string;
  preferredSchedule?: string;
  coeFile: string;
}

export interface EnhancedSectioningStudent {
  id: string;
  studentId: string;
  studentName: string;
  program: string;
  yearLevel: number;
  preferredSchedule: string;
  sectioningStatus: 'Queued' | 'Assigned';
  assignedSection?: string;
  fullSchedule?: Array<{
    subject: string;
    schedule: string;
    room: string;
    instructor: string;
    type: string;
  }>;
}

export interface Room {
  id: string;
  roomCode: string;
  building: string;
  floor: number;
  capacity: number;
  type: 'lecture' | 'laboratory' | 'seminar';
  roomType: 'IL' | 'IC' | 'IK'; // IL = Lecture, IC/IK = Lab
  isActive: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  startTime: string;
  endTime: string;
}

export interface RoomAssignment {
  id: string;
  roomId: string;
  sectionId: string;
  subject: string;
  subjectType: 'Lecture' | 'Lab';
  day: string;
  timeSlotId: string;
  instructor?: string;
  status: 'confirmed' | 'pending' | 'suggested';
  hoursPerWeek?: number;
}

export interface AutomationSummary {
  assignedSections: Array<{
    sectionId: string;
    sectionCode: string;
    assignments: RoomAssignment[];
  }>;
  incompleteSections: Array<{
    sectionId: string;
    sectionCode: string;
    missingSubjects: string[];
  }>;
  conflicts: Array<{
    type: 'room' | 'section';
    message: string;
  }>;
}

export interface SectionInfo {
  id: string;
  code: string;
  program: string;
  year: number;
  section: string;
  studentCount: number;
  preferredTimeBlock: 'Morning' | 'Afternoon' | 'Any';
  requiredSubjects: Array<{
    name: string;
    type: 'Lecture' | 'Lab';
    hoursPerWeek: number;
  }>;
}

export interface Section {
  id: string;
  program: string;
  year: number;
  section: string;
  capacity: number;
  enrolled: number;
  building: string;
  subjects: Array<{
    subject: string;
    schedule: string;
    room: string;
    instructor: string;
    type: string;
  }>;
}

export interface StudentRecord {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  program: string;
  yearLevel: number;
  status: 'enrolled' | 'graduated' | 'dropped';
  gpa: number;
  enrollmentDate: string;
}

export interface GradeRecord {
  id: string;
  studentId: string;
  courseCode: string;
  courseName: string;
  grade: string;
  units: number;
  semester: string;
  academicYear: string;
}

export interface AdminUser {
  id: string;
  accountId?: string;
  username: string;
  password: string;
  role: 'admission' | 'registrar' | 'department';
  department?: string;
}

// Mock Programs Data
export const mockPrograms: Program[] = [
  {
    id: 'bscs',
    name: 'Bachelor of Science in Computer Science (BSCS)',
    code: 'BSCS',
    department: 'College of Computer Studies',
    description: 'A comprehensive program covering software development, algorithms, and computer systems.',
    requirements: [
      'High school diploma or equivalent',
      'Mathematics proficiency',
      'English proficiency test',
      'Personal statement'
    ],
    duration: '4 years'
  },
  {
    id: 'bsit',
    name: 'Bachelor of Science in Information Technology (BSIT)',
    code: 'BSIT',
    department: 'College of Computer Studies',
    description: 'Focused on practical IT applications and system administration.',
    requirements: [
      'High school diploma or equivalent',
      'Basic mathematics competency',
      'English proficiency',
      'Interview'
    ],
    duration: '4 years'
  },
  {
    id: 'bsie',
    name: 'Bachelor of Science in Industrial Engineering (BSIE)',
    code: 'BSIE',
    department: 'College of Engineering',
    description: 'Industrial engineering program focusing on optimization and efficiency.',
    requirements: [
      'High school diploma with strong math and science background',
      'SAT/ACT scores',
      'Letters of recommendation',
      'Personal essay'
    ],
    duration: '4 years'
  },
  {
    id: 'bsa',
    name: 'Bachelor of Science in Accountancy (BSA)',
    code: 'BSA',
    department: 'College of Business Administration and Accountancy',
    description: 'Comprehensive accounting program preparing students for CPA licensure.',
    requirements: [
      'High school diploma',
      'Basic mathematics competency',
      'English proficiency',
      'Interview'
    ],
    duration: '4 years'
  },
  {
    id: 'beced',
    name: 'Bachelor of Early Childhood Education (BECED)',
    code: 'BECED',
    department: 'College of Education',
    description: 'Specialized program for early childhood education and development.',
    requirements: [
      'High school diploma',
      'Good moral character',
      'English proficiency',
      'Interview'
    ],
    duration: '4 years'
  }
];

// Mock Applicants Data (Extended)
export const mockApplicants: Applicant[] = [
  {
    id: 'app-001',
    referenceNumber: 'REF-2024-001',
    personalInfo: {
      firstName: 'John',
      middleName: 'Michael',
      lastName: 'Doe',
      dateOfBirth: '2000-05-15',
      gender: 'Male',
      civilStatus: 'Single',
      nationality: 'Filipino',
      religion: 'Catholic'
    },
    contactInfo: {
      email: 'john.doe@email.com',
      phone: '+1-555-0123',
      address: {
        street: '123 Main St',
        city: 'Quezon City',
        province: 'Metro Manila',
        zipCode: '1100'
      }
    },
    academicInfo: {
      program: 'Bachelor of Science in Computer Science',
      lastSchoolAttended: 'QCU High School',
      yearGraduated: '2018',
      gpa: 3.8
    },
    status: 'pending',
    examStatus: 'scheduled',
    submissionDate: '2024-01-15',
    studentId: undefined
  },
  {
    id: 'app-002',
    referenceNumber: 'REF-2024-002',
    personalInfo: {
      firstName: 'Jane',
      middleName: 'Rose',
      lastName: 'Smith',
      dateOfBirth: '2000-03-22',
      gender: 'Female',
      civilStatus: 'Single',
      nationality: 'Filipino',
      religion: 'Protestant'
    },
    contactInfo: {
      email: 'jane.smith@email.com',
      phone: '+1-555-0124',
      address: {
        street: '456 Oak Ave',
        city: 'Quezon City',
        province: 'Metro Manila',
        zipCode: '1101'
      }
    },
    academicInfo: {
      program: 'Bachelor of Science in Engineering',
      lastSchoolAttended: 'Manila Science High School',
      yearGraduated: '2018',
      gpa: 3.9
    },
    status: 'approved',
    examStatus: 'passed',
    submissionDate: '2024-01-10',
    studentId: '24-0001'
  },
  {
    id: 'app-003',
    referenceNumber: 'REF-2024-003',
    personalInfo: {
      firstName: 'Mike',
      middleName: 'Anthony',
      lastName: 'Johnson',
      dateOfBirth: '2000-07-10',
      gender: 'Male',
      civilStatus: 'Single',
      nationality: 'Filipino',
      religion: 'Catholic'
    },
    contactInfo: {
      email: 'mike.johnson@email.com',
      phone: '+1-555-0125',
      address: {
        street: '789 Pine St',
        city: 'Quezon City',
        province: 'Metro Manila',
        zipCode: '1102'
      }
    },
    academicInfo: {
      program: 'Bachelor of Science in Business Administration',
      lastSchoolAttended: 'Business High School',
      yearGraduated: '2018',
      gpa: 3.5
    },
    status: 'pending',
    examStatus: 'pending',
    submissionDate: '2024-01-20',
    studentId: undefined
  }
];

// Extended mock applicants for dashboard
export const extendedMockApplicants: Applicant[] = [
  ...mockApplicants,
  {
    id: 'app-004',
    referenceNumber: 'REF-2024-004',
    personalInfo: {
      firstName: 'Sarah',
      middleName: 'Grace',
      lastName: 'Wilson',
      dateOfBirth: '2000-09-18',
      gender: 'Female',
      civilStatus: 'Single',
      nationality: 'Filipino',
      religion: 'Catholic'
    },
    contactInfo: {
      email: 'sarah.wilson@email.com',
      phone: '+1-555-0126',
      address: {
        street: '321 Elm St',
        city: 'Quezon City',
        province: 'Metro Manila',
        zipCode: '1103'
      }
    },
    academicInfo: {
      program: 'Bachelor of Science in Computer Science',
      lastSchoolAttended: 'Tech High School',
      yearGraduated: '2018',
      gpa: 3.7
    },
    status: 'enrolled',
    examStatus: 'passed',
    submissionDate: '2024-01-08',
    studentId: '24-0002'
  },
  {
    id: 'app-005',
    referenceNumber: 'REF-2024-005',
    personalInfo: {
      firstName: 'David',
      middleName: 'Lee',
      lastName: 'Brown',
      dateOfBirth: '2000-11-25',
      gender: 'Male',
      civilStatus: 'Single',
      nationality: 'Filipino',
      religion: 'Protestant'
    },
    contactInfo: {
      email: 'david.brown@email.com',
      phone: '+1-555-0127',
      address: {
        street: '654 Maple Ave',
        city: 'Quezon City',
        province: 'Metro Manila',
        zipCode: '1104'
      }
    },
    academicInfo: {
      program: 'Bachelor of Science in Engineering',
      lastSchoolAttended: 'Engineering Prep School',
      yearGraduated: '2018',
      gpa: 3.6
    },
    status: 'denied',
    examStatus: 'failed',
    submissionDate: '2024-01-25',
    studentId: undefined
  }
];

// Mock Exam Schedules
export const mockExamSchedules: ExamSchedule[] = [
  {
    id: 'exam-001',
    program: 'Bachelor of Science in Computer Science',
    date: '2024-03-15',
    time: '09:00 AM',
    venue: 'Computer Lab A',
    capacity: 50,
    registered: 35
  },
  {
    id: 'exam-002',
    program: 'Bachelor of Science in Engineering',
    date: '2024-03-18',
    time: '10:00 AM',
    venue: 'Engineering Hall',
    capacity: 60,
    registered: 45
  },
  {
    id: 'exam-003',
    program: 'Bachelor of Science in Business Administration',
    date: '2024-03-20',
    time: '02:00 PM',
    venue: 'Business Center',
    capacity: 80,
    registered: 62
  }
];

// Mock Admin Users
export const mockAdminUsers: AdminUser[] = [
  {
    id: 'admin-001',
    accountId: 'ADM-0001',
    username: 'admin',
    password: 'admin123',
    role: 'admission'
  },
  {
    id: 'admin-002',
    accountId: 'ADM-0002',
    username: 'admission',
    password: 'pass123',
    role: 'admission'
  },
  {
    id: 'admin-003',
    accountId: 'REG-0001',
    username: 'registrar',
    password: 'reg123',
    role: 'registrar'
  },
  {
    id: 'admin-004',
    accountId: 'REG-0002',
    username: 'assistant',
    password: 'assist123',
    role: 'registrar'
  },
  {
    id: 'admin-005',
    accountId: 'CCS-0001',
    username: 'dept',
    password: 'dept123',
    role: 'department',
    department: 'Computer Science'
  },
  {
    id: 'admin-006',
    accountId: 'COE-0001',
    username: 'faculty',
    password: 'fac123',
    role: 'department',
    department: 'Engineering'
  }
];

// Organized admin users for easier access
export const adminUsers = {
  admission: mockAdminUsers.filter(user => user.role === 'admission'),
  registrar: mockAdminUsers.filter(user => user.role === 'registrar'),
  department: mockAdminUsers.filter(user => user.role === 'department')
};

// Mock COE Requests
export const mockCOERequests: COERequest[] = [
  {
    id: 'coe-001',
    studentId: '24-0001',
    studentName: 'Jane Smith',
    program: 'Bachelor of Science in Engineering',
    yearLevel: 1,
    requestType: 'Certificate of Enrollment',
    status: 'pending',
    submissionDate: '2024-02-01',
    documents: ['student_id', 'enrollment_form'],
    purpose: 'Scholarship Application',
    requestDate: '2024-02-01',
    preferredSchedule: 'Morning',
    coeFile: 'coe_jane_smith.pdf'
  },
  {
    id: 'coe-002',
    studentId: '24-0002',
    studentName: 'Sarah Wilson',
    program: 'Bachelor of Science in Computer Science',
    yearLevel: 1,
    requestType: 'Certificate of Enrollment',
    status: 'approved',
    submissionDate: '2024-01-28',
    documents: ['student_id', 'enrollment_form', 'payment_receipt'],
    purpose: 'Job Application',
    requestDate: '2024-01-28',
    preferredSchedule: 'Afternoon',
    coeFile: 'coe_sarah_wilson.pdf'
  }
];

// Mock Enhanced Sectioning Students
export const mockEnhancedSectioningStudents: EnhancedSectioningStudent[] = [
  {
    id: 'student-001',
    studentId: '24-0001',
    studentName: 'Jane Smith',
    program: 'Bachelor of Science in Engineering',
    yearLevel: 1,
    preferredSchedule: 'Morning',
    sectioningStatus: 'Assigned',
    assignedSection: 'ENG-1A',
    fullSchedule: [
      {
        subject: 'Engineering Mathematics 1',
        schedule: 'MWF 8:00-9:00 AM',
        room: 'ENG-101',
        instructor: 'Dr. Johnson',
        type: 'Lecture'
      }
    ]
  },
  {
    id: 'student-002',
    studentId: '24-0002',
    studentName: 'Sarah Wilson',
    program: 'Bachelor of Science in Computer Science',
    yearLevel: 1,
    preferredSchedule: 'Afternoon',
    sectioningStatus: 'Queued'
  }
];

// Mock Rooms
export const mockRooms: Room[] = [
  {
    id: 'room-001',
    roomCode: 'IL-101',
    building: 'IT Building',
    floor: 1,
    capacity: 40,
    type: 'lecture',
    roomType: 'IL',
    isActive: true
  },
  {
    id: 'room-002',
    roomCode: 'IC-201',
    building: 'IT Building',
    floor: 2,
    capacity: 30,
    type: 'laboratory',
    roomType: 'IC',
    isActive: true
  },
  {
    id: 'room-003',
    roomCode: 'IK-202',
    building: 'IT Building',
    floor: 2,
    capacity: 25,
    type: 'laboratory',
    roomType: 'IK',
    isActive: true
  },
  {
    id: 'room-004',
    roomCode: 'IL-102',
    building: 'IT Building',
    floor: 1,
    capacity: 35,
    type: 'lecture',
    roomType: 'IL',
    isActive: true
  },
  {
    id: 'room-005',
    roomCode: 'IL-201',
    building: 'IT Building',
    floor: 2,
    capacity: 45,
    type: 'lecture',
    roomType: 'IL',
    isActive: true
  },
  {
    id: 'room-006',
    roomCode: 'IC-301',
    building: 'IT Building',
    floor: 3,
    capacity: 28,
    type: 'laboratory',
    roomType: 'IC',
    isActive: true
  }
];

// Time Slots (7 AM - 9 PM)
export const mockTimeSlots: TimeSlot[] = [
  { id: 'slot-1', time: '7:00-8:00 AM', startTime: '07:00', endTime: '08:00' },
  { id: 'slot-2', time: '8:00-9:00 AM', startTime: '08:00', endTime: '09:00' },
  { id: 'slot-3', time: '9:00-10:00 AM', startTime: '09:00', endTime: '10:00' },
  { id: 'slot-4', time: '10:00-11:00 AM', startTime: '10:00', endTime: '11:00' },
  { id: 'slot-5', time: '11:00-12:00 PM', startTime: '11:00', endTime: '12:00' },
  { id: 'slot-6', time: '12:00-1:00 PM', startTime: '12:00', endTime: '13:00' },
  { id: 'slot-7', time: '1:00-2:00 PM', startTime: '13:00', endTime: '14:00' },
  { id: 'slot-8', time: '2:00-3:00 PM', startTime: '14:00', endTime: '15:00' },
  { id: 'slot-9', time: '3:00-4:00 PM', startTime: '15:00', endTime: '16:00' },
  { id: 'slot-10', time: '4:00-5:00 PM', startTime: '16:00', endTime: '17:00' },
  { id: 'slot-11', time: '5:00-6:00 PM', startTime: '17:00', endTime: '18:00' },
  { id: 'slot-12', time: '6:00-7:00 PM', startTime: '18:00', endTime: '19:00' },
  { id: 'slot-13', time: '7:00-8:00 PM', startTime: '19:00', endTime: '20:00' },
  { id: 'slot-14', time: '8:00-9:00 PM', startTime: '20:00', endTime: '21:00' }
];

// Section Information
export const mockSectionInfo: SectionInfo[] = [
  {
    id: 'sec-001',
    code: 'BSCS-1A',
    program: 'Bachelor of Science in Computer Science',
    year: 1,
    section: 'A',
    studentCount: 35,
    preferredTimeBlock: 'Morning',
    requiredSubjects: [
      { name: 'Programming Fundamentals', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'Programming Fundamentals Lab', type: 'Lab', hoursPerWeek: 3 },
      { name: 'Mathematics', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'English', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'Physical Education', type: 'Lecture', hoursPerWeek: 2 }
    ]
  },
  {
    id: 'sec-002',
    code: 'BSCS-1B',
    program: 'Bachelor of Science in Computer Science',
    year: 1,
    section: 'B',
    studentCount: 32,
    preferredTimeBlock: 'Afternoon',
    requiredSubjects: [
      { name: 'Programming Fundamentals', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'Programming Fundamentals Lab', type: 'Lab', hoursPerWeek: 3 },
      { name: 'Mathematics', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'English', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'Physical Education', type: 'Lecture', hoursPerWeek: 2 }
    ]
  },
  {
    id: 'sec-003',
    code: 'BSCS-2A',
    program: 'Bachelor of Science in Computer Science',
    year: 2,
    section: 'A',
    studentCount: 28,
    preferredTimeBlock: 'Morning',
    requiredSubjects: [
      { name: 'Data Structures', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'Data Structures Lab', type: 'Lab', hoursPerWeek: 3 },
      { name: 'Database Systems', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'Database Lab', type: 'Lab', hoursPerWeek: 3 },
      { name: 'Web Development', type: 'Lecture', hoursPerWeek: 3 }
    ]
  },
  {
    id: 'sec-004',
    code: 'BSIT-1A',
    program: 'Bachelor of Science in Information Technology',
    year: 1,
    section: 'A',
    studentCount: 30,
    preferredTimeBlock: 'Any',
    requiredSubjects: [
      { name: 'Introduction to IT', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'Computer Fundamentals Lab', type: 'Lab', hoursPerWeek: 3 },
      { name: 'Mathematics', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'English', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'Ethics', type: 'Lecture', hoursPerWeek: 2 }
    ]
  },
  {
    id: 'sec-005',
    code: 'BSIT-2A',
    program: 'Bachelor of Science in Information Technology',
    year: 2,
    section: 'A',
    studentCount: 28,
    preferredTimeBlock: 'Afternoon',
    requiredSubjects: [
      { name: 'System Analysis', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'Network Fundamentals', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'Network Lab', type: 'Lab', hoursPerWeek: 3 },
      { name: 'Web Programming', type: 'Lecture', hoursPerWeek: 3 },
      { name: 'Web Programming Lab', type: 'Lab', hoursPerWeek: 3 }
    ]
  }
];

// Room Assignments
export const mockRoomAssignments: RoomAssignment[] = [
  {
    id: 'assign-001',
    roomId: 'room-001',
    sectionId: 'sec-001',
    subject: 'Programming Fundamentals',
    subjectType: 'Lecture',
    day: 'Monday',
    timeSlotId: 'slot-2',
    instructor: 'Prof. Smith',
    status: 'confirmed'
  },
  {
    id: 'assign-002',
    roomId: 'room-002',
    sectionId: 'sec-001',
    subject: 'Programming Fundamentals Lab',
    subjectType: 'Lab',
    day: 'Tuesday',
    timeSlotId: 'slot-3',
    instructor: 'Prof. Smith',
    status: 'confirmed'
  },
  {
    id: 'assign-003',
    roomId: 'room-001',
    sectionId: 'sec-002',
    subject: 'Mathematics',
    subjectType: 'Lecture',
    day: 'Monday',
    timeSlotId: 'slot-4',
    instructor: 'Prof. Johnson',
    status: 'confirmed'
  },
  {
    id: 'assign-004',
    roomId: 'room-003',
    sectionId: 'sec-004',
    subject: 'Introduction to IT',
    subjectType: 'Lecture',
    day: 'Wednesday',
    timeSlotId: 'slot-2',
    instructor: 'Prof. Garcia',
    status: 'confirmed'
  }
];

// Mock Sections
export const mockSections: Section[] = [
  {
    id: 'section-001',
    program: 'Bachelor of Science in Computer Science',
    year: 1,
    section: 'A',
    capacity: 40,
    enrolled: 35,
    building: 'IT Building',
    subjects: [
      {
        subject: 'Introduction to Programming',
        schedule: 'MWF 2:00-3:00 PM',
        room: 'CS-101',
        instructor: 'Prof. Davis',
        type: 'Lecture'
      }
    ]
  },
  {
    id: 'section-002',
    program: 'Bachelor of Science in Engineering',
    year: 1,
    section: 'A',
    capacity: 35,
    enrolled: 30,
    building: 'Main Building',
    subjects: [
      {
        subject: 'Engineering Mathematics 1',
        schedule: 'MWF 8:00-9:00 AM',
        room: 'ENG-101',
        instructor: 'Dr. Johnson',
        type: 'Lecture'
      }
    ]
  }
];

// Mock Student Records
export const mockStudentRecords: StudentRecord[] = [
  {
    id: 'record-001',
    studentId: '24-0001',
    firstName: 'Jane',
    lastName: 'Smith',
    program: 'Bachelor of Science in Engineering',
    yearLevel: 1,
    status: 'enrolled',
    gpa: 3.9,
    enrollmentDate: '2024-01-15'
  },
  {
    id: 'record-002',
    studentId: '24-0002',
    firstName: 'Sarah',
    lastName: 'Wilson',
    program: 'Bachelor of Science in Computer Science',
    yearLevel: 1,
    status: 'enrolled',
    gpa: 3.7,
    enrollmentDate: '2024-01-15'
  }
];

// Mock Grades
export const mockGrades: GradeRecord[] = [
  {
    id: 'grade-001',
    studentId: '24-0001',
    courseCode: 'ENG101',
    courseName: 'Engineering Mathematics 1',
    grade: 'A',
    units: 3,
    semester: '1st Semester',
    academicYear: '2024-2025'
  },
  {
    id: 'grade-002',
    studentId: '24-0002',
    courseCode: 'CS101',
    courseName: 'Introduction to Programming',
    grade: 'A-',
    units: 3,
    semester: '1st Semester',
    academicYear: '2024-2025'
  }
];

// Helper functions
export const getApplicantsByProgram = (programId: string): Applicant[] => {
  return mockApplicants.filter(applicant => applicant.academicInfo.program === programId);
};

export const getApplicantsByStatus = (status: Applicant['status']): Applicant[] => {
  return mockApplicants.filter(applicant => applicant.status === status);
};

export const getProgramById = (programId: string): Program | undefined => {
  return mockPrograms.find(program => program.id === programId);
};

export const getAdminByCredentials = (username: string, password: string): AdminUser | undefined => {
  return mockAdminUsers.find(admin => admin.username === username && admin.password === password);
};

export const generateReferenceNumber = (): string => {
  const prefix = 'REF';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

export const generateStudentId = (): string => {
  const currentYear = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${currentYear}-${random}`;
};