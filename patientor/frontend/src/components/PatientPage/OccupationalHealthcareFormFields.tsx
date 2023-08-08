import { InputLabel, TextField } from "@mui/material"

interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveStartDate: string;
  setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveEndDate: string;
  setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcareFormFields = ({
  employerName,
  setEmployerName,
  sickLeaveStartDate,
  setSickLeaveStartDate, 
  sickLeaveEndDate,
  setSickLeaveEndDate
}: Props) => {
  return (
    <>
      <TextField
        label="Employer"
        required
        fullWidth
        value={employerName}
        onChange={event => setEmployerName(event.target.value)}
      />
      <InputLabel>Sick Leave</InputLabel>
      <TextField
        helperText="Sick Leave Start Date"
        type="date"
        fullWidth
        value={sickLeaveStartDate}
        onChange={event => setSickLeaveStartDate(event.target.value)}
      />
      <TextField
        helperText="Sick Leave End Date"
        type="date"
        fullWidth
        value={sickLeaveEndDate}
        onChange={event => setSickLeaveEndDate(event.target.value)}
      />
    </>
  )
}

export default OccupationalHealthcareFormFields