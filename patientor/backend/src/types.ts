export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NewPatientInfo = Omit<Patient, 'id'>;

export type NonSensitivePatientInfo = Omit<Patient, 'ssn' | 'entries'>;