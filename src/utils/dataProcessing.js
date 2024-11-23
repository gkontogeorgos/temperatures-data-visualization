import { months } from "common/constants/constants";

export const groupByYear = (data) => {
  const grouped = data.reduce((acc, row) => {
    const year = row["Year"];

    if (!acc[year]) {
      acc[year] = {
        year,
        monthValues: [],
        annual: 0,
      };
    }

    // Parse monthly temperatures and filter valid numbers
    const monthlyTempValues = months
      .map((month) => parseFloat(row[month]))
      .filter((temp) => !isNaN(temp));

    // Assign monthly temperatures
    acc[year].monthValues = monthlyTempValues;

    // Calculate annual average
    acc[year].annual =
      monthlyTempValues.reduce((sum, val) => sum + val, 0) /
      monthlyTempValues.length;

    return acc;
  }, {});

  // Transform grouped object into an array and calculate standard deviation
  return Object.values(grouped).map((yearData) => ({
    ...yearData,
    annual: parseFloat(yearData.annual.toFixed(1)),
    stdDev: calculateStdDev(yearData.monthValues),
  }));
};

export const calculateStdDev = (monthValues) => {
  if (!Array.isArray(monthValues) || monthValues.length === 0) {
    return 0; // Return 0 if monthValues is invalid or empty
  }

  // Calculate the mean
  const mean =
    monthValues.reduce((sum, val) => sum + val, 0) / monthValues.length;
  // Calculate the variance
  const variance =
    monthValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    monthValues.length;
  return parseFloat(Math.sqrt(variance).toFixed(1));
};
