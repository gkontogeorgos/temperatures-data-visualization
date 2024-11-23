import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarError = ({ open, message, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={4000}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    onClose={onClose}
  >
    <Alert severity="error" onClose={onClose}>
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarError;
