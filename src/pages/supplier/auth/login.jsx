import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/supplier/supplierSlice";
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
} from "@mui/material";
import { orange } from "@mui/material/colors";

const SupplierLogin = ({ onForgotPassword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message } = useSelector(
    (state) => state.supplier
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData))
      .unwrap()
      .then(() => navigate("supplier/dashboard"))
      .catch(() => {});
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Banner */}
      <Grid
        item
        xs={false}
        md={7}
        sx={{
          background: "linear-gradient(135deg, #FFA726, #FB8C00)",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ p: 4, textAlign: "center", color: "white" }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Vendor Portal
          </Typography>
          <Typography variant="h6">
            Streamline your supplier operations with our platform
          </Typography>
        </Box>
      </Grid>

      {/* Right Form */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
              Vendor Center
            </Typography>

            {isError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {message || "Login failed. Please check your credentials."}
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
                  mb: 2,
                  "& .Mui-focused": {
                    color: orange[700],
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: orange[700],
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                margin="normal"
                variant="outlined"
                required
                value={formData.password}
                onChange={handleChange}
                sx={{
                  mb: 2,
                  "& .Mui-focused": {
                    color: orange[700],
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: orange[700],
                    },
                  },
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Se souvenir de moi"
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
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                SE CONNECTER
              </Button>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                  VOUS NOUS REJOIGNEZ DEPUIS SELLER CENTER?
                </Typography>
                <Link href="#" sx={{ fontWeight: "bold", mr: 2 }}>
                  CLIQUEZ ICI
                </Link>
                <Link
                  component="button"
                  onClick={onForgotPassword}
                  sx={{ fontWeight: "bold" }}
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
