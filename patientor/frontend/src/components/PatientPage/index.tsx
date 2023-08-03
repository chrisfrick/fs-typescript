import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Diagnosis, Patient } from "../../types";

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses"

import { Typography } from "@mui/material";

import PatientCard from "./PatientCard";
import PatientEntry from "./PatientEntry";


const PatientPage = () => {
  const id = useParams().id
  const [patient, setPatient] = useState<Patient>()
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

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

  if(patient) return (
    <div>
      <PatientCard patient={patient} />
      <div>
        <Typography variant="h5" sx={{ marginTop: 2 }}>Entries</Typography>
        {entries()}
      </div>
    </div>  
  )

  return null
};

export default PatientPage;
