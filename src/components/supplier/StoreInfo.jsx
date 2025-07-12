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
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { orange } from "@mui/material/colors";
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
      alert(t("register.acceptTermsError"));
      return;
    }

    setError(null);
    setShowSuccessModal(true);
    onSubmit(storeName);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 1,
          textAlign: i18n.language === "ar" ? "right" : "left",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ color: orange[700] }}
        >
          {t("register.storeInfo")}
        </Typography>

        <Typography paragraph>{t("register.setupStoreDetails")}</Typography>

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
  );
};

export default StoreInfo;