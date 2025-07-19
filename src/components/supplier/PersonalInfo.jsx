import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import SharedLayout from "../../shared/SharedLayout";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AlertMessage from "./AlertMessage";
import RegistrationSuccessModal from "./RegistrationSuccessModal";

const PersonalInfo = ({ onNext, apiError }) => {
  const { t, i18n } = useTranslation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("E-mail vérifié avec succès");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [alertMessage, setAlertMessage] = useState("");

  const hideAlert = () => {
    setOpen(false);
  };

  const checkPasswordRequirements = (pwd) => {
    setPasswordRequirements({
      length: pwd.length >= 9,
      uppercase: /[A-Z]/.test(pwd),
      number: /\d/.test(pwd),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    });
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    checkPasswordRequirements(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setAlertMessage("");

    // Check password match
    if (password !== confirmPassword) {
      setError(t("personalInfo.passwordsNotMatch"));
      setSuccess("");
      return;
    }

    // Check password requirements
    if (!Object.values(passwordRequirements).every(Boolean)) {
      setError(t("personalInfo.passwordRequirementsNotMet"));
      setSuccess("");
      return;
    }

    // check phone length
    if (!phone || phone.length > 10 || phone.length < 9) {
      setError(t("personalInfo.invalidPhoneNumber"));
      return;
    }

    if (apiError === "Phone number already in use") {
      setAlertMessage(t("personalInfo.phoneNumberExists"));
      setOpen(true);
    }

    try {
      setError(null);
      await onNext({ phoneNumber: `+212${phone}`, password });

      // If we get here, the request was successful
      // setShowSuccessModal(true);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <AlertMessage open={open} message={alertMessage} onClose={hideAlert} />

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
          <SharedLayout activeStep={3} />

          <Typography
            gutterBottom
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {t("personalInfo.title")}
          </Typography>
          <Typography
            sx={{
              color: "gray",
              textAlign: "center",
            }}
            paragraph
          >
            {t("personalInfo.subtitle")}
          </Typography>

          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
            }}
          >
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label={t("personalInfo.phoneLabel")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+212</InputAdornment>
                  ),
                }}
              />
              {alertMessage && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {t("personalInfo.phoneNumberExists")}
                </Alert>
              )}

              <TextField
                fullWidth
                label={t("personalInfo.passwordLabel")}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                required
                sx={{
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password Requirements Checklist */}
              {password && (
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    backgroundColor: "background.paper",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, fontWeight: "medium" }}
                  >
                    {t("personalInfo.passwordMustContain")}:
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: passwordRequirements.length
                          ? "success.main"
                          : "grey.300",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1.5,
                      }}
                    >
                      {passwordRequirements.length ? (
                        <CheckIcon
                          sx={{ fontSize: 14, color: "common.white" }}
                        />
                      ) : (
                        <CloseIcon
                          sx={{ fontSize: 14, color: "common.white" }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2">
                      {t("personalInfo.minLength")}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: passwordRequirements.uppercase
                          ? "success.main"
                          : "grey.300",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1.5,
                      }}
                    >
                      {passwordRequirements.uppercase ? (
                        <CheckIcon
                          sx={{ fontSize: 14, color: "common.white" }}
                        />
                      ) : (
                        <CloseIcon
                          sx={{ fontSize: 14, color: "common.white" }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2">
                      {t("personalInfo.uppercaseLetter")}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: passwordRequirements.number
                          ? "success.main"
                          : "grey.300",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1.5,
                      }}
                    >
                      {passwordRequirements.number ? (
                        <CheckIcon
                          sx={{ fontSize: 14, color: "common.white" }}
                        />
                      ) : (
                        <CloseIcon
                          sx={{ fontSize: 14, color: "common.white" }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2">
                      {t("personalInfo.number")}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: passwordRequirements.specialChar
                          ? "success.main"
                          : "grey.300",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1.5,
                      }}
                    >
                      {passwordRequirements.specialChar ? (
                        <CheckIcon
                          sx={{ fontSize: 14, color: "common.white" }}
                        />
                      ) : (
                        <CloseIcon
                          sx={{ fontSize: 14, color: "common.white" }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2">
                      {t("personalInfo.specialCharacter")}
                    </Typography>
                  </Box>
                </Box>
              )}

              <TextField
                fullWidth
                label={t("personalInfo.confirmPasswordLabel")}
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {t("personalInfo.passwordRequirements")}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  bgcolor: orange[700],
                  "&:hover": {
                    bgcolor: orange[800],
                  },
                }}
              >
                {t("common.next")}
              </Button>
            </Box>

            <RegistrationSuccessModal
              open={showSuccessModal}
              onClose={() => setShowSuccessModal(false)}
              message={t("register.successMessage")}
              contactMessage={t("register.contactMessage")}
            />

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

export default PersonalInfo;
