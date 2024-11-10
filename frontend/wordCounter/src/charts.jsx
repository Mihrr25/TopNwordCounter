import React from 'react';
import { Chart as ChartJS, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register necessary chart components
ChartJS.register(
  BarElement, 
  LineElement, 
  PointElement,      // Register PointElement for Line chart
  CategoryScale,     // CategoryScale for x-axis labels
  LinearScale,       // LinearScale for y-axis values
  Title, 
  Tooltip, 
  Legend,
  Filler
);

const Charts = ({ data, type }) => {

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: type === 'bar' ? 'Bar Chart' : 'Line Chart' },
    },
    scales: {
      x: { title: { display: true, text: 'Words' } },
      y: { title: { display: true, text: 'Frequency' } },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>  {/* Fixed height */}
      {type === 'bar' ? (
        <Bar data={data} options={chartOptions} />
      ) : (
        <Line data={data} options={chartOptions} />
      )}
    </div>
  );
};

export default Charts;
