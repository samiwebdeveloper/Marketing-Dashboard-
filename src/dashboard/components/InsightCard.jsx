import React from 'react';
import { Card } from './Card';
import './InsightCard.css';

export function InsightCard({
  title = 'AI Insight',
  insight,
  action = null,
  confidence = 'high',
  icon = '💡',
  actionLabel = 'View Details',
  onAction = null,
  loading = false,
}) {
  return (
    <Card className="insight-card" variant="insight">
      <div className="insight-card__header">
        <div className="insight-card__icon">{icon}</div>
        <div className="insight-card__meta">
          <h4 className="insight-card__title">{title}</h4>
          <span className={`insight-card__confidence insight-card__confidence--${confidence}`}>
            {confidence === 'high' && '🎯 High confidence'}
            {confidence === 'medium' && '📊 Medium confidence'}
            {confidence === 'low' && '⚠️ Low confidence'}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="insight-card__skeleton">
          <div className="insight-card__skeleton-line" />
          <div className="insight-card__skeleton-line" />
          <div className="insight-card__skeleton-line" style={{ width: '80%' }} />
        </div>
      ) : (
        <>
          <p className="insight-card__insight">{insight}</p>
          {(action || onAction) && (
            <button
              className="insight-card__action"
              onClick={onAction}
              disabled={!onAction}
            >
              {action || actionLabel}
              {' →'}
            </button>
          )}
        </>
      )}
    </Card>
  );
}
