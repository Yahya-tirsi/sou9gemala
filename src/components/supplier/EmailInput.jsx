import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import SharedLayout from "../../shared/SharedLayout";
import { checkEmailExists } from "../../features/supplier/supplierSlice";
import ImageSection from "../../shared/ImageSection";

const EmailInput = ({ email: propEmail = "", onVerified, onBack }) => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState(propEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await dispatch(checkEmailExists(email)).unwrap();

      if (result.exists) {
        setError(t("register.emailAlreadyExists"));
      } else {
        onVerified({ email });
      }
    } catch (err) {
      setError(err.message || t("register.emailCheckError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }} class="container-auth">
      {/* Left side - placeholder for images/info */}
      <ImageSection />

      <Grid
        sx={{
          display: "flex",
          justifyContent: "right",
          marginLeft: { xs: "0", md: "3.5rem" },
          alignItems: "center",
        }}
        class="container-child2-auth"
      >
        <Container
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            width: "100%",
          }}
        >
          <SharedLayout activeStep={1} />

          <Typography
            gutterBottom
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {t("register.configureAccount")}
          </Typography>

          <Typography
            sx={{
              color: "gray",
              textAlign: "center",
            }}
            variant="body1"
            paragraph
          >
            {t("register.enterEmailToCreate")}
          </Typography>

          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
            }}
          >
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label={`${t("register.emailAddress")}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="email"
                error={!!error}
                helperText={error}
                inputProps={{
                  "data-testid": "email-input",
                }}
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
                    t("common.signIn")
                  )}
                </Button>
              </Box>
            </Box>

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

export default EmailInput;
