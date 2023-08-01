import patients from "../../data/patients";
import { v1 as uuid } from 'uuid';

import { NewPatientInfo, NonSensitivePatientInfo, PatientInfo } from "../types";

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatientInfo): PatientInfo => {
  const id = uuid();

  const newPatient = {
    id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatientInfo,
  addPatient,
};