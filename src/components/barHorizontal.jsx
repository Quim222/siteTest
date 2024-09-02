import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ raceCounts }) {
  // Convert raceCounts object into arrays for labels and data

  const labels = raceCounts.map(item => item.userCount.toString());
  const dataValues = raceCounts.map(item => item.animalsCount);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number of Animals",
        data: dataValues,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Customize color as needed
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y", // This makes the bars horizontal
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Users vs Animals",
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Start the x-axis at 0
        title: {
          display: true,
          text: "Number of Animals",
        },
      },
      y: {
        beginAtZero: true, // Start the y-axis at 0
        title: {
          display: true,
          text: "Number of Users",
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
