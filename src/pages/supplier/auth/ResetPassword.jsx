import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useSearchParams,
  Link as RouterLink,
} from "react-router-dom";
import { resetPassword } from "../../../features/supplier/supplierSlice";
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
  IconButton,
  InputAdornment,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { Visibility, VisibilityOff, Check, Close } from "@mui/icons-material";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [allRequirementsMet, setAllRequirementsMet] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.supplier);
  const [searchParams] = useSearchParams();

  // Get email and token from URL
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);

  const checkPasswordRequirements = (pwd) => {
    const requirements = {
      length: pwd.length >= 9,
      uppercase: /[A-Z]/.test(pwd),
      number: /\d/.test(pwd),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
    setPasswordRequirements(requirements);
    setAllRequirementsMet(Object.values(requirements).every(Boolean));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordRequirements(newPassword);
  };

  // Redirect if email or token is missing
  useEffect(() => {
    if (!email || !token) {
      navigate("/forgot-password");
    }
  }, [email, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!allRequirementsMet) {
      setError("Le mot de passe ne respecte pas toutes les exigences");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    const result = await dispatch(
      resetPassword({ email, token, newPassword: password })
    );

    if (resetPassword.fulfilled.match(result)) {
      setSuccess(true);
      setTimeout(() => navigate("/supplier/login"), 3000);
    } else {
      setError(
        result.payload || "Échec de la réinitialisation du mot de passe"
      );
    }
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
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, boxShadow: "0px 0px 0px white" }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
              Réinitialiser le mot de passe
            </Typography>

            {success ? (
              <Alert severity="success" sx={{ mb: 3 }}>
                Mot de passe réinitialisé avec succès ! Redirection vers la
                connexion...
              </Alert>
            ) : (
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Nouveau mot de passe"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={handlePasswordChange}
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
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
                      Le mot de passe doit contenir:
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
                          <Check sx={{ fontSize: 14, color: "common.white" }} />
                        ) : (
                          <Close sx={{ fontSize: 14, color: "common.white" }} />
                        )}
                      </Box>
                      <Typography variant="body2">
                        Minimum 9 caractères
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
                          <Check sx={{ fontSize: 14, color: "common.white" }} />
                        ) : (
                          <Close sx={{ fontSize: 14, color: "common.white" }} />
                        )}
                      </Box>
                      <Typography variant="body2">
                        Une lettre majuscule
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
                          <Check sx={{ fontSize: 14, color: "common.white" }} />
                        ) : (
                          <Close sx={{ fontSize: 14, color: "common.white" }} />
                        )}
                      </Box>
                      <Typography variant="body2">Un chiffre</Typography>
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
                          <Check sx={{ fontSize: 14, color: "common.white" }} />
                        ) : (
                          <Close sx={{ fontSize: 14, color: "common.white" }} />
                        )}
                      </Box>
                      <Typography variant="body2">
                        Un caractère spécial (!@#$%^&* etc.)
                      </Typography>
                    </Box>
                  </Box>
                )}

                <TextField
                  fullWidth
                  label="Confirmer le nouveau mot de passe"
                  type={showNewPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowNewPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: orange[700],
                      },
                    },
                  }}
                />

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

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
                  disabled={isLoading || !allRequirementsMet}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Réinitialiser le mot de passe"
                  )}
                </Button>

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
            )}
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
