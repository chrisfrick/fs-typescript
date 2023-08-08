import patients from "../../data/patients";
import { v1 as uuid } from 'uuid';

import { Entry, EntryWithoutId, NewPatientInfo, NonSensitivePatientInfo, Patient } from "../types";

const getAllNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatientInfo): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const entryId = uuid();

  const newEntry = {
    id: entryId,
    ...entry,
  };

  const patient = patients.find(p => p.id === id);
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getAllNonSensitivePatientInfo,
  getPatientById,
  addPatient,
  addEntry
};
