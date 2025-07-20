import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/supplier/supplierSlice";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Divider,
  Paper,
  Container,
  Grid,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SupplierLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoading } = useSelector((state) => state.supplier);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    dispatch(login(formData))
      .unwrap()
      .then((response) => {
        localStorage.setItem("supplierToken", response.token);
        navigate("/supplier/dashboard");
      })
      .catch((error) => {
        if (error.includes("Email") || error.includes("email")) {
          setErrorMessage("Email incorrect");
        } else if (error.includes("Password") || error.includes("password")) {
          setErrorMessage("Mot de passe incorrect");
        } else {
          setErrorMessage("Email ou mot de passe incorrect");
        }
      });
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
              Vendor Center
            </Typography>

            {/* Display error message if exists */}
            {errorMessage && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errorMessage}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                margin="normal"
                variant="outlined"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
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

              <TextField
                fullWidth
                name="password"
                label="Mot de passe"
                type={showPassword ? "text" : "password"}
                margin="normal"
                variant="outlined"
                required
                value={formData.password}
                onChange={handleChange}
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

              {/* <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Se souvenir de moi"
              /> */}

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
                  "Se connecter"
                )}
              </Button>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" textAlign="center">
                Si tu n'as pas de compte, 
                <Link
                  component={RouterLink}
                  to="/supplier/register"
                  color={orange[700]}
                >
                  S'inscrire
                </Link>
              </Typography>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  sx={{
                    fontWeight: "bold",
                    color: "orange",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "darkorange",
                    },
                  }}
                >
                  MOT DE PASSE OUBLIÉ?
                </Link>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SupplierLogin;
