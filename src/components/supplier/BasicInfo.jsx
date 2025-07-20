import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Divider,
  Stack,
  Grid,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";
import SharedLayout from "../../shared/SharedLayout";
import ImageSection from "../../shared/ImageSection";

const BasicInfo = ({ onNext }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        margin: 0,
        width: "100%",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #FFA790, #FB8C00)",
          color: "#fff",
        }}
      >
        <ImageSection />
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "right",
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
            borderRadius: 2,
            width: "100%",
          }}
        >
          <SharedLayout activeStep={0} />

          <Typography
            gutterBottom
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {t("register.sellOnJumia")}
          </Typography>
          <Typography
            sx={{
              color: "gray",
              textAlign: "center",
            }}
            variant="body1"
            paragraph
          >
            {t("register.createSupplierAccount")}
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
                required
                fullWidth
                name="firstName"
                label={t("register.firstName")}
                value={formData.firstName}
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
                onChange={handleChange}
                variant="outlined"
              />

              <TextField
                required
                fullWidth
                name="lastName"
                label={t("register.lastName")}
                value={formData.lastName}
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
                onChange={handleChange}
                variant="outlined"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 4,
                  py: 1.5,
                  bgcolor: orange[700],
                  "&:hover": {
                    bgcolor: orange[800],
                  },
                }}
              >
                {t("common.next")}
              </Button>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" textAlign="center">
                {t("register.alreadyHaveAccount")}{" "}
                <Link
                  component={RouterLink}
                  to="/supplier/login"
                  color={orange[700]}
                >
                  {t("common.signIn")}
                </Link>
              </Typography>
            </Box>

            {/* Language selector */}
            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
              <Button
                size="small"
                onClick={() => i18n.changeLanguage("fr")}
                color={i18n.language === "fr" ? "primary" : "inherit"}
              >
                Français
              </Button>
              <Button
                size="small"
                onClick={() => i18n.changeLanguage("ar")}
                color={i18n.language === "ar" ? "primary" : "inherit"}
              >
                العربية
              </Button>
              <Button
                size="small"
                onClick={() => i18n.changeLanguage("en")}
                color={i18n.language === "en" ? "primary" : "inherit"}
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

export default BasicInfo;
