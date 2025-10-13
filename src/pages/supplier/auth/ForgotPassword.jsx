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
import ImageSection from "../../../shared/ImageSection";

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
    <Grid
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        "@media (max-width: 768px)": {
          flexDirection: "column",
        },
      }}
    >
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
      <ImageSection />

      {/* Right Form */}
      <Grid
        sx={{
          display: "flex",
          justifyContent: "right",
          marginLeft: { xs: "0" },
          alignItems: "center",
          width: "100%",
        }}
      >
        <Container
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              "@media (min-width: 951px)": {
                p: 4,
              },
              "@media (max-width: 768px)": {
                marginBottom: "2.5rem",
              },
            }}
          >
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
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
