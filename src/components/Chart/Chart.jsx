import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ completed, total }) => {
  const completionRate = Math.round((completed / total) * 100);

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completed, total - completed],
        backgroundColor: ["#4A90E2", "#B0B0B0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%", // This makes it a donut chart
    plugins: {
      tooltip: { enabled: false }, // Disable tooltip for custom display
    },
  };

  return (
    <div style={{ position: "relative", width: "300px", height: "300px" }}>
      <Doughnut data={data} options={options} />
      {/* <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <p style={{ margin: 0, fontSize: "1rem" }}>Completed</p>
        <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
          {completionRate}%
        </p>
      </div> */}
    </div>
  );
};

export default Chart;
