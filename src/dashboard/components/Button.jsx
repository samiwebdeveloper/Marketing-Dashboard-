import React from 'react';
import './Button.css';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${loading ? 'btn--loading' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {icon && !loading && <span className="btn__icon">{icon}</span>}
      {loading && <span className="btn__spinner" />}
      {children}
    </button>
  );
}
