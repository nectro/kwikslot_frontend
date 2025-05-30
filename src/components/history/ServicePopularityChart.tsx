'use client';

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ServicePopularityChart: React.FC = () => {
  const data = {
    labels: ['Haircuts', 'Hair Spa', 'Coloring', 'Styling', 'Highlights', 'Treatment'],
    datasets: [
      {
        data: [35, 20, 18, 12, 10, 5],
        backgroundColor: [
          '#00D4FF',    // Brand primary
          '#4A90E2',    // Blue
          '#F5A623',    // Orange
          '#7E57C2',    // Purple
          '#26C6DA',    // Cyan
          '#66BB6A',    // Green
        ],
        borderColor: [
          '#00D4FF',
          '#4A90E2',
          '#F5A623',
          '#7E57C2',
          '#26C6DA',
          '#66BB6A',
        ],
        borderWidth: 0,
        hoverBorderWidth: 2,
        hoverBorderColor: '#ffffff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          font: {
            size: 11,
            family: 'Poppins',
          },
          generateLabels: function(chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                return {
                  text: `${label} (${value}%)`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.backgroundColor[i],
                  lineWidth: 0,
                  pointStyle: 'circle',
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
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
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}% of bookings`;
          }
        }
      },
    },
    cutout: '60%',
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ServicePopularityChart; 