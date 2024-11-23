import React, { useState } from "react";
import { Box, Typography, Snackbar, Alert, Grid2 } from "@mui/material";
import FileUploader from "components/FileUploader";
import TemperatureChart from "components/TemperatureChart";
import CustomizationPanel from "components/CustomizationPanel";
import { groupByYear, calculateStdDev } from "utils/dataProcessing";
import Header from "components/Header";
import Loader from "common/components/Loader"; // Import the Loader component

const App = () => {
  const [data, setData] = useState([]); // Original data
  const [filteredData, setFilteredData] = useState([]); // Filtered or processed data
  const [options, setOptions] = useState({
    showStdDevOverlay: false,
    groupByYearlyAverages: false,
    legends: {
      enabled: false,
      layout: "vertical",
      align: "left",
      itemStyle: {
        fontSize: 12,
      },
    },
  });
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isValidYear, setIsValidYear] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  // Handle parsed CSV data
  const handleDataParsed = async (parsedData) => {
    setLoading(true); // Show loader
    try {
      const yearlyData = groupByYear(parsedData);
      setData(yearlyData);
      setFilteredData(yearlyData); // Initial display shows all data
    } catch (err) {
      setError("Error processing data: " + err.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Handle options change
  const handleOptionChange = (key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));

    if (key === "groupByYearlyAverages") {
      if (value) {
        const groupedData = data.map((entry) => ({
          ...entry,
          stdDev: calculateStdDev(entry.monthValues), // Ensure stdDev is recalculated
        }));
        setFilteredData(groupedData);
      } else {
        setFilteredData(data); // Reset to monthly data
      }
    }

    if (key === "showStdDevOverlay" && options.groupByYearlyAverages) {
      const updatedData = filteredData.map((entry) => ({
        ...entry,
        stdDev: calculateStdDev(entry.monthValues), // Always recalculate
      }));
      setFilteredData(updatedData);
    }

    if (key === "showLegends") {
      setOptions((prev) => ({
        ...prev,
        legends: { ...options.legends, enabled: value },
      }));
    }

    if (key === "zooming") {
      setOptions((prev) => ({
        ...prev,
        minRange: value,
      }));
    }
  };

  // Handle zooming by year
  const handleZoom = (year) => {
    const zoomedData = data.filter((d) => d.year === year.toString());
    if (zoomedData.length === 0) {
      setError(`No data available for the year ${year}`);
      setOpenSnackbar(true);
      setIsValidYear(false);
    } else {
      setIsValidYear(true);
      setFilteredData(zoomedData);
    }
  };

  // Close Snackbar
  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <Header />
      {loading && <Loader />}
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Temperatures Data Visualizer
        </Typography>
        <FileUploader onDataParsed={handleDataParsed} />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
        {filteredData.length > 0 && (
          <Grid2 container spacing={6} sx={{ marginTop: 4 }}>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <TemperatureChart
                data={filteredData}
                options={options}
                isLoading={loading}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <CustomizationPanel
                isValidYear={isValidYear}
                onOptionChange={handleOptionChange}
                onZoom={handleZoom}
              />
            </Grid2>
          </Grid2>
        )}
      </Box>
    </>
  );
};

export default App;
