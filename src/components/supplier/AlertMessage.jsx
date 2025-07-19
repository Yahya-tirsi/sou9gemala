import { Alert, Snackbar } from "@mui/material";

const AlertMessage = ({
  message = "",
  severity = "error",
  duration = 6000,
  open = false, // Controlled open prop
  onClose, // Callback when closed
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Don't close when clicking away if you want to prevent that
    }
    onClose?.(); // Notify parent component
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
