import { InputLabel, TextField } from "@mui/material"

interface Props {
  dischargeDate: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>
}

const HospitalFormFields = ({ dischargeDate, setDischargeDate, dischargeCriteria, setDischargeCriteria}: Props) => {
  return (
    <>
      <InputLabel>Discharge Date</InputLabel>
      <TextField
        type="date"
        required
        fullWidth
        value={dischargeDate}
        onChange={event => setDischargeDate(event.target.value)}
      />
      <TextField
        label="Discharge Criteria"
        required
        fullWidth
        value={dischargeCriteria}
        onChange={event => setDischargeCriteria(event.target.value)}
      />
    </>
  )
}

export default HospitalFormFields