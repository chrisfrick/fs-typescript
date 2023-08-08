import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Diagnosis, EntryFormValues, Patient } from "../../types";

import axios from "axios";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses"

import { Typography } from "@mui/material";

import PatientCard from "./PatientCard";
import PatientEntry from "./PatientEntry";
import NewEntryForm from "./NewEntryForm";

const PatientPage = () => {
  const id = useParams().id
  const [patient, setPatient] = useState<Patient>()
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [error, setError] = useState<string>()

  useEffect (() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await (patientService.getById(id))
        setPatient(patient)
      };
    } 
    fetchPatient()
  }, [id])

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await (diagnosesService.getAll())
      setDiagnoses(diagnoses)
    }
    fetchDiagnoses()
  }, [])

  const entries = () => {
    if (patient?.entries.length === 0) {
      return <Typography>no entries</Typography>
    } else {
      return (
        patient?.entries.map(entry => (
          <div key={entry.id} >
            <PatientEntry entry={entry} diagnoses={diagnoses} />
          </div>
        ))
      )
    }
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    if(id && patient) {
      try {
      const entry = await patientService.addEntry(id, values)
      const updatedPatient = {...patient, entries: patient.entries.concat(entry)}
      setPatient(updatedPatient)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === "string") {
          const message = error.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", error);
        setError("Unknown error");
      }
      }
    }
    }
    
  };

  if(patient) return (
    <div>
      <PatientCard patient={patient} />
      <NewEntryForm onSubmit={submitNewEntry} diagnoses={diagnoses} error={error}/>
      <div>
        <Typography variant="h5" sx={{ marginTop: 2 }}>Entries</Typography>
        {entries()}
      </div>
    </div>  
  )

  return null
};

export default PatientPage;
