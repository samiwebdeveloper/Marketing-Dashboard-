import React from 'react';
import { Card } from './Card';
import './MetricCard.css';

export function MetricCard({
  label,
  value,
  unit = '',
  delta = null,
  trend = null,
  icon = null,
  color = null,
  loading = false
}) {
  const deltaIsPositive = delta && delta > 0;
  const deltaIslNegative = delta && delta < 0;

  return (
    <Card className="metric-card" variant="metric">
      <div className="metric-card__content">
        {icon && <div className="metric-card__icon">{icon}</div>}
        <div className="metric-card__body">
          <label className="metric-card__label">{label}</label>
          <div className="metric-card__value">
            {loading ? (
              <div className="metric-card__skeleton" />
            ) : (
              <>
                <span className="metric-card__number" style={color ? { color } : {}}>
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </span>
                {unit && <span className="metric-card__unit">{unit}</span>}
              </>
            )}
          </div>
          {delta !== null && !loading && (
            <div className={`metric-card__delta ${deltaIsPositive ? 'positive' : deltaIslNegative ? 'negative' : ''}`}>
              {deltaIsPositive && <span>↑</span>}
              {deltaIslNegative && <span>↓</span>}
              <span className="metric-card__delta-value">{Math.abs(delta)}%</span>
              {trend && <span className="metric-card__trend">{trend}</span>}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
