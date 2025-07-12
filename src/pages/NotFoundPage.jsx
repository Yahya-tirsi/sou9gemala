import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { orange } from "@mui/material/colors";
import NotFoundImage from "../assets/images/errors/404 Error Page not Found with people connecting a plug-cuate.png"; // Import the image

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "100vh", // toute la hauteur
        width: "100vw", // toute la largeur
      }}
    >
      <Box
        component="img"
        src={NotFoundImage}
        alt="404 Error - Page Not Found"
        sx={{
          width: "300px",
          maxWidth: "100%",
          mb: 4,
          height: "auto",
        }}
      />

      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 2,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Sorry! Page Not Found
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/")}
        sx={{
          bgcolor: orange[700],
          "&:hover": {
            bgcolor: orange[800],
          },
          px: 4,
          py: 1.5,
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
