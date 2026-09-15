import React from 'react';
import './CalorieRing.css';

/**
 * CalorieRing Component
 * Dynamic SVG circular progress ring visualizing consumed calories vs daily target.
 * Supports standard and compact sizes for Dashboard/Home widgets.
 */
export const CalorieRing = ({
  consumed = 0,
  target = 2400,
  size = 'standard', // 'compact' | 'standard' | 'large'
  showRemaining = true,
}) => {
  const safeTarget = Math.max(1, target);
  const percent = Number(((consumed / safeTarget) * 100).toFixed(1));
  const isOver = consumed > safeTarget;
  const overBy = isOver ? consumed - safeTarget : 0;
  const remaining = Math.max(0, safeTarget - consumed);

  // SVG dimensions based on size variant
  const dimensions = {
    compact: { width: 140, stroke: 10, radius: 56 },
    standard: { width: 210, stroke: 14, radius: 86 },
    large: { width: 260, stroke: 16, radius: 108 },
  }[size] || { width: 210, stroke: 14, radius: 86 };

  const { width, stroke, radius } = dimensions;
  const center = width / 2;
  const circumference = 2 * Math.PI * radius;

  // Cap progress visual at 100% for full circle, but show 100%+ in text/color
  const visualPercent = Math.min(100, Math.max(0, percent));
  const strokeDashoffset = circumference - (visualPercent / 100) * circumference;

  const gradientId = `calorie-ring-grad-${size}-${isOver ? 'over' : 'normal'}`;

  return (
    <div className={`calorie-ring-container ${size} ${isOver ? 'over-target' : ''}`}>
      <div className="calorie-ring-svg-wrap" style={{ width, height: width }}>
        <svg
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
          className="calorie-ring-svg"
          aria-label={`Calorie ring: ${consumed} of ${target} kcal (${Math.round(percent)}%)`}
          role="progressbar"
          aria-valuenow={consumed}
          aria-valuemin={0}
          aria-valuemax={target}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {isOver ? (
                <>
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#DC2626" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#FF8A00" />
                  <stop offset="50%" stopColor="#FF5E1E" />
                  <stop offset="100%" stopColor="#22C55E" />
                </>
              )}
            </linearGradient>
            <filter id={`ring-glow-${size}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow 
                dx="0" 
                dy="0" 
                stdDeviation={isOver ? "5" : "4"} 
                floodColor={isOver ? "rgba(239, 68, 68, 0.5)" : "rgba(255, 94, 30, 0.45)"} 
              />
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="var(--glass-border, rgba(255, 255, 255, 0.1))"
            strokeWidth={stroke}
            className="calorie-ring-track"
          />

          {/* Animated Value Arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={`url(#${gradientId})`}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
            filter={`url(#ring-glow-${size})`}
            className="calorie-ring-fill"
          />
        </svg>

        {/* Center Ring Information */}
        <div className="calorie-ring-center-content">
          <span className="calorie-ring-consumed">{consumed.toLocaleString()}</span>
          <span className="calorie-ring-unit">kcal</span>
          <span className="calorie-ring-target">/ {target.toLocaleString()}</span>
          
          <div className="calorie-ring-badge">
            {isOver ? (
              <span className="ring-tag over">+{overBy.toLocaleString()} over</span>
            ) : (
              <span className="ring-tag percent">{Math.round(percent)}%</span>
            )}
          </div>
        </div>
      </div>

      {showRemaining && (
        <div className="calorie-ring-footer-text">
          {isOver ? (
            <span className="ring-status-msg over">
              Target exceeded by <strong>{overBy.toLocaleString()} kcal</strong>
            </span>
          ) : (
            <span className="ring-status-msg remaining">
              <strong>{remaining.toLocaleString()} kcal</strong> remaining
            </span>
          )}
        </div>
      )}
    </div>
  );
};
