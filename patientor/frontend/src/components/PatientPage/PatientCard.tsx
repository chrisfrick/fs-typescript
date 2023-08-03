import { Patient } from "../../types"
import { Card, CardContent, Typography } from "@mui/material"

const PatientCard = ({ patient } : {patient: Patient}) => {
 return (
  <Card variant="outlined" sx={{ marginTop: 2 }}>
        <CardContent>
          <Typography variant="h4">{patient.name}</Typography>
          <Typography>gender: {patient.gender}</Typography>
          <Typography>ssn: {patient.ssn}</Typography>
          <Typography>occupation: {patient.occupation}</Typography>
        </CardContent>
  </Card>
 )
}

export default PatientCard