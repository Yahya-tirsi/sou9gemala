import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Stack,
  Alert,
  Grid,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import SharedLayout from "../../shared/SharedLayout";
import {
  sendVerificationCode,
  verifyEmail,
} from "../../features/supplier/supplierSlice";

const VerificationEmailCode = ({ email, onVerificationComplete, onBack }) => {
  const { t, i18n } = useTranslation();
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Send verification code when component mounts
    handleSendVerificationCode();

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [email, dispatch]);

  const handleSendVerificationCode = async () => {
    setResendLoading(true);
    try {
      await dispatch(sendVerificationCode(email)).unwrap();
      setSuccess(t("register.codeSentSuccessfully"));
      setError(null);
    } catch {
      setError(t("register.codeSendingFailed"));
      setSuccess(null);
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await dispatch(verifyEmail({ email, code })).unwrap();
      setSuccess(t("register.verificationSuccessful"));
      onVerificationComplete();
    } catch {
      setError(t("register.verificationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = () => {
    handleSendVerificationCode();
    setCode("");
    setCountdown(60);
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left side - placeholder for images/info */}
      <Grid
        sx={{
          background: "linear-gradient(135deg, #FFA726, #FB8C00)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Prend toute la hauteur
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

      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-start", // décalage vers la droite
          marginLeft: { xs: "0", md: "3.5rem" },
          alignItems: "center",
          px: { xs: 2, md: 6 }, // plus d’espace à droite sur desktop
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
          <SharedLayout activeStep={2} />

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {t("register.verifyYourEmail")}
          </Typography>

          <Typography
            sx={{
              color: "gray",
              textAlign: "center",
            }}
            paragraph
          >
            {t("register.codeSentTo")} <strong>{email}</strong>
          </Typography>

          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
            }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label={t("register.email")}
                value={email}
                variant="outlined"
                sx={{
                  opacity: 0.6,
                  mb: 2,
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
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                fullWidth
                label={t("register.verificationCode")}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                variant="outlined"
                sx={{
                  mb: 3,
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
                required
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                {onBack && (
                  <Button
                    variant="outlined"
                    onClick={onBack}
                    sx={{
                      flex: 1,
                      border: "1px solid",
                      borderColor: `${orange[700]}`,
                      color: `${orange[700]}`,
                      "&:hover": {
                        borderColor: `${orange[700]}`,
                        color: `${orange[700]}`,
                        backgroundColor: "rgba(255, 152, 0, 0.08)",
                      },
                      "&:active": {
                        borderColor: "orange.800",
                        backgroundColor: "rgba(255, 152, 0, 0.12)",
                      },
                    }}
                  >
                    {t("common.back")}
                  </Button>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    bgcolor: orange[700],
                    "&:hover": { bgcolor: orange[800] },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    t("common.verify")
                  )}
                </Button>
              </Box>
            </Box>

            <Button
              fullWidth
              onClick={resendCode}
              disabled={countdown > 0 || resendLoading}
              sx={{
                mt: 2,
                color: countdown > 0 ? "text.disabled" : orange[700],
                textTransform: "none",
              }}
            >
              {resendLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  {t("register.resendCode")}{" "}
                  {countdown > 0 && `(${countdown}s)`}
                </>
              )}
            </Button>

            {/* Language Selector */}
            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
              <Button
                size="small"
                onClick={() => i18n.changeLanguage("fr")}
                color={i18n.language === "fr" ? "primary" : "inherit"}
                sx={{
                  fontWeight: i18n.language === "fr" ? "bold" : "normal",
                  color: i18n.language === "fr" ? orange[700] : "inherit",
                }}
              >
                Français
              </Button>
              <Button
                size="small"
                onClick={() => i18n.changeLanguage("ar")}
                color={i18n.language === "ar" ? "primary" : "inherit"}
                sx={{
                  fontWeight: i18n.language === "ar" ? "bold" : "normal",
                  color: i18n.language === "ar" ? orange[700] : "inherit",
                }}
              >
                العربية
              </Button>
              <Button
                size="small"
                onClick={() => i18n.changeLanguage("en")}
                color={i18n.language === "en" ? "primary" : "inherit"}
                sx={{
                  fontWeight: i18n.language === "en" ? "bold" : "normal",
                  color: i18n.language === "en" ? orange[700] : "inherit",
                }}
              >
                English
              </Button>
            </Stack>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default VerificationEmailCode;
