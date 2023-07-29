export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatientInfo = Omit<PatientInfo, 'ssn'>;