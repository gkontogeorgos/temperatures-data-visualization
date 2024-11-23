import React from "react";
import { Box, TextField, Button } from "@mui/material";

const ZoomControls = ({
  zoomYear,
  setZoomYear,
  handleZoom,
  groupByYearlyAverages,
}) => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}
    >
      <TextField
        label="Year of Interest"
        variant="outlined"
        disabled={!!groupByYearlyAverages}
        sx={{ flex: 3 }}
        value={zoomYear}
        slotProps={{
          input: {
            min: 1,
            type: "number",
          },
        }}
        onKeyDown={(e) => e.key === "Enter" && handleZoom()}
        onChange={setZoomYear}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!zoomYear}
        sx={{ flex: 1, padding: 2 }}
        onClick={handleZoom}
      >
        Zoom
      </Button>
    </Box>
  );
};

export default ZoomControls;
