import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ForecastChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const ctx = canvas.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => d.hour),
        datasets: [
          {
            label: "Customer Traffic",
            data: data.map((d) => d.customers),
            borderColor: "#2D6CDF",
            backgroundColor: "rgba(45, 108, 223, 0.12)",
            tension: 0.35,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: "top" } },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: "Customer Count" } },
          x: { title: { display: true, text: "Time" } },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data]);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Hourly Customer Traffic Forecast</h2>
          <p className="muted">Visual trend of expected customer volume by hour.</p>
        </div>
      </div>

      <div className="chart-wrap">
        <canvas ref={canvasRef} />
      </div>
    </section>
  );
}