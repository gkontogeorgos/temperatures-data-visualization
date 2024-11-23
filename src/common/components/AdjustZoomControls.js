import React from "react";
import {
  Box,
  Typography,
  Slider,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import InfoIcon from "@mui/icons-material/Info";
import { infoMessage } from "common/constants/constants";

const AdjustZoomControls = ({
  isValidYear,
  zoomYear,
  zoomingLevel,
  handleInputChange,
  handleSliderChange,
  handleResetSlider,
}) => {
  return (
    <>
      <Typography
        sx={{ display: "flex", alignItems: "center", fontSize: "11pt", gap: 1 }}
      >
        Adjust Zoom Out
        <Tooltip title={infoMessage}>
          <InfoIcon
            fontSize="small"
            sx={{ cursor: "pointer", color: "info.main" }}
          />
        </Tooltip>
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Slider
          value={zoomingLevel}
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={100}
          disabled={!isValidYear || !zoomYear}
          sx={{ flex: 1, marginLeft: 1 }}
          onChange={(e, value) => handleSliderChange(value)}
        />
        <TextField
          sx={{ width: 80 }}
          variant="outlined"
          size="small"
          value={zoomingLevel}
          disabled={!zoomYear}
          slotProps={{
            input: {
              min: 1,
              max: 100,
              type: "number",
            },
          }}
          onChange={handleInputChange}
        />
        <IconButton onClick={handleResetSlider} disabled={zoomingLevel === 1}>
          <ReplayIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default AdjustZoomControls;
