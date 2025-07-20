import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  forgotPassword,
  checkEmailExists,
} from "../../../features/supplier/supplierSlice";
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
  Snackbar,
} from "@mui/material";
import { orange } from "@mui/material/colors";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.supplier);

  const hideAlert = () => {
    setOpenAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setAlertMessage("");

    const emailCheck = await dispatch(checkEmailExists(email));
    if (emailCheck?.payload?.exists) {
      const result = await dispatch(forgotPassword(email));
      if (forgotPassword.fulfilled.match(result)) {
        setOpenAlert(true);
        setAlertMessage(
          `Un email avec un lien de réinitialisation a été envoyé à ${email}`
        );
        setSuccess(true);
      } else {
        setError(result.payload || "Échec de l'envoi du code OTP");
      }
    } else {
      setError("Email introuvable dans notre système");
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={hideAlert} severity={"success"}>
          {alertMessage}
        </Alert>
      </Snackbar>

      {/* Left side - placeholder for images/info */}
      <Grid
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
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, boxShadow: "0px 0px 0px white", }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
              Mot de passe oublié
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {success ? (
              <Box>
                <Alert severity="success" sx={{ mb: 3 }}>
                  Un email avec un lien de réinitialisation a été envoyé à{" "}
                  <b>{email}</b>
                </Alert>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
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
                    "Envoyer le lien de réinitialisation"
                  )}
                </Button>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" textAlign="center">
              <Link
                component={RouterLink}
                to="/supplier/login"
                color={orange[700]}
              >
                Retour à la connexion
              </Link>
            </Typography>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
