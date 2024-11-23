import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import SnackbarError from "common/components/SnackbarError";

const FileUploader = ({ onFileDataParse }) => {
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Invalid file type. Please upload a CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const rows = text.split("\n").map((row) => row.split(","));
        const headers = rows[0];
        const data = rows
          .slice(1)
          .map((row) =>
            Object.fromEntries(
              row.map((value, index) => [headers[index], value])
            )
          );
        onFileDataParse(data);
      } catch (err) {
        setError("Error processing file. Ensure it is properly formatted.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="subtitle1" gutterBottom>
          Upload Temperatures Data File
        </Typography>
      </Box>
      <Box>
        <TextField
          type="file"
          sx={{ width: "max-content" }}
          slotProps={{ htmlInput: { accept: ".csv" } }}
          onChange={handleFileChange}
        />
      </Box>
      <SnackbarError
        open={!!error}
        message={error}
        onClose={() => setError("")}
      />
    </Box>
  );
};

export default FileUploader;
