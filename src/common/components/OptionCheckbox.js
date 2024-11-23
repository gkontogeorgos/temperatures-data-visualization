import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const OptionCheckbox = ({ label, checked, disabled, onChange }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={checked}
        disabled={!!disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
    }
    label={label}
    slotProps={{
      typography: {
        sx: { fontSize: "11pt", marginRight: -1 },
      },
    }}
  />
);

export default OptionCheckbox;
