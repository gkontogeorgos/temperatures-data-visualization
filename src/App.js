import React, { useState } from "react";
import { Box, Typography, Snackbar, Alert, Grid2 } from "@mui/material";
import FileUploader from "components/FileUploader";
import TemperatureChart from "components/TemperatureChart";
import CustomizationPanel from "components/CustomizationPanel";
import { groupByYear, calculateStdDev } from "utils/dataProcessing";
import Header from "components/Header";
import Loader from "common/components/Loader";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
  const [loading, setLoading] = useState(false);

  const handleDataParse = async (parsedData) => {
    setLoading(true);
    try {
      const yearlyData = groupByYear(parsedData);
      setData(yearlyData);
      setFilteredData(yearlyData);
    } catch (err) {
      setError("Error processing data: " + err.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false); // Hide loader for highcharts
    }
  };

  const handleOptionChange = (key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));

    if (key === "groupByYearlyAverages") {
      if (value) {
        const groupedData = data.map((entry) => ({
          ...entry,
          stdDev: calculateStdDev(entry.monthValues),
        }));
        setFilteredData(groupedData);
      } else {
        setFilteredData(data);
      }
    }

    if (key === "showStdDevOverlay" && options.groupByYearlyAverages) {
      const updatedData = filteredData.map((entry) => ({
        ...entry,
        stdDev: calculateStdDev(entry.monthValues),
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
          Temperatures Data Visualization
        </Typography>
        <FileUploader onFileDataParse={handleDataParse} />
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
