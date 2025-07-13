import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip,
  Link,
  Stack,
  Grid,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { orange } from "@mui/material/colors";
import SharedLayout from "../../shared/SharedLayout";
import RegistrationSuccessModal from "./RegistrationSuccessModal";

const StoreInfo = ({ onSubmit }) => {
  const { t, i18n } = useTranslation();
  const [storeName, setStoreName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!storeName.trim()) {
      setError(t("register.storeNameRequired"));
      return;
    }

    if (!termsAccepted) {
      setError(t("register.acceptTermsError"));
      return;
    }

    setError(null);
    setShowSuccessModal(true);
    onSubmit(storeName);
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left side - placeholder for images/info */}
      <Grid
        item
        xs={12}
        md={7}
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
        item
        xs={12}
        md={5}
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
          <SharedLayout activeStep={4} />

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
            {t("register.storeInfo")}
          </Typography>

          <Typography
            sx={{
              color: "gray",
              textAlign: "center",
            }}
            paragraph
          >
            {t("register.setupStoreDetails")}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              textAlign: i18n.language === "ar" ? "right" : "left",
            }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <TextField
                  required
                  fullWidth
                  name="storeName"
                  label={t("register.storeName")}
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  variant="outlined"
                  sx={{
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
                  inputProps={{ dir: i18n.language === "ar" ? "rtl" : "ltr" }}
                />

                <Tooltip
                  title={t("register.storeNameDescription")}
                  arrow
                  placement="top"
                >
                  <IconButton
                    size="medium"
                    sx={{
                      color: orange[700],
                      backgroundColor: orange[50],
                      "&:hover": {
                        backgroundColor: orange[100],
                      },
                      p: 1.5,
                      ml: 1,
                    }}
                  >
                    <InfoOutlinedIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  {t("register.agreeToTerms1")}{" "}
                  <Link href="#" color={orange[700]}>
                    {t("register.agreeToTerms2")}
                  </Link>{" "}
                  {t("register.agreeToTerms3")}
                </Typography>
              }
              sx={{ mb: 3, alignItems: "flex-start" }}
            />

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
              {t("common.submit")}
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

            <RegistrationSuccessModal
              open={showSuccessModal}
              onClose={() => setShowSuccessModal(false)}
              message={t("register.successMessage")}
              contactMessage={t("register.contactMessage")}
            />
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default StoreInfo;
