import { Alert, Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { SyntheticEvent, useState } from "react"
import { Diagnosis, EntryFormValues } from "../../types"

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const NewEntryForm = ({ onSubmit, error }: Props) => {
  const [entryType, setEntryType] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState('')
  const [healthCheckRating, setHealthCheckRating] = useState('')
  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')
  const [employerName, setEmployerName] = useState('')
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('')
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('')

  const parseDiagnosisCodes = (string: string): Array<Diagnosis['code']> => {
    if (string.length > 0) {
      return string.split(', ')
    }
    return []
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault()
    let diagnosisCodesArray = parseDiagnosisCodes(diagnosisCodes);
    if (entryType === 'HealthCheck') {
      onSubmit({
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodesArray,
        healthCheckRating: Number(healthCheckRating),
        type: entryType,
      });
    } else if (entryType === 'Hospital') {
      onSubmit({
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodesArray,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
        type: entryType,
      });
    } else if (entryType === 'OccupationalHealthcare') {
      let sickLeaveObject = undefined
      if (sickLeaveStartDate && sickLeaveEndDate) {
        sickLeaveObject = {
          startDate: sickLeaveStartDate,
          endDate: sickLeaveEndDate,
        }
      }
      onSubmit({
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodesArray,
        employerName,
        sickLeave: sickLeaveObject,
        type: entryType,
      })
    }
    

    setEntryType('');
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes('');
    setHealthCheckRating('');
    setDischargeDate('');
    setDischargeCriteria('');
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
  }

  return (
    <Card variant="outlined" sx={{ marginTop: 2, padding: 2 }}>
      <Typography variant="h5">New Entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={addEntry}>
        <FormControl fullWidth>
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={entryType}
            onChange={event => setEntryType(event.target.value)}
            label='Entry Type'
          >
            <MenuItem value='HealthCheck'>Health Check</MenuItem>
            <MenuItem value='Hospital'>Hospital</MenuItem>
            <MenuItem value='OccupationalHealthcare'>Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>
        {
          entryType
            ? (<>
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
                label="Diagnosis Codes"
                fullWidth
                value={diagnosisCodes}
                onChange={event => setDiagnosisCodes(event.target.value)}
              />
              {
                entryType === 'HealthCheck' ? (
                  <TextField
                  variant="standard"
                  label="Health Check Rating"
                  fullWidth
                  value={healthCheckRating}
                  onChange={event => setHealthCheckRating(event.target.value)}
                />
                ) : entryType === 'Hospital' ? (
                  <>
                    <TextField
                      variant="standard"
                      label="Discharge Date"
                      fullWidth
                      value={dischargeDate}
                      onChange={event => setDischargeDate(event.target.value)}
                    />
                    <TextField
                      variant="standard"
                      label="Discharge Criteria"
                      fullWidth
                      value={dischargeCriteria}
                      onChange={event => setDischargeCriteria(event.target.value)}
                    />
                  </>
                ) : entryType === 'OccupationalHealthcare' ? (
                  <>
                    <TextField
                      variant="standard"
                      label="Employer"
                      fullWidth
                      value={employerName}
                      onChange={event => setEmployerName(event.target.value)}
                    />
                    <TextField
                      variant="standard"
                      label="Sick Leave Start Date"
                      fullWidth
                      value={sickLeaveStartDate}
                      onChange={event => setSickLeaveStartDate(event.target.value)}
                    />
                    <TextField
                      variant="standard"
                      label="Sick Leave End Date"
                      fullWidth
                      value={sickLeaveEndDate}
                      onChange={event => setSickLeaveEndDate(event.target.value)}
                    />
                  </>
                ) : null
              }
              
              <Button 
                type="submit"
                variant="contained"
              >
                Add
              </Button>
              </>                
            )
            : null
        }

      </form>
    </Card>
  )
}

export default NewEntryForm