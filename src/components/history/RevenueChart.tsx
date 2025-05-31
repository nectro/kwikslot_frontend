'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueChartProps {
  dateRange: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ dateRange }) => {
  // Generate demo data based on date range
  const generateData = () => {
    const labels = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const currentYearData = [
      3200, 4100, 3800, 4500, 4200, 5100,
      5800, 5200, 4900, 5500, 4800, 6200
    ];

    const previousYearData = [
      2800, 3200, 3100, 3800, 3500, 4200,
      4500, 4100, 3900, 4300, 3800, 4800
    ];

    return { labels, currentYearData, previousYearData };
  };

  const { labels, currentYearData, previousYearData } = generateData();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          font: {
            size: 10,
            family: 'Poppins',
          },
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#484848',
        bodyColor: '#484848',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 11,
        },
        bodyFont: {
          size: 10,
        },
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#8e8e8e',
          font: {
            size: 9,
            family: 'Poppins',
          },
        },
      },
      y: {
        grid: {
          color: '#f0f0f0',
          borderDash: [2, 2],
        },
        ticks: {
          color: '#8e8e8e',
          font: {
            size: 9,
            family: 'Poppins',
          },
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        },
      },
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 5,
      },
      line: {
        tension: 0.4,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: '2024 Revenue',
        data: currentYearData,
        borderColor: '#00D4FF',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        borderWidth: 3,
        fill: true,
        pointBackgroundColor: '#00D4FF',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
      {
        label: '2023 Revenue',
        data: previousYearData,
        borderColor: '#e0e0e0',
        backgroundColor: 'rgba(224, 224, 224, 0.1)',
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: '#e0e0e0',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        borderDash: [5, 5],
      },
    ],
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default RevenueChart; 