import React from 'react';
import './SimpleChart.css';

export function SimpleChart({ data = [], label = 'Metric', color = '#C5522A', height = 200 }) {
  if (!data || data.length === 0) {
    return (
      <div className="simple-chart chart-empty">
        <p>No data available</p>
      </div>
    );
  }

  const values = data.map(d => d.value || 0).filter(v => v !== null);
  if (values.length === 0) return null;

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1;

  const padding = 20;
  const width = Math.max(300, data.length * 20);
  const chartHeight = height - padding * 2;

  // Create line path
  const points = values
    .map((v, i) => {
      const x = (width / (values.length - 1 || 1)) * i + padding;
      const y = chartHeight - ((v - minValue) / range) * chartHeight + padding;
      return `${x},${y}`;
    })
    .join(' ');

  // Create area path
  const areaPoints = [
    `${padding},${chartHeight + padding}`,
    ...values.map((v, i) => {
      const x = (width / (values.length - 1 || 1)) * i + padding;
      const y = chartHeight - ((v - minValue) / range) * chartHeight + padding;
      return `${x},${y}`;
    }),
    `${width - padding},${chartHeight + padding}`,
  ].join(' ');

  return (
    <div className="simple-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="simple-chart__svg"
        preserveAspectRatio="none"
        style={{ height: `${height}px` }}
      >
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={`grid-${i}`}
            x1={padding}
            y1={padding + (chartHeight / 4) * i}
            x2={width - padding}
            y2={padding + (chartHeight / 4) * i}
            stroke="#E8E0D4"
            strokeWidth="1"
            strokeDasharray="4"
          />
        ))}

        {/* Area */}
        <polyline
          points={areaPoints}
          fill={color}
          fillOpacity="0.1"
          stroke="none"
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {values.map((v, i) => {
          const x = (width / (values.length - 1 || 1)) * i + padding;
          const y = chartHeight - ((v - minValue) / range) * chartHeight + padding;
          return (
            <circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r="3"
              fill={color}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="simple-chart__legend">
        <span style={{ color }}>●</span>
        <span>{label}</span>
        <span className="simple-chart__range">
          {minValue.toLocaleString()} - {maxValue.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
