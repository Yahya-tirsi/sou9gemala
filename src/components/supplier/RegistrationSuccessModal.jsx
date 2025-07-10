import {
  Modal,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { orange } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: "center",
};

const RegistrationSuccessModal = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="registration-success-modal"
    >
      <Box sx={style}>
        <CheckCircleOutlineIcon
          sx={{
            fontSize: 60,
            color: orange[700],
            mb: 2,
          }}
        />
        <Typography variant="h5" component="h2" gutterBottom>
          {t("register.successTitle")}
        </Typography>
        <Typography variant="body1" paragraph>
          {t("register.successMessage")}
        </Typography>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 2,
            bgcolor: orange[700],
            "&:hover": {
              bgcolor: orange[800],
            },
          }}
        >
          {t("common.close")}
        </Button>
      </Box>
    </Modal>
  );
};

export default RegistrationSuccessModal;
