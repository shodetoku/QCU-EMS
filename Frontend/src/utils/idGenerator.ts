const STORAGE_KEYS = {
  STUDENT: 'qcu_student_id_counter',
  ADMISSION: 'qcu_admission_id_counter',
  REGISTRAR: 'qcu_registrar_id_counter',
  CCS: 'qcu_ccs_id_counter',
  CBA: 'qcu_cba_id_counter',
  COE: 'qcu_coe_id_counter',
  CED: 'qcu_ced_id_counter',
  CURRENT_YEAR: 'qcu_current_year'
};

export type PortalType = 'student' | 'admission' | 'registrar' | 'ccs' | 'cba' | 'coe' | 'ced';

function getCurrentYear(): number {
  return new Date().getFullYear();
}

function getStoredYear(): number | null {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_YEAR);
  return stored ? parseInt(stored, 10) : null;
}

function resetCountersIfNewYear(): void {
  const currentYear = getCurrentYear();
  const storedYear = getStoredYear();

  if (storedYear !== currentYear) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_YEAR, currentYear.toString());
    localStorage.setItem(STORAGE_KEYS.STUDENT, '0');
  }
}

function getCounter(key: string): number {
  const value = localStorage.getItem(key);
  return value ? parseInt(value, 10) : 0;
}

function incrementCounter(key: string): number {
  const current = getCounter(key);
  const next = current + 1;
  localStorage.setItem(key, next.toString());
  return next;
}

export function generateStudentId(): string {
  resetCountersIfNewYear();
  const year = getCurrentYear();
  const yearSuffix = year.toString().slice(-2);
  const counter = incrementCounter(STORAGE_KEYS.STUDENT);
  const paddedCounter = counter.toString().padStart(4, '0');
  return `${yearSuffix}-${paddedCounter}`;
}

export function generateAdmissionId(): string {
  const counter = incrementCounter(STORAGE_KEYS.ADMISSION);
  const paddedCounter = counter.toString().padStart(4, '0');
  return `ADM-${paddedCounter}`;
}

export function generateRegistrarId(): string {
  const counter = incrementCounter(STORAGE_KEYS.REGISTRAR);
  const paddedCounter = counter.toString().padStart(4, '0');
  return `REG-${paddedCounter}`;
}

export function generateDepartmentId(department: 'ccs' | 'cba' | 'coe' | 'ced'): string {
  const prefix = department.toUpperCase();
  const key = STORAGE_KEYS[department.toUpperCase() as keyof typeof STORAGE_KEYS];
  const counter = incrementCounter(key);
  const paddedCounter = counter.toString().padStart(4, '0');
  return `${prefix}-${paddedCounter}`;
}

export function generateAccountId(portalType: PortalType): string {
  switch (portalType) {
    case 'student':
      return generateStudentId();
    case 'admission':
      return generateAdmissionId();
    case 'registrar':
      return generateRegistrarId();
    case 'ccs':
    case 'cba':
    case 'coe':
    case 'ced':
      return generateDepartmentId(portalType);
    default:
      throw new Error(`Unknown portal type: ${portalType}`);
  }
}
