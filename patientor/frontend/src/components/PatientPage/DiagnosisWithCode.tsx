import { Diagnosis } from "../../types";
import { Typography } from "@mui/material";

interface DiagnosisProps {
  diagnosis: Diagnosis
}

const DiagnosisWithCode = ({ diagnosis } : DiagnosisProps) => {
  
  if (diagnosis) return (
    <Typography>
          {diagnosis.code} {diagnosis.name}
        </Typography>
  )
  
  return null;
};

export default DiagnosisWithCode;