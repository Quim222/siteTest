import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Registering necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function DoughnutChart({ raceCounts }) {
  // Transform raceCounts into data suitable for Chart.js
  const data = {
    labels: raceCounts.map((race) => race.name),
    datasets: [
      {
        data: raceCounts.map((race) => race.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ], // Customize as needed
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Most Breed Losts',
      },
    },
  };

  return (
    <div className="size-72">
      <Doughnut data={data} options={options} />
    </div>
  );
}
