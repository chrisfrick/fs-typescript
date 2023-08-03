import { Card, CardContent, Typography } from "@mui/material";
import DiagnosisWithCode from "./DiagnosisWithCode";
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import HealingIcon from '@mui/icons-material/Healing';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { green, yellow, orange, red } from "@mui/material/colors";

const HospitalEntryCard = ({ entry, diagnosesWithCodes }: { entry: HospitalEntry, diagnosesWithCodes: (() => JSX.Element | null) }) => {
    return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6">{entry.date} <HealingIcon /> </Typography>
        <Typography sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>
        <>{diagnosesWithCodes()}</>
        <Typography>Discharge date: {entry.discharge.date}</Typography>
        <Typography>Discharge criteria: {entry.discharge.criteria}</Typography>
        <Typography>Specialist: {entry.specialist}</Typography>
      </CardContent>
    </Card>
  )
}

const OccupationalHealthcareEntryCard = ({ entry, diagnosesWithCodes }: { entry: OccupationalHealthcareEntry, diagnosesWithCodes: (() => JSX.Element | null) }) => {
  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6">{entry.date} <WorkIcon /> (Employer: {entry.employerName})</Typography>
        <Typography sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>
        {entry.sickLeave ? <Typography>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Typography> : null}
        <>{diagnosesWithCodes()}</>
        <Typography>Specialist: {entry.specialist}</Typography>
      </CardContent>
    </Card>
  )
}

const HealthCheckEntryCard = ({ entry, diagnosesWithCodes }: { entry: HealthCheckEntry, diagnosesWithCodes: (() => JSX.Element | null) }) => {
  let color
  switch (entry.healthCheckRating) {
    case 0:
      color = green[500]
      break
    case 1:
      color = yellow[500]
      break
    case 2:
      color = orange[600]
      break
    case 3:
      color = red[600]
      break
    default:
      color = null
  }

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6">{entry.date} <LocalHospitalIcon /></Typography>
        <Typography sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>
        <FavoriteIcon sx={{color: {color}}} />
        <Typography>Specialist: {entry.specialist}</Typography>
        <>{diagnosesWithCodes()}</>
      </CardContent>
    </Card>
  )
}

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const PatientEntry = ({ entry, diagnoses }: EntryProps) => {
  if (diagnoses.length=== 0) return null
  
  const diagnosisList = entry.diagnosisCodes?.map(
    code => diagnoses.find(d => d.code === code) as Diagnosis
  )

  const diagnosesWithCodes = () => (
    diagnosisList
      ? <>
          {diagnosisList?.map(
            diagnosis => <DiagnosisWithCode key={diagnosis?.code} diagnosis={diagnosis}/>
          )}
        </>
      : null
  )

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  switch(entry.type) {
      case "Hospital":
        return <HospitalEntryCard entry={entry} diagnosesWithCodes={diagnosesWithCodes} />
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryCard entry={entry} diagnosesWithCodes={diagnosesWithCodes} />
      case "HealthCheck":
        return <HealthCheckEntryCard entry={entry} diagnosesWithCodes={diagnosesWithCodes} />
      default:
        return assertNever(entry);
  }

}

export default PatientEntry