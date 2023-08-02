import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Patient } from "../types";

import patientService from "../services/patients";
import { Card, CardContent, Container, Typography } from "@mui/material";

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
      <Card variant="outlined" sx={{ maxWidth: 400, marginTop: 2 }}>
        <CardContent>
          <Typography variant="h5">{patient.name}</Typography>
          <Typography>gender: {patient.gender}</Typography>
          <Typography>ssn: {patient.ssn}</Typography>
          <Typography>occupation: {patient.occupation}</Typography>
        </CardContent>
      </Card>
    </div>  
  )

  return null
};

export default PatientPage;