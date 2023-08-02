import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Patient } from "../types";

import patientService from "../services/patients";
import { Card, CardContent, Typography } from "@mui/material";

const PatientPage = () => {
  const id = useParams().id
  const [patient, setPatient] = useState<Patient>()

  useEffect (() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await (patientService.getById(id))
        setPatient(patient)
      };
    } 
    fetchPatient()
  }, [id])

  if(patient) return (
    <div>
      <Card variant="outlined" sx={{ marginTop: 2 }}>
        <CardContent>
          <Typography variant="h5">{patient.name}</Typography>
          <Typography>gender: {patient.gender}</Typography>
          <Typography>ssn: {patient.ssn}</Typography>
          <Typography>occupation: {patient.occupation}</Typography>
        </CardContent>
      </Card>
      <div>
        <Typography variant="h4" sx={{ marginTop: 2 }}>Entries</Typography>
        {patient.entries.map(entry => (
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h6">{entry.date}</Typography>
              <Typography>{entry.description}</Typography>
              {entry.diagnosisCodes
                ? entry.diagnosisCodes.map(code => (
                  <Typography>{code}</Typography>
                  ))
                : null
              }
            </CardContent>
          </Card>
        ))}
      </div>
    </div>  
  )

  return null
};

export default PatientPage;