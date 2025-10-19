export type AccountType = 'student' | 'admission' | 'registrar' | 'CCS' | 'CBA' | 'COE' | 'CED';

interface AccountCounter {
  year: string;
  counter: number;
}

const STORAGE_PREFIX = 'accountCounter_';

const getCurrentYear = (): string => {
  return new Date().getFullYear().toString().slice(-2);
};

const getCounter = (type: AccountType): AccountCounter => {
  const currentYear = getCurrentYear();
  const key = `${STORAGE_PREFIX}${type}`;
  const stored = localStorage.getItem(key);

  if (stored) {
    const counter: AccountCounter = JSON.parse(stored);
    if (counter.year !== currentYear) {
      return { year: currentYear, counter: 0 };
    }
    return counter;
  }

  return { year: currentYear, counter: 0 };
};

const saveCounter = (type: AccountType, counter: AccountCounter): void => {
  const key = `${STORAGE_PREFIX}${type}`;
  localStorage.setItem(key, JSON.stringify(counter));
};

export const generateStudentId = (): string => {
  const counter = getCounter('student');
  counter.counter += 1;
  saveCounter('student', counter);

  const paddedCounter = counter.counter.toString().padStart(4, '0');
  return `${counter.year}-${paddedCounter}`;
};

export const generateAdmissionId = (): string => {
  const counter = getCounter('admission');
  counter.counter += 1;
  saveCounter('admission', counter);

  const paddedCounter = counter.counter.toString().padStart(4, '0');
  return `ADM-${paddedCounter}`;
};

export const generateRegistrarId = (): string => {
  const counter = getCounter('registrar');
  counter.counter += 1;
  saveCounter('registrar', counter);

  const paddedCounter = counter.counter.toString().padStart(4, '0');
  return `REG-${paddedCounter}`;
};

export const generateDepartmentId = (department: string): string => {
  const departmentMap: Record<string, AccountType> = {
    'College of Computer Studies': 'CCS',
    'College of Business Administration': 'CBA',
    'College of Engineering': 'COE',
    'College of Education': 'CED',
    'College of Business and Accountancy': 'CBA'
  };

  const deptCode = departmentMap[department] || 'CCS';
  const counter = getCounter(deptCode);
  counter.counter += 1;
  saveCounter(deptCode, counter);

  const paddedCounter = counter.counter.toString().padStart(4, '0');
  return `${deptCode}-${paddedCounter}`;
};

export const generateAccountId = (accountType: string, department?: string): string => {
  switch (accountType.toLowerCase()) {
    case 'admission':
      return generateAdmissionId();
    case 'registrar':
      return generateRegistrarId();
    case 'department':
      if (department) {
        return generateDepartmentId(department);
      }
      return generateDepartmentId('College of Computer Studies');
    default:
      return generateStudentId();
  }
};
