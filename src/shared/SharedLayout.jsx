import {
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { orange } from "@mui/material/colors";

const steps = [
  "Basic Information",
  "Email Verification",
  "Phone Verification",
  "Personal Info",
  "Store Name",
];

const SharedLayout = ({ activeStep }) => {
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  "&.Mui-completed": {
                    color: orange[700],
                  },
                  "&.Mui-active": {
                    color: orange[700],
                  },
                },
              }}
            >
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default SharedLayout;
