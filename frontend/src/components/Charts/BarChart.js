import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarController
} from "chart.js";

ChartJS.register(
  BarElement,    
  BarController,
  CategoryScale,  
  LinearScale,    
  Title,       
  Tooltip,    
  Legend         
);

const BarChart = ({ data, params }) => {
  useEffect(() => {
    let chartInstance;

    const renderChart = () => {
      const ctx = document.getElementById("barChart").getContext("2d");

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new ChartJS(ctx, {
        type: "bar",
        data: {
          labels: data.map((item) => item.range), // X-axis labels
          datasets: [
            {
              label: "Number of Transactions",
              data: data.map((item) => item.count), // Y-axis values
              backgroundColor: "rgba(54, 162, 235, 0.6)", // Bar color
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              borderRadius: 5,
              barThickness: 30,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: `Bar Chart Stats - ${params}`,
              font: {
                size: 18,
                weight: "bold",
                family: "Arial, sans-serif",
              },
              color: "#444",
            },
            tooltip: {
              backgroundColor: "#0077cc",
              titleFont: {
                size: 14,
                weight: "bold",
              },
              bodyFont: {
                size: 12,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#555",
                font: {
                  size: 12,
                },
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: "#555",
                font: {
                  size: 12,
                },
              },
            },
          },
        },
      });
    };

    renderChart();

    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, [data, params]);

  return (
    <div className="chart-container">
      <canvas id="barChart"></canvas>
    </div>
  );
};

export default BarChart;
