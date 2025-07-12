// SharedLayout.js
import { useState, useEffect } from "react";
import { Box, Grid, Stepper, Step, StepLabel, Avatar, Paper } from "@mui/material";
import { orange } from "@mui/material/colors";

// Sample images - replace with your actual images
const images = [
  "https://via.placeholder.com/400x500?text=Business+Setup+1",
  "https://via.placeholder.com/400x500?text=Legal+Docs+2",
  "https://via.placeholder.com/400x500?text=Complete+3",
];

const steps = [
  "Basic Information",
  "Email Verification",
  "Phone Verification",
  "Personal Info",
  "Store Setup"
];

const SharedLayout = ({ children, currentStep = 0 }) => {
  const [activeImage, setActiveImage] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container spacing={4} sx={{ minHeight: "100vh", p: 4 }}>
      {/* Left side - Image slideshow */}
      <Grid item xs={12} md={6}>
        <Box sx={{ 
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <Box sx={{ 
              position: "relative",
              height: "500px",
              overflow: "hidden",
              borderRadius: 1
            }}>
              {images.map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: activeImage === index ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {images.map((_, index) => (
                <Avatar
                  key={index}
                  sx={{
                    width: 10,
                    height: 10,
                    mx: 0.5,
                    bgcolor: activeImage === index ? orange[700] : "grey.400",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </Box>
          </Paper>
        </Box>
      </Grid>

      {/* Right side - Form */}
      <Grid item xs={12} md={6}>
        <Box sx={{ position: "relative", height: "100%" }}>
          {/* Stepper in top right */}
          <Box sx={{ 
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            zIndex: 1
          }}>
            <Stepper activeStep={currentStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label} completed={index < currentStep}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Form content */}
          <Box sx={{ 
            position: "relative",
            pt: 8,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            {children}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SharedLayout;