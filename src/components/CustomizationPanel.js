import React, { memo, useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import OptionCheckbox from "common/components/OptionCheckbox";
import ZoomControls from "common/components/ZoomControls";
import AdjustZoomControls from "common/components/AdjustZoomControls";
import SnackbarError from "common/components/SnackbarError";
import InfoIcon from "@mui/icons-material/Info";

const CustomizationPanel = ({ isValidYear, onZoom, onOptionChange }) => {
  const [zoomYear, setZoomYear] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [zoomingLevel, setZoomingLevel] = useState(1); // Initial zoom level
  const [groupByYearlyAverages, setGroupByYearlyAverages] = useState(false);
  const [showStdDevOverlay, setShowStdDevOverlay] = useState(false);

  const handleZoom = () => {
    if (!zoomYear || isNaN(zoomYear) || zoomYear <= 0) {
      displayError("Please enter a valid year.");
      return;
    }
    onZoom(parseInt(zoomYear, 10));
  };

  const displayError = (message) => {
    setError(message);
    setOpenSnackbar(true);
  };

  const handleGroupByYearChange = (value) => {
    setGroupByYearlyAverages(value);
    onOptionChange("groupByYearlyAverages", value);
    setZoomingLevel(1);

    if (!value) {
      setShowStdDevOverlay(false);
      onOptionChange("showStdDevOverlay", false);
    }
  };

  const handleStdDevOverlayChange = (value) => {
    setShowStdDevOverlay(value);
    onOptionChange("showStdDevOverlay", value);
  };

  const handleSliderChange = (newValue) => {
    setZoomingLevel(newValue);
    onOptionChange("zooming", newValue);
  };

  const handleResetSlider = () => {
    onOptionChange("zooming", 1);
    setZoomingLevel(1);
  };

  const onChangeZoomYear = (e) => {
    setZoomYear(e.target.value);
    if (!e.target.value) {
      handleResetSlider();
    }
  };

  const handleInputChange = (event) => {
    const value = Math.max(1, Math.min(100, +event.target.value));
    setZoomingLevel(value);
    onOptionChange("zooming", value);
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5">Display Options</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <OptionCheckbox
          label="Group data by yearly averages"
          checked={groupByYearlyAverages}
          disabled={isValidYear && zoomYear}
          onChange={handleGroupByYearChange}
        />
        <Tooltip title="Available if the field Year of Interest is valid and not set.">
          <InfoIcon
            fontSize="small"
            sx={{ cursor: "pointer", color: "info.main" }}
          />
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <OptionCheckbox
          label="Overlay ±1σ (Standard Deviation)"
          checked={showStdDevOverlay}
          disabled={!groupByYearlyAverages}
          onChange={handleStdDevOverlayChange}
        />
        <Tooltip title="Available for yearly averages.">
          <InfoIcon
            fontSize="small"
            sx={{ cursor: "pointer", color: "info.main" }}
          />
        </Tooltip>
      </Box>
      <OptionCheckbox
        label="Show Legends"
        onChange={(checked) => onOptionChange("showLegends", checked)}
      />
      <ZoomControls
        zoomYear={zoomYear}
        groupByYearlyAverages={groupByYearlyAverages}
        setZoomYear={onChangeZoomYear}
        handleZoom={handleZoom}
      />
      <AdjustZoomControls
        zoomingLevel={zoomingLevel}
        isValidYear={isValidYear}
        zoomYear={zoomYear}
        handleResetSlider={handleResetSlider}
        handleSliderChange={handleSliderChange}
        handleInputChange={handleInputChange}
      />
      <SnackbarError
        open={openSnackbar}
        message={error}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default memo(CustomizationPanel);
