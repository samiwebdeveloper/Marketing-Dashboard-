import React from 'react';
import { PLATFORMS } from '../../styles/theme';
import './PlatformBadge.css';

export function PlatformBadge({ platform, size = 'md', showLabel = true }) {
  const config = PLATFORMS[platform];
  if (!config) return null;

  return (
    <div
      className={`platform-badge platform-badge--${size}`}
      style={{ borderColor: config.color, backgroundColor: config.color + '08' }}
    >
      <span className="platform-badge__icon" style={{ color: config.color }}>
        {config.logo}
      </span>
      {showLabel && (
        <span className="platform-badge__label" style={{ color: config.color }}>
          {config.name}
        </span>
      )}
    </div>
  );
}
