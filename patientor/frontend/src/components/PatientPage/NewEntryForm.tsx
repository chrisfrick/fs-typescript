import { Alert, Button, Card, TextField, Typography } from "@mui/material"
import { SyntheticEvent, useState } from "react"
import { Diagnosis, EntryFormValues } from "../../types"

interface Props {
  id: string;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const NewEntryForm = ({ id, onSubmit, error }: Props) => {
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [healthCheckRating, setHealthCheckRating] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState('')

  const parseDiagnosisCodes = (string: string): Array<Diagnosis['code']> => {
    return string.split(', ')
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault()
    let diagnosisCodesArray = parseDiagnosisCodes(diagnosisCodes);
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodesArray,
      healthCheckRating: Number(healthCheckRating),
      type: 'HealthCheck',
    })

    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating('');
    setDiagnosisCodes('');
  }

  return (
    <Card variant="outlined" sx={{ marginTop: 2, padding: 2 }}>
      <Typography variant="h5">New HealthCheck Entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={addEntry}>
        <TextField
          variant="standard"
          label="Description"
          fullWidth
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField 
          variant="standard"
          label="Date"
          fullWidth
          value={date}
          onChange={event => setDate(event.target.value)}
        />
        <TextField
          variant="standard"
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={event => setSpecialist(event.target.value)}
        />
        <TextField
          variant="standard"
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating}
          onChange={event => setHealthCheckRating(event.target.value)}
        />
        <TextField
          variant="standard"
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={event => setDiagnosisCodes(event.target.value)}
        />
        <Button 
          type="submit"
          variant="contained"
        >
          Add
        </Button>

      </form>
    </Card>
  )
}

export default NewEntryForm