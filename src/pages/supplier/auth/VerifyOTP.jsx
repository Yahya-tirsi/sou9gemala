import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import { verifyEmail } from "../../../features/supplier/supplierSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
  Paper,
  Container,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import { orange } from "@mui/material/colors";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const { isLoading } = useSelector((state) => state.supplier);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      navigate("/forgot-password");
      return;
    }

    const result = await dispatch(verifyEmail({ email, code: otp }));
    if (verifyEmail.fulfilled.match(result)) {
      navigate("/reset-password", { state: { email, token: otp } });
    } else {
      setError(result.payload || "Invalid OTP");
    }
  };

  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left side - placeholder for images/info */}
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          background: "linear-gradient(135deg, #FFA726, #FB8C00)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            Welcome to Our Platform
          </Typography>
          <Typography variant="body1">
            Join thousands of happy suppliers growing their business with us
          </Typography>
        </Box>
      </Grid>

      {/* Right Form */}
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: { xs: "0", md: "3.5rem" },
          alignItems: "center",
          px: { xs: 2, md: 6 },
          backgroundColor: "background.default",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            width: "100%",
          }}
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
              OTP Verification
            </Typography>

            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              Nous avons envoyé un code de vérification à <b>{email}</b>
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="OTP Code"
                variant="outlined"
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                sx={{
                  marginBottom: "1.3rem",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: orange[700],
                      borderWidth: "2px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: orange[500],
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: orange[700],
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: orange[700],
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  bgcolor: orange[700],
                  "&:hover": { bgcolor: orange[800] },
                  "&:disabled": { bgcolor: orange[300] },
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={30} sx={{ color: "white" }} />
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" textAlign="center">
                Vous n'avez pas reçu le code ? 
                <p
                  onClick={handleSubmit}
                  color={orange[700]}
                >
                  Renvoyer l'OTP
                </p>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default VerifyOTP;
