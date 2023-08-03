import { Card, CardContent, Typography } from "@mui/material";
import DiagnosisWithCode from "./DiagnosisWithCode";
import { Diagnosis, Entry } from "../../types";

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
      ? diagnosisList?.map(
          diagnosis => <DiagnosisWithCode key={diagnosis?.code} diagnosis={diagnosis}/>
        )
      : null
  )

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6">{entry.date}</Typography>
        <Typography sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>
        {diagnosesWithCodes()}
      </CardContent>
    </Card>
  )
}

export default PatientEntry