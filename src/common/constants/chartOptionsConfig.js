import { months } from "./constants";

export const getChartOptions = (data, options) => ({
  chart: {
    type: "line",
    zooming: { mouseWheel: true, sensitivity: 1.1, type: "xy" },
  },
  exporting: {
    enabled: true,
    fallbackToExportServer: false,
    menuItemDefinitions: {
      downloadPNG: {
        text: "Download as PNG",
        onclick: function () {
          this.exportChartLocal({ type: "image/png" });
        },
      },
      viewFullscreen: {
        text: "View in Full Screen",
        onclick: function () {
          this.fullscreen.toggle();
        },
      },
      printChart: {
        text: "Print Chart",
        onclick: function () {
          this.print();
        },
      },
    },
    buttons: {
      contextButton: {
        menuItems: [
          "viewFullscreen",
          "downloadPNG",
          "downloadSVG",
          "downloadPDF",
          "printChart",
        ],
      },
    },
  },
  title: {
    text: "Temperature Data Visualization",
  },
  tooltip: {
    useHTML: true,
    formatter: function () {
      const { month, year, category, y } = this.point;
      return `
        <div style="text-align: center; font-size: 14px; margin-bottom: 8px;">
          <b>${month || category || ""}</b>
          <b>${year || ""}</b>
        </div>
        <div>
          <b>Temperature:</b> ${y.toFixed(1)} °C
        </div>`;
    },
  },
  xAxis: {
    minRange: options.minRange,
    categories: options.groupByYearlyAverages
      ? data.map((d) => d.year)
      : months,
  },
  yAxis: {
    title: {
      text: "Temperature (°C)",
    },
    minRange: options.minRange,
  },
  legend: options.legends,
  series: [
    ...(options.groupByYearlyAverages
      ? [
          {
            name: "Yearly Averages",
            data: data.map((d) => d.annual),
          },
          options.showStdDevOverlay && {
            name: "±1σ",
            type: "errorbar",
            data: data.map((d) => ({
              low: d.annual - d.stdDev,
              high: d.annual + d.stdDev,
            })),
          },
        ].filter(Boolean)
      : data.map((d) => ({
          name: d.year,
          data: d.monthValues?.map((temp, index) => ({
            y: temp,
            year: d.year,
            month: months[index],
          })),
        }))),
  ],
  loading: {
    style: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "#cc0000",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
    },
    labelStyle: {
      color: "#cc0000",
      fontSize: "16px",
      fontWeight: "bold",
    },
  },
  credits: {
    enabled: false,
  },
  accessibility: {
    enabled: false,
  },
});
