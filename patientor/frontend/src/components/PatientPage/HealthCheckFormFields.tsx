import { InputLabel, MenuItem, Select } from "@mui/material"

interface Props {
  healthCheckRating: string;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<string>>
}

const HealthCheckFormFields = ({ healthCheckRating, setHealthCheckRating}: Props) => {

  return (
    <>
      <InputLabel>Health Check Rating</InputLabel>
      <Select
        label="Health Check Rating"
        required
        fullWidth
        value={healthCheckRating}
        onChange={event => setHealthCheckRating(event.target.value)}
      >
        <MenuItem value={0}>0 - Healthy</MenuItem>
        <MenuItem value={1}>1 - Low Risk</MenuItem>
        <MenuItem value={2}>2 - High Risk</MenuItem>
        <MenuItem value={3}>3 - Critical Risk</MenuItem>
      </Select>
    </>
  )

}

export default HealthCheckFormFields