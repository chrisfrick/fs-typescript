import { Alert, Button, Card, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { SyntheticEvent, useState } from "react"
import { Diagnosis, EntryFormValues } from "../../types"
import HealthCheckFormFields from "./HealthCheckFormFields";
import HospitalFormFields from "./HospitalFormFields";
import OccupationalHealthcareFormFields from "./OccupationalHealthcareFormFields";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
  error?: string;
}

const NewEntryForm = ({ onSubmit, diagnoses, error }: Props) => {
  const [entryType, setEntryType] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
  const [healthCheckRating, setHealthCheckRating] = useState('')
  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')
  const [employerName, setEmployerName] = useState('')
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('')
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('')

  const parseDiagnosisCodes = (array: Array<string>): Array<Diagnosis['code']> => {
    if (array.length > 0) {
      return array;
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
    setDiagnosisCodes([]);
    setHealthCheckRating('');
    setDischargeDate('');
    setDischargeCriteria('');
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
  }

  const onCancel = () => {
    setEntryType('')
  }

  return (
    <Card variant="outlined" sx={{ marginTop: 2, padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>New Entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={addEntry}>
        <Stack spacing={1}>
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
                label="Description"
                required
                fullWidth
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <TextField
                type="date"
                required
                fullWidth
                value={date}
                onChange={event => setDate(event.target.value)}
              />
              <TextField
                label="Specialist"
                required
                fullWidth
                value={specialist}
                onChange={event => setSpecialist(event.target.value)}
              />
              <InputLabel>Diagnosis Codes</InputLabel>
              <Select
                label="Diagnosis Codes"
                multiple
                value={diagnosisCodes}
                onChange={event => setDiagnosisCodes(
                  typeof event.target.value === 'string'
                    ? event.target.value.split(',')
                    : event.target.value
                  )}
              >
                {diagnoses.map(diagnosis => (
                  <MenuItem
                    key={diagnosis.code}
                    value={diagnosis.code}
                  >
                    {diagnosis.code} - {diagnosis.name}
                  </MenuItem>
                ))}
              </Select>
              {
                entryType === 'HealthCheck' ? (
                  <HealthCheckFormFields
                    healthCheckRating={healthCheckRating}
                    setHealthCheckRating={setHealthCheckRating}
                  />

                ) : entryType === 'Hospital' ? (
                  <HospitalFormFields 
                    dischargeDate={dischargeDate}
                    setDischargeDate={setDischargeDate}
                    dischargeCriteria={dischargeCriteria}
                    setDischargeCriteria={setDischargeCriteria}
                  />

                ) : entryType === 'OccupationalHealthcare' ? (
                  <OccupationalHealthcareFormFields
                    employerName={employerName}
                    setEmployerName={setEmployerName}
                    sickLeaveStartDate={sickLeaveStartDate}
                    setSickLeaveStartDate={setSickLeaveStartDate}
                    sickLeaveEndDate={sickLeaveEndDate}
                    setSickLeaveEndDate={setSickLeaveEndDate}
                  />

                ) : null
              }
              
              <Button type="submit" variant="contained">
                Add
              </Button>
              <Button variant="contained" color="error" onClick={onCancel}>Cancel</Button>
              </>                
            )
            : null
        }
        </Stack>
      </form>
    </Card>
  )
}

export default NewEntryForm