export interface Applicant {
  id: string;
  referenceNumber: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    gender: string;
    civilStatus: string;
    nationality: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    zipCode: string;
  };
  academicInfo: {
    program: string;
    lastSchoolAttended: string;
    yearGraduated: string;
    gwa?: string;
  };
  status: 'pending' | 'approved' | 'denied' | 'enrolled';
  examStatus: 'pending' | 'scheduled' | 'passed' | 'failed';
  documentsUploaded: boolean;
  studentId?: string;
  submissionDate: string;
}

export interface ExamSchedule {
  id: string;
  program: string;
  date: string;
  time: string;
  venue: string;
  instructions: string[];
}

export interface Program {
  id: string;
  name: string;
  code: string;
  description: string;
  duration: string;
  requirements: string[];
}