import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import { useThemeContext } from "../../../../hooks/useThemeContext";
ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);
export const Graph = ({ graphData }) => {
  // Handle responsive bar thickness
  // Tailwind breakpoint: sm = 640px
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { theme } = useThemeContext();
  const barThickness = isMobile ? 7 : 20;
  const labels = graphData?.map((item) => `${item.clickDate}`);
  const userPerDaya = graphData?.map((item) => item.count);
  const data = {
    labels:
      graphData.length > 0
        ? labels
        : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data:
          graphData.length > 0
            ? userPerDaya
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor:
          graphData.length > 0 ? "#3b82f6" : "rgba(54, 162, 235, 0.1)",
        borderColor: "#1D2327",
        color: "#000000",
        pointBorderColor: "red",
        fill: true,
        tension: 0.4,
        barThickness: barThickness, // dynamic value
        categoryPercentage: 1.0,
        barPercentage: 0.9,
      },
    ],
  };
  const textColor = theme === "dark" ? "#ffffff" : "#000000";
  const gridColor = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: textColor, // y-axis labels
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
        },
        grid: {
          color: gridColor, // y-axis grid lines
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          color: textColor,
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
          },
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          color: textColor, // x-axis labels
        },
        grid: {
          color: gridColor, // x-axis grid lines
        },
        title: {
          display: true,
          text: "Date",
          color: textColor,
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
          },
        },
      },
    },
  };
  return <Bar className="w-full" data={data} options={options}></Bar>;
};
