import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_Mouse_Wheel_Zoom from "highcharts/modules/mouse-wheel-zoom";
import HC_More from "highcharts/highcharts-more";
import HC_Export from "highcharts/modules/exporting";
import HC_Export_Data from "highcharts/modules/export-data";
import HC_Export_Offline from "highcharts/modules/offline-exporting";
import { getChartOptions } from "common/constants/chartOptionsConfig";

// Initialize Highcharts modules
HC_Mouse_Wheel_Zoom(Highcharts);
HC_More(Highcharts);
HC_Export(Highcharts);
HC_Export_Data(Highcharts);
HC_Export_Offline(Highcharts);

const TemperatureChart = ({ data, options, isLoading }) => {
  const chartRef = useRef(null);

  // Manage loading state in Highcharts
  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      const chart = chartRef.current.chart;

      if (isLoading) {
        chart.showLoading();
      } else {
        chart.hideLoading();
      }
    }
  }, [isLoading]);

  const chartOptions = getChartOptions(data, options);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      ref={chartRef}
    />
  );
};

export default TemperatureChart;
