import { Diagnosis, Discharge, EntryWithoutId, Gender, HealthCheckRating, NewPatientInfo, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number';
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const toNewPatient = (object: unknown): NewPatientInfo => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object) {
      const newPatient: NewPatientInfo = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
      };

      return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isEntryType = (str: string): str is 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
  return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(str);
};

const parseType = (type: unknown): 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
  if (!isString(type) || !isEntryType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if(!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('Incorrect or missing discharge info');
  }
  if (!isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error('Incorrect or missing discharge date ' + discharge.date);
  }
  if (!isString(discharge.criteria)) {
    throw new Error('Incorrect or missing discharge criteria ' + discharge.criteria);
  }

  return ({
    date: discharge.date,
    criteria: discharge.criteria
  });
};

const parseSickLeave = (object: unknown): SickLeave | undefined => {
  if (!object || typeof object !== 'object' || !('sickLeave' in object)) {
    return undefined;
  }
  const sickLeave = object.sickLeave;
  if (!sickLeave ||
    typeof sickLeave !== 'object' ||
    !('startDate' in sickLeave) ||
    !isString(sickLeave.startDate) ||
    !isDate(sickLeave.startDate)
    ) {
      throw new Error('Incorrect or missing sick leave start date');
  }
  if (!('endDate' in sickLeave) ||
    !isString(sickLeave.endDate) ||
    !isDate(sickLeave.endDate)
    ) {
      throw new Error('Incorrect or missing sick leave end date');
  }

  return ({
    startDate: sickLeave.startDate,
    endDate: sickLeave.endDate,
  });
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employer: ' + employerName);
  }
  return employerName;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object
    ) {
      const type = parseType(object.type);
      const diagnosisCodes = parseDiagnosisCodes(object);
      if (type === 'HealthCheck' && 'healthCheckRating' in object) {
        const newEntry: EntryWithoutId = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: diagnosisCodes,
          type: 'HealthCheck',
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        };
        return newEntry;
      }
      if (type === 'Hospital' && 'discharge' in object) {
        const newEntry: EntryWithoutId = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: diagnosisCodes,
          type: 'Hospital',
          discharge: parseDischarge(object.discharge)
        };
        return newEntry;
      }
      if (type === 'OccupationalHealthcare' && 'employerName' in object) {
        const sickLeave = parseSickLeave(object);
        const newEntry: EntryWithoutId = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: diagnosisCodes,
          type: 'OccupationalHealthcare',
          employerName: parseEmployerName(object.employerName),
          sickLeave,
        };
        return newEntry;
      }
    }

  throw new Error('Incorrect data: some fields are missing');
};