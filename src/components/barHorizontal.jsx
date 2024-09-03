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
    indexAxis: "y",
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
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Animals",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Users",
        },
        ticks: {
          stepSize: 1, // Garante que cada valor seja exibido
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
